// amenityData.js - Enhanced version
// Comprehensive amenities data with categorization and enhanced features

const amenities = [
  {
    id: "comfort-seating",
    title: "Comfort Seating",
    description: "Ergonomic chairs & adjustable desks designed for all-day productivity",
    icon: "🪑",
    category: "workspace",
    featured: true,
    priority: 1,
    details: {
      specifications: [
        "Herman Miller Aeron chairs",
        "Height-adjustable standing desks",
        "Lumbar support systems",
        "Monitor arms included"
      ],
      benefits: [
        "Improved posture and comfort",
        "Reduced back strain",
        "Increased productivity",
        "Customizable workspace"
      ]
    },
    availability: "All membership levels",
    images: [
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=400&h=300&fit=crop"
    ]
  },
  {
    id: "meeting-rooms",
    title: "Meeting Rooms",
    description: "Professional boardrooms with state-of-the-art AV equipment",
    icon: "🎯",
    category: "collaboration",
    featured: true,
    priority: 2,
    details: {
      specifications: [
        "4K video conferencing systems",
        "Wireless presentation displays",
        "High-quality audio systems",
        "Interactive whiteboards"
      ],
      benefits: [
        "Professional client meetings",
        "Seamless remote collaboration",
        "Impressive presentation capabilities",
        "Flexible room configurations"
      ]
    },
    availability: "Member rates apply",
    bookingRequired: true,
    capacity: "2-20 people",
    images: [
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop"
    ]
  },
  {
    id: "secure-wifi",
    title: "Secure Wi‑Fi",
    description: "Enterprise-grade fiber internet with guaranteed uptime",
    icon: "📶",
    category: "technology",
    featured: true,
    priority: 3,
    details: {
      specifications: [
        "1Gbps fiber connection",
        "99.9% uptime guarantee",
        "WPA3 security protocol",
        "Dedicated bandwidth per user"
      ],
      benefits: [
        "Lightning-fast downloads",
        "Stable video calls",
        "Secure data transmission",
        "No bandwidth throttling"
      ]
    },
    availability: "All members",
    performance: {
      speed: "1Gbps",
      uptime: "99.9%",
      security: "WPA3 Enterprise"
    },
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop"
    ]
  },
  {
    id: "printing-hub",
    title: "Printing Hub",
    description: "Professional printing, scanning, and document services",
    icon: "🖨️",
    category: "business-services",
    featured: false,
    priority: 4,
    details: {
      specifications: [
        "Color laser printers",
        "High-speed scanners",
        "Document binding services",
        "Large format printing"
      ],
      benefits: [
        "Professional presentations",
        "Cost-effective printing",
        "Quick turnaround times",
        "Multiple format support"
      ]
    },
    availability: "Member rates apply",
    services: [
      "Black & white printing",
      "Color printing",
      "Scanning to email/cloud",
      "Document binding",
      "Lamination services"
    ],
    pricing: {
      bw: "$0.10 per page",
      color: "$0.25 per page",
      scanning: "Free for members"
    },
    images: [
      "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=300&fit=crop"
    ]
  },
  {
    id: "secure-lockers",
    title: "Secure Lockers",
    description: "Personal storage solutions with keycard access",
    icon: "🔒",
    category: "storage",
    featured: false,
    priority: 5,
    details: {
      specifications: [
        "Digital keycard locks",
        "Various size options",
        "Climate-controlled environment",
        "24/7 access for office members"
      ],
      benefits: [
        "Secure personal storage",
        "Convenient access",
        "Peace of mind",
        "Flexible rental terms"
      ]
    },
    availability: "Additional fee applies",
    sizes: [
      { size: "Small", dimensions: "12x12x18 inches", price: "$15/month" },
      { size: "Medium", dimensions: "18x18x24 inches", price: "$25/month" },
      { size: "Large", dimensions: "24x24x36 inches", price: "$40/month" }
    ],
    images: [
      "https://images.unsplash.com/photo-1586892478025-2b5472316f22?w=400&h=300&fit=crop"
    ]
  },
  {
    id: "parking",
    title: "Parking",
    description: "Secure parking spaces in prime downtown location",
    icon: "🚗",
    category: "facilities",
    featured: false,
    priority: 6,
    details: {
      specifications: [
        "Underground parking garage",
        "24/7 security surveillance",
        "Reserved and shared spaces",
        "Electric vehicle charging"
      ],
      benefits: [
        "Convenient city center location",
        "Safe and secure parking",
        "Weather protection",
        "Easy building access"
      ]
    },
    availability: "Limited spaces - first come, first served",
    pricing: {
      reserved: "$80/month",
      shared: "$50/month",
      daily: "$10/day"
    },
    features: [
      "Security cameras",
      "Keycard access",
      "EV charging stations",
      "Covered parking"
    ],
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
    ]
  },
  {
    id: "premium-kitchen",
    title: "Premium Kitchen",
    description: "Fully equipped kitchenette with premium appliances",
    icon: "☕",
    category: "hospitality",
    featured: true,
    priority: 7,
    details: {
      specifications: [
        "Commercial-grade coffee machine",
        "Full-size refrigerator and freezer",
        "Microwave and dishwasher",
        "Premium tea and coffee selection"
      ],
      benefits: [
        "Complimentary beverages",
        "Healthy meal storage",
        "Social gathering space",
        "Cost savings on dining"
      ]
    },
    availability: "All members",
    amenities: [
      "Nespresso coffee machine",
      "Variety of teas and beverages",
      "Filtered water system",
      "Refrigerator with freezer",
      "Microwave and toaster",
      "Dishwasher and sink",
      "Dining tables and seating"
    ],
    hours: "Available during business hours",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1559186395-3c0e7cd17e7b?w=400&h=300&fit=crop"
    ]
  },
  {
    id: "monitors-4k",
    title: "4K Monitors",
    description: "High-resolution displays with plug-and-play connectivity",
    icon: "🖥️",
    category: "technology",
    featured: false,
    priority: 8,
    details: {
      specifications: [
        "27-inch 4K displays",
        "USB-C and HDMI connectivity",
        "Adjustable monitor arms",
        "Multiple monitor setups available"
      ],
      benefits: [
        "Enhanced productivity",
        "Crystal clear visuals",
        "Reduced eye strain",
        "Professional presentations"
      ]
    },
    availability: "Hot desk and dedicated office members",
    technical: {
      resolution: "3840 x 2160",
      size: "27 inches",
      connectivity: ["USB-C", "HDMI", "DisplayPort"],
      features: ["Height adjustable", "Tilt and swivel", "Blue light filter"]
    },
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop"
    ]
  },
  {
    id: "phone-booths",
    title: "Phone Booths",
    description: "Private soundproof booths for confidential calls",
    icon: "📞",
    category: "privacy",
    featured: false,
    priority: 9,
    details: {
      specifications: [
        "Soundproof construction",
        "Ventilation system",
        "Built-in desk and chair",
        "USB charging ports"
      ],
      benefits: [
        "Private conversations",
        "Noise isolation",
        "Professional appearance",
        "Always available"
      ]
    },
    availability: "All members - no booking required",
    features: [
      "Acoustic panels",
      "LED lighting",
      "Air circulation",
      "Power outlets",
      "Small desk surface"
    ],
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop"
    ]
  },
  {
    id: "event-space",
    title: "Event Space",
    description: "Flexible venue for networking events and workshops",
    icon: "🎪",
    category: "collaboration",
    featured: false,
    priority: 10,
    details: {
      specifications: [
        "100-person capacity",
        "Modular furniture setup",
        "Professional lighting",
        "Sound system included"
      ],
      benefits: [
        "Host client events",
        "Team building activities",
        "Educational workshops",
        "Networking opportunities"
      ]
    },
    availability: "Bookable for members",
    configurations: [
      "Theater style (100 people)",
      "Classroom style (60 people)",
      "Cocktail reception (80 people)",
      "Workshop format (40 people)"
    ],
    pricing: {
      members: "$200/day",
      nonMembers: "$350/day",
      halfDay: "$120/day (members)"
    },
    images: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop"
    ]
  },
  {
    id: "security-system",
    title: "24/7 Security",
    description: "Round-the-clock security with keycard access control",
    icon: "🛡️",
    category: "security",
    featured: false,
    priority: 11,
    details: {
      specifications: [
        "Keycard access system",
        "CCTV monitoring",
        "Security personnel on-site",
        "Visitor management system"
      ],
      benefits: [
        "Peace of mind",
        "Secure work environment",
        "Controlled access",
        "Professional reception"
      ]
    },
    availability: "All members",
    features: [
      "24/7 keycard access",
      "Security cameras",
      "Visitor check-in system",
      "Emergency procedures",
      "Secure entry points"
    ],
    images: [
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop"
    ]
  }
];

// Helper functions for filtering and categorizing amenities
export const getAmenitiesByCategory = (category) => {
  return amenities.filter(amenity => amenity.category === category);
};

export const getFeaturedAmenities = () => {
  return amenities.filter(amenity => amenity.featured);
};

export const getAmenitiesByPriority = () => {
  return [...amenities].sort((a, b) => a.priority - b.priority);
};

export const getAmenityCategories = () => {
  const categories = [...new Set(amenities.map(amenity => amenity.category))];
  return categories.map(category => ({
    key: category,
    label: category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' '),
    count: amenities.filter(amenity => amenity.category === category).length
  }));
};

export default amenities;