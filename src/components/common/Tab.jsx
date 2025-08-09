// Enhanced Tab Component
import { useState, useEffect, useRef } from 'react';

function Tab({ tabs, variant = "default", className = "" }) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.key || null);

  const variantStyles = {
    default: {
      container: "border-b border-gray-200",
      tab: "px-6 py-3 font-medium text-sm transition-colors duration-150 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700",
      activeTab: "border-blue-500 text-blue-600",
      content: "py-6"
    },
    pills: {
      container: "bg-gray-100 p-1 rounded-lg",
      tab: "px-4 py-2 text-sm font-medium rounded-md transition-all duration-150 hover:bg-gray-200",
      activeTab: "bg-white shadow-sm text-gray-900",
      content: "py-6"
    },
    minimal: {
      container: "",
      tab: "px-4 py-2 text-sm font-medium transition-colors duration-150 hover:text-gray-900",
      activeTab: "text-blue-600 bg-blue-50 rounded-md",
      content: "py-4"
    }
  };

  const styles = variantStyles[variant];

  return (
    <div className={className}>
      {/* Tab Navigation */}
      <div className={`flex gap-1 overflow-x-auto scrollbar-hide ${styles.container}`}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`flex items-center gap-2 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              styles.tab
            } ${
              activeTab === tab.key ? styles.activeTab : 'text-gray-500'
            }`}
            onClick={() => setActiveTab(tab.key)}
            role="tab"
            aria-selected={activeTab === tab.key}
            aria-controls={`tabpanel-${tab.key}`}
          >
            {tab.icon && (
              <span className="text-lg" aria-hidden="true">
                {tab.icon}
              </span>
            )}
            <span>{tab.label}</span>
            {tab.badge && (
              <span className="bg-gray-500 text-white text-xs px-2 py-0.5 rounded-full ml-1">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className={styles.content}>
        {tabs.map((tab) => (
          <div
            key={tab.key}
            id={`tabpanel-${tab.key}`}
            className={`${
              activeTab === tab.key ? 'block' : 'hidden'
            } focus:outline-none`}
            role="tabpanel"
            tabIndex={0}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}