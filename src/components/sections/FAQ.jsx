// Enhanced FAQ Component
import { useState } from 'react';
import useFAQ from '../../hooks/useFAQ.js';
import faqs, { 
  getFAQsByCategory, 
  getFeaturedFAQs, 
  searchFAQs, 
  getRelatedFAQs, 
  getFAQCategories 
} from '../../assets/data/faqData.js';

function FAQ() {
  const {
    openItems,
    isOpen,
    toggle,
    searchTerm,
    updateSearch,
    clearSearch,
    getItemProps,
    getPanelProps,
    openAll,
    closeAll
  } = useFAQ({
    allowMultiple: true,
    maxOpen: 5,
    persistence: 'session',
    persistenceKey: 'bbs-faq-state'
  });

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('priority');

  // Get categories for filtering
  const categories = [
    { key: 'all', label: 'All Questions', icon: '❓', count: faqs.length },
    ...getFAQCategories()
  ];

  // Filter and search FAQs
  const getFilteredFAQs = () => {
    let filtered = searchTerm 
      ? searchFAQs(searchTerm)
      : selectedCategory === 'all' 
        ? faqs 
        : getFAQsByCategory(selectedCategory);

    // Sort FAQs
    switch (sortBy) {
      case 'priority':
        return filtered.sort((a, b) => a.priority - b.priority);
      case 'featured':
        return filtered.sort((a, b) => b.featured - a.featured);
      case 'alphabetical':
        return filtered.sort((a, b) => a.question.localeCompare(b.question));
      default:
        return filtered;
    }
  };

  const filteredFaqs = getFilteredFAQs();
  const featuredFaqs = getFeaturedFAQs();

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
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Got questions? We've got answers to help you get started with your workspace journey.
          </p>
        </div>

        {/* Search and Controls */}
        <div className="max-w-4xl mx-auto mb-12">
          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchTerm}
              onChange={(e) => updateSearch(e.target.value, faqs)}
              className="block w-full pl-10 pr-12 py-4 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-200"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>

          {/* Controls Row */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="priority">Priority</option>
                <option value="featured">Featured First</option>
                <option value="alphabetical">A-Z</option>
              </select>
            </div>

            {/* Bulk Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={openAll}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Expand All
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={closeAll}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Collapse All
              </button>
            </div>
          </div>
        </div>

        {/* Category Filters */}
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

        {/* Search Results Info */}
        {searchTerm && (
          <div className="text-center mb-8">
            <p className="text-gray-600">
              Found <span className="font-semibold">{filteredFaqs.length}</span> results for 
              "<span className="font-semibold">{searchTerm}</span>"
            </p>
          </div>
        )}

        {/* FAQ Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((item, idx) => {
              const isActive = isOpen(idx);
              return (
                <div
                  key={item.id || idx}
                  className={`bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group ${
                    item.featured ? 'ring-2 ring-blue-100' : ''
                  }`}
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {/* Featured Badge */}
                  {item.featured && (
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-3 py-1 text-center font-medium">
                      Featured Question
                    </div>
                  )}

                  <button
                    {...getItemProps(idx)}
                    className="w-full px-6 py-5 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset transition-colors duration-150 flex justify-between items-start group"
                  >
                    <span className="font-semibold text-gray-900 pr-4 group-hover:text-blue-600 transition-colors duration-150 leading-relaxed">
                      {item.question}
                    </span>
                    <div className="flex-shrink-0 ml-2 flex items-center gap-2">
                      {/* Category Badge */}
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {item.category.replace('-', ' ')}
                      </span>
                      {/* Expand Icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className={`w-5 h-5 text-gray-500 transition-all duration-300 ${
                          isActive ? 'rotate-180 text-blue-600' : 'group-hover:text-blue-600'
                        }`}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  
                  <div
                    {...getPanelProps(idx)}
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-100">
                      <div className="text-gray-700 leading-relaxed mb-4">
                        {typeof item.answer === 'string' ? (
                          <p>{item.answer}</p>
                        ) : (
                          <div>
                            <p className="mb-3">{item.answer}</p>
                            {item.detailedAnswer && (
                              <div className="mt-4 space-y-2">
                                {Object.entries(item.detailedAnswer).map(([key, value]) => (
                                  <div key={key} className="text-sm">
                                    <span className="font-medium text-gray-800 capitalize">
                                      {key.replace(/([A-Z])/g, ' $1').trim()}:
                                    </span>
                                    {Array.isArray(value) ? (
                                      <ul className="mt-1 ml-4 list-disc text-gray-600">
                                        {value.map((item, i) => (
                                          <li key={i}>{item}</li>
                                        ))}
                                      </ul>
                                    ) : (
                                      <span className="text-gray-600 ml-1">{value}</span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      
                      {/* Related Questions */}
                      {item.relatedQuestions && item.relatedQuestions.length > 0 && (
                        <div className="pt-3 border-t border-gray-200">
                          <p className="text-xs text-gray-500 mb-2">Related questions:</p>
                          <div className="flex flex-wrap gap-1">
                            {getRelatedFAQs(item.id).slice(0, 3).map((related) => (
                              <button
                                key={related.id}
                                onClick={() => {
                                  const relatedIndex = faqs.findIndex(f => f.id === related.id);
                                  if (relatedIndex !== -1) toggle(relatedIndex);
                                }}
                                className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                              >
                                {related.question.length > 30 
                                  ? `${related.question.substring(0, 30)}...` 
                                  : related.question
                                }
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47.881-6.08 2.33a1.5 1.5 0 002.08 2.17M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No questions found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search terms or browse different categories.</p>
              <button
                onClick={() => {
                  clearSearch();
                  setSelectedCategory('all');
                }}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                View all questions
              </button>
            </div>
          )}
        </div>

        {/* Popular Questions Section */}
        {!searchTerm && (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Most Popular Questions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredFaqs.slice(0, 6).map((faq, index) => (
                <button
                  key={faq.id}
                  onClick={() => {
                    setSelectedCategory('all');
                    clearSearch();
                    const faqIndex = faqs.findIndex(f => f.id === faq.id);
                    if (faqIndex !== -1) toggle(faqIndex);
                  }}
                  className="text-left p-4 bg-gray-50 rounded-lg hover:bg-blue-50 hover:border-blue-200 border border-gray-200 transition-all duration-200 group"
                >
                  <h4 className="font-medium text-gray-900 group-hover:text-blue-600 text-sm leading-relaxed mb-1">
                    {faq.question}
                  </h4>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {faq.category.replace('-', ' ')}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Contact CTA */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center border border-blue-200">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Still have questions?</h3>
            <p className="text-gray-600 mb-6">Our team is here to help you find the perfect workspace solution.</p>
            <a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, '#contact')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <span>Contact Our Team</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>

          {/* Schedule Tour CTA */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 text-center border border-purple-200">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">See it for yourself</h3>
            <p className="text-gray-600 mb-6">Schedule a tour to experience our workspace and amenities firsthand.</p>
            <a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, '#contact')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-medium hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <span>Schedule a Tour</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;