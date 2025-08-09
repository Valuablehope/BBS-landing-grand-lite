// useFAQ.js - Enhanced version
import { useCallback, useState, useMemo, useEffect } from 'react';

/**
 * Enhanced FAQ accordion hook with advanced features
 * @param {object} options - configuration options
 * @param {number|number[]} options.defaultOpen - default open item(s)
 * @param {boolean} options.allowMultiple - allow multiple items open simultaneously
 * @param {boolean} options.closeOthersOnOpen - close other items when opening one (only if allowMultiple is false)
 * @param {string} options.persistence - 'none', 'session', or 'local' for state persistence
 * @param {string} options.persistenceKey - key for localStorage/sessionStorage
 * @param {function} options.onToggle - callback when item is toggled
 * @param {function} options.onOpen - callback when item is opened
 * @param {function} options.onClose - callback when item is closed
 * @param {number} options.maxOpen - maximum number of items that can be open (only with allowMultiple)
 * @returns {object} FAQ control functions and state
 */
export default function useFAQ(options = {}) {
  const {
    defaultOpen = null,
    allowMultiple = false,
    closeOthersOnOpen = true,
    persistence = 'none',
    persistenceKey = 'faq-state',
    onToggle = null,
    onOpen = null,
    onClose = null,
    maxOpen = Infinity
  } = options;

  // Initialize state with persistence support
  const getInitialState = useCallback(() => {
    // Try to restore from persistence
    if (persistence !== 'none') {
      try {
        const storage = persistence === 'local' ? localStorage : sessionStorage;
        const saved = storage.getItem(persistenceKey);
        if (saved) {
          const parsed = JSON.parse(saved);
          return allowMultiple ? new Set(parsed) : parsed;
        }
      } catch (error) {
        console.warn('Failed to restore FAQ state from storage:', error);
      }
    }

    // Use default open values
    if (defaultOpen === null) {
      return allowMultiple ? new Set() : null;
    }

    if (Array.isArray(defaultOpen)) {
      return allowMultiple ? new Set(defaultOpen) : defaultOpen[0] ?? null;
    }

    return allowMultiple ? new Set([defaultOpen]) : defaultOpen;
  }, [defaultOpen, allowMultiple, persistence, persistenceKey]);

  const [openState, setOpenState] = useState(getInitialState);

  // Persist state changes
  useEffect(() => {
    if (persistence !== 'none') {
      try {
        const storage = persistence === 'local' ? localStorage : sessionStorage;
        const stateToSave = allowMultiple ? Array.from(openState) : openState;
        storage.setItem(persistenceKey, JSON.stringify(stateToSave));
      } catch (error) {
        console.warn('Failed to persist FAQ state:', error);
      }
    }
  }, [openState, persistence, persistenceKey, allowMultiple]);

  // Get currently open items
  const openItems = useMemo(() => {
    if (allowMultiple) {
      return Array.from(openState);
    }
    return openState !== null ? [openState] : [];
  }, [openState, allowMultiple]);

  // Check if an item is open
  const isOpen = useCallback((index) => {
    if (allowMultiple) {
      return openState.has(index);
    }
    return openState === index;
  }, [openState, allowMultiple]);

  // Open a specific item
  const open = useCallback((index) => {
    setOpenState((current) => {
      if (allowMultiple) {
        const newSet = new Set(current);
        
        // Check max open limit
        if (newSet.size >= maxOpen && !newSet.has(index)) {
          return current; // Don't open if at max capacity
        }
        
        newSet.add(index);
        
        // Call callbacks
        if (onOpen) onOpen(index);
        if (onToggle) onToggle(index, true);
        
        return newSet;
      } else {
        if (current === index) return current; // Already open
        
        // Call callbacks
        if (current !== null && onClose) onClose(current);
        if (onOpen) onOpen(index);
        if (onToggle) onToggle(index, true);
        
        return index;
      }
    });
  }, [allowMultiple, maxOpen, onOpen, onClose, onToggle]);

  // Close a specific item
  const close = useCallback((index) => {
    setOpenState((current) => {
      if (allowMultiple) {
        const newSet = new Set(current);
        if (newSet.has(index)) {
          newSet.delete(index);
          
          // Call callbacks
          if (onClose) onClose(index);
          if (onToggle) onToggle(index, false);
        }
        return newSet;
      } else {
        if (current === index) {
          // Call callbacks
          if (onClose) onClose(index);
          if (onToggle) onToggle(index, false);
          return null;
        }
        return current;
      }
    });
  }, [allowMultiple, onClose, onToggle]);

  // Toggle a specific item
  const toggle = useCallback((index) => {
    if (isOpen(index)) {
      close(index);
    } else {
      open(index);
    }
  }, [isOpen, open, close]);

  // Close all items
  const closeAll = useCallback(() => {
    setOpenState((current) => {
      const currentOpen = allowMultiple ? Array.from(current) : (current !== null ? [current] : []);
      
      // Call close callbacks for all open items
      currentOpen.forEach((index) => {
        if (onClose) onClose(index);
        if (onToggle) onToggle(index, false);
      });
      
      return allowMultiple ? new Set() : null;
    });
  }, [allowMultiple, onClose, onToggle]);

  // Open all items (only available with allowMultiple)
  const openAll = useCallback((maxItems = Infinity) => {
    if (!allowMultiple) {
      console.warn('openAll is only available when allowMultiple is true');
      return;
    }

    setOpenState((current) => {
      // Create array of indices to open (assuming sequential indices starting from 0)
      const totalItems = Math.min(maxItems, maxOpen);
      const indicesToOpen = Array.from({ length: totalItems }, (_, i) => i);
      
      const newSet = new Set(indicesToOpen);
      
      // Call callbacks for newly opened items
      indicesToOpen.forEach((index) => {
        if (!current.has(index)) {
          if (onOpen) onOpen(index);
          if (onToggle) onToggle(index, true);
        }
      });
      
      return newSet;
    });
  }, [allowMultiple, maxOpen, onOpen, onToggle]);

  // Get next available index to open
  const getNextToOpen = useCallback((currentIndex, direction = 'down') => {
    const openArray = openItems;
    if (openArray.length === 0) return null;
    
    if (direction === 'down') {
      return Math.min(...openArray.filter(i => i > currentIndex));
    } else {
      return Math.max(...openArray.filter(i => i < currentIndex));
    }
  }, [openItems]);

  // Keyboard navigation support
  const handleKeyDown = useCallback((event, currentIndex, totalItems) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        const nextIndex = (currentIndex + 1) % totalItems;
        // Focus next item (implementation depends on your component structure)
        break;
        
      case 'ArrowUp':
        event.preventDefault();
        const prevIndex = (currentIndex - 1 + totalItems) % totalItems;
        // Focus previous item (implementation depends on your component structure)
        break;
        
      case 'Home':
        event.preventDefault();
        // Focus first item
        break;
        
      case 'End':
        event.preventDefault();
        // Focus last item
        break;
        
      case 'Enter':
      case ' ':
        event.preventDefault();
        toggle(currentIndex);
        break;
        
      default:
        break;
    }
  }, [toggle]);

  // Search functionality
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  // Filter items based on search term
  const filterItems = useCallback((items, term) => {
    if (!term.trim()) return items;
    
    return items.filter((item, index) => {
      const question = item.question?.toLowerCase() || '';
      const answer = item.answer?.toLowerCase() || '';
      const searchLower = term.toLowerCase();
      
      return question.includes(searchLower) || answer.includes(searchLower);
    });
  }, []);

  // Update filtered items when search term changes
  const updateSearch = useCallback((term, items = []) => {
    setSearchTerm(term);
    const filtered = filterItems(items, term);
    setFilteredItems(filtered);
    
    // Auto-open relevant items when searching
    if (term.trim() && filtered.length > 0 && allowMultiple) {
      const relevantIndices = filtered.map((_, index) => index);
      setOpenState(new Set(relevantIndices.slice(0, Math.min(3, maxOpen))));
    }
  }, [filterItems, allowMultiple, maxOpen]);

  // Clear search
  const clearSearch = useCallback(() => {
    setSearchTerm('');
    setFilteredItems([]);
  }, []);

  // Analytics and tracking
  const [analytics, setAnalytics] = useState({
    totalToggles: 0,
    mostOpenedItem: null,
    openCount: {},
    sessionStartTime: Date.now()
  });

  // Track item interactions
  const trackInteraction = useCallback((index, action) => {
    setAnalytics((prev) => {
      const newOpenCount = { ...prev.openCount };
      if (action === 'open') {
        newOpenCount[index] = (newOpenCount[index] || 0) + 1;
      }

      // Find most opened item
      const mostOpened = Object.keys(newOpenCount).reduce((a, b) => 
        newOpenCount[a] > newOpenCount[b] ? a : b
      );

      return {
        ...prev,
        totalToggles: prev.totalToggles + 1,
        mostOpenedItem: mostOpened ? parseInt(mostOpened) : null,
        openCount: newOpenCount
      };
    });
  }, []);

  // Enhanced toggle with analytics
  const toggleWithAnalytics = useCallback((index) => {
    const wasOpen = isOpen(index);
    toggle(index);
    trackInteraction(index, wasOpen ? 'close' : 'open');
  }, [isOpen, toggle, trackInteraction]);

  // Bulk operations
  const bulkOpen = useCallback((indices) => {
    if (!allowMultiple) {
      console.warn('Bulk operations require allowMultiple to be true');
      return;
    }

    setOpenState((current) => {
      const newSet = new Set(current);
      indices.forEach((index) => {
        if (newSet.size < maxOpen) {
          newSet.add(index);
          if (onOpen) onOpen(index);
          if (onToggle) onToggle(index, true);
        }
      });
      return newSet;
    });
  }, [allowMultiple, maxOpen, onOpen, onToggle]);

  const bulkClose = useCallback((indices) => {
    setOpenState((current) => {
      if (allowMultiple) {
        const newSet = new Set(current);
        indices.forEach((index) => {
          if (newSet.has(index)) {
            newSet.delete(index);
            if (onClose) onClose(index);
            if (onToggle) onToggle(index, false);
          }
        });
        return newSet;
      } else {
        if (indices.includes(current)) {
          if (onClose) onClose(current);
          if (onToggle) onToggle(current, false);
          return null;
        }
        return current;
      }
    });
  }, [allowMultiple, onClose, onToggle]);

  // Reset to initial state
  const reset = useCallback(() => {
    const initialState = getInitialState();
    setOpenState(initialState);
    setSearchTerm('');
    setFilteredItems([]);
    setAnalytics({
      totalToggles: 0,
      mostOpenedItem: null,
      openCount: {},
      sessionStartTime: Date.now()
    });
  }, [getInitialState]);

  // Get FAQ statistics
  const getStats = useCallback(() => {
    const sessionDuration = Date.now() - analytics.sessionStartTime;
    const totalOpened = Object.keys(analytics.openCount).length;
    const averageOpens = totalOpened > 0 
      ? Object.values(analytics.openCount).reduce((a, b) => a + b, 0) / totalOpened 
      : 0;

    return {
      sessionDuration,
      totalToggles: analytics.totalToggles,
      totalUniqueOpened: totalOpened,
      averageOpensPerItem: averageOpens,
      mostOpenedItem: analytics.mostOpenedItem,
      currentlyOpen: openItems.length,
      openCount: analytics.openCount
    };
  }, [analytics, openItems]);

  return {
    // Core state
    openItems,
    isOpen,
    
    // Core actions
    open,
    close,
    toggle: toggleWithAnalytics,
    closeAll,
    openAll,
    
    // Bulk operations
    bulkOpen,
    bulkClose,
    
    // Search functionality
    searchTerm,
    filteredItems,
    updateSearch,
    clearSearch,
    filterItems,
    
    // Navigation
    getNextToOpen,
    handleKeyDown,
    
    // Utilities
    reset,
    getStats,
    analytics,
    
    // State queries
    hasOpenItems: openItems.length > 0,
    openCount: openItems.length,
    canOpenMore: allowMultiple && openItems.length < maxOpen,
    isMaxOpen: allowMultiple && openItems.length >= maxOpen,
    
    // Configuration
    allowMultiple,
    maxOpen,
    
    // Legacy compatibility (deprecated - use toggleWithAnalytics instead)
    openIndex: allowMultiple ? null : openState,
    
    // Helper for getting item props
    getItemProps: (index) => ({
      'aria-expanded': isOpen(index),
      'aria-controls': `faq-panel-${index}`,
      id: `faq-button-${index}`,
      onClick: () => toggleWithAnalytics(index),
      onKeyDown: (e) => handleKeyDown(e, index, 10), // Adjust total items as needed
    }),
    
    // Helper for getting panel props
    getPanelProps: (index) => ({
      'aria-labelledby': `faq-button-${index}`,
      id: `faq-panel-${index}`,
      hidden: !isOpen(index),
      role: 'region',
    })
  };
}