export const siteConfig = {
  companyName: "Appliance Repair Center",
  phoneNumber: "+971 50 123 4567",
  locations: "Dubai and Abu Dhabi",
  email: "info@appliancerepair.ae",
  address: "Business Bay, Dubai, UAE",
  workingHours: "24/7 Emergency Service Available",
  description: "Professional home appliance repair services in Dubai and Abu Dhabi. Expert technicians for all major brands.",
}

export const companies = [
  {
    id: "bosch",
    name: "Bosch",
    logo: "/bosch.svg",
    description: "Authorized Bosch service center in UAE",
    color: "#c41e3a",
    heroImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&auto=format"
  },
  {
    id: "siemens", 
    name: "Siemens",
    logo: "/siemens.svg",
    description: "Certified Siemens repair specialists",
    color: "#009999",
    heroImage: "https://images.unsplash.com/photo-1556909275-ebb90f430cc4?w=800&h=600&fit=crop&auto=format"
  },
  {
    id: "lg",
    name: "LG",
    logo: "/lg.svg", 
    description: "Official LG service and repair center",
    color: "#a50034",
    heroImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&auto=format"
  },
  {
    id: "samsung",
    name: "Samsung",
    logo: "/samsung.svg",
    description: "Samsung authorized repair service",
    color: "#1428a0",
    heroImage: "https://images.unsplash.com/photo-1556909275-ebb90f430cc4?w=800&h=600&fit=crop&auto=format"
  }
]

export const services = [
  {
    id: "washing-machine",
    name: "Washing Machine Repair",
    description: "Expert washing machine repair services for all brands",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&auto=format",
    availableFor: ["bosch", "siemens", "lg", "samsung"],
    commonIssues: ["Not spinning", "Water leakage", "Not draining", "Unusual noise"],
    icon: "🧺"
  },
  {
    id: "dryer",
    name: "Dryer Repair", 
    description: "Professional dryer repair and maintenance services",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&auto=format",
    availableFor: ["bosch", "siemens", "lg", "samsung"],
    commonIssues: ["Not heating", "Takes too long", "Not turning on", "Overheating"],
    icon: "🌪️"
  },
  {
    id: "dishwasher",
    name: "Dishwasher Repair",
    description: "Complete dishwasher repair and installation services", 
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&auto=format",
    availableFor: ["bosch", "siemens", "lg", "samsung"],
    commonIssues: ["Not cleaning properly", "Water not draining", "Strange odors", "Not starting"],
    icon: "🍽️"
  },
  {
    id: "tv",
    name: "TV Repair",
    description: "Smart TV and LED TV repair services",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&auto=format", 
    availableFor: ["lg", "samsung"],
    commonIssues: ["Black screen", "No sound", "Remote not working", "Connectivity issues"],
    icon: "📺"
  },
  {
    id: "cooktop",
    name: "Cooktop/Stove Repair",
    description: "Gas and electric cooktop repair services",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&auto=format",
    availableFor: ["bosch", "siemens"], 
    commonIssues: ["Burners not working", "Uneven heating", "Gas smell", "Temperature issues"],
    icon: "🔥"
  },
  {
    id: "oven",
    name: "Oven Repair",
    description: "Built-in and standalone oven repair services",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&auto=format",
    availableFor: ["bosch", "siemens", "lg", "samsung"],
    commonIssues: ["Not heating", "Door problems", "Timer issues", "Temperature inconsistency"],
    icon: "🔥"
  },
  {
    id: "fridge",
    name: "Refrigerator Repair", 
    description: "Refrigerator and freezer repair services",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&auto=format",
    availableFor: ["bosch", "siemens", "lg", "samsung"],
    commonIssues: ["Not cooling", "Ice maker problems", "Water leakage", "Strange noises"],
    icon: "❄️"
  },
  {
    id: "microwave",
    name: "Microwave Repair",
    description: "Microwave oven repair and maintenance",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&auto=format",
    availableFor: ["bosch", "siemens", "lg", "samsung"],
    commonIssues: ["Not heating", "Turntable issues", "Door problems", "Strange sounds"],
    icon: "📻"
  }
]

export const testimonials = [
  {
    id: 1,
    name: "Ahmed Hassan",
    location: "Dubai Marina",
    rating: 5,
    comment: "Excellent service! Fixed my washing machine the same day. Professional technicians and fair pricing.",
    service: "Washing Machine Repair",
    date: "2 days ago"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    location: "Downtown Dubai",
    rating: 5,
    comment: "Very satisfied with the refrigerator repair. The technician was knowledgeable and explained everything clearly.",
    service: "Refrigerator Repair",
    date: "1 week ago"
  },
  {
    id: 3,
    name: "Mohammed Al Rashid",
    location: "Business Bay",
    rating: 5,
    comment: "Quick response for emergency dishwasher repair. Great customer service and warranty coverage.",
    service: "Dishwasher Repair",
    date: "3 days ago"
  },
  {
    id: 4,
    name: "Emma Rodriguez",
    location: "JBR",
    rating: 5,
    comment: "Professional team fixed our oven perfectly. Used genuine parts and provided detailed invoice.",
    service: "Oven Repair",
    date: "1 week ago"
  }
]

export const stats = [
  { label: "Happy Customers", value: "5000+", icon: "👥" },
  { label: "Years Experience", value: "15+", icon: "⭐" },
  { label: "Success Rate", value: "98%", icon: "✅" },
  { label: "Same Day Service", value: "24/7", icon: "⚡" }
]