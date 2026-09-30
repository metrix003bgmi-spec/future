"use client";

import { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaSearch, FaTimes, FaChevronDown, FaRegHeart } from 'react-icons/fa';

export default function CategoryHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const menuCategories = [
    {
      title: "Luxury Homes",
      links: [
        { name: "Sofas", href: "/sofas" },
        { name: "Beds", href: "/beds" },
        { name: "Sideboards", href: "/sideboards" },
      ]
    },
    {
      title: "Events",
      links: [
        { name: "Seating", href: "/seating" },
        { name: "Decor", href: "/decor" },
        { name: "Tables", href: "/tables" },
      ]
    },
    {
      title: "Offices",
      links: [
        { name: "Desks", href: "/desks" },
        { name: "Office Chairs", href: "/office-chairs" },
        { name: "Storage", href: "/storage" },
      ]
    },
    {
      title: "Hotels",
      links: [
        { name: "Lobby", href: "/lobby" },
        { name: "Suites", href: "/suites" },
        { name: "Outdoor", href: "/outdoor" },
      ]
    },
    {
      title: "Institutes",
      links: [
        { name: "Classroom", href: "/classroom" },
        { name: "Library", href: "/library" },
        { name: "Auditorium", href: "/auditorium" },
      ]
    }
  ];

  const toggleCategory = (title: string) => {
    setOpenCategory(openCategory === title ? null : title);
  };

  return (
    <>
      {/* Top Header Bar */}
      <header className="w-full bg-white border-b border-gray-200 flex items-center justify-between px-8 py-5 sticky top-0 z-50 text-black">
        <div onClick={() => setIsMenuOpen(true)} className="flex items-center gap-4 cursor-pointer hover:opacity-70 transition">
          <FaBars className="text-xl" />
          <span className="hidden md:block uppercase text-xs font-semibold tracking-widest">Menu</span>
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 cursor-pointer">
          <Link href="/">
            <h1 className="font-lato text-2xl font-bold tracking-[0.2em] uppercase">FurnWalk</h1>
          </Link>
        </div>
        <div className="flex items-center gap-6 text-gray-600">
          <FaSearch className="text-lg cursor-pointer hover:text-black transition" />
          <FaRegHeart className="text-lg cursor-pointer hover:text-black transition" />
        </div>
      </header>

      {/* Sidebar Menu */}
      <div className={`fixed top-0 left-0 w-full sm:w-[400px] h-full bg-white text-black z-[100] transform transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-2xl flex flex-col ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
          <span className="uppercase text-xs font-bold tracking-[0.2em]">Menu</span>
          <button onClick={() => setIsMenuOpen(false)} className="text-xl text-gray-400 hover:text-black transition">
            <FaTimes />
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto px-8 py-8 flex flex-col gap-6 font-lato">
          {menuCategories.map((category) => (
            <div key={category.title}>
              <button 
                onClick={() => toggleCategory(category.title)} 
                className="w-full flex items-center justify-between text-xl font-light hover:text-gray-500 transition tracking-wide"
              >
                {category.title}
                <FaChevronDown 
                  className={`text-sm transition-transform duration-300 ${openCategory === category.title ? 'rotate-180' : ''}`} 
                />
              </button>
              <div className={`flex-col gap-4 pl-4 pt-5 text-gray-500 font-sans text-sm tracking-widest uppercase ${openCategory === category.title ? 'flex' : 'hidden'}`}>
                {category.links.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    className="hover:text-black transition"
                    onClick={() => setIsMenuOpen(false)} // Closes menu when a link is clicked
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div className="pt-6 border-t border-gray-100 mt-2 flex flex-col gap-6">
            <Link href="/about" className="text-xl font-light hover:text-gray-500 transition tracking-wide">About Us</Link>
            <Link href="/contact" className="text-xl font-light hover:text-gray-500 transition tracking-wide">Contact</Link>
          </div>
        </nav>
      </div>

      {/* Dark Backdrop */}
      {isMenuOpen && (
        <div 
          onClick={() => setIsMenuOpen(false)} 
          className="fixed inset-0 bg-black/60 z-[90] cursor-pointer transition-opacity duration-500 opacity-100"
        />
      )}
    </>
  );
}