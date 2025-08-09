// testimonialsData.js - Enhanced version
// Comprehensive testimonials data with detailed member stories

const testimonials = [
  {
    id: "rami-alkhoury-001",
    name: "Rami Al-Khoury",
    role: "SaaS Founder",
    company: "TechFlow Solutions",
    package: "Hot Desk Member",
    memberSince: "2023-03-15",
    location: "Lebanon",
    
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    companyLogo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=60&h=60&fit=crop",
    
    quote: "Signed my first enterprise client from a meeting room here. The professional environment and networking opportunities were game-changing. Setup took minutes, not months.",
    
    fullStory: "When I started TechFlow Solutions, I was working from home and struggling to meet clients professionally. BBS changed everything. The hot desk membership gave me access to professional meeting rooms where I could pitch to enterprise clients. The networking events connected me with other entrepreneurs who became mentors and partners. Within six months, I had signed my first major client worth $50K and expanded to a small team.",
    
    highlight: { 
      value: "$50K", 
      label: "First client deal", 
      tone: "blue",
      description: "Enterprise contract signed within 6 months"
    },
    
    metrics: [
      { label: "Revenue growth", value: "300%", period: "First year" },
      { label: "Team size", value: "1 → 5", period: "18 months" },
      { label: "Client meetings", value: "50+", period: "Per month" }
    ],
    
    benefits: [
      "Professional meeting spaces for client presentations",
      "Networking opportunities with other entrepreneurs", 
      "Credible business address for marketing materials",
      "Flexible workspace as team grew"
    ],
    
    tags: ["startup", "saas", "networking", "growth", "enterprise"],
    category: "startup-success",
    featured: true,
    videoTestimonial: "https://example.com/video/rami-testimonial.mp4",
    
    rating: 5,
    wouldRecommend: true,
    
    beforeAfter: {
      before: "Working from home, struggling with professional image",
      after: "Established business with enterprise clients and growing team"
    },
    
    socialProof: {
      linkedin: "https://linkedin.com/in/rami-alkhoury",
      companyWebsite: "https://techflowsolutions.com"
    }
  },
  
  {
    id: "maya-sleiman-002", 
    name: "Maya Sleiman",
    role: "Creative Director",
    company: "Brand Studio Co.",
    package: "Virtual Office",
    memberSince: "2023-01-22",
    location: "Remote (Originally Beirut)",
    
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    companyLogo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=60&h=60&fit=crop",
    
    quote: "The premium address instantly boosted client trust. Our calls are answered exactly how we briefed, maintaining our brand consistency perfectly.",
    
    fullStory: "As a creative director working with international clients, I needed a professional Lebanese presence without the overhead of a physical office. BBS's virtual office service provided the perfect solution. The premium Beirut address gave my agency immediate credibility with local and regional clients. The professional phone answering service maintains our brand voice perfectly, and the mail handling ensures I never miss important documents while traveling for client work.",
    
    highlight: { 
      value: "3x", 
      label: "Client inquiries", 
      tone: "purple",
      description: "Tripled client inquiries after establishing Lebanese presence"
    },
    
    metrics: [
      { label: "Client base growth", value: "200%", period: "First year" },
      { label: "Regional projects", value: "15+", period: "Ongoing" },
      { label: "Brand recognition", value: "75%", period: "In target market" }
    ],
    
    benefits: [
      "Premium Beirut address enhanced credibility",
      "Professional call handling maintained brand consistency",
      "Mail forwarding kept operations seamless while remote",
      "Cost-effective compared to physical office rental"
    ],
    
    tags: ["creative", "remote", "virtual-office", "branding", "international"],
    category: "remote-success",
    featured: true,
    
    rating: 5,
    wouldRecommend: true,
    
    beforeAfter: {
      before: "Home-based agency with limited regional credibility",
      after: "Established brand with strong Lebanese market presence"
    },
    
    socialProof: {
      linkedin: "https://linkedin.com/in/maya-sleiman",
      companyWebsite: "https://brandstudioco.com",
      portfolio: "https://behance.net/mayasleiman"
    }
  },
  
  {
    id: "kareem-dabbour-003",
    name: "Kareem Dabbour", 
    role: "Operations Director",
    company: "LogiTech Middle East",
    package: "Dedicated Office",
    memberSince: "2022-11-08",
    location: "Beirut, Lebanon",
    
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    companyLogo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=60&h=60&fit=crop",
    
    quote: "Moved our entire team in without touching a single cable. The IT infrastructure was ready from day one, allowing us to focus on growth instead of setup.",
    
    fullStory: "When LogiTech decided to expand into the Middle East, we needed an office that could accommodate our growing team quickly. Traditional office leasing would have taken months of setup time we couldn't afford. BBS's dedicated office solution was perfect - fully furnished, IT infrastructure ready, and flexible enough to customize as we grew. We moved our 12-person team in within a week and have since expanded to 25 employees in the same space.",
    
    highlight: { 
      value: "12 → 25", 
      label: "Team growth", 
      tone: "green",
      description: "Doubled team size within 18 months"
    },
    
    metrics: [
      { label: "Setup time", value: "1 week", period: "vs 3+ months traditional" },
      { label: "Team expansion", value: "108%", period: "18 months" },
      { label: "Operational efficiency", value: "95%", period: "From day one" }
    ],
    
    benefits: [
      "Immediate move-in with full IT infrastructure",
      "Flexible space that adapted to team growth",
      "Professional environment impressed clients and partners",
      "Significant cost savings vs traditional office setup"
    ],
    
    tags: ["enterprise", "team-growth", "dedicated-office", "efficiency", "expansion"],
    category: "enterprise-success", 
    featured: true,
    caseStudy: "https://bbs.com/case-studies/logitech-expansion",
    
    rating: 5,
    wouldRecommend: true,
    
    beforeAfter: {
      before: "Needed quick office setup for regional expansion",
      after: "Established regional headquarters with growing team"
    },
    
    socialProof: {
      linkedin: "https://linkedin.com/in/kareem-dabbour",
      companyWebsite: "https://logitechmiddleeast.com"
    }
  },
  
  {
    id: "lara-nassar-004",
    name: "Lara Nassar",
    role: "Business Consultant", 
    company: "Strategic Insights",
    package: "Hot Desk Member",
    memberSince: "2023-05-10",
    location: "Beirut, Lebanon",
    
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    companyLogo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop",
    
    quote: "Community introductions turned into lucrative contracts. The networking value alone justifies the membership. It's like having a built-in business development team.",
    
    fullStory: "As an independent business consultant, networking is crucial to my success. BBS has been more than just a workspace - it's been a business catalyst. The monthly networking events, coffee conversations, and informal introductions have resulted in five major partnerships and numerous client referrals. The collaborative environment here attracts high-quality professionals who understand the value of mutual support.",
    
    highlight: { 
      value: "5", 
      label: "New partnerships", 
      tone: "amber",
      description: "Strategic partnerships formed through BBS networking"
    },
    
    metrics: [
      { label: "New partnerships", value: "5", period: "8 months" },
      { label: "Referral revenue", value: "$75K", period: "First year" },
      { label: "Network size", value: "150+", period: "Professional connections" }
    ],
    
    benefits: [
      "Access to high-quality professional network",
      "Regular networking events and informal meetings",
      "Collaborative environment fostered business opportunities",
      "Professional workspace enhanced client meetings"
    ],
    
    tags: ["consulting", "networking", "partnerships", "referrals", "community"],
    category: "networking-success",
    featured: true,
    
    rating: 5,
    wouldRecommend: true,
    
    beforeAfter: {
      before: "Solo consultant with limited local network",
      after: "Connected professional with thriving partnership ecosystem"
    },
    
    socialProof: {
      linkedin: "https://linkedin.com/in/lara-nassar",
      companyWebsite: "https://strategicinsights.com.lb"
    }
  },
  
  {
    id: "ahmed-hassan-005",
    name: "Ahmed Hassan",
    role: "Fintech Startup CEO",
    company: "PayForward",
    package: "Dedicated Office", 
    memberSince: "2023-02-14",
    location: "Beirut, Lebanon",
    
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    companyLogo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=60&h=60&fit=crop",
    
    quote: "The security and compliance features were crucial for our fintech startup. Plus, having a prestigious Beirut address helped us gain investor confidence.",
    
    fullStory: "Launching a fintech startup requires the highest levels of security and professionalism. BBS provided exactly what we needed - a secure, compliant workspace with the infrastructure to handle sensitive financial data. The prestigious address helped us gain credibility with investors and regulators. The 24/7 access was essential during our product launch phases, and the meeting rooms were perfect for investor presentations.",
    
    highlight: { 
      value: "$2M", 
      label: "Funding raised", 
      tone: "green",
      description: "Series A funding secured using BBS for investor meetings"
    },
    
    metrics: [
      { label: "Funding raised", value: "$2M", period: "Series A" },
      { label: "Regulatory approvals", value: "3", period: "Fast-tracked" },
      { label: "Team growth", value: "300%", period: "12 months" }
    ],
    
    benefits: [
      "High-security environment suitable for fintech operations",
      "Prestigious address enhanced investor confidence", 
      "24/7 access supported intensive development cycles",
      "Professional meeting spaces impressed stakeholders"
    ],
    
    tags: ["fintech", "startup", "funding", "security", "compliance"],
    category: "tech-success",
    featured: false,
    
    rating: 5,
    wouldRecommend: true,
    
    beforeAfter: {
      before: "Early-stage fintech needing credible, secure workspace",
      after: "Funded startup with regulatory approval and growing team"
    },
    
    socialProof: {
      linkedin: "https://linkedin.com/in/ahmed-hassan-fintech", 
      companyWebsite: "https://payforward.com.lb"
    }
  },
  
  {
    id: "nour-khalil-006",
    name: "Nour Khalil",
    role: "Marketing Agency Owner",
    company: "Digital Craft Agency",
    package: "Hot Desk Member",
    memberSince: "2023-07-20",
    location: "Beirut, Lebanon",
    
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
    companyLogo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=60&h=60&fit=crop",
    
    quote: "The creative energy here is infectious. Collaborating with other entrepreneurs and freelancers has elevated our campaigns beyond what we could achieve alone.",
    
    fullStory: "Running a digital marketing agency requires constant creativity and fresh perspectives. The diverse community at BBS has become an informal think tank for our campaigns. We've collaborated with designers, developers, and strategists we met here, resulting in award-winning campaigns for our clients. The flexible workspace perfectly suits our project-based workflow.",
    
    highlight: { 
      value: "250%", 
      label: "Creative output", 
      tone: "purple",
      description: "Increased creative project delivery through collaboration"
    },
    
    metrics: [
      { label: "Collaborative projects", value: "12", period: "6 months" },
      { label: "Client satisfaction", value: "98%", period: "Current rating" },
      { label: "Award wins", value: "3", period: "Industry recognition" }
    ],
    
    benefits: [
      "Access to diverse creative talent for collaboration",
      "Inspiring environment boosted team creativity",
      "Flexible workspace suited project-based operations",
      "Client presentations in professional meeting rooms"
    ],
    
    tags: ["marketing", "creative", "collaboration", "flexibility", "awards"],
    category: "creative-success",
    featured: false,
    
    rating: 5,
    wouldRecommend: true,
    
    beforeAfter: {
      before: "Small agency working in isolation",
      after: "Collaborative agency with expanded creative capabilities"
    },
    
    socialProof: {
      linkedin: "https://linkedin.com/in/nour-khalil-marketing",
      companyWebsite: "https://digitalcraft.agency"
    }
  }
];

