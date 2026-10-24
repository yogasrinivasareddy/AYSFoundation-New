import React, { useState } from 'react';
import { Menu, X, Heart } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  foundationName: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  foundationName,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'resources', label: 'Ashtanga Resources' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Brand Wordmark (Single text element in display face) */}
          <button
            onClick={() => handleNavClick('home')}
            className="text-left group cursor-pointer focus:outline-none"
          >
            <span className="font-serif text-2xl lg:text-3xl font-semibold tracking-tight text-stone-900 group-hover:text-amber-900 transition-colors whitespace-nowrap shrink-0 block">
              {foundationName}
            </span>
          </button>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-700">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'text-amber-900 font-semibold'
                      : 'hover:text-stone-950'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-800 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action (Single action button) */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <button
              onClick={() => handleNavClick('donations')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                currentPage === 'donations'
                  ? 'bg-amber-900 text-stone-100 shadow-sm'
                  : 'bg-stone-900 text-stone-50 hover:bg-amber-900'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>Support Our Seva</span>
            </button>
          </div>

          {/* Mobile menu hamburger toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('donations')}
              className="p-2 text-stone-800 hover:text-amber-900"
              aria-label="Donations"
            >
              <Heart className="w-5 h-5 text-amber-800 fill-amber-800" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-stone-950 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-[#F7F4EE] px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3 py-2.5 text-base font-medium rounded-md transition-colors ${
                currentPage === item.id
                  ? 'bg-amber-900/10 text-amber-900 font-semibold'
                  : 'text-stone-700 hover:bg-stone-200/50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2">
            <button
              onClick={() => handleNavClick('donations')}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-amber-900 rounded-md hover:bg-amber-950 transition-colors"
            >
              <Heart className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>Donate / Support Our Seva</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
