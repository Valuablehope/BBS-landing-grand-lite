// Enhanced Carousel Component
import { useState, useEffect, useRef } from 'react';

function Carousel({ 
  slides, 
  interval = 5000, 
  showDots = true, 
  showArrows = true,
  autoPlay = true,
  className = "" 
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  const goToPrevious = () => {
    setActiveIndex(activeIndex === 0 ? slides.length - 1 : activeIndex - 1);
  };

  const goToNext = () => {
    setActiveIndex(activeIndex === slides.length - 1 ? 0 : activeIndex + 1);
  };

  useEffect(() => {
    if (!autoPlay || isHovered) return;
    
    resetTimeout();
    timeoutRef.current = setTimeout(goToNext, interval);

    return () => resetTimeout();
  }, [activeIndex, slides.length, interval, autoPlay, isHovered]);

  return (
    <div 
      className={`relative overflow-hidden rounded-lg shadow-lg group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides Container */}
      <div className="relative h-64 md:h-96">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              idx === activeIndex 
                ? 'opacity-100 transform translate-x-0' 
                : idx < activeIndex 
                ? 'opacity-0 transform -translate-x-full'
                : 'opacity-0 transform translate-x-full'
            }`}
          >
            <img
              src={slide.src}
              alt={slide.alt || `Slide ${idx + 1}`}
              className="w-full h-full object-cover"
              loading={idx === activeIndex ? "eager" : "lazy"}
            />
            {slide.content && (
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <div className="text-white text-center px-4">
                  {slide.content}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {showArrows && slides.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Previous slide"
          >
            <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Next slide"
          >
            <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {showDots && slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 ${
                idx === activeIndex 
                  ? 'bg-white scale-110' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}