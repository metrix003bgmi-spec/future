"use client";

import Link from 'next/link';

interface ProductCardProps {
  name: string;
  designer: string;
  imgPrimary: string;
  imgSecondary: string;
  link: string;
}

export default function ProductCard({ name, designer, imgPrimary, imgSecondary, link }: ProductCardProps) {
  return (
    <Link href={link} className="group block w-full cursor-pointer">
      {/* Image Container */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#f8f8f8] mb-5">
        {/* Primary Silo Image */}
        <img 
          src={imgPrimary} 
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0" 
          alt={`${name} Silhouette`} 
        />
        
        {/* Secondary Lifestyle Image (Slow Zoom on hover) */}
        <img 
          src={imgSecondary} 
          className="absolute inset-0 w-full h-full object-cover opacity-0 scale-100 transition-all duration-[1000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:opacity-100 group-hover:scale-105" 
          alt={`${name} Lifestyle`} 
        />
        
        {/* Quick View Overlay (Slide-up on hover) */}
        <div className="absolute bottom-0 left-0 w-full p-4 flex justify-center overflow-hidden">
          <div 
            onClick={(e) => {
              e.preventDefault();
              console.log(`Quick view opened for ${name}`);
            }}
            className="translate-y-[150%] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 bg-white/95 text-black text-xs font-bold uppercase tracking-widest px-8 py-3 hover:bg-black hover:text-white w-full text-center max-w-[250px]"
          >
            Quick View
          </div>
        </div>
      </div>
      
      {/* Text Details with Animated Underline */}
      <div className="flex flex-col items-center text-center px-4">
        <h3 className="font-lato text-xl font-bold uppercase tracking-wider text-black mb-1">{name}</h3>
        <p className="font-sans text-sm text-gray-500 font-light mb-3">designed by {designer}</p>
        <span className="relative inline-block text-[11px] font-bold tracking-[0.2em] uppercase text-black after:content-[''] after:absolute after:w-0 after:h-[1px] after:-bottom-[2px] after:left-1/2 after:bg-black after:transition-all after:duration-400 group-hover:after:w-full group-hover:after:left-0">
          Discover
        </span>
      </div>
    </Link>
  );
}