"use client";

import { useState } from 'react';
import Link from 'next/link';
import { FaCheck } from 'react-icons/fa';

export default function ProductDetailClient({ product }: { product: any }) {
  // Safely initialize state. Defaults to null if the arrays don't exist on older products.
  const [activeSeat, setActiveSeat] = useState(product.seats?.[0] || null);
  const [activePillow, setActivePillow] = useState(product.pillows?.[0] || null);

  return (
    <div className="max-w-[1600px] mx-auto px-6 md:px-12 pb-24">
      
      {/* Breadcrumbs */}
      <nav className="text-xs uppercase tracking-widest text-gray-400 font-semibold flex gap-2 py-4 mb-4">
        <Link href="/" className="hover:text-black transition">Home</Link>
        <span>/</span>
        <Link href={`/${product.category?.toLowerCase().replace(/\s+/g, '-') || ''}`} className="hover:text-black transition">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-black">{product.name}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        {/* Left Column: The 2D Layered Visualizer */}
        <div className="w-full lg:w-3/5">
          <div className="relative w-full aspect-[4/3] bg-[#f4f4f4] overflow-hidden flex items-center justify-center">

          {/* The Image Stack Container */}
            <div className="relative w-full aspect-[4/3] bg-[#f4f4f4] overflow-hidden flex items-center justify-center">
            
              {/* Layer 0: Original Whole Sofa (Always visible at the back) */}
              {product.baseImage && (
                <img 
                  src={product.baseImage} 
                  className="absolute inset-0 w-full h-full object-contain z-0" 
                  alt="Original Sofa Base" 
                />
              )}

              {/* Layer 1: Seat Overlay */}
              {activeSeat?.image && (
                <img 
                  key={activeSeat.image}
                  src={activeSeat.image} 
                  // z-10 puts the seat color directly on top of the original sofa
                  className="absolute inset-0 w-full h-full object-contain z-10 transition-opacity duration-500 animate-fade-in" 
                  alt="Seat Color" 
                />
              )}

              {/* Layer 2: Pillow Overlay */}
              {activePillow?.image && (
                <img 
                  key={activePillow.image}
                  src={activePillow.image} 
                  // z-20 puts the pillows on top of both the base sofa and the seat
                  className="absolute inset-0 w-full h-full object-contain z-20 transition-opacity duration-500 animate-fade-in" 
                  alt="Pillow Color" 
                />
              )}
            </div>
            
            {/* Layer 0: Shadows (Optional Base) */}
            {product.shadowImage && (
              <img 
                src={product.shadowImage} 
                className="absolute inset-0 w-full h-full object-contain z-0 mix-blend-multiply opacity-80" 
                alt="Shadows" 
              />
            )}

            {/* Layer 1: Seat / Main Body */}
            {activeSeat?.image && (
              <img 
                key={activeSeat.image}
                src={activeSeat.image} 
                className="absolute inset-0 w-full h-full object-contain z-10 transition-opacity duration-500 animate-fade-in" 
                alt="Seat" 
              />
            )}

            {/* Layer 2: Pillows */}
            {activePillow?.image && (
              <img 
                key={activePillow.image}
                src={activePillow.image} 
                className="absolute inset-0 w-full h-full object-contain z-20 transition-opacity duration-500 animate-fade-in" 
                alt="Pillow" 
              />
            )}
          </div>
        </div>

        {/* Right Column: Customization Controls */}
        <div className="w-full lg:w-2/5">
          <div className="lg:sticky lg:top-32 flex flex-col">
            
            <h2 className="font-lato text-4xl md:text-5xl font-light uppercase tracking-wide mb-8">{product.name}</h2>

            {/* --- Seat Control --- */}
            {product.seats && product.seats.length > 0 && activeSeat && (
              <div className="mb-6">
                <p className="text-xs uppercase tracking-widest font-semibold mb-3">
                  Seat: <span className="text-gray-500 font-normal">{activeSeat.name}</span>
                </p>
                <div className="flex flex-wrap gap-3">
                  {product.seats.map((item: any, idx: number) => {
                    const isActive = activeSeat.name === item.name;
                    return (
                      <button 
                        key={idx} onClick={() => setActiveSeat(item)}
                        className={`relative flex items-center justify-center w-9 h-9 rounded-full border border-gray-300 transition ${isActive ? 'ring-2 ring-black' : 'hover:ring-2 hover:ring-gray-300'}`}
                        style={{ backgroundColor: item.hex }}
                      >
                        {isActive && <FaCheck className="text-white text-[10px] drop-shadow-md" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* --- Pillow Control --- */}
            {product.pillows && product.pillows.length > 0 && activePillow && (
              <div className="mb-6 pt-5 border-t border-gray-100">
                <p className="text-xs uppercase tracking-widest font-semibold mb-3">
                  Pillows: <span className="text-gray-500 font-normal">{activePillow.name}</span>
                </p>
                <div className="flex flex-wrap gap-3">
                  {product.pillows.map((item: any, idx: number) => {
                    const isActive = activePillow.name === item.name;
                    return (
                      <button 
                        key={idx} onClick={() => setActivePillow(item)}
                        className={`relative flex items-center justify-center w-9 h-9 rounded-full border border-gray-300 transition ${isActive ? 'ring-2 ring-black' : 'hover:ring-2 hover:ring-gray-300'}`}
                        style={{ backgroundColor: item.hex }}
                      >
                        {isActive && <FaCheck className="text-white text-[10px] drop-shadow-md" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}