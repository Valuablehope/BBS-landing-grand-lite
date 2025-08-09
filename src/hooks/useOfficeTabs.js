// useOfficeTabs.js - Enhanced version
import { useState, useMemo, useCallback, useEffect, useRef } from 'react';

/**
 * Enhanced office tabs hook with advanced features
 * @param {object} options - configuration options
 * @param {string} options.initialKey - initial tab key
 * @param {array} options.officeData - office data array (if not importing from file)
 * @param {boolean} options.enableKeyboardNav - enable keyboard navigation
 * @param {boolean} options.enableHistory - enable browser history integration
 * @param {boolean} options.autoAdvance - auto-advance through tabs
 * @param {number} options.autoAdvanceInterval - interval for auto-advance (ms)
 * @param {function} options.onTabChange - callback when tab changes
 * @param {boolean} options.enablePersistence - persist active tab in localStorage
 * @param {string} options.persistenceKey - key for localStorage
 * @param {object} options.filterOptions - filtering and sorting options
 * @returns {object} tabs state and control functions
 */
export default function useOfficeTabs(options = {}) {
  const {
    initialKey = null,
    officeData = null,
    enableKeyboardNav = true,
    enableHistory = false,
    autoAdvance = false,
    autoAdvanceInterval = 5000,
    onTabChange = null,
    enablePersistence = false,
    persistenceKey = 'office-tabs-active',
    filterOptions = {}
  } = options;

  // Import or use provided office data
  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load office data
  useEffect(() => {
    const loadOfficeData = async () => {
      try {
        setLoading(true);
        let data;
        
        if (officeData) {
          data = officeData;
        } else {
          // Dynamic import for office data
          const module = await import('../assets/data/officeData.js');
          data = module.default;
        }
        
        setOffices(data || []);
        setError(null);
      } catch (err) {
        console.error('Failed to load office data:', err);
        setError('Failed to load office data');
        setOffices([]);
      } finally {
        setLoading(false);
      }
    };

    loadOfficeData();
  }, [officeData]);

  // Filtering and sorting
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: Infinity },
    features: [],
    category: 'all',
    sortBy: 'price',
    sortOrder: 'asc',
    ...filterOptions
  });

  // Process and filter office data
  const processedOffices = useMemo(() => {
    if (!offices.length) return [];

    let filtered = [...offices];

    // Apply filters
    if (filters.priceRange) {
      filtered = filtered.filter(office => {
        const price = typeof office.price === 'string' 
          ? parseFloat(office.price.replace(/[^0-9.]/g, '')) || 0
          : office.price || 0;
        return price >= filters.priceRange.min && price <= filters.priceRange.max;
      });
    }

    if (filters.features && filters.features.length > 0) {
      filtered = filtered.filter(office => 
        filters.features.every(feature => 
          office.features?.some(f => f.toLowerCase().includes(feature.toLowerCase()))
        )
      );
    }

    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(office => 
        office.category?.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Sort offices
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        let aVal, bVal;

        switch (filters.sortBy) {
          case 'price':
            aVal = typeof a.price === 'string' 
              ? parseFloat(a.price.replace(/[^0-9.]/g, '')) || 0
              : a.price || 0;
            bVal = typeof b.price === 'string' 
              ? parseFloat(b.price.replace(/[^0-9.]/g, '')) || 0
              : b.price || 0;
            break;
          case 'name':
            aVal = a.name?.toLowerCase() || '';
            bVal = b.name?.toLowerCase() || '';
            break;
          case 'popularity':
            aVal = a.popularity || 0;
            bVal = b.popularity || 0;
            break;
          default:
            aVal = a[filters.sortBy] || '';
            bVal = b[filters.sortBy] || '';
        }

        if (filters.sortOrder === 'desc') {
          return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
        } else {
          return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
        }
      });
    }

    return filtered;
  }, [offices, filters]);

  // Build tab models from processed data
  const tabs = useMemo(() => 
    processedOffices.map(office => ({
      key: office.key,
      label: office.name,
      icon: office.emoji,
      category: office.category,
      featured: office.featured || false,
      badge: office.badge,
      price: office.price
    })),
    [processedOffices]
  );

  // Get initial active tab
  const getInitialTab = useCallback(() => {
    // Try persistence first
    if (enablePersistence) {
      try {
        const saved = localStorage.getItem(persistenceKey);
        if (saved && tabs.find(t => t.key === saved)) {
          return saved;
        }
      } catch (err) {
        console.warn('Failed to load persisted tab:', err);
      }
    }

    // Try URL hash
    if (enableHistory) {
      const hash = window.location.hash.slice(1);
      if (hash && tabs.find(t => t.key === hash)) {
        return hash;
      }
    }

    // Use provided initial key
    if (initialKey && tabs.find(t => t.key === initialKey)) {
      return initialKey;
    }

    // Default to first tab
    return tabs[0]?.key || null;
  }, [tabs, enablePersistence, persistenceKey, enableHistory, initialKey]);

  const [active, setActive] = useState(null);
  const [previousActive, setPreviousActive] = useState(null);
  const autoAdvanceRef = useRef(null);
  const tabsRef = useRef(null);

  // Initialize active tab when tabs are loaded
  useEffect(() => {
    if (tabs.length > 0 && !active) {
      const initial = getInitialTab();
      setActive(initial);
    }
  }, [tabs, active, getInitialTab]);

  // Get active office item
  const activeItem = useMemo(() => 
    processedOffices.find(office => office.key === active) || null,
    [processedOffices, active]
  );

  // Tab change handler with side effects
  const handleTabChange = useCallback((newKey, trigger = 'click') => {
    if (newKey === active) return;

    const previousKey = active;
    setPreviousActive(previousKey);
    setActive(newKey);

    // Persistence
    if (enablePersistence) {
      try {
        localStorage.setItem(persistenceKey, newKey);
      } catch (err) {
        console.warn('Failed to persist tab:', err);
      }
    }

    // History
    if (enableHistory) {
      const url = new URL(window.location);
      url.hash = newKey;
      window.history.pushState({ tab: newKey }, '', url);
    }

    // Callback
    if (onTabChange) {
      onTabChange(newKey, previousKey, trigger, activeItem);
    }

    // Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'tab_change', {
        tab_name: newKey,
        previous_tab: previousKey,
        trigger: trigger
      });
    }
  }, [active, enablePersistence, persistenceKey, enableHistory, onTabChange, activeItem]);

  // Set active tab
  const setActiveTab = useCallback((key) => {
    handleTabChange(key, 'programmatic');
  }, [handleTabChange]);

  // Navigation functions
  const next = useCallback(() => {
    if (!tabs.length) return;
    const currentIndex = tabs.findIndex(t => t.key === active);
    const nextIndex = (currentIndex + 1) % tabs.length;
    handleTabChange(tabs[nextIndex].key, 'next');
  }, [active, tabs, handleTabChange]);

  const prev = useCallback(() => {
    if (!tabs.length) return;
    const currentIndex = tabs.findIndex(t => t.key === active);
    const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    handleTabChange(tabs[prevIndex].key, 'prev');
  }, [active, tabs, handleTabChange]);

  const goToFirst = useCallback(() => {
    if (tabs.length > 0) {
      handleTabChange(tabs[0].key, 'first');
    }
  }, [tabs, handleTabChange]);

  const goToLast = useCallback(() => {
    if (tabs.length > 0) {
      handleTabChange(tabs[tabs.length - 1].key, 'last');
    }
  }, [tabs, handleTabChange]);

  // Auto-advance functionality
  useEffect(() => {
    if (autoAdvance && tabs.length > 1) {
      autoAdvanceRef.current = setInterval(() => {
        next();
      }, autoAdvanceInterval);

      return () => {
        if (autoAdvanceRef.current) {
          clearInterval(autoAdvanceRef.current);
        }
      };
    }
  }, [autoAdvance, autoAdvanceInterval, next, tabs.length]);

  // Pause/resume auto-advance
  const pauseAutoAdvance = useCallback(() => {
    if (autoAdvanceRef.current) {
      clearInterval(autoAdvanceRef.current);
      autoAdvanceRef.current = null;
    }
  }, []);

  const resumeAutoAdvance = useCallback(() => {
    if (autoAdvance && tabs.length > 1 && !autoAdvanceRef.current) {
      autoAdvanceRef.current = setInterval(next, autoAdvanceInterval);
    }
  }, [autoAdvance, autoAdvanceInterval, next, tabs.length]);

  // Keyboard navigation
  const handleKeyDown = useCallback((event) => {
    if (!enableKeyboardNav) return;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        prev();
        break;
      case 'ArrowRight':
        event.preventDefault();
        next();
        break;
      case 'Home':
        event.preventDefault();
        goToFirst();
        break;
      case 'End':
        event.preventDefault();
        goToLast();
        break;
      case 'Enter':
      case ' ':
        if (event.target.getAttribute('role') === 'tab') {
          event.preventDefault();
          const tabKey = event.target.getAttribute('data-tab-key');
          if (tabKey) {
            handleTabChange(tabKey, 'keyboard');
          }
        }
        break;
      default:
        break;
    }
  }, [enableKeyboardNav, prev, next, goToFirst, goToLast, handleTabChange]);

  // Filter management
  const updateFilter = useCallback((filterKey, value) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: value
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      priceRange: { min: 0, max: Infinity },
      features: [],
      category: 'all',
      sortBy: 'price',
      sortOrder: 'asc',
      ...filterOptions
    });
  }, [filterOptions]);

  // Search functionality
  const [searchTerm, setSearchTerm] = useState('');
  
  const searchOffices = useCallback((term) => {
    setSearchTerm(term);
    if (!term.trim()) return;

    const matchingOffice = processedOffices.find(office => 
      office.name?.toLowerCase().includes(term.toLowerCase()) ||
      office.features?.some(f => f.toLowerCase().includes(term.toLowerCase()))
    );

    if (matchingOffice) {
      handleTabChange(matchingOffice.key, 'search');
    }
  }, [processedOffices, handleTabChange]);

  // Browser history integration
  useEffect(() => {
    if (!enableHistory) return;

    const handlePopState = (event) => {
      const hash = window.location.hash.slice(1);
      if (hash && tabs.find(t => t.key === hash)) {
        setActive(hash);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [enableHistory, tabs]);

  // Get tab analytics
  const getAnalytics = useCallback(() => {
    const currentIndex = tabs.findIndex(t => t.key === active);
    return {
      totalTabs: tabs.length,
      currentIndex,
      activeTab: active,
      previousTab: previousActive,
      progress: tabs.length > 0 ? ((currentIndex + 1) / tabs.length) * 100 : 0,
      isFirst: currentIndex === 0,
      isLast: currentIndex === tabs.length - 1,
      filteredCount: processedOffices.length,
      totalCount: offices.length
    };
  }, [tabs, active, previousActive, processedOffices.length, offices.length]);

  return {
    // Core state
    tabs,
    active,
    activeItem,
    previousActive,
    loading,
    error,

    // Navigation
    setActive: setActiveTab,
    next,
    prev,
    goToFirst,
    goToLast,

    // Auto-advance controls
    pauseAutoAdvance,
    resumeAutoAdvance,

    // Event handlers
    handleKeyDown,

    // Filtering and search
    filters,
    updateFilter,
    resetFilters,
    searchTerm,
    searchOffices,

    // Data
    allOffices: offices,
    filteredOffices: processedOffices,

    // Utilities
    getAnalytics,
    
    // State queries
    hasNext: tabs.length > 0 && tabs.findIndex(t => t.key === active) < tabs.length - 1,
    hasPrev: tabs.length > 0 && tabs.findIndex(t => t.key === active) > 0,
    isLoading: loading,
    hasError: !!error,
    isEmpty: tabs.length === 0,

    // Legacy compatibility
    setActive: setActiveTab,

    // Helper functions
    getTabProps: (tabKey) => ({
      key: tabKey,
      role: 'tab',
      'aria-selected': active === tabKey,
      'aria-controls': `tabpanel-${tabKey}`,
      id: `tab-${tabKey}`,
      'data-tab-key': tabKey,
      tabIndex: active === tabKey ? 0 : -1,
      onClick: () => handleTabChange(tabKey, 'click'),
      onKeyDown: handleKeyDown
    }),

    getPanelProps: (tabKey) => ({
      key: tabKey,
      role: 'tabpanel',
      'aria-labelledby': `tab-${tabKey}`,
      id: `tabpanel-${tabKey}`,
      hidden: active !== tabKey,
      tabIndex: 0
    }),

    // Reference for tab container
    tabsRef
  };
}