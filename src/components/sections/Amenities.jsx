// Enhanced Amenities Component
import { useState, useEffect } from 'react';
import amenities, { getAmenitiesByCategory, getFeaturedAmenities, getAmenityCategories } from '../../assets/data/amenityData.js';

function Amenities() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [visibleAmenities, setVisibleAmenities] = useState([]);
  const [showAll, setShowAll] = useState(false);

  // Get categories for filtering
  const categories = [
    { key: 'all', label: 'All Amenities', icon: '🏢', count: amenities.length },
    ...getAmenityCategories()
  ];

  // Filter amenities based on selected category
  useEffect(() => {
    let filtered = selectedCategory === 'all' 
      ? amenities 
      : getAmenitiesByCategory(selectedCategory);
    
    // Sort by priority
    filtered = filtered.sort((a, b) => a.priority - b.priority);
    
    // Show only first 8 unless "show all" is clicked
    setVisibleAmenities(showAll ? filtered : filtered.slice(0, 8));
  }, [selectedCategory, showAll]);

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

  return (
    <section id="amenities" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Premium Amenities</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to work productively and grow your business
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
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

        {/* Amenities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {visibleAmenities.map((item, index) => (
            <div
              key={item.id}
              className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer relative overflow-hidden ${
                hoveredCard === item.id ? 'scale-105' : ''
              }`}
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Featured Badge */}
              {item.featured && (
                <div className="absolute top-3 right-3">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    Featured
                  </span>
                </div>
              )}

              <div className="text-center">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="font-bold text-lg mb-3 text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {item.description}
                </p>
                
                {/* Availability Badge */}
                <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full inline-block">
                  {item.availability}
                </div>
              </div>

              {/* Hover overlay with details */}
              <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/95 to-purple-500/95 rounded-xl transition-all duration-300 flex flex-col justify-center items-center text-white p-4 ${
                hoveredCard === item.id ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}>
                <div className="text-2xl mb-2">{item.icon}</div>
                <h4 className="font-bold text-sm mb-2">{item.title}</h4>
                {item.details?.benefits && (
                  <ul className="text-xs space-y-1 text-center">
                    {item.details.benefits.slice(0, 3).map((benefit, idx) => (
                      <li key={idx}>• {benefit}</li>
                    ))}
                  </ul>
                )}
                {item.pricing && (
                  <div className="mt-2 text-xs opacity-90">
                    Starting at {typeof item.pricing === 'object' ? Object.values(item.pricing)[0] : item.pricing}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Show More/Less Button */}
        {(selectedCategory === 'all' ? amenities.length : getAmenitiesByCategory(selectedCategory).length) > 8 && (
          <div className="text-center mb-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-full font-medium hover:bg-gray-50 border border-gray-200 transition-all duration-200"
            >
              <span>{showAll ? 'Show Less' : `Show All ${selectedCategory === 'all' ? amenities.length : getAmenitiesByCategory(selectedCategory).length} Amenities`}</span>
              <svg 
                className={`w-4 h-4 transition-transform duration-200 ${showAll ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}

        {/* Featured Amenities Highlight */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Most Popular Amenities</h3>
            <p className="text-gray-600">The amenities our members love most</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {getFeaturedAmenities().slice(0, 4).map((item) => (
              <div 
                key={item.id}
                className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <h4 className="font-semibold text-sm text-gray-900">{item.title}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Ready to experience these amenities?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, '#contact')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <span>Schedule a Tour</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </a>
            
            <a
              href="#packages"
              onClick={(e) => handleSmoothScroll(e, '#packages')}
              className="inline-flex items-center gap-2 bg-white text-gray-700 px-8 py-3 rounded-full font-medium hover:bg-gray-50 border border-gray-200 transition-all duration-200"
            >
              <span>View Pricing</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Amenities;