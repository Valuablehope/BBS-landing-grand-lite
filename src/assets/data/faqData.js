// faqData.js - Enhanced version
// Comprehensive FAQ data with categorization and search optimization

const faqs = [
  {
    id: "quick-start",
    question: "How fast can I start working?",
    answer: "Virtual office services are live within 30 minutes of signup. Hot desks are available immediately upon arrival. Dedicated offices are typically ready within the same week, depending on availability and customization requirements.",
    category: "getting-started",
    priority: 1,
    featured: true,
    tags: ["quick setup", "virtual office", "hot desk", "dedicated office", "timing"],
    relatedQuestions: ["business-hours", "membership-levels"],
    lastUpdated: "2024-01-15",
    helpful: true,
    detailedAnswer: {
      virtualOffice: "Virtual office services activate instantly upon payment confirmation. You'll receive your business address, phone number, and access to our member portal within 30 minutes.",
      hotDesk: "Hot desks are available immediately during business hours. Simply show your membership confirmation and we'll get you set up with workspace access.",
      dedicatedOffice: "Private offices typically require 3-7 days for setup, including IT infrastructure, furniture arrangement, and security access configuration."
    }
  },
  {
    id: "meeting-rooms",
    question: "What meeting room options do you offer?",
    answer: "We offer fully equipped boardrooms and meeting rooms with AV equipment, whiteboards, and high-speed internet. All are available at member pricing and can be booked in real-time through our member portal.",
    category: "facilities",
    priority: 2,
    featured: true,
    tags: ["meeting rooms", "boardrooms", "AV equipment", "booking", "member pricing"],
    relatedQuestions: ["business-hours", "amenities"],
    lastUpdated: "2024-01-10",
    helpful: true,
    detailedAnswer: {
      roomTypes: [
        "Small meeting rooms (2-4 people) - $25/hour for members",
        "Medium conference rooms (6-8 people) - $40/hour for members", 
        "Large boardrooms (10-20 people) - $75/hour for members"
      ],
      equipment: [
        "4K video conferencing systems",
        "Wireless presentation displays",
        "High-quality audio systems",
        "Interactive whiteboards",
        "High-speed WiFi"
      ],
      booking: "Book through our member portal up to 30 days in advance. Same-day bookings subject to availability."
    }
  },
  {
    id: "business-hours",
    question: "What are your business hours?",
    answer: "We're open seven days a week from 9:00 AM to 6:00 PM. Extended access and 24/7 availability can be arranged for dedicated office members upon request.",
    category: "access",
    priority: 3,
    featured: true,
    tags: ["hours", "access", "24/7", "dedicated office", "extended hours"],
    relatedQuestions: ["quick-start", "security"],
    lastUpdated: "2024-01-08",
    helpful: true,
    detailedAnswer: {
      standardHours: "Monday through Sunday: 9:00 AM - 6:00 PM",
      extendedAccess: "Available for dedicated office members with 24/7 keycard access",
      holidays: "We're closed on major Lebanese holidays. Members with keycard access can still enter the building.",
      reception: "Reception desk is staffed during business hours for assistance and visitor management."
    }
  },
  {
    id: "vat-pricing",
    question: "Are your prices inclusive of VAT?",
    answer: "All pricing displayed is exclusive of VAT. VAT will be added according to Lebanese tax regulations at the time of billing.",
    category: "pricing",
    priority: 4,
    featured: false,
    tags: ["VAT", "pricing", "tax", "billing", "Lebanese regulations"],
    relatedQuestions: ["membership-types", "payment-methods"],
    lastUpdated: "2024-01-12",
    helpful: true,
    detailedAnswer: {
      vatRate: "Current VAT rate in Lebanon is 11%",
      billing: "VAT is calculated and added to your monthly invoice",
      businesses: "Lebanese businesses may be exempt from VAT with proper documentation",
      international: "International clients are subject to standard VAT rates unless exempt under Lebanese tax law"
    }
  },
  {
    id: "parking-facilities",
    question: "Do you offer parking facilities?",
    answer: "Yes, we provide on-site parking options for our members. Reserved parking spaces are available for dedicated office members, while hot desk and virtual office members have access to shared parking areas.",
    category: "facilities",
    priority: 5,
    featured: false,
    tags: ["parking", "reserved spaces", "shared parking", "on-site"],
    relatedQuestions: ["location", "amenities"],
    lastUpdated: "2024-01-05",
    helpful: true,
    detailedAnswer: {
      reservedParking: "Dedicated office members can reserve parking spaces for $80/month",
      sharedParking: "Hot desk members have access to shared parking at $50/month",
      dailyParking: "Day passes available for $10/day, subject to availability",
      security: "Underground parking with 24/7 security cameras and keycard access",
      evCharging: "Electric vehicle charging stations available"
    }
  },
  {
    id: "membership-levels",
    question: "What membership levels do you offer?",
    answer: "We offer three main membership levels: Hot Desk ($180/month) for flexible workspace access, Virtual Office (from $35/month) for business address and phone services, and Dedicated Office (custom pricing) for private workspace solutions.",
    category: "membership",
    priority: 6,
    featured: true,
    tags: ["membership", "hot desk", "virtual office", "dedicated office", "pricing"],
    relatedQuestions: ["quick-start", "amenities", "vat-pricing"],
    lastUpdated: "2024-01-15",
    helpful: true,
    detailedAnswer: {
      hotDesk: {
        price: "$180/month",
        includes: ["Business hours access", "High-speed WiFi", "Common areas", "Member rates on meeting rooms"],
        ideal: "Freelancers, remote workers, small teams"
      },
      virtualOffice: {
        price: "From $35/month",
        includes: ["Business address", "Mail handling", "Phone answering", "Member portal access"],
        ideal: "Remote businesses, international companies"
      },
      dedicatedOffice: {
        price: "Custom pricing",
        includes: ["Private office", "24/7 access", "Dedicated phone line", "IT support"],
        ideal: "Growing teams, established businesses"
      }
    }
  },
  {
    id: "payment-methods",
    question: "What payment methods do you accept?",
    answer: "We accept major credit cards (Visa, Mastercard, American Express), bank transfers, and cash payments. Monthly memberships are typically billed via automatic credit card payments for convenience.",
    category: "billing",
    priority: 7,
    featured: false,
    tags: ["payment", "credit cards", "bank transfer", "cash", "billing"],
    relatedQuestions: ["vat-pricing", "membership-levels"],
    lastUpdated: "2024-01-10",
    helpful: true,
    detailedAnswer: {
      creditCards: "Visa, Mastercard, American Express accepted",
      bankTransfer: "Local and international wire transfers accepted",
      cash: "Cash payments accepted for monthly memberships",
      autopay: "Automatic monthly billing available for convenience",
      billing: "Invoices generated monthly, due within 15 days"
    }
  },
  {
    id: "cancellation-policy",
    question: "What is your cancellation policy?",
    answer: "Hot desk and virtual office memberships require 30 days written notice for cancellation. Dedicated office leases have varying terms depending on customization and contract length. No cancellation fees apply for standard memberships.",
    category: "policies",
    priority: 8,
    featured: false,
    tags: ["cancellation", "notice period", "fees", "contract terms"],
    relatedQuestions: ["membership-levels", "payment-methods"],
    lastUpdated: "2024-01-08",
    helpful: true,
    detailedAnswer: {
      hotDesk: "30 days written notice required, no cancellation fee",
      virtualOffice: "30 days written notice required, no cancellation fee", 
      dedicatedOffice: "Terms vary by contract, typically 60-90 days notice required",
      notice: "Written notice must be submitted through member portal or email",
      refunds: "No refunds for partial months, but services continue through notice period"
    }
  },
  {
    id: "guest-policy",
    question: "Can I bring guests and clients?",
    answer: "Yes, members can bring guests to common areas and meeting rooms. Dedicated office members have unlimited guest access. Hot desk members can bring guests with advance notice to reception for security purposes.",
    category: "policies",
    priority: 9,
    featured: false,
    tags: ["guests", "clients", "visitors", "security", "common areas"],
    relatedQuestions: ["security", "meeting-rooms"],
    lastUpdated: "2024-01-12",
    helpful: true,
    detailedAnswer: {
      commonAreas: "All members can bring guests to lobby, kitchen, and common areas",
      meetingRooms: "Guests welcome in booked meeting rooms during reservation",
      dedicatedOffice: "Unlimited guest access to your private office space",
      hotDesk: "Please notify reception in advance for security badge preparation",
      security: "All guests must check in at reception and display visitor badges"
    }
  },
  {
    id: "amenities",
    question: "What amenities are included?",
    answer: "All memberships include high-speed WiFi, premium coffee and tea, printing services, common areas, and 24/7 security. Additional amenities vary by membership level, including meeting room credits, parking, and storage options.",
    category: "facilities",
    priority: 10,
    featured: true,
    tags: ["amenities", "WiFi", "coffee", "printing", "security", "included"],
    relatedQuestions: ["membership-levels", "parking-facilities"],
    lastUpdated: "2024-01-15",
    helpful: true,
    detailedAnswer: {
      included: [
        "High-speed fiber internet (1Gbps)",
        "Premium coffee and tea selection",
        "Professional printing and scanning",
        "Ergonomic seating and adjustable desks",
        "24/7 security and keycard access",
        "Common areas and networking spaces"
      ],
      premium: [
        "4K monitor access",
        "Private phone booths",
        "Event space bookings",
        "Concierge services",
        "Secure storage lockers"
      ]
    }
  },
  {
    id: "location-access",
    question: "Where are you located and how do I get access?",
    answer: "We're located in downtown Beirut's central business district with easy access to public transportation. Members receive keycard access and detailed directions upon signup. Visitor parking and public transit information is available.",
    category: "location",
    priority: 11,
    featured: false,
    tags: ["location", "address", "access", "transportation", "downtown Beirut"],
    relatedQuestions: ["parking-facilities", "business-hours"],
    lastUpdated: "2024-01-10",
    helpful: true,
    detailedAnswer: {
      address: "Central Business District, Downtown Beirut, Lebanon",
      publicTransit: "Walking distance to major bus stops and taxi stands",
      keycard: "Digital keycard provided upon membership activation",
      directions: "Detailed access instructions sent via email and member portal",
      landmarks: "Near major banks, government buildings, and business centers"
    }
  },
  {
    id: "it-support",
    question: "Do you provide IT support and technical assistance?",
    answer: "Basic IT support is included for all members, including WiFi troubleshooting and printing assistance. Dedicated office members receive priority IT support and can arrange additional technical services as needed.",
    category: "technology",
    priority: 12,
    featured: false,
    tags: ["IT support", "technical assistance", "WiFi", "printing", "priority support"],
    relatedQuestions: ["amenities", "membership-levels"],
    lastUpdated: "2024-01-08",
    helpful: true,
    detailedAnswer: {
      basicSupport: "WiFi setup, printing assistance, basic troubleshooting",
      prioritySupport: "Dedicated office members get priority technical assistance",
      onSite: "On-site IT technician available during business hours",
      additional: "Advanced IT services available for dedicated office members",
      equipment: "Help with connecting personal devices to our systems"
    }
  }
];

