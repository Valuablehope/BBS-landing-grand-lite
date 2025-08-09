// officeData.js - Enhanced version
// Comprehensive office workspace data with detailed specifications

const offices = [
  {
    key: "hot",
    emoji: "🔥",
    name: "Hot Desk",
    category: "flexible",
    price: "$180/month",
    priceValue: 180,
    currency: "USD",
    badge: { text: "Most Popular", tone: "blue" },
    tagline: "Flexibility meets productivity",
    description: "Flexible month‑to‑month membership. Bring your laptop, find an available desk, and get to work. Perfect for freelancers, remote workers, and small teams.",
    shortDescription: "Flexible workspace for professionals on the go",
    featured: true,
    popularity: 95,
    
    features: [
      "Business hours access (Mon–Sun, 9:00–18:00)",
      "Secure Wi‑Fi, unlimited beverages, breakout areas", 
      "Community access & member pricing on meeting rooms",
      "Professional printing and scanning services",
      "Ergonomic seating and adjustable desks",
      "Access to phone booths for private calls"
    ],
    
    includedServices: [
      "High-speed internet (1Gbps)",
      "Premium coffee and tea",
      "Printing (100 pages/month)",
      "Community events",
      "Basic IT support",
      "Mail handling"
    ],
    
    idealFor: [
      "Freelancers and consultants",
      "Remote workers",
      "Small startup teams",
      "Digital nomads",
      "Project-based work"
    ],
    
    specifications: {
      accessHours: "9:00 AM - 6:00 PM, 7 days/week",
      deskType: "Hot desk (first-come, first-served)",
      internet: "1Gbps fiber, unlimited",
      printing: "100 pages included monthly",
      meetings: "Member rates: $25-75/hour",
      storage: "Daily locker access",
      commitment: "Month-to-month"
    },
    
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200",
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1200"
    ],
    
    metrics: [
      { label: "Available desks", value: "50+", icon: "🪑" },
      { label: "Daily users", value: "80+", icon: "👥" },
      { label: "Member satisfaction", value: "96%", icon: "⭐" }
    ],
    
    pricing: {
      monthly: 180,
      setup: 0,
      deposit: 180,
      cancellation: "30 days notice"
    },
    
    addOns: [
      { name: "Additional printing", price: "$0.10/page", description: "Beyond 100 pages/month" },
      { name: "Locker rental", price: "$25/month", description: "Personal secure storage" },
      { name: "Guest day passes", price: "$15/day", description: "Bring colleagues or clients" }
    ],
    
    testimonial: {
      quote: "The flexibility is unmatched. I can work when I want, where I want within the space.",
      author: "Sarah Johnson, Freelance Designer",
      rating: 5
    },
    
    cta: { label: "Get Started", href: "#contact", action: "signup" }
  },
  
  {
    key: "virtual",
    emoji: "☁️",
    name: "Virtual Office",
    category: "remote",
    price: "From $35/month",
    priceValue: 35,
    currency: "USD",
    badge: { text: "Remote Ready", tone: "purple" },
    tagline: "Professional presence, anywhere",
    description: "Open your office in 30 minutes — prime Beirut address, professional mail handling, and dedicated reception services for your growing business.",
    shortDescription: "Professional business address and support services",
    featured: false,
    popularity: 78,
    
    features: [
      "Premium Beirut business address",
      "Local business number & professional receptionist",
      "Real-time member portal for bookings and invoices",
      "Mail receiving and forwarding services",
      "Professional call answering in your company name",
      "Meeting room access with member rates"
    ],
    
    includedServices: [
      "Business address registration",
      "Mail handling and forwarding",
      "Professional phone answering",
      "Online member portal",
      "Call forwarding services",
      "Basic administrative support"
    ],
    
    idealFor: [
      "Remote businesses",
      "International companies",
      "Home-based entrepreneurs",
      "Traveling professionals",
      "Companies expanding to Lebanon"
    ],
    
    specifications: {
      address: "Prime downtown Beirut location",
      mailService: "Daily collection and forwarding",
      phoneService: "Professional answering in your name",
      portal: "24/7 online access",
      meetings: "Member rates apply",
      commitment: "Month-to-month",
      setup: "Active within 30 minutes"
    },
    
    image: "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=1200",
      "https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=1200",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200"
    ],
    
    metrics: [
      { label: "Setup time", value: "30 min", icon: "⚡" },
      { label: "Phone answering", value: "24/7", icon: "📞" },
      { label: "Mail processing", value: "Daily", icon: "📮" }
    ],
    
    pricing: {
      basic: 35,
      premium: 65,
      enterprise: 95,
      setup: 0,
      deposit: 0
    },
    
    plans: [
      {
        name: "Basic",
        price: 35,
        features: ["Business address", "Mail forwarding", "Basic phone support"]
      },
      {
        name: "Premium", 
        price: 65,
        features: ["Everything in Basic", "Professional phone answering", "Meeting room credits"]
      },
      {
        name: "Enterprise",
        price: 95,
        features: ["Everything in Premium", "Dedicated support", "Custom services"]
      }
    ],
    
    addOns: [
      { name: "Additional call minutes", price: "$0.50/min", description: "Beyond included allowance" },
      { name: "Express mail forwarding", price: "$15/package", description: "Same-day forwarding" },
      { name: "Administrative support", price: "$25/hour", description: "Professional assistance" }
    ],
    
    testimonial: {
      quote: "Having a Beirut address instantly boosted our credibility with local clients.",
      author: "Ahmed Hassan, Tech Startup CEO",
      rating: 5
    },
    
    cta: { label: "See Add-ons", href: "#packages", action: "explore" }
  },
  
  {
    key: "dedicated",
    emoji: "🏢",
    name: "Dedicated Office",
    category: "private",
    price: "Custom pricing",
    priceValue: null,
    currency: "USD",
    badge: { text: "Premium", tone: "amber" },
    tagline: "Your space, your way",
    description: "Private office ready on day one — skip fit‑out, utilities, and IT setup. Perfect for growing teams who need privacy and customization.",
    shortDescription: "Private office space with full customization",
    featured: true,
    popularity: 92,
    
    features: [
      "Secure 24/7 access with keycard entry",
      "Member rates for boardrooms and meeting spaces",
      "IT & secretarial support on demand",
      "Fully furnished private workspace",
      "Dedicated phone line and internet",
      "Custom branding and layout options"
    ],
    
    includedServices: [
      "24/7 keycard access",
      "Dedicated phone line",
      "High-speed internet",
      "Furniture and equipment",
      "Daily cleaning service",
      "Priority IT support"
    ],
    
    idealFor: [
      "Growing companies",
      "Established businesses",
      "Teams requiring privacy",
      "Companies with specific needs",
      "Professional service firms"
    ],
    
    specifications: {
      accessHours: "24/7 keycard access",
      sizes: "From 100 to 2000 sq ft",
      capacity: "2-50 people",
      internet: "Dedicated fiber connection",
      phone: "Dedicated business line",
      customization: "Full layout flexibility",
      commitment: "6-24 month terms available"
    },
    
    image: "https://images.unsplash.com/photo-1507209696998-3c532be9b2b1?q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1507209696998-3c532be9b2b1?q=80&w=1200",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200",
      "https://images.unsplash.com/photo-1560472355-b07cbe0d54a4?q=80&w=1200"
    ],
    
    metrics: [
      { label: "Private offices", value: "15+", icon: "🏢" },
      { label: "Max capacity", value: "50 people", icon: "👥" },
      { label: "Setup time", value: "1 week", icon: "⚡" }
    ],
    
    officeSizes: [
      {
        name: "Startup Suite",
        size: "100-200 sq ft",
        capacity: "2-4 people",
        price: "From $800/month"
      },
      {
        name: "Team Office",
        size: "300-500 sq ft", 
        capacity: "6-12 people",
        price: "From $1,500/month"
      },
      {
        name: "Executive Suite",
        size: "600-1000 sq ft",
        capacity: "15-25 people", 
        price: "From $2,500/month"
      },
      {
        name: "Enterprise Floor",
        size: "1000+ sq ft",
        capacity: "25+ people",
        price: "Custom pricing"
      }
    ],
    
    customizations: [
      "Layout and furniture selection",
      "Branding and signage",
      "Additional technology setup",
      "Security and access controls",
      "Storage and filing solutions"
    ],
    
    addOns: [
      { name: "Additional parking", price: "$80/month", description: "Reserved parking spaces" },
      { name: "Storage room", price: "$150/month", description: "Additional secure storage" },
      { name: "Reception services", price: "$300/month", description: "Dedicated receptionist" }
    ],
    
    testimonial: {
      quote: "Moving in was seamless. Everything was ready from day one, letting us focus on business.",
      author: "Maria Rodriguez, Law Firm Partner",
      rating: 5
    },
    
    cta: { label: "Request Quote", href: "#contact", action: "quote" }
  }
];

