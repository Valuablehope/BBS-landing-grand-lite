// Enhanced Contact Component
import { useState } from 'react';
import useContactForm from '../../hooks/useContactForm.js';

function Contact() {
  const {
    values,
    errors,
    touched,
    isValid,
    submitting,
    submitted,
    submitError,
    setField,
    handleFieldBlur,
    handleSubmit,
    reset,
    clearSuccess,
    getFieldError,
    isFieldValid,
    getFieldProps,
    subjectOptions,
    formRef
  } = useContactForm(
    {}, // initial values
    {
      enableRealTimeValidation: true,
      successTimeout: 5000,
      onSuccess: (result, formData) => {
        console.log('Form submitted successfully:', result);
        // Add analytics tracking here
        if (typeof gtag !== 'undefined') {
          gtag('event', 'form_submit', {
            form_name: 'contact',
            value: 1
          });
        }
      },
      onError: (error, formData) => {
        console.error('Form submission error:', error);
      }
    }
  );

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Custom submission logic (replace with your API call)
    const customSubmit = async (formData) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate success/failure
      if (Math.random() > 0.1) { // 90% success rate for demo
        return { success: true, message: 'Thank you for your message!' };
      } else {
        throw new Error('Something went wrong. Please try again.');
      }
    };

    await handleSubmit(customSubmit);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to transform your work experience? Let's discuss how we can help your business thrive.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Enhanced Contact Form */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h3>
            
            <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <div className="relative">
                    <input
                      {...getFieldProps('firstName')}
                      className={`w-full px-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                        getFieldError('firstName') 
                          ? 'border-red-500 ring-2 ring-red-200' 
                          : isFieldValid('firstName')
                          ? 'border-green-500 ring-2 ring-green-200'
                          : 'border-gray-300'
                      }`}
                      placeholder="Enter your first name"
                    />
                    {isFieldValid('firstName') && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  {getFieldError('firstName') && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {getFieldError('firstName')}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <div className="relative">
                    <input
                      {...getFieldProps('lastName')}
                      className={`w-full px-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                        getFieldError('lastName') 
                          ? 'border-red-500 ring-2 ring-red-200' 
                          : isFieldValid('lastName')
                          ? 'border-green-500 ring-2 ring-green-200'
                          : 'border-gray-300'
                      }`}
                      placeholder="Enter your last name"
                    />
                    {isFieldValid('lastName') && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  {getFieldError('lastName') && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {getFieldError('lastName')}
                    </p>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <input
                    {...getFieldProps('email')}
                    className={`w-full px-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                      getFieldError('email') 
                        ? 'border-red-500 ring-2 ring-red-200' 
                        : isFieldValid('email')
                        ? 'border-green-500 ring-2 ring-green-200'
                        : 'border-gray-300'
                    }`}
                    placeholder="Enter your email address"
                  />
                  {isFieldValid('email') && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                {getFieldError('email') && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {getFieldError('email')}
                  </p>
                )}
              </div>

              {/* Phone Field (Optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-gray-400">(Optional)</span>
                </label>
                <input
                  {...getFieldProps('phone')}
                  className={`w-full px-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                    getFieldError('phone') ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your phone number"
                />
                {getFieldError('phone') && (
                  <p className="text-red-500 text-sm mt-1">{getFieldError('phone')}</p>
                )}
              </div>

              {/* Subject Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <select
                  {...getFieldProps('subject')}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                >
                  {subjectOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <div className="relative">
                  <textarea
                    {...getFieldProps('message')}
                    rows="5"
                    className={`w-full px-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 resize-none ${
                      getFieldError('message') 
                        ? 'border-red-500 ring-2 ring-red-200' 
                        : isFieldValid('message')
                        ? 'border-green-500 ring-2 ring-green-200'
                        : 'border-gray-300'
                    }`}
                    placeholder="Tell us how we can help you..."
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                    {values.message.length}/1000
                  </div>
                </div>
                {getFieldError('message') && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {getFieldError('message')}
                  </p>
                )}
              </div>

              {/* Newsletter Checkbox */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="newsletter"
                  checked={values.newsletter}
                  onChange={(e) => setField('newsletter', e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor="newsletter" className="text-sm text-gray-600">
                  Subscribe to our newsletter for workspace tips and updates
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting || !isValid}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-75 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {submitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending Message...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span>Send Message</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </div>
                )}
              </button>

              {/* Error Message */}
              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">{submitError}</span>
                  </div>
                </div>
              )}

              {/* Success Message */}
              {submitted && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">Thanks! We'll get back to you shortly.</span>
                    </div>
                    <button
                      onClick={clearSuccess}
                      className="text-green-600 hover:text-green-800"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Map */}
            <div className="bg-gray-100 rounded-2xl overflow-hidden h-64 relative group">
              <iframe
                title="BBS Location"
                src="https://maps.google.com/maps?q=beirut&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="grayscale hover:grayscale-0 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 pointer-events-none"></div>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200 group">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform duration-200">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Our Location</h4>
                  <p className="text-gray-600">Downtown Beirut, Lebanon</p>
                  <p className="text-sm text-gray-500">Easy access to business district</p>
                  <p className="text-sm text-blue-600 mt-1">Walking distance to major transport hubs</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200 group">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform duration-200">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Phone Number</h4>
                  <a 
                    href="tel:+961123456" 
                    className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
                  >
                    +961 123 456 789
                  </a>
                  <p className="text-sm text-gray-500">Mon-Fri 9AM-6PM</p>
                  <p className="text-sm text-blue-600 mt-1">Same-day response guaranteed</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200 group">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform duration-200">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Email Address</h4>
                  <a 
                    href="mailto:info@beirutbusinesssquare.com" 
                    className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
                  >
                    info@beirutbusinesssquare.com
                  </a>
                  <p className="text-sm text-gray-500">We respond within 24 hours</p>
                  <p className="text-sm text-blue-600 mt-1">Professional support team</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200 group">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform duration-200">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Business Hours</h4>
                  <p className="text-gray-600">Monday - Sunday</p>
                  <p className="text-gray-600">9:00 AM - 6:00 PM</p>
                  <p className="text-sm text-blue-600 mt-1">24/7 access for office members</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Prefer to visit us?</h4>
              <div className="space-y-3">
                <a
                  href="tel:+961123456789"
                  className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
                >
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 group-hover:text-green-600 transition-colors">Call us now</span>
                    <p className="text-sm text-gray-600">Speak directly with our team</p>
                  </div>
                </a>

                <button
                  onClick={() => {
                    setField('subject', 'Tour Request');
                    setField('message', 'I would like to schedule a tour of your facilities. Please let me know your available times.');
                    document.querySelector('#contact form input[name="firstName"]')?.focus();
                  }}
                  className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors duration-200 group w-full text-left"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">Schedule a tour</span>
                    <p className="text-sm text-gray-600">See our facilities in person</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;