// Helper functions for FAQ management
export const getFAQsByCategory = (category) => {
  return faqs.filter(faq => faq.category === category);
};

export const getFeaturedFAQs = () => {
  return faqs.filter(faq => faq.featured);
};

export const getFAQsByPriority = () => {
  return [...faqs].sort((a, b) => a.priority - b.priority);
};

export const searchFAQs = (searchTerm) => {
  const term = searchTerm.toLowerCase();
  return faqs.filter(faq => 
    faq.question.toLowerCase().includes(term) ||
    faq.answer.toLowerCase().includes(term) ||
    faq.tags.some(tag => tag.toLowerCase().includes(term))
  );
};

export const getRelatedFAQs = (faqId) => {
  const faq = faqs.find(f => f.id === faqId);
  if (!faq || !faq.relatedQuestions) return [];
  
  return faq.relatedQuestions.map(relatedId => 
    faqs.find(f => f.id === relatedId)
  ).filter(Boolean);
};

export const getFAQCategories = () => {
  const categories = [...new Set(faqs.map(faq => faq.category))];
  return categories.map(category => ({
    key: category,
    label: category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' '),
    count: faqs.filter(faq => faq.category === category).length,
    icon: getCategoryIcon(category)
  }));
};

const getCategoryIcon = (category) => {
  const icons = {
    'getting-started': '🚀',
    'facilities': '🏢', 
    'access': '🔑',
    'pricing': '💰',
    'membership': '👥',
    'billing': '💳',
    'policies': '📋',
    'location': '📍',
    'technology': '💻'
  };
  return icons[category] || '❓';
};

export default faqs;