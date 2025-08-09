// pricingData.js - Enhanced version
// Comprehensive pricing data with detailed plans and features

const pricing = [
  {
    key: "hot-desk",
    emoji: "🔥",
    name: "Hot Desk",
    category: "flexible",
    price: 180,
    priceUnit: "month",
    currency: "USD",
    featured: true,
    popular: true,
    savings: null,
    
    tagline: "Perfect for freelancers and remote workers",
    blurb: "Flexible workspace access with all essential amenities included",
    description: "Ideal for professionals who need a productive workspace without the commitment of a dedicated office. Access our full range of amenities and community.",
    
    billingOptions: [
      {
        period: "monthly",
        price: 180,
        savings: 0,
        description: "Pay monthly, cancel anytime"
      },
      {
        period: "quarterly", 
        price: 162, // 10% discount
        originalPrice: 180,
        savings: 10,
        description: "Save 10% with quarterly billing"
      },
      {
        period: "annually",
        price: 144, // 20% discount 
        originalPrice: 180,
        savings: 20,
        description: "Save 20% with annual billing"
      }
    ],
    
    features: [
      "Business hours access (7 days/week)",
      "High-speed Wi-Fi & unlimited beverages", 
      "Community access & networking events",
      "Member rates on meeting rooms",
      "Professional printing & scanning services",
      "Ergonomic seating and adjustable desks",
      "Access to phone booths",
      "Daily locker access"
    ],
    
    included: {
      internet: "1Gbps fiber internet",
      beverages: "Premium coffee, tea, and snacks",
      printing: "100 pages per month included",
      access: "9 AM - 6 PM, 7 days a week",
      support: "Basic IT and administrative support",
      events: "Access to networking events"
    },
    
    limits: {
      guestPasses: "5 per month",
      meetingRoomHours: "4 hours per month at member rates",
      printingPages: "100 pages per month",
      lockerAccess: "Daily use only"
    },
    
    addOns: [
      {
        name: "Extra Guest Passes",
        price: 15,
        unit: "per day",
        description: "Additional day passes for guests"
      },
      {
        name: "Additional Printing",
        price: 0.10,
        unit: "per page",
        description: "Beyond 100 pages per month"
      },
      {
        name: "Locker Rental",
        price: 25,
        unit: "per month", 
        description: "Personal secure storage locker"
      },
      {
        name: "Extended Hours",
        price: 50,
        unit: "per month",
        description: "24/7 access upgrade"
      }
    ],
    
    upgradePath: {
      to: "dedicated-office",
      discount: "50% off setup fee when upgrading"
    },
    
    testimonial: {
      quote: "The hot desk membership gave me everything I needed to grow my freelance business.",
      author: "Rami Al-Khoury",
      role: "SaaS Founder",
      avatar: "https://i.pravatar.cc/96?img=12"
    },
    
    cta: { 
      label: "Choose Hot Desk", 
      href: "#contact", 
      tone: "primary",
      action: "start_trial"
    }
  },
  
  {
    key: "virtual-office",
    emoji: "☁️", 
    name: "Virtual Office",
    category: "remote",
    price: 35,
    priceUnit: "month",
    currency: "USD",
    featured: false,
    popular: false,
    savings: null,
    
    tagline: "Professional presence without the office",
    blurb: "Business address and support services for remote operations",
    description: "Perfect for businesses that need a professional Lebanese presence without physical office space. Includes business address, mail handling, and phone services.",
    
    plans: [
      {
        name: "Basic",
        price: 35,
        description: "Essential virtual office services",
        features: [
          "Premium Beirut business address",
          "Mail receiving and basic forwarding",
          "Business registration support",
          "Online member portal access"
        ]
      },
      {
        name: "Professional", 
        price: 65,
        description: "Enhanced business support",
        features: [
          "Everything in Basic plan",
          "Professional phone answering service",
          "Call forwarding and voicemail",
          "2 hours meeting room access/month",
          "Administrative support"
        ]
      },
      {
        name: "Executive",
        price: 95,
        description: "Full virtual office suite",
        features: [
          "Everything in Professional plan", 
          "Dedicated receptionist service",
          "Priority mail handling",
          "4 hours meeting room access/month",
          "Custom business support services"
        ]
      }
    ],
    
    billingOptions: [
      {
        period: "monthly",
        price: 35,
        savings: 0,
        description: "Monthly billing"
      },
      {
        period: "annually",
        price: 30, // ~14% discount
        originalPrice: 35,
        savings: 14,
        description: "Save 14% with annual billing"
      }
    ],
    
    features: [
      "Premium Beirut business address",
      "Mail handling & forwarding services",
      "Professional phone answering",
      "Real-time member portal access",
      "Meeting room access at member rates",
      "Business registration assistance",
      "Call forwarding and voicemail",
      "Administrative support available"
    ],
    
    included: {
      address: "Prime downtown Beirut location",
      mailService: "Daily collection and weekly forwarding",
      phone: "Local Lebanese business number",
      portal: "24/7 online account management",
      support: "Email and phone support"
    },
    
    addOns: [
      {
        name: "Express Mail Forwarding",
        price: 15,
        unit: "per package",
        description: "Same-day mail forwarding"
      },
      {
        name: "Additional Call Minutes",
        price: 0.50,
        unit: "per minute",
        description: "Beyond included allowance"
      },
      {
        name: "Meeting Room Hours",
        price: 25,
        unit: "per hour",
        description: "Additional meeting room access"
      },
      {
        name: "Administrative Support",
        price: 25,
        unit: "per hour",
        description: "Professional administrative assistance"
      }
    ],
    
    upgradePath: {
      to: "hot-desk", 
      discount: "First month 50% off when upgrading"
    },
    
    testimonial: {
      quote: "Having a Beirut address opened doors with local clients immediately.",
      author: "Maya Sleiman",
      role: "Creative Director", 
      avatar: "https://i.pravatar.cc/96?img=22"
    },
    
    cta: { 
      label: "Choose Virtual Office", 
      href: "#contact", 
      tone: "secondary",
      action: "get_started"
    }
  },
  
  {
    key: "dedicated-office",
    emoji: "🏢",
    name: "Dedicated Office", 
    category: "private",
    price: null,
    priceText: "Custom",
    priceUnit: "month",
    currency: "USD", 
    featured: true,
    popular: false,
    savings: null,
    
    tagline: "Private space tailored to your needs",
    blurb: "Fully customizable private offices for growing teams",
    description: "Complete office solutions with full customization options. Perfect for established businesses and growing teams that need privacy, security, and flexibility.",
    
    sizeOptions: [
      {
        name: "Startup Suite",
        size: "100-200 sq ft",
        capacity: "2-4 people",
        startingPrice: 800,
        features: ["Private office", "Basic furniture", "Shared amenities"]
      },
      {
        name: "Team Office", 
        size: "300-500 sq ft",
        capacity: "6-12 people", 
        startingPrice: 1500,
        features: ["Private office", "Custom layout", "Meeting room included"]
      },
      {
        name: "Executive Suite",
        size: "600-1000 sq ft",
        capacity: "15-25 people",
        startingPrice: 2500, 
        features: ["Premium office", "Custom branding", "Dedicated facilities"]
      },
      {
        name: "Enterprise Floor",
        size: "1000+ sq ft", 
        capacity: "25+ people",
        startingPrice: null,
        priceText: "Custom",
        features: ["Entire floor", "Full customization", "Dedicated support"]
      }
    ],
    
    features: [
      "Private office space, fully furnished",
      "24/7 keycard access and security",
      "Dedicated phone line and high-speed internet",
      "Member rates on additional facilities", 
      "IT & administrative support available",
      "Custom branding and layout options",
      "Priority booking for meeting rooms",
      "Dedicated storage and filing solutions"
    ],
    
    included: {
      access: "24/7 keycard access",
      furniture: "Complete office furniture package",
      internet: "Dedicated high-speed connection",
      phone: "Dedicated business phone line",
      cleaning: "Daily cleaning service",
      security: "Private keycard access"
    },
    
    customizations: [
      {
        name: "Premium Furniture Package",
        price: 200,
        unit: "per month",
        description: "Upgraded furniture and equipment"
      },
      {
        name: "Custom Branding Package", 
        price: 500,
        unit: "one-time",
        description: "Logo, signage, and branding setup"
      },
      {
        name: "Additional Parking Spaces",
        price: 80,
        unit: "per space/month", 
        description: "Reserved parking spaces"
      },
      {
        name: "Dedicated Reception",
        price: 800,
        unit: "per month",
        description: "Personal receptionist service"
      }
    ],
    
    contractTerms: [
      {
        duration: "6 months",
        discount: 0,
        description: "Short-term flexibility"
      },
      {
        duration: "12 months", 
        discount: 10,
        description: "Save 10% with annual commitment"
      },
      {
        duration: "24+ months",
        discount: 15,
        description: "Save 15% with long-term commitment"
      }
    ],
    
    testimonial: {
      quote: "Our team moved in seamlessly. Everything was ready from day one.",
      author: "Kareem Dabbour",
      role: "Operations Director",
      avatar: "https://i.pravatar.cc/96?img=32"
    },
    
    cta: { 
      label: "Get Custom Quote", 
      href: "#contact", 
      tone: "secondary",
      action: "request_quote"
    }
  }
];

