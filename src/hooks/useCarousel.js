// useCarousel.js - Enhanced version
import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Enhanced carousel hook with advanced features
 * @param {number} length - number of slides
 * @param {object} opts - configuration options
 * @param {number} opts.interval - auto-advance interval in ms (default: 5000)
 * @param {boolean} opts.loop - whether to loop from last to first (default: true)
 * @param {boolean} opts.pauseOnHover - pause auto-advance on hover (default: true)
 * @param {boolean} opts.pauseOnFocus - pause auto-advance when focused (default: true)
 * @param {boolean} opts.autoPlay - enable auto-advance (default: true)
 * @param {string} opts.direction - 'forward' or 'backward' (default: 'forward')
 * @param {function} opts.onSlideChange - callback when slide changes
 * @returns {object} carousel controls and state
 */
export default function useCarousel(length, opts = {}) {
  const {
    interval = 5000,
    loop = true,
    pauseOnHover = true,
    pauseOnFocus = true,
    autoPlay = true,
    direction = 'forward',
    onSlideChange = null
  } = opts;

  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  
  const timerRef = useRef(null);
  const pausedRef = useRef(false);
  const visibilityRef = useRef(true);
  const lastUserInteractionRef = useRef(0);

  // Clear any existing timer
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Navigate to next slide
  const next = useCallback(() => {
    setIndex((prevIndex) => {
      const last = length - 1;
      const newIndex = prevIndex >= last ? (loop ? 0 : last) : prevIndex + 1;
      
      // Call onChange callback if provided
      if (onSlideChange && newIndex !== prevIndex) {
        onSlideChange(newIndex, prevIndex, 'next');
      }
      
      return newIndex;
    });
    lastUserInteractionRef.current = Date.now();
  }, [length, loop, onSlideChange]);

  // Navigate to previous slide
  const prev = useCallback(() => {
    setIndex((prevIndex) => {
      const newIndex = prevIndex <= 0 ? (loop ? length - 1 : 0) : prevIndex - 1;
      
      // Call onChange callback if provided
      if (onSlideChange && newIndex !== prevIndex) {
        onSlideChange(newIndex, prevIndex, 'prev');
      }
      
      return newIndex;
    });
    lastUserInteractionRef.current = Date.now();
  }, [length, loop, onSlideChange]);

  // Go to specific slide
  const goTo = useCallback((targetIndex) => {
    if (!Number.isFinite(targetIndex)) return;
    
    setIndex((prevIndex) => {
      const newIndex = Math.max(0, Math.min(length - 1, targetIndex));
      
      // Call onChange callback if provided
      if (onSlideChange && newIndex !== prevIndex) {
        const direction = newIndex > prevIndex ? 'next' : 'prev';
        onSlideChange(newIndex, prevIndex, direction);
      }
      
      return newIndex;
    });
    lastUserInteractionRef.current = Date.now();
  }, [length, onSlideChange]);

  // Auto-advance logic
  const advance = useCallback(() => {
    if (direction === 'backward') {
      prev();
    } else {
      next();
    }
  }, [direction, next, prev]);

  // Pause controls
  const pause = useCallback(() => {
    setIsPaused(true);
    pausedRef.current = true;
  }, []);

  const resume = useCallback(() => {
    setIsPaused(false);
    pausedRef.current = false;
  }, []);

  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      setIsPlaying(false);
      pause();
    } else {
      setIsPlaying(true);
      resume();
    }
  }, [isPlaying, pause, resume]);

  // Mouse event handlers
  const onMouseEnter = useCallback(() => {
    if (pauseOnHover) {
      pause();
    }
  }, [pauseOnHover, pause]);

  const onMouseLeave = useCallback(() => {
    if (pauseOnHover && isPlaying) {
      resume();
    }
  }, [pauseOnHover, isPlaying, resume]);

  // Focus event handlers
  const onFocus = useCallback(() => {
    if (pauseOnFocus) {
      pause();
    }
  }, [pauseOnFocus, pause]);

  const onBlur = useCallback(() => {
    if (pauseOnFocus && isPlaying) {
      resume();
    }
  }, [pauseOnFocus, isPlaying, resume]);

  // Keyboard navigation
  const onKeyDown = useCallback((event) => {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        prev();
        break;
      case 'ArrowRight':
        event.preventDefault();
        next();
        break;
      case ' ':
        event.preventDefault();
        togglePlayPause();
        break;
      case 'Home':
        event.preventDefault();
        goTo(0);
        break;
      case 'End':
        event.preventDefault();
        goTo(length - 1);
        break;
      default:
        break;
    }
  }, [prev, next, togglePlayPause, goTo, length]);

  // Visibility API support
  useEffect(() => {
    const handleVisibilityChange = () => {
      const visible = !document.hidden;
      setIsVisible(visible);
      visibilityRef.current = visible;
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Auto-advance timer
  useEffect(() => {
    clearTimer();
    
    if (length <= 1 || !isPlaying || !isVisible) {
      return;
    }

    const shouldAdvance = !pausedRef.current && visibilityRef.current;
    
    if (shouldAdvance) {
      timerRef.current = setTimeout(() => {
        // Only advance if no recent user interaction
        const timeSinceLastInteraction = Date.now() - lastUserInteractionRef.current;
        if (timeSinceLastInteraction > 1000) { // 1 second buffer
          advance();
        }
      }, interval);
    }

    return clearTimer;
  }, [index, length, interval, isPlaying, isVisible, advance, clearTimer]);

  // Cleanup on unmount
  useEffect(() => {
    return clearTimer;
  }, [clearTimer]);

  // Touch/swipe support
  const touchStartRef = useRef(null);
  const touchEndRef = useRef(null);

  const onTouchStart = useCallback((event) => {
    touchStartRef.current = event.touches[0].clientX;
  }, []);

  const onTouchMove = useCallback((event) => {
    touchEndRef.current = event.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStartRef.current || !touchEndRef.current) return;

    const distance = touchStartRef.current - touchEndRef.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      next();
    } else if (isRightSwipe) {
      prev();
    }

    touchStartRef.current = null;
    touchEndRef.current = null;
  }, [next, prev]);

  // Reset to first slide when length changes
  useEffect(() => {
    if (index >= length) {
      setIndex(0);
    }
  }, [length, index]);

  return {
    // State
    index,
    isPlaying,
    isPaused,
    isVisible,
    length,
    
    // Navigation
    next,
    prev,
    goTo,
    advance,
    
    // Playback controls
    play: () => setIsPlaying(true),
    pause,
    resume,
    togglePlayPause,
    
    // Event handlers
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    onKeyDown,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    
    // Utilities
    isFirst: index === 0,
    isLast: index === length - 1,
    progress: length > 0 ? ((index + 1) / length) * 100 : 0,
    
    // Direct state setters (use with caution)
    setIndex,
    setIsPlaying
  };
}