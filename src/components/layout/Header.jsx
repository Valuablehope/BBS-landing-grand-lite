import { useState, useEffect } from 'react';

// Enhanced Mobile Navigation Component
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

// Enhanced Header Component with Fixed Section Detection
function Header({ currentSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Manual section detection based on scroll position
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100; // Offset for header height
      
      let currentSectionId = '';
      
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionBottom = sectionTop + sectionHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          currentSectionId = section.id;
        }
      });
      
      // Fallback: if we're at the very top, no section is active
      // if we're at the very bottom, the last section is active
      if (window.scrollY < 100) {
        currentSectionId = '';
      } else if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
        const lastSection = sections[sections.length - 1];
        if (lastSection) {
          currentSectionId = lastSection.id;
        }
      }
      
      if (currentSectionId !== activeSection) {
        setActiveSection(currentSectionId);
      }
    };

    // Enhanced Intersection Observer as backup
    const observerOptions = {
      rootMargin: '-10% 0px -70% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1]
    };

    const observer = new IntersectionObserver((entries) => {
      // Find the entry with the highest intersection ratio
      const visibleEntries = entries.filter(entry => entry.isIntersecting);
      
      if (visibleEntries.length > 0) {
        const mostVisible = visibleEntries.reduce((prev, current) => {
          return prev.intersectionRatio > current.intersectionRatio ? prev : current;
        });
        
        setActiveSection(mostVisible.target.id);
      }
    }, observerOptions);

    // Observe sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    // Initial scroll handler call
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [activeSection]);

  // Use prop if provided, otherwise use internal state
  const currentActiveSection = currentSection || activeSection;

  const navItems = [
    { href: '#amenities', label: 'Amenities' },
    { href: '#workspaces', label: 'Workspaces' },
    { href: '#packages', label: 'Packages' },
    { href: '#stories', label: 'Stories' },
    { href: '#faq', label: 'FAQ' },
    { href: '#contact', label: 'Contact' }
  ];

  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const headerHeight = 80;
      const targetPosition = target.offsetTop - headerHeight;
      
      // Temporarily set the active section for immediate feedback
      setActiveSection(href.slice(1));
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
            : 'bg-white shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
          {/* Logo */}
          <a 
            href="/" 
            className="flex items-center gap-3 group transition-transform duration-200 hover:scale-105"
            onClick={(e) => {
              e.preventDefault();
              setActiveSection('');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-200">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-200 blur"></div>
            </div>
            <span className="font-bold text-xl text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
              BBS
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const sectionId = item.href.slice(1);
              const isActive = currentActiveSection === sectionId;
              
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-slate-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Call-to-Action & Mobile Navigation */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, '#contact')}
              className="hidden md:inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-full font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <span>Get Started</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            
            {/* Mobile Navigation */}
            <Navigation navItems={navItems} onNavigate={handleSmoothScroll} />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;