// Utility functions for testimonials management
export const getTestimonialsByCategory = (category) => {
  return testimonials.filter(testimonial => testimonial.category === category);
};

export const getFeaturedTestimonials = () => {
  return testimonials.filter(testimonial => testimonial.featured);
};

export const getTestimonialsByPackage = (packageType) => {
  return testimonials.filter(testimonial => 
    testimonial.package.toLowerCase().includes(packageType.toLowerCase())
  );
};

export const getTestimonialsByRating = (minRating = 4) => {
  return testimonials.filter(testimonial => testimonial.rating >= minRating);
};

export const getTestimonialsWithVideo = () => {
  return testimonials.filter(testimonial => testimonial.videoTestimonial);
};

export const getTestimonialsWithCaseStudy = () => {
  return testimonials.filter(testimonial => testimonial.caseStudy);
};

export const searchTestimonials = (searchTerm) => {
  const term = searchTerm.toLowerCase();
  return testimonials.filter(testimonial => 
    testimonial.name.toLowerCase().includes(term) ||
    testimonial.role.toLowerCase().includes(term) ||
    testimonial.company.toLowerCase().includes(term) ||
    testimonial.quote.toLowerCase().includes(term) ||
    testimonial.tags.some(tag => tag.toLowerCase().includes(term))
  );
};

export const getTestimonialCategories = () => {
  const categories = [...new Set(testimonials.map(t => t.category))];
  return categories.map(category => ({
    key: category,
    label: category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' '),
    count: testimonials.filter(t => t.category === category).length,
    icon: getCategoryIcon(category)
  }));
};

const getCategoryIcon = (category) => {
  const icons = {
    'startup-success': '🚀',
    'remote-success': '🌐',
    'enterprise-success': '🏢',
    'networking-success': '🤝',
    'tech-success': '💻',
    'creative-success': '🎨'
  };
  return icons[category] || '⭐';
};

export const getPackageDistribution = () => {
  const packages = {};
  testimonials.forEach(t => {
    const pkg = t.package;
    packages[pkg] = (packages[pkg] || 0) + 1;
  });
  return packages;
};

export const getAverageRating = () => {
  const ratings = testimonials.map(t => t.rating);
  return ratings.reduce((a, b) => a + b, 0) / ratings.length;
};

export const getRecommendationRate = () => {
  const recommendations = testimonials.filter(t => t.wouldRecommend).length;
  return (recommendations / testimonials.length) * 100;
};

export const getRandomTestimonials = (count = 3) => {
  const shuffled = [...testimonials].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default testimonials;