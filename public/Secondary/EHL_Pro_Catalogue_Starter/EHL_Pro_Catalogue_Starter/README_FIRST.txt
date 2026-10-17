# EHL Pro Catalogue Generator — Starter Pack

## What this does
- Scans image files in a selected local folder and its subfolders.
- Creates/updates `products.xlsx` with one row per image.
- Lets you filter by category and style.
- Generates A4 portrait PDFs with one product per page, plus a cover.
- Includes product image, model number/product ID, category, style, tier, material, colour, dimensions and optional description.

## Windows setup
1. Install Python from https://www.python.org/downloads/windows/ . During setup, enable the option to add Python to PATH if offered.
2. Extract this ZIP to a permanent folder, e.g. `C:\EHL-Pro-Catalogue`.
3. Copy or sync your product images into a local folder. The starter includes `product_images` as a placeholder, but you can choose your existing image folder in the app.
4. Double-click `Run_Catalogue_Generator.bat`. On first run it installs the required Python packages and opens the app.
5. Choose your image folder, then click **Scan / Refresh Image Inventory**.
6. Click **Open Excel**. Fill in model numbers and specifications; set `include` to `Yes` only for products you want in the PDFs.
7. In Excel, use consistent values for `category` (e.g. Bed, Sofa, Coffee Table) and `style` (e.g. Contemporary, Modern, Classic). Save and close Excel before generating.
8. Return to the app and click **Refresh Filters from Excel**. Choose a category/style and click **Generate PDF**.

## Google Drive recommendation
For reliable generation, use Google Drive for desktop and keep the working image folder available locally/offline. Mirroring My Drive keeps files both locally and in Drive but uses local disk space; streaming saves local space but may require downloads and an active Drive app/internet connection for files not available offline. See Google Drive Help: https://support.google.com/drive/answer/13401938

Suggested arrangement:
- Local working copy: `C:\EHL-Pro-Catalogue\product_images`
- Google Drive backup: `My Drive\EHL Pro\Product Images`
- Master workbook: `products.xlsx`
- Output: `output_pdfs`

If images already live in a local folder synced by Drive for desktop, select that folder directly instead of making another copy.

## Data structure
- `product_id`: internal unique ID; do not change once assigned.
- `model_no`: official EHL Pro model number; may be blank until confirmed.
- `product_name`: human-facing name.
- `category`: one main category, e.g. Bed, Sofa, Dining Table, Coffee Table, Executive Desk, Chair, Sideboard.
- `style`: one primary style, e.g. Contemporary, Modern, Classic, Scandinavian, Industrial, Minimalist, Art Deco.
- `tier`: Semi Premium, Premium, Ultra Premium.
- `material`, `colour`, `dimensions`: only enter verified details.
- `description`: optional short product description.
- `image_filename`: original image filename.
- `image_path`: full path to the selected image file.
- `include`: Yes/No. The generator only includes rows marked Yes.
- `catalogue_tags`: optional semicolon-separated tags for future advanced filtering.

## Important limitations of this starter
- The scan uses filenames to match existing records. If different folders contain identical filenames, rename them uniquely or review paths carefully.
- Scanning discovers images but does not reliably infer materials, colours, dimensions or model numbers from photos. Those must be verified from EHL Pro's source records or entered by a person.
- This is a starter tool, not a cloud-connected Google Drive API app. It works with local files and Drive for desktop synced/available files.
- The design is a functional starter template. Before sharing prospect-facing PDFs, add EHL Pro's approved logo, contact information, brand fonts, and final design refinements.
- Save and close Excel before generating a PDF to avoid reading stale or locked data.
