"use client";

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';

interface Product {
  id: string;
  name: string;
  designer: string;
  imgPrimary: string;
  imgSecondary: string;
  link: string;
  style?: string;
  subStyle?: string;
}

export default function ProductGrid({ products }: { products: Product[] }) {
  const [activeStyle, setActiveStyle] = useState<string>('All');
  const [activeSubStyle, setActiveSubStyle] = useState<string>('All');

  const handleStyleChange = (style: string) => {
    setActiveStyle(style);
    setActiveSubStyle('All'); 
  };

  const filteredProducts = products.filter((product) => {
    if (activeStyle === 'All') return true;
    if (activeStyle === 'Luxury') return product.style === 'Luxury';
    if (activeStyle === 'Modern') {
      if (activeSubStyle === 'All') return product.style === 'Modern';
      return product.style === 'Modern' && product.subStyle === activeSubStyle;
    }
    return true;
  });

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* Premium Main Category Toggles */}
      <div className="flex bg-[#f8f8f8] rounded-full p-1 mb-8 shadow-inner">
        {['All', 'Modern', 'Luxury'].map((tab) => (
          <button
            key={tab}
            onClick={() => handleStyleChange(tab)}
            className={`px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 ease-out ${
              activeStyle === tab 
                ? 'bg-black text-white shadow-md transform scale-100' 
                : 'bg-transparent text-gray-500 hover:text-black scale-95'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Elegant Subcategory Underline Tabs */}
      <div className={`flex gap-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${
        activeStyle === 'Modern' ? 'max-h-20 opacity-100 mb-10' : 'max-h-0 opacity-0 mb-0'
      }`}>
        {['All', 'Economic', 'Premium'].map((subTab) => (
          <button
            key={subTab}
            onClick={() => setActiveSubStyle(subTab)}
            className={`relative text-[11px] font-semibold uppercase tracking-[0.15em] pb-1 transition-colors duration-300 ${
              activeSubStyle === subTab ? 'text-black' : 'text-gray-400 hover:text-black'
            } after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[1px] after:bg-black after:transition-all after:duration-400 ${
              activeSubStyle === subTab ? 'after:w-full' : 'after:w-0'
            }`}
          >
            {subTab === 'All' ? 'All Modern' : subTab}
          </button>
        ))}
      </div>

      {/* Subtle Count Indicator */}
      <div className="w-full flex justify-between items-center border-t border-b border-gray-100 py-3 mb-12 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
        <span>Collection</span>
        <span>{filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}</span>
      </div>

      {/* Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16">
        {filteredProducts.map((product) => (
          <div key={product.id} className="animate-fade-in-up">
            <ProductCard 
              name={product.name}
              designer={product.designer}
              imgPrimary={product.imgPrimary}
              imgSecondary={product.imgSecondary}
              link={product.link}
            />
          </div>
        ))}
        
        {filteredProducts.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-24 text-gray-400">
            <span className="text-sm uppercase tracking-widest font-light mb-2">No selections available</span>
            <button onClick={() => handleStyleChange('All')} className="text-xs text-black border-b border-black pb-0.5 hover:opacity-70 transition">
              View All Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
}