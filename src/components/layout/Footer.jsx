// Enhanced Footer Component
import { useState, useEffect } from 'react';

function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const socialLinks = [
    {
      name: 'Facebook',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988s11.987-5.367 11.987-11.988C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.393-3.232-1.021-.195-.156-.365-.346-.499-.569-.432-.718-.432-1.636-.432-2.748V8.562c0-1.112 0-2.03.432-2.748.134-.223.304-.413.499-.569.784-.628 1.935-1.021 3.232-1.021h7.098c1.297 0 2.448.393 3.232 1.021.195.156.365.346.499.569.432.718.432 1.636.432 2.748v4.088c0 1.112 0 2.03-.432 2.748-.134.223-.304.413-.499.569-.784.628-1.935 1.021-3.232 1.021H8.449z"/>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    }
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-300">
      {/* Newsletter Section */}
      <div className="border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Stay Updated with BBS
            </h3>
            <p className="text-slate-400 mb-8">
              Get the latest updates on workspace availability, events, and special offers.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubscribed}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-75 transform hover:scale-105 transition-all duration-200"
              >
                {isSubscribed ? '✓ Subscribed!' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <span className="font-bold text-2xl text-white">Beirut Business Square</span>
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed max-w-md">
              Premium workspaces, virtual offices, and meeting rooms in the heart of Beirut. 
              Empowering businesses to thrive in a modern, collaborative environment.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-slate-800 hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200 transform hover:scale-110"
                  aria-label={`Follow us on ${social.name}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { href: '#amenities', label: 'Amenities' },
                { href: '#workspaces', label: 'Workspaces' },
                { href: '#packages', label: 'Packages' },
                { href: '#stories', label: 'Success Stories' },
                { href: '#faq', label: 'FAQ' },
                { href: '#careers', label: 'Careers' }
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <svg
                      className="w-4 h-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-white mb-6 text-lg">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 mt-0.5 text-blue-400">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-medium">Location</p>
                  <p className="text-slate-400">Downtown Beirut, Lebanon</p>
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 mt-0.5 text-blue-400">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-medium">Phone</p>
                  <a href="tel:+961123456" className="text-slate-400 hover:text-white transition-colors">
                    +961 123 456 789
                  </a>
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 mt-0.5 text-blue-400">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-medium">Email</p>
                  <a href="mailto:info@beirutbusinesssquare.com" className="text-slate-400 hover:text-white transition-colors">
                    info@beirutbusinesssquare.com
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-700/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-slate-500">
            © {new Date().getFullYear()} Beirut Business Square. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm">
            <a href="#privacy" className="text-slate-500 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="text-slate-500 hover:text-white transition-colors">Terms of Service</a>
            <a href="#cookies" className="text-slate-500 hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;