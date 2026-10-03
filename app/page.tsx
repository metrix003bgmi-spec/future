"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  FaBars, FaSearch, FaMapMarkerAlt, FaUser, FaTimes, 
  FaChevronDown, FaChevronRight, FaPlay, FaPause 
} from 'react-icons/fa';

// --- Reusable Video Section Component ---
const VideoSection = ({ src, poster, title, designer }: { src: string, poster: string, title: string, designer: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Intersection Observer for Autoplay/Pause on Scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(e => console.log("Autoplay blocked:", e));
          setIsPlaying(true);
        } else {
          videoRef.current?.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.6 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section ref={sectionRef} className="snap-start h-screen w-full relative overflow-hidden">
      {/* src is now directly attached to the video tag */}
      <video 
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        poster={poster}
        loop muted playsInline preload="auto"
      />
      
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0)_35%,rgba(0,0,0,0)_100%)] pointer-events-none"></div>

      <div className="absolute bottom-12 left-6 md:left-12 text-white z-10">
        <h2 className="font-lato text-4xl md:text-5xl font-bold mb-2">{title}</h2>
        <p className="font-light text-lg md:text-xl mb-4">designed by {designer}</p>
        <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider hover:opacity-70 transition">
          <FaChevronRight className="text-xs" /> more
        </a>
      </div>

      <button 
        onClick={togglePlay}
        className="absolute bottom-12 right-6 md:right-12 text-white text-2xl z-10 transition-transform duration-200 hover:scale-110"
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
    </section>
  );
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSpacesOpen, setIsSpacesOpen] = useState(false);
  const [isHeaderSolid, setIsHeaderSolid] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Handle Header Scroll State
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setIsHeaderSolid(scrollContainerRef.current.scrollTop > 50);
    }
  };



  // Replaces the old `isSpacesOpen` state
const [openCategory, setOpenCategory] = useState<string | null>(null);

// The new nested menu structure
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
    <div className="bg-black m-0 p-0 font-sans antialiased overflow-hidden h-screen">
      
      {/* Fixed Header */}
      <header className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 h-[91px] transition-colors duration-400 ease-in-out ${isHeaderSolid ? 'bg-white text-black' : 'bg-transparent text-white'}`}>
        <div onClick={() => setIsMenuOpen(true)} className="flex items-center gap-4 cursor-pointer hover:opacity-70 transition">
          <FaBars className="text-xl" />
          <span className="hidden md:block uppercase text-xs font-semibold tracking-widest">Menu</span>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 cursor-pointer">
          <img src="/assets/alu.png" alt="FurnWalk Logo" className="h-8 md:h-24" />
        </div>

        <div className="flex items-center gap-5 md:gap-6">
          <FaSearch className="text-lg cursor-pointer hover:opacity-70 transition" />
          <FaMapMarkerAlt className="text-lg cursor-pointer hover:opacity-70 transition hidden md:block" />
          <FaUser className="text-lg cursor-pointer hover:opacity-70 transition" />
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
      {/* Category Heading Toggle */}
      <button 
        onClick={() => toggleCategory(category.title)} 
        className="w-full flex items-center justify-between text-xl font-light hover:text-gray-500 transition tracking-wide"
      >
        {category.title}
        <FaChevronDown 
          className={`text-sm transition-transform duration-300 ${openCategory === category.title ? 'rotate-180' : ''}`} 
        />
      </button>
      
      {/* Nested Sub-Links */}
      <div 
        className={`flex-col gap-4 pl-4 pt-5 text-gray-500 font-sans text-sm tracking-widest uppercase ${openCategory === category.title ? 'flex' : 'hidden'}`}
      >
        {category.links.map((link) => (
          <Link key={link.name} href={link.href} className="hover:text-black transition">
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  ))}

  {/* Standard Footer Links */}
  <div className="pt-6 border-t border-gray-100 mt-2 flex flex-col gap-6">
    <Link href="/about" className="text-xl font-light hover:text-gray-500 transition tracking-wide">
      About Us
    </Link>
    <Link href="/contact" className="text-xl font-light hover:text-gray-500 transition tracking-wide">
      Contact
    </Link>
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

      {/* Scroll Snapping Container */}
      <main 
        ref={scrollContainerRef} 
        onScroll={handleScroll}
        className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar"
      >
        <VideoSection 
          src="/homepage/homepage.mp4"
          poster="https://embed-ssl.wistia.com/deliveries/a1c0f3aff7674a95974c12e5236667e81c5d783f.jpg?image_crop_resized=1920x1080"
          title="Conversation"
          designer="Philippe Bouix"
        />

        {/* Static Image Section */}
        {/* <section className="snap-start h-screen w-full relative overflow-hidden">
          <img 
            src="https://www.roche-bobois.com/on/demandware.static/-/Library-Sites-roche-bobois/default/dwc6ce4bb8/Home/SliderPrincipal/Produits-2025-2/Deltalis_Desktop.jpg" 
            className="w-full h-full object-cover" 
            alt="Deltalis" 
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0)_35%,rgba(0,0,0,0)_100%)] pointer-events-none"></div>
          <div className="absolute bottom-12 left-6 md:left-12 text-white z-10">
            <h2 className="font-lato text-4xl md:text-5xl font-bold mb-2">Deltalis</h2>
            <p className="font-light text-lg md:text-xl mb-4">designed by Maurizio Manzoni</p>
            <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider hover:opacity-70 transition">
              <FaChevronRight className="text-xs" /> more
            </a>
          </div>
        </section> */}
        <VideoSection 
          src="/homepage/dt.mp4"
          poster="https://embed-ssl.wistia.com/deliveries/a1c0f3aff7674a95974c12e5236667e81c5d783f.jpg?image_crop_resized=1920x1080"
          title="Conversation"
          designer="Philippe Bouix"
        />

        <VideoSection 
          src="https://embed-ssl.wistia.com/deliveries/04387e5d15ff005f4a21c26d0182fb1d6234d914.m3u8"
          poster="https://embed-ssl.wistia.com/deliveries/de477b65423e24b35931ed56d5f39480b1490c7d.jpg?image_crop_resized=1920x1080"
          title="Script"
          designer="Sacha Lakic"
        />

        <VideoSection 
          src="https://embed-ssl.wistia.com/deliveries/75498f90a21bc1b3ecda8af2d079da0b9e115bb6.m3u8"
          poster="https://embed-ssl.wistia.com/deliveries/d563caab16abbb8af8ac2bea337b8681da38e3b3.jpg?image_crop_resized=1920x1080"
          title="Bubble"
          designer="Sacha Lakic"
        />

        <VideoSection 
          src="https://embed-ssl.wistia.com/deliveries/9988aa4d54c9e77f133cf390efa3ce31ce6ad7f5.m3u8"
          poster="https://embed-ssl.wistia.com/deliveries/5d542119ab7ed5f14a41c0795b0f188f526f5bff.jpg?image_crop_resized=1920x1080"
          title="Mah Jong"
          designer="Hans Hopfer"
        />
      </main>
    </div>
  );
}