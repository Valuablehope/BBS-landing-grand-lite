// Enhanced Hero Component
import { useState, useEffect } from 'react';
import useCarousel from '../../hooks/useCarousel.js';

function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  const slides = [
    { 
      src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop',
      alt: 'Modern office workspace',
      title: 'Your Office, Ready in 30 Minutes',
      subtitle: 'Premium workspaces designed for modern businesses',
      cta: { primary: 'Get Started Today', secondary: 'Schedule Tour' }
    },
    { 
      src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1920&h=1080&fit=crop',
      alt: 'Collaborative workspace',
      title: 'Where Innovation Meets Community',
      subtitle: 'Connect, collaborate, and grow with like-minded professionals',
      cta: { primary: 'Join Our Community', secondary: 'View Workspace' }
    },
    { 
      src: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=1920&h=1080&fit=crop',
      alt: 'Meeting room',
      title: 'Flexible Solutions for Every Need',
      subtitle: 'From hot desks to private offices, we have you covered',
      cta: { primary: 'Explore Options', secondary: 'See Pricing' }
    }
  ];

  const {
    index: currentSlide,
    next,
    prev,
    goTo,
    pause,
    resume,
    isPlaying,
    onMouseEnter,
    onMouseLeave,
    onKeyDown
  } = useCarousel(slides.length, {
    interval: 6000,
    autoPlay: true,
    pauseOnHover: true,
    pauseOnFocus: true,
    onSlideChange: (newIndex, prevIndex, direction) => {
      // Add slide change analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'hero_slide_change', {
          slide_index: newIndex,
          slide_title: slides[newIndex].title,
          direction: direction
        });
      }
    }
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const headerHeight = 80;
      const targetPosition = target.offsetTop - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleCTAClick = (type, slideIndex) => {
    // Analytics tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'hero_cta_click', {
        cta_type: type,
        slide_index: slideIndex,
        slide_title: slides[slideIndex].title
      });
    }

    // Navigate based on CTA type
    const targetSection = type === 'primary' ? '#contact' : '#amenities';
    const target = document.querySelector(targetSection);
    if (target) {
      const headerHeight = 80;
      const targetPosition = target.offsetTop - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      className="relative h-screen flex items-center justify-center overflow-hidden"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={onKeyDown}
      tabIndex={0}
      role="banner"
      aria-label="Hero carousel"
    >
      {/* Background Carousel */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105'
            }`}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>
            {/* Pattern Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className={`relative z-10 text-center px-4 max-w-5xl mx-auto transition-all duration-1000 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-white text-sm font-medium mb-6">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          <span>Available Now • Premium Locations</span>
        </div>

        {/* Main Content */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          <span className="block">{slides[currentSlide].title}</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
          {slides[currentSlide].subtitle}
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button
            onClick={() => handleCTAClick('primary', currentSlide)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl flex items-center gap-2 group"
          >
            <span>{slides[currentSlide].cta.primary}</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
          
          <button
            onClick={() => handleCTAClick('secondary', currentSlide)}
            className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all duration-200 border border-white/30 hover:border-white/50 flex items-center gap-2 group"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>{slides[currentSlide].cta.secondary}</span>
          </button>
        </div>

        {/* Key Features */}
        <div className="flex flex-wrap justify-center gap-6 text-white/80 text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Ready in 30 minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>No long-term contracts</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Premium amenities included</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-2 text-white/70">
            <span className="text-xs">Scroll to explore</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-6 pointer-events-none">
        {/* Previous Button */}
        <button
          onClick={prev}
          className="w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110 pointer-events-auto focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Next Button */}
        <button
          onClick={next}
          className="w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110 pointer-events-auto focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`relative overflow-hidden transition-all duration-300 ${
              index === currentSlide 
                ? 'w-8 h-3 bg-white' 
                : 'w-3 h-3 bg-white/50 hover:bg-white/75'
            } rounded-full focus:outline-none focus:ring-2 focus:ring-white/50`}
            aria-label={`Go to slide ${index + 1}: ${slides[index].title}`}
          >
            {index === currentSlide && (
              <div 
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 origin-left"
                style={{
                  animation: `slideProgress ${6000}ms linear ${isPlaying ? 'running' : 'paused'}`
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Play/Pause Button */}
      <button
        onClick={isPlaying ? pause : resume}
        className="absolute top-6 right-6 w-10 h-10 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-200 opacity-0 hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
      >
        {isPlaying ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      <style jsx>{`
        @keyframes slideProgress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </section>
  );
}

export default Hero;