// Utility functions for office data management
export const getOfficesByCategory = (category) => {
  return offices.filter(office => office.category === category);
};

export const getFeaturedOffices = () => {
  return offices.filter(office => office.featured);
};

export const getOfficesByPopularity = () => {
  return [...offices].sort((a, b) => b.popularity - a.popularity);
};

export const getOfficesByPrice = (ascending = true) => {
  const sorted = [...offices].sort((a, b) => {
    // Handle custom pricing
    if (!a.priceValue && !b.priceValue) return 0;
    if (!a.priceValue) return 1;
    if (!b.priceValue) return -1;
    
    return ascending ? a.priceValue - b.priceValue : b.priceValue - a.priceValue;
  });
  return sorted;
};

export const searchOffices = (searchTerm) => {
  const term = searchTerm.toLowerCase();
  return offices.filter(office => 
    office.name.toLowerCase().includes(term) ||
    office.description.toLowerCase().includes(term) ||
    office.features.some(feature => feature.toLowerCase().includes(term)) ||
    office.idealFor.some(ideal => ideal.toLowerCase().includes(term))
  );
};

export const getOfficeCategories = () => {
  const categories = [...new Set(offices.map(office => office.category))];
  return categories.map(category => ({
    key: category,
    label: category.charAt(0).toUpperCase() + category.slice(1),
    count: offices.filter(office => office.category === category).length,
    icon: getCategoryIcon(category)
  }));
};

const getCategoryIcon = (category) => {
  const icons = {
    'flexible': '🔥',
    'remote': '☁️',
    'private': '🏢'
  };
  return icons[category] || '🏢';
};

export const getPriceRange = () => {
  const prices = offices
    .filter(office => office.priceValue)
    .map(office => office.priceValue);
  
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
    average: prices.reduce((a, b) => a + b, 0) / prices.length
  };
};

export default offices;