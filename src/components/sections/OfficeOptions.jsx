// Enhanced Office Options Component
import { useState, useEffect } from 'react';
import useOfficeTabs from '../../hooks/useOfficeTabs.js';
import offices, { getOfficesByCategory, getOfficeCategories } from '../../assets/data/officeData.js';

function OfficeOptions() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const {
    tabs,
    active,
    setActive,
    activeItem,
    filteredOffices,
    filters,
    updateFilter,
    searchOffices,
    searchTerm,
    isLoading,
    hasError
  } = useOfficeTabs({
    officeData: offices,
    enableKeyboardNav: true,
    enableHistory: false,
    enablePersistence: true,
    persistenceKey: 'bbs-office-selection'
  });

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [sortBy, setSortBy] = useState('popularity');

  // Get categories for filtering
  const categories = [
    { key: 'all', label: 'All Spaces', icon: '🏢', count: offices.length },
    ...getOfficeCategories()
  ];

  // Filter offices based on selected criteria
  const getFilteredOffices = () => {
    let filtered = selectedCategory === 'all' 
      ? offices 
      : getOfficesByCategory(selectedCategory);

    // Apply price filter
    filtered = filtered.filter(office => {
      if (!office.priceValue) return true; // Include custom pricing
      return office.priceValue >= priceRange.min && office.priceValue <= priceRange.max;
    });

    // Sort offices
    switch (sortBy) {
      case 'price-low':
        return filtered.sort((a, b) => (a.priceValue || 9999) - (b.priceValue || 9999));
      case 'price-high':
        return filtered.sort((a, b) => (b.priceValue || 0) - (a.priceValue || 0));
      case 'popularity':
        return filtered.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
      case 'featured':
        return filtered.sort((a, b) => b.featured - a.featured);
      default:
        return filtered;
    }
  };

  const displayedOffices = getFilteredOffices();

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

  if (isLoading) {
    return (
      <section id="workspaces" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading workspace options...</p>
          </div>
        </div>
      </section>
    );
  }

  if (hasError) {
    return (
      <section id="workspaces" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-600">Error loading workspace options. Please try again.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="workspaces" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Workspace</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Flexible workspace solutions designed to scale with your business needs
          </p>
        </div>

        {/* Filters and Controls */}
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
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 border border-gray-200'
                }`}
              >
                <span className="text-sm">{category.icon}</span>
                <span className="text-sm">{category.label}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  selectedCategory === category.key 
                    ? 'bg-white/20 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          {/* Advanced Filters */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Price Range */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Price range:</label>
              <select
                value={`${priceRange.min}-${priceRange.max}`}
                onChange={(e) => {
                  const [min, max] = e.target.value.split('-').map(Number);
                  setPriceRange({ min, max });
                }}
                className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="0-10000">All prices</option>
                <option value="0-200">Under $200</option>
                <option value="200-500">$200 - $500</option>
                <option value="500-1000">$500 - $1000</option>
                <option value="1000-10000">$1000+</option>
              </select>
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="popularity">Most Popular</option>
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mb-8">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{displayedOffices.length}</span> workspace option{displayedOffices.length !== 1 ? 's' : ''}
            {selectedCategory !== 'all' && (
              <span> in <span className="font-semibold">{categories.find(c => c.key === selectedCategory)?.label}</span></span>
            )}
          </p>
        </div>

        {/* Office Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedOffices.map((office, index) => (
            <div
              key={office.key}
              className={`relative bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-blue-200 transition-all duration-300 group ${
                hoveredCard === office.key ? 'transform scale-105 shadow-2xl' : 'hover:shadow-xl'
              }`}
              onMouseEnter={() => setHoveredCard(office.key)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                animationDelay: `${index * 150}ms`
              }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={office.image}
                  alt={office.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {office.featured && (
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Featured
                    </span>
                  )}
                  {office.badge && (
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      office.badge.tone === 'blue' ? 'bg-blue-100 text-blue-800' :
                      office.badge.tone === 'purple' ? 'bg-purple-100 text-purple-800' :
                      office.badge.tone === 'amber' ? 'bg-amber-100 text-amber-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {office.badge.text}
                    </span>
                  )}
                </div>
                {/* Popularity Indicator */}
                {office.popularity && office.popularity > 90 && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-900 flex items-center gap-1">
                      <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>Hot</span>
                    </div>
                  </div>
                )}
                {/* Price Display */}
                <div className="absolute bottom-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg font-bold text-gray-900">
                    {office.price}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Header */}
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {office.emoji}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{office.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {office.shortDescription || office.description}
                  </p>
                </div>

                {/* Key Features */}
                <div className="space-y-2 mb-6">
                  {office.features.slice(0, 4).map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Metrics */}
                {office.metrics && (
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {office.metrics.map((metric, idx) => (
                      <div key={idx} className="text-center p-2 bg-gray-50 rounded-lg">
                        <div className="text-sm font-bold text-gray-900">{metric.value}</div>
                        <div className="text-xs text-gray-600">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA Button */}
                <a
                  href={office.cta.href}
                  onClick={(e) => handleSmoothScroll(e, office.cta.href)}
                  className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {office.cta.label}
                </a>
              </div>

              {/* Hover overlay with additional info */}
              <div className={`absolute inset-0 bg-gradient-to-br from-blue-600/95 to-purple-600/95 flex flex-col justify-center items-center text-white p-6 transition-all duration-300 ${
                hoveredCard === office.key ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}>
                <div className="text-3xl mb-3">{office.emoji}</div>
                <h4 className="font-bold text-lg mb-2">{office.name}</h4>
                <p className="text-center text-sm mb-4 opacity-90">
                  {office.tagline}
                </p>
                
                {/* Ideal for */}
                {office.idealFor && (
                  <div className="text-center">
                    <p className="text-xs font-semibold mb-2 opacity-75">Perfect for:</p>
                    <div className="flex flex-wrap justify-center gap-1">
                      {office.idealFor.slice(0, 3).map((ideal, idx) => (
                        <span key={idx} className="text-xs bg-white/20 px-2 py-1 rounded-full">
                          {ideal}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick action */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSmoothScroll(e, '#contact');
                  }}
                  className="mt-4 bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {displayedOffices.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No workspaces found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters or browse all options.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setPriceRange({ min: 0, max: 10000 });
                setSortBy('popularity');
              }}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* Comparison Tool */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 mb-12">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Compare Workspaces</h3>
            <p className="text-gray-600">See how our different options stack up</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Feature</th>
                  {offices.map((office) => (
                    <th key={office.key} className="text-center py-3 px-4">
                      <div className="flex flex-col items-center">
                        <span className="text-2xl mb-1">{office.emoji}</span>
                        <span className="font-semibold text-gray-900 text-sm">{office.name}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium text-gray-900">Monthly Price</td>
                  {offices.map((office) => (
                    <td key={office.key} className="text-center py-3 px-4 font-semibold text-blue-600">
                      {office.price}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium text-gray-900">Access Hours</td>
                  {offices.map((office) => (
                    <td key={office.key} className="text-center py-3 px-4 text-sm text-gray-600">
                      {office.specifications?.accessHours || 'Business hours'}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium text-gray-900">Setup Time</td>
                  {offices.map((office) => (
                    <td key={office.key} className="text-center py-3 px-4 text-sm text-gray-600">
                      {office.specifications?.setup || office.metrics?.find(m => m.label.includes('time'))?.value || 'Same day'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-900">Best For</td>
                  {offices.map((office) => (
                    <td key={office.key} className="text-center py-3 px-4 text-xs text-gray-600">
                      {office.idealFor?.[0] || 'All businesses'}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Help Choosing?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our workspace specialists can help you find the perfect solution for your team. 
              Get personalized recommendations based on your specific needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, '#contact')}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Talk to Specialist</span>
              </a>
              
              <button
                onClick={() => {
                  // Pre-fill contact form for tour request
                  const contactSection = document.querySelector('#contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                    // You could also trigger a form pre-fill here
                  }
                }}
                className="inline-flex items-center gap-2 bg-white text-gray-700 px-8 py-3 rounded-full font-medium hover:bg-gray-50 border border-gray-200 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Schedule Tour</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No setup fees</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Flexible terms</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Ready in 30 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OfficeOptions;