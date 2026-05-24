"use client"
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from '@/lib/supabaseClient';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [brandName, setBrandName] = useState('KodingMulu');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    const fetchBranding = async () => {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('app_name')
          .single();
        if (data && !error) setBrandName(data.app_name || 'KodingMulu');
      } catch (error) {
        console.error("Gagal memuat nama website:", error);
      }
    };
    fetchBranding();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Beranda', href: '#home' },
    { label: 'Tentang', href: '#tentang' },
    { label: 'Layanan', href: '#services' },
    { label: 'Harga', href: '#pricing' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Kontak', href: '#contact' },
  ];

  return (
    <nav
      className={`
        fixed z-[999] left-0 right-0 mx-auto
        transition-all duration-500 ease-in-out
        flex items-center justify-center
        ${isScrolled
          ? 'top-0 w-full rounded-none py-4 bg-white/80 backdrop-blur-2xl border-b border-white/60 shadow-[0_2px_20px_rgba(249,115,22,0.08)]'
          : 'top-4 w-[94%] max-w-7xl rounded-[22px] py-3 glass shadow-[0_8px_32px_rgba(249,115,22,0.12)]'
        }
      `}
    >
      <div className="w-full max-w-6xl px-5 flex justify-between items-center">
        {/* Brand */}
        <div className="flex items-center gap-1 cursor-pointer group">
          <span className="text-xl font-extrabold tracking-tight text-gray-800 group-hover:text-orange-600 transition-colors duration-200">
            {brandName}
          </span>
          <span className="text-xl font-extrabold text-orange-500">.</span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-sm font-semibold text-gray-600 hover:text-orange-500 transition-colors duration-200 relative group cursor-pointer"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-gradient-to-r from-orange-500 to-amber-400 rounded-full transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            className="hidden md:flex btn-tahoe-primary items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm cursor-pointer"
          >
            Mulai Proyek <ArrowRight size={15} />
          </a>

          <button
            className="md:hidden w-9 h-9 glass rounded-xl flex items-center justify-center text-gray-600 hover:text-orange-600 transition-colors cursor-pointer"
            onClick={toggleMenu}
            type="button"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 mt-3 mx-auto w-[94%] max-w-7xl p-5 glass-strong rounded-[20px] shadow-[0_20px_60px_rgba(249,115,22,0.15)] md:hidden animate-fadeIn z-[1000]">
          <div className="flex flex-col gap-1">
            {navLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-gray-700 font-semibold hover:text-orange-500 px-3 py-3 rounded-xl hover:bg-orange-50/60 transition-all cursor-pointer"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-3 pt-3 border-t border-orange-100">
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                className="btn-tahoe-primary w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm cursor-pointer"
              >
                Mulai Proyek <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}