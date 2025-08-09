// Enhanced Mobile Navigation Component
import { useState, useEffect } from 'react';

function Navigation({ navItems, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const handleLinkClick = (e, href) => {
    setMenuOpen(false);
    onNavigate(e, href);
  };

  return (
    <div className="lg:hidden">
      {/* Hamburger Button */}
      <button
        className="relative w-10 h-10 rounded-lg bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 flex flex-col justify-center space-y-1">
            <span
              className={`block h-0.5 bg-slate-700 transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}
            />
            <span
              className={`block h-0.5 bg-slate-700 transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-0.5 bg-slate-700 transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}
            />
          </div>
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="fixed top-20 right-4 left-4 bg-white rounded-2xl shadow-2xl z-50 border border-gray-100 overflow-hidden">
            <div className="py-6">
              {navItems.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className="flex items-center justify-between px-6 py-4 text-slate-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-150 group"
                  style={{
                    animationDelay: `${index * 50}ms`
                  }}
                >
                  <span className="font-medium">{item.label}</span>
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-all duration-150"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              ))}
              
              {/* Mobile CTA */}
              <div className="px-6 pt-4 border-t border-gray-100 mt-4">
                <a
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, '#contact')}
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  <span>Get Started</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}