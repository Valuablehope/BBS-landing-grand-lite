import React, { useEffect, useState } from 'react'

// Enhanced Layout Components
import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'

// Enhanced Section Components
import Hero from './components/sections/Hero.jsx'
import Amenities from './components/sections/Amenities.jsx'
import OfficeOptions from './components/sections/OfficeOptions.jsx'
import Pricing from './components/sections/Pricing.jsx'
import Testimonials from './components/sections/Testimonials.jsx'
import FAQ from './components/sections/FAQ.jsx'
import Contact from './components/sections/Contact.jsx'

// Enhanced Styles
import './styles/tailwind.css'
import './styles/index.css'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentSection, setCurrentSection] = useState('')

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Intersection Observer for tracking current section
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -80% 0px',
      threshold: 0
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentSection(entry.target.id)
        }
      })
    }, observerOptions)

    // Observe all sections
    const sections = document.querySelectorAll('section[id]')
    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [isLoading])

  useEffect(() => {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth'
    
    // Add scroll padding for fixed header
    document.documentElement.style.scrollPaddingTop = '80px'

    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
      document.documentElement.style.scrollPaddingTop = '0'
    }
  }, [])

  // Loading Screen Component
  const LoadingScreen = () => (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          {/* Logo Animation */}
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto animate-pulse-slow">
            <span className="text-white font-bold text-2xl">B</span>
          </div>
          
          {/* Loading Spinner */}
          <div className="absolute -inset-4 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
        
        {/* Loading Text */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Beirut Business Square</h2>
        <p className="text-gray-600 animate-pulse">Loading your workspace experience...</p>
        
        {/* Progress Bar */}
        <div className="mt-6 w-64 mx-auto bg-gray-200 rounded-full h-1 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  )

  // Error Boundary Component
  const ErrorFallback = ({ error, resetError }) => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h2>
        <p className="text-gray-600 mb-6">We're sorry, but something unexpected happened. Please try refreshing the page.</p>
        <div className="space-y-3">
          <button
            onClick={resetError}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-all duration-200"
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  )

  // Skip to Content Link for accessibility
  const SkipToContent = () => (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium z-50 transition-all duration-200"
    >
      Skip to main content
    </a>
  )

  // Scroll to Top Button
  const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
      const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      }

      window.addEventListener('scroll', toggleVisibility)
      return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }

    if (!isVisible) return null

    return (
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-200 z-40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Scroll to top"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    )
  }

  // Show loading screen
  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Accessibility */}
      <SkipToContent />
      
      {/* Enhanced Header with current section tracking */}
      <Header currentSection={currentSection} />
      
      {/* Main Content */}
      <main id="main-content" className="relative">
        {/* Hero Section - Full viewport height */}
        <Hero />
        
        {/* Content Sections with enhanced spacing */}
        <div className="relative">
          <Amenities />
          <OfficeOptions />
          <Pricing />
          <Testimonials />
          <FAQ />
          <Contact />
        </div>
      </main>
      
      {/* Enhanced Footer */}
      <Footer />
      
      {/* Utility Components */}
      <ScrollToTop />
      
      {/* Performance Monitoring */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 bg-black text-white px-3 py-1 rounded text-xs font-mono z-50">
          Current: {currentSection || 'none'}
        </div>
      )}
    </div>
  )
}