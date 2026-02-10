'use client';

import { useState, useEffect } from 'react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="text-white font-black text-2xl tracking-tighter">
          ELITE<span className="text-red-600">SHIELD</span>
        </div>
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="text-white hover:text-red-500 transition-colors uppercase text-sm font-bold">Performance</a>
          <a href="#" className="text-white hover:text-red-500 transition-colors uppercase text-sm font-bold">Science</a>
          <a href="#" className="text-white hover:text-red-500 transition-colors uppercase text-sm font-bold">Community</a>
        </nav>
        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full text-sm font-bold uppercase transition-all transform hover:scale-105">
          Shop Now
        </button>
      </div>
    </header>
  );
}