// Utility functions for pricing management
export const getPricingByCategory = (category) => {
  return pricing.filter(plan => plan.category === category);
};

export const getFeaturedPlans = () => {
  return pricing.filter(plan => plan.featured);
};

export const getPopularPlans = () => {
  return pricing.filter(plan => plan.popular);
};

export const getPlansByPrice = (ascending = true) => {
  const withPrices = pricing.filter(plan => plan.price !== null);
  const withoutPrices = pricing.filter(plan => plan.price === null);
  
  const sorted = withPrices.sort((a, b) => 
    ascending ? a.price - b.price : b.price - a.price
  );
  
  return ascending ? [...sorted, ...withoutPrices] : [...withoutPrices, ...sorted];
};

export const calculateSavings = (plan, billingPeriod) => {
  if (!plan.billingOptions) return null;
  
  const option = plan.billingOptions.find(opt => opt.period === billingPeriod);
  if (!option || !option.savings) return null;
  
  const monthlyCost = plan.price;
  const discountedCost = option.price;
  const annualSavings = (monthlyCost - discountedCost) * 12;
  
  return {
    monthlyPrice: discountedCost,
    originalPrice: monthlyCost,
    monthlySavings: monthlyCost - discountedCost,
    annualSavings: annualSavings,
    percentageSavings: option.savings
  };
};

