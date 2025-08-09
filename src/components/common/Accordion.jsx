import { useState, useEffect, useRef } from 'react';

// Enhanced Accordion Component
function Accordion({ items, allowMultiple = false, className = "" }) {
  const [activeIndices, setActiveIndices] = useState(new Set());

  const toggle = (index) => {
    const newActiveIndices = new Set(activeIndices);
    
    if (newActiveIndices.has(index)) {
      newActiveIndices.delete(index);
    } else {
      if (!allowMultiple) {
        newActiveIndices.clear();
      }
      newActiveIndices.add(index);
    }
    
    setActiveIndices(newActiveIndices);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item, idx) => {
        const isActive = activeIndices.has(idx);
        return (
          <div
            key={idx}
            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <button
              className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 focus:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset transition-colors duration-150 flex justify-between items-center group"
              onClick={() => toggle(idx)}
              aria-expanded={isActive}
              aria-controls={`accordion-panel-${idx}`}
            >
              <span className="font-medium text-gray-900 pr-4">{item.question}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
                  isActive ? 'rotate-180' : ''
                } group-hover:text-gray-700`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              id={`accordion-panel-${idx}`}
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <p className="text-gray-700 leading-relaxed">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}