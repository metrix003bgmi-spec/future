"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  FaCheck, 
  FaEye, 
  FaEyeSlash, 
  FaRulerCombined, 
  FaMapMarkerAlt, 
  FaPlus, 
  FaMinus 
} from 'react-icons/fa';

export default function ProductDetailClient({ product }: { product: any }) {
  // Support both 'upholstery' and 'seats' keys from lib/data.ts
  const upholsteryOptions = product.upholstery || product.seats || null;

  // Detect whether this product uses the layered customizer or standard gallery
  const isCustomizable = Boolean(
    upholsteryOptions || 
    product.base || 
    product.legs || 
    product.rims || 
    product.pillows || 
    product.pillowBelts
  );

  // --- Layer Selection States ---
  const [activeLegs, setActiveLegs] = useState(product.legs?.[0] || null);
  const [activeBase, setActiveBase] = useState(product.base?.[0] || null);
  const [activeUpholstery, setActiveUpholstery] = useState(upholsteryOptions?.[0] || null);
  const [activeRims, setActiveRims] = useState(product.rims?.[0] || null);
  const [activePillows, setActivePillows] = useState(product.pillows?.[0] || null);
  const [activePillowBelts, setActivePillowBelts] = useState(product.pillowBelts?.[0] || null);

  // --- Show / Hide States for Removable Accessories ---
  const [showPillows, setShowPillows] = useState(true);
  const [showPillowBelts, setShowPillowBelts] = useState(true);

  // --- Fallback State for Standard Non-Modular Products ---
  const [activeStandardImg, setActiveStandardImg] = useState(
    product.images?.[0] || product.baseImage || ""
  );

  // --- Accordion State ---
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  // Reusable Swatch Group Renderer
  const renderSwatchSection = ({
    title,
    options,
    activeItem,
    onSelect,
    shape = "circle",
    canToggle = false,
    isVisible = true,
    onToggleVisibility,
    disabled = false,
    disabledMessage = ""
  }: {
    title: string;
    options: any[];
    activeItem: any;
    onSelect: (item: any) => void;
    shape?: "circle" | "square";
    canToggle?: boolean;
    isVisible?: boolean;
    onToggleVisibility?: () => void;
    disabled?: boolean;
    disabledMessage?: string;
  }) => {
    if (!options || options.length === 0 || !activeItem) return null;

    return (
      <div className="mb-6 pt-5 border-t border-gray-100 first:border-t-0 first:pt-0">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs uppercase tracking-widest font-semibold">
            {title}:{" "}
            <span className="text-gray-500 font-normal">
              {disabled ? disabledMessage : isVisible ? activeItem.name : "Hidden"}
            </span>
          </span>

          {/* Show / Hide Button for Removable Accessories */}
          {canToggle && onToggleVisibility && !disabled && (
            <button
              type="button"
              onClick={onToggleVisibility}
              className={`flex items-center gap-1.5 text-[11px] uppercase tracking-wider px-2.5 py-1 border transition ${
                isVisible
                  ? "border-black bg-black text-white"
                  : "border-gray-300 bg-white text-gray-500 hover:border-black hover:text-black"
              }`}
            >
              {isVisible ? (
                <>
                  <FaEye className="text-[10px]" /> Visible
                </>
              ) : (
                <>
                  <FaEyeSlash className="text-[10px]" /> Hidden
                </>
              )}
            </button>
          )}
        </div>

        {/* Swatch Buttons */}
        <div
          className={`flex flex-wrap gap-3 transition-opacity duration-300 ${
            !isVisible || disabled ? "opacity-30 pointer-events-none" : "opacity-100"
          }`}
        >
          {options.map((item: any, idx: number) => {
            const isActive = activeItem.name === item.name;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => onSelect(item)}
                title={item.name}
                className={`relative flex items-center justify-center w-9 h-9 border border-gray-300 ring-offset-2 transition focus:outline-none overflow-hidden ${
                  shape === "circle" ? "rounded-full" : "rounded-md"
                } ${isActive ? "ring-2 ring-black" : "hover:ring-2 hover:ring-gray-300"}`}
                style={{ backgroundColor: item.hex }}
              >
                {item.texture && (
                  <img
                    src={item.texture}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                )}
                {isActive && (
                  <FaCheck className="absolute text-white text-[10px] drop-shadow-md" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-[1600px] mx-auto px-6 md:px-12 pb-24">
      
      {/* Breadcrumbs */}
      <nav className="text-xs uppercase tracking-widest text-gray-400 font-semibold flex gap-2 py-4 mb-4">
        <Link href="/" className="hover:text-black transition">Home</Link>
        <span>/</span>
        <Link
          href={`/${product.category?.toLowerCase().replace(/\s+/g, "-") || ""}`}
          className="hover:text-black transition"
        >
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-black">{product.name}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 relative">
        
        {/* ======================================================= */}
        {/* LEFT COLUMN: 2D LAYERED VISUALIZER (OR FALLBACK GALLERY) */}
        {/* ======================================================= */}
        <div className="w-full lg:w-3/5 flex flex-col gap-4">
          {isCustomizable ? (
            <div className="relative w-full aspect-[4/3] bg-[#f4f4f4] overflow-hidden flex items-center justify-center">
              
              {/* Layer 0: Static Base Sofa or Shadow */}
              {product.baseImage && (
                <img
                  src={product.baseImage}
                  className="absolute inset-0 w-full h-full object-contain z-0"
                  alt={product.name}
                />
              )}

              {/* Layer 1: Legs */}
              {activeLegs?.image && (
                <img
                  key={activeLegs.image}
                  src={activeLegs.image}
                  className="absolute inset-0 w-full h-full object-contain z-10 transition-opacity duration-500 animate-fade-in"
                  alt={`Legs - ${activeLegs.name}`}
                />
              )}

              {/* Layer 2: Structural Base (Woven / Wood Frame) */}
              {activeBase?.image && (
                <img
                  key={activeBase.image}
                  src={activeBase.image}
                  className="absolute inset-0 w-full h-full object-contain z-20 transition-opacity duration-500 animate-fade-in"
                  alt={`Base - ${activeBase.name}`}
                />
              )}

              {/* Layer 3: Main Upholstery / Seat */}
              {activeUpholstery?.image && (
                <img
                  key={activeUpholstery.image}
                  src={activeUpholstery.image}
                  className="absolute inset-0 w-full h-full object-contain z-30 transition-opacity duration-500 animate-fade-in"
                  alt={`Upholstery - ${activeUpholstery.name}`}
                />
              )}

              {/* Layer 4: Brass Rims / Metallic Accents */}
              {activeRims?.image && (
                <img
                  key={activeRims.image}
                  src={activeRims.image}
                  className="absolute inset-0 w-full h-full object-contain z-40 transition-opacity duration-500 animate-fade-in"
                  alt={`Rims - ${activeRims.name}`}
                />
              )}

              {/* Layer 5: Pillows (Smoothly fades out when hidden) */}
              {activePillows?.image && (
                <img
                  key={activePillows.image}
                  src={activePillows.image}
                  className={`absolute inset-0 w-full h-full object-contain z-50 transition-opacity duration-500 ${
                    showPillows ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                  alt={`Pillows - ${activePillows.name}`}
                />
              )}

              {/* Layer 6: Pillow Belts (Requires BOTH Pillows and Belts to be visible) */}
              {activePillowBelts?.image && (
                <img
                  key={activePillowBelts.image}
                  src={activePillowBelts.image}
                  className={`absolute inset-0 w-full h-full object-contain z-60 transition-opacity duration-500 ${
                    showPillows && showPillowBelts
                      ? "opacity-100"
                      : "opacity-0 pointer-events-none"
                  }`}
                  alt={`Pillow Belts - ${activePillowBelts.name}`}
                />
              )}
            </div>
          ) : (
            /* Fallback Gallery for standard non-customizable products */
            <>
              <div className="w-full bg-[#f4f4f4] aspect-[4/3] relative flex items-center justify-center overflow-hidden">
                {activeStandardImg && (
                  <img
                    src={activeStandardImg}
                    alt={product.name}
                    className="w-full h-full object-contain mix-blend-multiply p-4 transition-opacity duration-300"
                  />
                )}
              </div>
              {product.images && product.images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                  {product.images.map((img: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setActiveStandardImg(img)}
                      className={`flex-shrink-0 w-24 h-24 border-2 transition overflow-hidden bg-[#f4f4f4] ${
                        activeStandardImg === img
                          ? "border-black"
                          : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={img}
                        className="w-full h-full object-contain mix-blend-multiply p-1"
                        alt={`Thumbnail ${idx + 1}`}
                      />
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* ======================================================= */}
        {/* RIGHT COLUMN: DYNAMIC CUSTOMIZATION CONTROLS            */}
        {/* ======================================================= */}
        <div className="w-full lg:w-2/5 relative">
          <div className="lg:sticky lg:top-32 flex flex-col">
            
            <h2 className="font-lato text-4xl md:text-5xl font-light uppercase tracking-wide mb-2">
              {product.name}
            </h2>
            {product.type && (
              <h3 className="text-lg uppercase tracking-widest text-gray-500 font-semibold mb-2">
                {product.type}
              </h3>
            )}
            {product.designer && (
              <p className="font-sans text-sm text-[#656565] mb-8">
                designed by {product.designer}
              </p>
            )}

            {/* Dynamic Swatch Controls */}
            <div className="mb-4">
              {/* 1. Main Upholstery / Seat (Circle) */}
              {renderSwatchSection({
                title: product.seats ? "Seat Upholstery" : "Upholstery",
                options: upholsteryOptions,
                activeItem: activeUpholstery,
                onSelect: setActiveUpholstery,
                shape: "circle"
              })}

              {/* 2. Structural Base Finish (Square) */}
              {renderSwatchSection({
                title: "Base Finish",
                options: product.base,
                activeItem: activeBase,
                onSelect: setActiveBase,
                shape: "square"
              })}

              {/* 3. Metallic Rims / Accents (Square) */}
              {renderSwatchSection({
                title: "Rim & Trim Finish",
                options: product.rims,
                activeItem: activeRims,
                onSelect: setActiveRims,
                shape: "square"
              })}

              {/* 4. Legs (Square) */}
              {renderSwatchSection({
                title: "Legs",
                options: product.legs,
                activeItem: activeLegs,
                onSelect: setActiveLegs,
                shape: "square"
              })}

              {/* 5. Pillows with Show/Hide Toggle (Circle) */}
              {renderSwatchSection({
                title: "Pillows",
                options: product.pillows,
                activeItem: activePillows,
                onSelect: setActivePillows,
                shape: "circle",
                canToggle: true,
                isVisible: showPillows,
                onToggleVisibility: () => setShowPillows(!showPillows)
              })}

              {/* 6. Pillow Belts with Show/Hide & Dependency on Pillows (Square) */}
              {renderSwatchSection({
                title: "Pillow Belts",
                options: product.pillowBelts,
                activeItem: activePillowBelts,
                onSelect: setActivePillowBelts,
                shape: "square",
                canToggle: true,
                isVisible: showPillowBelts,
                onToggleVisibility: () => setShowPillowBelts(!showPillowBelts),
                disabled: !showPillows,
                disabledMessage: "Enable pillows to customize"
              })}
            </div>

            {/* Dimensions Summary */}
            {product.dimensions && (
              <div className="mb-8 pt-4 border-t border-gray-100 text-sm text-gray-600 font-light flex items-center gap-2">
                <FaRulerCombined className="text-gray-400" />
                <span>{product.dimensions.metric}</span>
                {product.dimensions.imperial && (
                  <>
                    <span className="text-gray-300 mx-2">|</span>
                    <span>{product.dimensions.imperial}</span>
                  </>
                )}
              </div>
            )}

            {/* Primary CTAs */}
            <div className="flex flex-col gap-3 mb-10">
              <button className="w-full bg-black text-white text-xs font-bold uppercase tracking-widest py-4 hover:bg-gray-800 transition">
                Add Configuration to Selection
              </button>
              <button className="w-full bg-white border border-black text-black text-xs font-bold uppercase tracking-widest py-4 hover:bg-[#f4f4f4] transition flex justify-center items-center gap-2">
                <FaMapMarkerAlt /> Find a Showroom
              </button>
            </div>

            {/* Product Details & Dimensions Accordions */}
            <div className="border-t border-[#e5e5e5]">
              {product.details && (
                <div className="border-b border-[#e5e5e5]">
                  <button
                    onClick={() => toggleAccordion("details")}
                    className="w-full py-5 flex justify-between items-center text-left focus:outline-none group"
                  >
                    <span className="text-sm font-semibold uppercase tracking-widest group-hover:text-gray-500 transition">
                      Product Details
                    </span>
                    {openAccordion === "details" ? (
                      <FaMinus className="text-xs text-gray-400" />
                    ) : (
                      <FaPlus className="text-xs text-gray-400" />
                    )}
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-400 ease-in-out ${
                      openAccordion === "details" ? "max-h-[500px] pb-6" : "max-h-0"
                    }`}
                  >
                    <p className="text-sm text-[#656565] font-light leading-relaxed">
                      {product.details}
                    </p>
                  </div>
                </div>
              )}

              {product.dimensions?.list && product.dimensions.list.length > 0 && (
                <div className="border-b border-[#e5e5e5]">
                  <button
                    onClick={() => toggleAccordion("dimensions")}
                    className="w-full py-5 flex justify-between items-center text-left focus:outline-none group"
                  >
                    <span className="text-sm font-semibold uppercase tracking-widest group-hover:text-gray-500 transition">
                      Dimensions
                    </span>
                    {openAccordion === "dimensions" ? (
                      <FaMinus className="text-xs text-gray-400" />
                    ) : (
                      <FaPlus className="text-xs text-gray-400" />
                    )}
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-400 ease-in-out ${
                      openAccordion === "dimensions" ? "max-h-[500px] pb-6" : "max-h-0"
                    }`}
                  >
                    <ul className="list-disc pl-5 mb-4 space-y-1 text-sm text-[#656565] font-light leading-relaxed">
                      {product.dimensions.list.map((dim: string, idx: number) => (
                        <li key={idx}>{dim}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}