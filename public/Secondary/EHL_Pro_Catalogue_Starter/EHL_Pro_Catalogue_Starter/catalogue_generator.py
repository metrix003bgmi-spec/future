from pathlib import Path
import tkinter as tk
from tkinter import filedialog, messagebox, ttk
import pandas as pd
from PIL import Image, ImageOps
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image as RLImage, PageBreak, Table, TableStyle, KeepTogether
import re, os, sys

APP_DIR = Path(__file__).resolve().parent
DEFAULT_BOOK = APP_DIR / "products.xlsx"
SUPPORTED = {".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff", ".bmp"}

FIELDS = [
    "product_id", "model_no", "product_name", "category", "style", "tier",
    "material", "colour", "dimensions", "description", "image_filename",
    "image_path", "include", "catalogue_tags"
]

def safe_name(s):
    s = re.sub(r'[<>:"/\\|?*]+', "-", str(s).strip())
    s = re.sub(r"\s+", "-", s)
    return s.strip("-") or "Catalogue"

def read_book(path):
    df = pd.read_excel(path, sheet_name="Products", dtype=str).fillna("")
    for c in FIELDS:
        if c not in df.columns:
            df[c] = ""
    return df

def resolve_image(row, image_root):
    candidates = []
    raw = str(row.get("image_path", "")).strip()
    if raw:
        p = Path(raw)
        candidates.append(p if p.is_absolute() else image_root / p)
        candidates.append(p)
    fn = str(row.get("image_filename", "")).strip()
    if fn:
        candidates.append(image_root / fn)
    for p in candidates:
        try:
            if p.exists() and p.is_file():
                return p
        except Exception:
            pass
    return None

def scan_images(folder, workbook):
    folder = Path(folder)
    files = sorted([p for p in folder.rglob("*") if p.is_file() and p.suffix.lower() in SUPPORTED])
    if not files:
        raise ValueError("No supported image files found in the selected folder.")
    if workbook.exists():
        df = read_book(workbook)
    else:
        df = pd.DataFrame(columns=FIELDS)
    existing = {str(x).strip().lower(): i for i, x in df.get("image_filename", pd.Series(dtype=str)).items() if str(x).strip()}
    rows_added = 0
    for p in files:
        key = p.name.lower()
        if key in existing:
            idx = existing[key]
            df.at[idx, "image_path"] = str(p.resolve())
            if not str(df.at[idx, "image_filename"]).strip():
                df.at[idx, "image_filename"] = p.name
        else:
            n = len(df) + 1
            new = {c: "" for c in FIELDS}
            new.update({
                "product_id": f"EHL-{n:04d}",
                "product_name": p.stem.replace("_", " ").replace("-", " ").strip(),
                "image_filename": p.name,
                "image_path": str(p.resolve()),
                "include": "No",
            })
            df.loc[len(df)] = new
            rows_added += 1
    df.to_excel(workbook, index=False, sheet_name="Products")
    return len(files), rows_added

def fit_image(path, max_w, max_h):
    with Image.open(path) as im:
        im = ImageOps.exif_transpose(im).convert("RGB")
        im.thumbnail((int(max_w * 3), int(max_h * 3)), Image.Resampling.LANCZOS)
        temp = APP_DIR / "_temp_catalogue_image.jpg"
        im.save(temp, "JPEG", quality=92, optimize=True)
        w, h = im.size
    scale = min(max_w / w, max_h / h)
    return RLImage(str(temp), width=w*scale, height=h*scale)

