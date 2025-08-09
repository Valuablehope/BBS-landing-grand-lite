// Enhanced Pricing Component
import { useState } from 'react';
import pricing, { 
  getFeaturedPlans, 
  getPopularPlans, 
  calculateSavings, 
  getTotalCost,
  comparePlans 
} from '../../assets/data/pricingData.js';

function Pricing() {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedAddOns, setSelectedAddOns] = useState({});
  const [showComparison, setShowComparison] = useState(false);

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

  const getDisplayPrice = (plan) => {
    if (plan.priceText) return plan.priceText;
    
    const savings = calculateSavings(plan, billingCycle);
    if (savings) {
      return `$${savings.monthlyPrice}`;
    }
    
    return `$${plan.price}`;
  };

  const getOriginalPrice = (plan) => {
    if (plan.priceText) return null;
    
    const savings = calculateSavings(plan, billingCycle);
    if (savings && savings.percentageSavings > 0) {
      return `$${savings.originalPrice}`;
    }
    
    return null;
  };

  const getSavingsText = (plan) => {
    const savings = calculateSavings(plan, billingCycle);
    if (savings && savings.percentageSavings > 0) {
      return `Save ${savings.percentageSavings}%`;
    }
    return null;
  };

  const toggleAddOn = (planKey, addOnName) => {
    setSelectedAddOns(prev => ({
      ...prev,
      [planKey]: {
        ...prev[planKey],
        [addOnName]: !prev[planKey]?.[addOnName]
      }
    }));
  };

  const handleCTAClick = (plan, action) => {
    // Analytics tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'pricing_cta_click', {
        plan_name: plan.name,
        plan_price: plan.price || 'custom',
        billing_cycle: billingCycle,
        action_type: action
      });
    }

    // Navigate to contact with pre-filled information
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      
      // You could trigger form pre-fill here
      setTimeout(() => {
        const subjectField = document.querySelector('select[name="subject"]');
        const messageField = document.querySelector('textarea[name="message"]');
        
        if (subjectField) {
          subjectField.value = plan.key === 'dedicated-office' ? 'Pricing Information' : 'General Inquiry';
        }
        
        if (messageField) {
          messageField.value = `I'm interested in the ${plan.name} plan. Please provide more information about pricing and availability.`;
        }
      }, 500);
    }
  };

  return (
    <section id="packages" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your business. No hidden fees, no surprises.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-gray-200 rounded-lg p-1 relative">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-200 relative z-10 ${
                billingCycle === 'monthly'
                  ? 'text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annually')}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-200 relative z-10 ${
                billingCycle === 'annually'
                  ? 'text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Annual
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
            
            {/* Sliding background */}
            <div 
              className={`absolute top-1 bottom-1 bg-white rounded-md shadow-sm transition-all duration-200 ${
                billingCycle === 'monthly' ? 'left-1 right-1/2' : 'left-1/2 right-1'
              }`}
            />
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {pricing.map((plan, index) => {
            const isPopular = plan.popular || plan.featured;
            const originalPrice = getOriginalPrice(plan);
            const savingsText = getSavingsText(plan);
            
            return (
              <div
                key={plan.key}
                className={`relative bg-white rounded-2xl transition-all duration-300 group ${
                  isPopular 
                    ? 'border-2 border-blue-500 scale-105 shadow-xl' 
                    : 'border border-gray-200 hover:border-blue-300 shadow-lg'
                } ${
                  hoveredCard === plan.key ? 'transform scale-110 shadow-2xl' : ''
                }`}
                onMouseEnter={() => setHoveredCard(plan.key)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  animationDelay: `${index * 150}ms`
                }}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      {plan.popular ? 'Most Popular' : 'Featured'}
                    </span>
                  </div>
                )}

                <div className="p-8">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {plan.emoji}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{plan.blurb}</p>
                    
                    {/* Price Display */}
                    <div className="mb-4">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-4xl font-bold text-gray-900">
                          {getDisplayPrice(plan)}
                        </span>
                        {plan.price && (
                          <span className="text-gray-600">/{plan.priceUnit}</span>
                        )}
                      </div>
                      
                      {/* Original Price & Savings */}
                      {originalPrice && (
                        <div className="flex items-center justify-center gap-2 mt-1">
                          <span className="text-sm text-gray-500 line-through">
                            {originalPrice}/{plan.priceUnit}
                          </span>
                          {savingsText && (
                            <span className="text-sm text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
                              {savingsText}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600">{plan.tagline}</p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Add-ons (if hovering) */}
                  {hoveredCard === plan.key && plan.addOns && (
                    <div className="mb-6 p-3 bg-gray-50 rounded-lg">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Available Add-ons:</h4>
                      <div className="space-y-2">
                        {plan.addOns.slice(0, 3).map((addOn, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs">
                            <span className="text-gray-600">{addOn.name}</span>
                            <span className="font-medium text-gray-900">${addOn.price}/{addOn.unit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA Button */}
                  <button
                    onClick={() => handleCTAClick(plan, plan.cta.action)}
                    className={`block w-full text-center py-4 rounded-lg font-semibold transition-all duration-200 ${
                      plan.cta.tone === 'primary'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    } transform hover:scale-105`}
                  >
                    {plan.cta.label}
                  </button>

                  {/* Upgrade Path */}
                  {plan.upgradePath && (
                    <p className="text-xs text-center text-gray-500 mt-3">
                      {plan.upgradePath.discount}
                    </p>
                  )}
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Comparison Toggle */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <span>{showComparison ? 'Hide' : 'Show'} detailed comparison</span>
            <svg 
              className={`w-4 h-4 transition-transform duration-200 ${showComparison ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Detailed Comparison Table */}
        {showComparison && (
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-12 overflow-x-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Feature Comparison</h3>
            
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Features</th>
                  {pricing.map((plan) => (
                    <th key={plan.key} className="text-center py-3 px-4 min-w-[150px]">
                      <div className="flex flex-col items-center">
                        <span className="text-2xl mb-1">{plan.emoji}</span>
                        <span className="font-semibold text-gray-900 text-sm">{plan.name}</span>
                        <span className="text-blue-600 font-bold">{getDisplayPrice(plan)}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Compare key features */}
                {[
                  'Access Type',
                  'Setup Time', 
                  'Internet',
                  'Meeting Rooms',
                  'Support Level',
                  'Commitment'
                ].map((feature, idx) => (
                  <tr key={feature} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="py-3 px-4 font-medium text-gray-900">{feature}</td>
                    {pricing.map((plan) => (
                      <td key={plan.key} className="text-center py-3 px-4 text-sm text-gray-600">
                        {/* Map features to plan data */}
                        {feature === 'Access Type' && (plan.included?.access || 'Business hours')}
                        {feature === 'Setup Time' && (plan.key === 'virtual-office' ? '30 minutes' : 'Same day')}
                        {feature === 'Internet' && (plan.included?.internet || 'High-speed WiFi')}
                        {feature === 'Meeting Rooms' && (plan.limits?.meetingRoomHours || 'Available')}
                        {feature === 'Support Level' && (plan.included?.support || 'Standard')}
                        {feature === 'Commitment' && (plan.key === 'dedicated-office' ? 'Flexible' : 'Month-to-month')}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Pricing Questions</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">💰 Are there any hidden fees?</h4>
              <p className="text-gray-600 text-sm">No hidden fees! All pricing is transparent. VAT will be added according to Lebanese regulations.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">🔄 Can I change plans?</h4>
              <p className="text-gray-600 text-sm">Yes, you can upgrade or downgrade your plan at any time. We'll prorate the charges accordingly.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">📅 What about long-term discounts?</h4>
              <p className="text-gray-600 text-sm">Annual billing saves you 20%. We also offer custom rates for enterprise clients.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">❌ What's the cancellation policy?</h4>
              <p className="text-gray-600 text-sm">30 days written notice for most plans. No cancellation fees for standard memberships.</p>
            </div>
          </div>
        </div>

        {/* Custom Solutions CTA */}
        <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Something Different?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We offer custom packages for teams and enterprises. Whether you need multiple offices, 
            special arrangements, or enterprise-level support, we can create a solution that fits your needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, '#contact')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>Talk to our sales team</span>
            </a>
            
            <button
              onClick={() => {
                // Pre-fill contact form for custom quote
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                  
                  setTimeout(() => {
                    const subjectField = document.querySelector('select[name="subject"]');
                    const messageField = document.querySelector('textarea[name="message"]');
                    
                    if (subjectField) subjectField.value = 'Custom Quote Request';
                    if (messageField) {
                      messageField.value = 'I need a custom workspace solution for my team. Please contact me to discuss requirements and pricing.';
                    }
                  }, 500);
                }
              }}
              className="inline-flex items-center gap-2 bg-white text-gray-700 px-8 py-3 rounded-full font-medium hover:bg-gray-50 border border-gray-200 transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47.881-6.08 2.33a1.5 1.5 0 002.08 2.17M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Request Custom Quote</span>
            </button>
          </div>

          {/* Trust Signals */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500">
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
              <span>Flexible contracts</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>30-day guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>All-inclusive pricing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pricing;