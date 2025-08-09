// Enhanced Testimonials Component
import { useState } from 'react';
import useCarousel from '../../hooks/useCarousel.js';
import testimonials, { 
  getFeaturedTestimonials, 
  getTestimonialsByPackage, 
  getTestimonialsByCategory,
  getTestimonialCategories 
} from '../../assets/data/testimonialsData.js';

function Testimonials() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPackage, setSelectedPackage] = useState('all');

  // Filter testimonials based on selected criteria
  const getFilteredTestimonials = () => {
    let filtered = testimonials;

    if (selectedCategory !== 'all') {
      filtered = getTestimonialsByCategory(selectedCategory);
    }

    if (selectedPackage !== 'all') {
      filtered = filtered.filter(t => 
        t.package.toLowerCase().includes(selectedPackage.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredTestimonials = getFilteredTestimonials();

  const {
    index: currentIndex,
    next,
    prev,
    goTo,
    isPlaying,
    pause,
    resume,
    onMouseEnter,
    onMouseLeave
  } = useCarousel(filteredTestimonials.length, {
    interval: 8000,
    autoPlay: true,
    pauseOnHover: true,
    onSlideChange: (newIndex, prevIndex, direction) => {
      // Analytics tracking
      if (typeof gtag !== 'undefined') {
        gtag('event', 'testimonial_view', {
          testimonial_name: filteredTestimonials[newIndex]?.name,
          testimonial_company: filteredTestimonials[newIndex]?.company,
          direction: direction
        });
      }
    }
  });

  const currentTestimonial = filteredTestimonials[currentIndex];

  // Get categories for filtering
  const categories = [
    { key: 'all', label: 'All Stories', icon: '⭐', count: testimonials.length },
    ...getTestimonialCategories()
  ];

  const packages = [
    { key: 'all', label: 'All Plans' },
    { key: 'hot-desk', label: 'Hot Desk' },
    { key: 'virtual-office', label: 'Virtual Office' },
    { key: 'dedicated-office', label: 'Dedicated Office' }
  ];

  if (!currentTestimonial) {
    return (
      <section id="stories" className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">No testimonials available for the selected filters.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="stories" className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Member Success Stories</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover how our community members have transformed their businesses and achieved remarkable success
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12 space-y-6">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category.key
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 shadow-sm border border-gray-200'
                }`}
              >
                <span className="text-sm">{category.icon}</span>
                <span className="text-sm">{category.label}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  selectedCategory === category.key 
                    ? 'bg-white/20 text-white' 
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          {/* Package Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {packages.map((pkg) => (
              <button
                key={pkg.key}
                onClick={() => setSelectedPackage(pkg.key)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedPackage === pkg.key
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {pkg.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Testimonial Display */}
        <div 
          className="relative max-w-5xl mx-auto"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left Side - Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                {/* Quote Icon */}
                <div className="flex justify-center lg:justify-start mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                    </svg>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-8 italic text-center lg:text-left">
                  "{currentTestimonial.quote}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center gap-4 mb-8">
                  <img
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.name}
                    className="w-16 h-16 rounded-full ring-4 ring-blue-100 object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{currentTestimonial.name}</h3>
                    <p className="text-gray-600">{currentTestimonial.role}</p>
                    <p className="text-sm text-gray-500">{currentTestimonial.company}</p>
                  </div>
                </div>

                {/* Package Badge */}
                <div className="flex justify-center lg:justify-start">
                  <span className="inline-block px-4 py-2 bg-blue-50 text-blue-800 rounded-full text-sm font-medium">
                    {currentTestimonial.package}
                  </span>
                </div>
              </div>

              {/* Right Side - Metrics & Details */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 lg:p-12 text-white flex flex-col justify-center">
                {/* Highlight Metric */}
                <div className="text-center mb-8">
                  <div className="text-5xl lg:text-6xl font-bold mb-2">
                    {currentTestimonial.highlight.value}
                  </div>
                  <div className="text-xl opacity-90">
                    {currentTestimonial.highlight.label}
                  </div>
                  {currentTestimonial.highlight.description && (
                    <p className="text-sm opacity-75 mt-2">
                      {currentTestimonial.highlight.description}
                    </p>
                  )}
                </div>

                {/* Additional Metrics */}
                {currentTestimonial.metrics && (
                  <div className="grid grid-cols-1 gap-4">
                    {currentTestimonial.metrics.slice(0, 3).map((metric, idx) => (
                      <div key={idx} className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                        <div className="text-2xl font-bold">{metric.value}</div>
                        <div className="text-sm opacity-75">{metric.label}</div>
                        {metric.period && (
                          <div className="text-xs opacity-60">{metric.period}</div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Member Since */}
                <div className="text-center mt-6 text-sm opacity-75">
                  Member since {new Date(currentTestimonial.memberSince).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-gray-600 hover:text-blue-600 transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={next}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-gray-600 hover:text-blue-600 transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={isPlaying ? pause : resume}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
          >
            {isPlaying ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-8 gap-3">
          {filteredTestimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 h-3 bg-blue-600 rounded-full'
                  : 'w-3 h-3 bg-gray-300 hover:bg-gray-400 rounded-full'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Additional Testimonials Grid */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">More Success Stories</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTestimonials.filter((_, idx) => idx !== currentIndex).slice(0, 6).map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group cursor-pointer"
                onClick={() => {
                  const testimonialIndex = filteredTestimonials.findIndex(t => t.id === testimonial.id);
                  if (testimonialIndex !== -1) goTo(testimonialIndex);
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                  "{testimonial.quote.length > 120 ? `${testimonial.quote.substring(0, 120)}...` : testimonial.quote}"
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {testimonial.package}
                  </span>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">
                      {testimonial.highlight.value}
                    </div>
                    <div className="text-xs text-gray-500">
                      {testimonial.highlight.label}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Write Your Success Story?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join our community of successful entrepreneurs, freelancers, and growing businesses. 
            Your success story could be featured here next!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <span>Start Your Journey</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            
            <a
              href="#workspaces"
              className="inline-flex items-center gap-2 bg-white text-gray-700 px-8 py-3 rounded-full font-medium hover:bg-gray-50 border border-gray-200 transition-all duration-200"
            >
              <span>Explore Options</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;