def create_pdf(df, category, style, image_root, output_path, title=None):
    if category != "(All categories)":
        df = df[df["category"].astype(str).str.strip().str.casefold() == category.casefold()]
    if style != "(All styles)":
        df = df[df["style"].astype(str).str.strip().str.casefold() == style.casefold()]
    df = df[df["include"].astype(str).str.strip().str.casefold().isin(["yes", "y", "true", "1"])]
    if df.empty:
        raise ValueError("No products match these filters with include=Yes. In Excel, set include to Yes for products you want to publish.")
    doc = SimpleDocTemplate(str(output_path), pagesize=A4, rightMargin=18*mm, leftMargin=18*mm, topMargin=16*mm, bottomMargin=16*mm, title=title or "EHL Pro Furniture Catalogue")
    styles = getSampleStyleSheet()
    cover_title = ParagraphStyle("CoverTitle", parent=styles["Title"], fontName="Helvetica-Bold", fontSize=28, leading=34, textColor=colors.HexColor("#252525"), alignment=TA_LEFT, spaceAfter=12)
    sub = ParagraphStyle("Sub", parent=styles["Normal"], fontName="Helvetica", fontSize=11, leading=16, textColor=colors.HexColor("#777777"))
    product_title = ParagraphStyle("ProductTitle", parent=styles["Heading1"], fontName="Helvetica-Bold", fontSize=23, leading=28, textColor=colors.HexColor("#222222"), spaceAfter=5)
    model_style = ParagraphStyle("Model", parent=styles["Normal"], fontName="Helvetica", fontSize=9, leading=13, textColor=colors.HexColor("#A47B42"), spaceAfter=12)
    body = ParagraphStyle("BodyCustom", parent=styles["Normal"], fontName="Helvetica", fontSize=10, leading=14, textColor=colors.HexColor("#333333"))
    small = ParagraphStyle("SmallCustom", parent=styles["Normal"], fontName="Helvetica", fontSize=8, leading=11, textColor=colors.HexColor("#777777"))
    story = []
    display_title = title or ("EHL Pro | " + (category if category != "(All categories)" else "Furniture Collection"))
    story += [Spacer(1, 38*mm), Paragraph("EHL PRO", ParagraphStyle("Brand", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=13, textColor=colors.HexColor("#A47B42"), spaceAfter=18)), Paragraph(display_title.replace("&","&amp;"), cover_title), Spacer(1, 5*mm), Paragraph("A curated furniture collection", sub), Spacer(1, 95*mm), Paragraph(f"{len(df)} selected products · Product specifications subject to confirmation", small), PageBreak()]
    for idx, (_, row) in enumerate(df.iterrows()):
        product_name = str(row.get("product_name", "")).strip() or "Furniture Piece"
        model = str(row.get("model_no", "")).strip() or str(row.get("product_id", "")).strip() or "Model number to be confirmed"
        story.append(Paragraph(product_name.replace("&","&amp;"), product_title))
        story.append(Paragraph(("MODEL  " + model).replace("&","&amp;"), model_style))
        img = resolve_image(row, Path(image_root))
        if img:
            story.append(fit_image(img, 170*mm, 142*mm))
        else:
            story.append(Spacer(1, 45*mm))
            story.append(Paragraph("PRODUCT IMAGE NOT FOUND — check image_path / image_filename", small))
        story.append(Spacer(1, 7*mm))
        data = []
        for label, key in [
            ("CATEGORY", "category"), ("STYLE", "style"), ("COLLECTION TIER", "tier"),
            ("MATERIAL", "material"), ("COLOUR", "colour"), ("DIMENSIONS", "dimensions")
        ]:
            value = str(row.get(key, "")).strip()
            if value:
                data.append([Paragraph(f"<b>{label}</b>", small), Paragraph(value.replace("&","&amp;"), body)])
        if data:
            t = Table(data, colWidths=[42*mm, 120*mm], hAlign="LEFT")
            t.setStyle(TableStyle([
                ("VALIGN", (0,0), (-1,-1), "TOP"),
                ("LINEBELOW", (0,0), (-1,-1), 0.35, colors.HexColor("#E7E1D8")),
                ("LEFTPADDING", (0,0), (-1,-1), 0),
                ("RIGHTPADDING", (0,0), (-1,-1), 8),
                ("TOPPADDING", (0,0), (-1,-1), 5),
                ("BOTTOMPADDING", (0,0), (-1,-1), 5),
            ]))
            story.append(t)
        desc = str(row.get("description", "")).strip()
        if desc:
            story += [Spacer(1, 5*mm), Paragraph(desc.replace("&","&amp;"), body)]
        story += [Spacer(1, 5*mm), Paragraph("EHL Pro · Furniture & Interior Solutions", small)]
        if idx != len(df)-1:
            story.append(PageBreak())
    def footer(canvas, doc_):
        canvas.saveState()
        canvas.setStrokeColor(colors.HexColor("#E7E1D8"))
        canvas.line(18*mm, 12*mm, 192*mm, 12*mm)
        canvas.setFont("Helvetica", 8)
        canvas.setFillColor(colors.HexColor("#777777"))
        canvas.drawString(18*mm, 7*mm, "EHL PRO")
        canvas.drawRightString(192*mm, 7*mm, f"{doc_.page}")
        canvas.restoreState()
    doc.build(story, onFirstPage=footer, onLaterPages=footer)
    return len(df)