export const getTotalCost = (plan, billingPeriod, addOns = []) => {
  const baseCost = plan.billingOptions 
    ? plan.billingOptions.find(opt => opt.period === billingPeriod)?.price || plan.price
    : plan.price;
    
  const addOnCost = addOns.reduce((total, addOn) => {
    const addon = plan.addOns?.find(a => a.name === addOn.name);
    return total + (addon ? addon.price * addOn.quantity : 0);
  }, 0);
  
  return baseCost + addOnCost;
};

export const comparePlans = (planKeys) => {
  const plans = planKeys.map(key => pricing.find(p => p.key === key)).filter(Boolean);
  
  return {
    plans: plans,
    features: getAllFeatures(plans),
    priceRange: {
      min: Math.min(...plans.filter(p => p.price).map(p => p.price)),
      max: Math.max(...plans.filter(p => p.price).map(p => p.price))
    }
  };
};

const getAllFeatures = (plans) => {
  const allFeatures = new Set();
  plans.forEach(plan => {
    plan.features.forEach(feature => allFeatures.add(feature));
  });
  return Array.from(allFeatures);
};

export const getPricingCategories = () => {
  const categories = [...new Set(pricing.map(plan => plan.category))];
  return categories.map(category => ({
    key: category,
    label: category.charAt(0).toUpperCase() + category.slice(1),
    count: pricing.filter(plan => plan.category === category).length,
    icon: getCategoryIcon(category)
  }));
};

const getCategoryIcon = (category) => {
  const icons = {
    'flexible': '🔥',
    'remote': '☁️', 
    'private': '🏢'
  };
  return icons[category] || '💼';
};

export default pricing;