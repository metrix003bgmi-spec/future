"use client";

import { useState } from 'react';
import Link from 'next/link';
import { FaRulerCombined, FaMapMarkerAlt, FaPlus, FaMinus, FaCheck } from 'react-icons/fa';

export default function ProductDetailClient({ product }: { product: any }) {
  const [activeImg, setActiveImg] = useState(product.images[0]);
  const [activeSwatch, setActiveSwatch] = useState(product.swatches[0]);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-6 md:px-12 pb-24">
      {/* Breadcrumbs */}
      <nav className="text-xs uppercase tracking-widest text-gray-400 font-semibold flex gap-2 py-4 mb-4">
        <Link href="/" className="hover:text-black transition">Home</Link>
        <span>/</span>
        <Link href={`/${product.category.toLowerCase()}`} className="hover:text-black transition">{product.category}</Link>
        <span>/</span>
        <span className="text-black">{product.name}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 relative">
        
        {/* Left Column: Image Gallery */}
        <div className="w-full lg:w-3/5 flex flex-col gap-4">
          <div className="w-full bg-[#f4f4f4] aspect-[4/3] relative flex items-center justify-center overflow-hidden cursor-zoom-in group">
            <img 
              src={activeImg} 
              alt={product.name} 
              className="w-full h-full object-cover transition-opacity duration-300"
            />
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition duration-300"></div>
          </div>

          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {product.images.map((img: string, idx: number) => (
              <button 
                key={idx}
                onClick={() => setActiveImg(img)}
                className={`flex-shrink-0 w-24 h-24 border-2 transition overflow-hidden ${activeImg === img ? 'border-black' : 'border-transparent hover:border-gray-300'}`}
              >
                <img src={img} className="w-full h-full object-cover" alt={`Thumbnail ${idx + 1}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Product Information */}
        <div className="w-full lg:w-2/5 relative">
          <div className="lg:sticky lg:top-32 flex flex-col">
            
            <h2 className="font-lato text-4xl md:text-5xl font-light uppercase tracking-wide mb-2">{product.name}</h2>
            <h3 className="text-lg uppercase tracking-widest text-gray-500 font-semibold mb-4">{product.type}</h3>
            <p className="font-sans text-sm text-[#656565] mb-8">designed by {product.designer}</p>

            {/* Swatches */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs uppercase tracking-widest font-semibold">
                  Upholstery: <span className="text-gray-500 font-normal">{activeSwatch.name}</span>
                </span>
                <button className="text-xs underline text-gray-500 hover:text-black transition">View all</button>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {product.swatches.map((swatch: any, idx: number) => {
                  const isActive = activeSwatch.name === swatch.name;
                  return (
                    <button 
                      key={idx}
                      onClick={() => setActiveSwatch(swatch)}
                      className={`relative flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 ring-offset-2 transition focus:outline-none ${isActive ? 'ring-2 ring-black' : 'hover:ring-2 hover:ring-gray-300'}`}
                      style={{ backgroundColor: swatch.hex }}
                    >
                      {/* React Native Checkmark replaces custom CSS pseudo-element */}
                      {isActive && <FaCheck className="text-white text-[10px] drop-shadow-md" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dimensions Preview */}
            <div className="mb-8 text-sm text-gray-600 font-light flex items-center gap-2">
              <FaRulerCombined className="text-gray-400" />
              <span>{product.dimensions.metric}</span>
              <span className="text-gray-300 mx-2">|</span>
              <span>{product.dimensions.imperial}</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 mb-10">
              <button className="w-full bg-black text-white text-xs font-bold uppercase tracking-widest py-4 hover:bg-gray-800 transition">
                Add to Selection
              </button>
              <button className="w-full bg-white border border-black text-black text-xs font-bold uppercase tracking-widest py-4 hover:bg-[#f4f4f4] transition flex justify-center items-center gap-2">
                <FaMapMarkerAlt /> Find a Showroom
              </button>
            </div>

            {/* Accordions */}
            <div className="border-t border-[#e5e5e5]">
              
              <div className="border-b border-[#e5e5e5]">
                <button 
                  onClick={() => toggleAccordion('details')}
                  className="w-full py-5 flex justify-between items-center text-left focus:outline-none group"
                >
                  <span className="text-sm font-semibold uppercase tracking-widest group-hover:text-gray-500 transition">Product Details</span>
                  {openAccordion === 'details' ? <FaMinus className="text-xs text-gray-400" /> : <FaPlus className="text-xs text-gray-400" />}
                </button>
                <div className={`overflow-hidden transition-all duration-400 ease-in-out ${openAccordion === 'details' ? 'max-h-[500px] pb-6' : 'max-h-0'}`}>
                  <p className="text-sm text-[#656565] font-light leading-relaxed">{product.details}</p>
                </div>
              </div>

              <div className="border-b border-[#e5e5e5]">
                <button 
                  onClick={() => toggleAccordion('dimensions')}
                  className="w-full py-5 flex justify-between items-center text-left focus:outline-none group"
                >
                  <span className="text-sm font-semibold uppercase tracking-widest group-hover:text-gray-500 transition">Dimensions</span>
                  {openAccordion === 'dimensions' ? <FaMinus className="text-xs text-gray-400" /> : <FaPlus className="text-xs text-gray-400" />}
                </button>
                <div className={`overflow-hidden transition-all duration-400 ease-in-out ${openAccordion === 'dimensions' ? 'max-h-[500px] pb-6' : 'max-h-0'}`}>
                  <ul className="list-disc pl-5 mb-4 space-y-1 text-sm text-[#656565] font-light leading-relaxed">
                    {product.dimensions.list.map((dim: string, idx: number) => (
                      <li key={idx}>{dim}</li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}