class App:
    def __init__(self, root):
        self.root = root
        root.title("EHL Pro Catalogue Generator")
        root.geometry("780x560")
        root.minsize(700, 520)
        self.book = tk.StringVar(value=str(DEFAULT_BOOK))
        self.images = tk.StringVar(value=str(APP_DIR / "product_images"))
        self.out = tk.StringVar(value=str(APP_DIR / "output_pdfs"))
        self.category = tk.StringVar(value="(All categories)")
        self.style = tk.StringVar(value="(All styles)")
        self.title = tk.StringVar(value="")
        pad = {"padx": 12, "pady": 5}
        ttk.Label(root, text="EHL PRO  |  Furniture Catalogue Generator", font=("Segoe UI", 16, "bold")).pack(anchor="w", padx=14, pady=(14, 4))
        ttk.Label(root, text="Scan product images, maintain the Excel master, then generate one-product-per-page PDFs.", wraplength=740).pack(anchor="w", padx=14, pady=(0, 10))
        frm = ttk.Frame(root); frm.pack(fill="x", padx=8)
        self.path_row(frm, 0, "Master Excel", self.book, self.pick_book)
        self.path_row(frm, 1, "Image folder", self.images, self.pick_images)
        self.path_row(frm, 2, "PDF output folder", self.out, self.pick_out)
        actions = ttk.Frame(root); actions.pack(fill="x", **pad)
        ttk.Button(actions, text="1. Scan / Refresh Image Inventory", command=self.scan).pack(side="left", padx=(0, 8))
        ttk.Button(actions, text="Open Excel", command=self.open_excel).pack(side="left")
        ttk.Separator(root).pack(fill="x", padx=12, pady=8)
        filters = ttk.LabelFrame(root, text="Generate catalogue"); filters.pack(fill="x", padx=12, pady=4)
        ttk.Label(filters, text="Category").grid(row=0, column=0, sticky="w", padx=8, pady=8)
        self.cat_box = ttk.Combobox(filters, textvariable=self.category, state="readonly", width=28)
        self.cat_box.grid(row=0, column=1, sticky="w", padx=8, pady=8)
        ttk.Label(filters, text="Style").grid(row=0, column=2, sticky="w", padx=8, pady=8)
        self.style_box = ttk.Combobox(filters, textvariable=self.style, state="readonly", width=24)
        self.style_box.grid(row=0, column=3, sticky="w", padx=8, pady=8)
        ttk.Label(filters, text="Optional PDF title").grid(row=1, column=0, sticky="w", padx=8, pady=8)
        ttk.Entry(filters, textvariable=self.title, width=55).grid(row=1, column=1, columnspan=3, sticky="ew", padx=8, pady=8)
        ttk.Button(root, text="2. Refresh Filters from Excel", command=self.refresh_filters).pack(anchor="w", padx=14, pady=6)
        ttk.Button(root, text="3. Generate PDF", command=self.generate).pack(anchor="w", padx=14, pady=5, ipadx=12, ipady=5)
        self.status = tk.StringVar(value="Start by selecting your image folder and scanning it. Then fill product details in Excel.")
        ttk.Label(root, textvariable=self.status, wraplength=740, foreground="#555555").pack(anchor="w", padx=14, pady=12)
        self.refresh_filters(silent=True)

    def path_row(self, parent, row, label, var, command):
        ttk.Label(parent, text=label, width=18).grid(row=row, column=0, sticky="w", padx=8, pady=4)
        ttk.Entry(parent, textvariable=var).grid(row=row, column=1, sticky="ew", padx=8, pady=4)
        ttk.Button(parent, text="Browse…", command=command).grid(row=row, column=2, padx=8, pady=4)
        parent.columnconfigure(1, weight=1)

    def pick_book(self):
        p = filedialog.askopenfilename(filetypes=[("Excel workbook", "*.xlsx")])
        if p: self.book.set(p); self.refresh_filters(silent=True)
    def pick_images(self):
        p = filedialog.askdirectory()
        if p: self.images.set(p)
    def pick_out(self):
        p = filedialog.askdirectory()
        if p: self.out.set(p)
    def scan(self):
        try:
            count, added = scan_images(Path(self.images.get()), Path(self.book.get()))
            self.status.set(f"Scanned {count} images. Added {added} new rows. Existing matching filenames had their image paths refreshed. Open Excel and fill the product details; set include=Yes for products to publish.")
            self.refresh_filters(silent=True)
            messagebox.showinfo("Inventory updated", f"Scanned {count} image files.\\nAdded {added} new product rows.\\n\\nReview the Excel file before generating catalogues.")
        except Exception as e: messagebox.showerror("Scan failed", str(e))
    def open_excel(self):
        p = Path(self.book.get())
        if not p.exists():
            messagebox.showwarning("Workbook missing", "Run Scan / Refresh Image Inventory first.")
            return
        os.startfile(str(p))
    def refresh_filters(self, silent=False):
        try:
            df = read_book(Path(self.book.get()))
            cats = ["(All categories)"] + sorted([x for x in df["category"].unique() if str(x).strip()])
            styles = ["(All styles)"] + sorted([x for x in df["style"].unique() if str(x).strip()])
            self.cat_box["values"] = cats
            self.style_box["values"] = styles
            if self.category.get() not in cats: self.category.set(cats[0])
            if self.style.get() not in styles: self.style.set(styles[0])
            if not silent: self.status.set("Filters refreshed from the Products sheet.")
        except Exception as e:
            if not silent: messagebox.showerror("Could not refresh", str(e))
    def generate(self):
        try:
            book = Path(self.book.get())
            df = read_book(book)
            cat, sty = self.category.get(), self.style.get()
            title = self.title.get().strip() or ("EHL Pro - " + (cat if cat != "(All categories)" else "Furniture Collection") + ("" if sty == "(All styles)" else " - " + sty))
            Path(self.out.get()).mkdir(parents=True, exist_ok=True)
            filename = safe_name(title) + ".pdf"
            output = Path(self.out.get()) / filename
            count = create_pdf(df, cat, sty, Path(self.images.get()), output, title)
            self.status.set(f"Created {output} with {count} products.")
            messagebox.showinfo("PDF created", f"Created {output}\\nProducts: {count}")
        except Exception as e:
            messagebox.showerror("PDF generation failed", str(e))

if __name__ == "__main__":
    root = tk.Tk()
    App(root)
    root.mainloop()
