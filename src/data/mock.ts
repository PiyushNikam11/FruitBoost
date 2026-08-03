// Centralized mock data for FruitBoost.
// Structured so each entity maps cleanly to a future .NET API resource.

export type Fruit = {
  id: string;
  name: string;
  emoji: string;
  calories: number;
  benefits: string[];
  nutrition: { label: string; value: string }[];
  image: string;
};

export const fruits: Fruit[] = [
  {
    id: "apple",
    name: "Apple",
    emoji: "🍎",
    calories: 95,
    benefits: ["Rich in fiber", "Supports heart health", "Steady energy"],
    nutrition: [
      { label: "Carbs", value: "25g" },
      { label: "Fiber", value: "4g" },
      { label: "Vitamin C", value: "14%" },
    ],
    image: "/images/FruitsPhotos/Fruits/Download Juicy red apples for free.jpg",
  },
  {
    id: "orange",
    name: "Orange",
    emoji: "🍊",
    calories: 62,
    benefits: ["Immunity boost", "Vitamin C", "Hydrating"],
    nutrition: [
      { label: "Vitamin C", value: "92%" },
      { label: "Fiber", value: "3g" },
      { label: "Sugar", value: "12g" },
    ],
    image: "/images/FruitsPhotos/Fruits/download (8).jpg",
  },
  {
    id: "banana",
    name: "Banana",
    emoji: "🍌",
    calories: 105,
    benefits: ["Quick energy", "Potassium", "Mood lift"],
    nutrition: [
      { label: "Potassium", value: "422mg" },
      { label: "Carbs", value: "27g" },
      { label: "Vitamin B6", value: "33%" },
    ],
    image: "/images/FruitsPhotos/Fruits/download (10).jpg",
  },
  {
    id: "papaya",
    name: "Papaya",
    emoji: "🥭",
    calories: 59,
    benefits: ["Aids digestion", "Glowing skin", "Anti-inflammatory"],
    nutrition: [
      { label: "Vitamin C", value: "73%" },
      { label: "Vitamin A", value: "41%" },
      { label: "Fiber", value: "3g" },
    ],
    image: "/images/FruitsPhotos/Fruits/Embracing Papaya Slumber, Papaya Slumber, Papaya Fruit Coma, Tropical Fruit PNG Transparent Image and Clipart for Free Download.jpg",
  },
  {
    id: "watermelon",
    name: "Watermelon",
    emoji: "🍉",
    calories: 30,
    benefits: ["Hydration", "Low calorie", "Antioxidants"],
    nutrition: [
      { label: "Water", value: "92%" },
      { label: "Vitamin C", value: "13%" },
      { label: "Calories", value: "30" },
    ],
    image: "/images/FruitsPhotos/Fruits/MELON.jpg",
  },
  {
    id: "grapes",
    name: "Grapes",
    emoji: "🍇",
    calories: 62,
    benefits: ["Heart health", "Antioxidants", "Natural sugars"],
    nutrition: [
      { label: "Vitamin K", value: "22%" },
      { label: "Sugar", value: "16g" },
      { label: "Fiber", value: "1g" },
    ],
    image: "/images/FruitsPhotos/Fruits/download (11).jpg",
  },
  {
    id: "kiwi",
    name: "Kiwi",
    emoji: "🥝",
    calories: 42,
    benefits: ["Vitamin C dense", "Better sleep", "Digestion"],
    nutrition: [
      { label: "Vitamin C", value: "112%" },
      { label: "Vitamin K", value: "34%" },
      { label: "Fiber", value: "2g" },
    ],
    image: "/images/FruitsPhotos/Fruits/download (12).jpg",
  },
  {
    id: "almonds",
    name: "Soaked Almonds",
    emoji: "🌰",
    calories: 35,
    benefits: ["Brain power", "Healthy fats", "Keeps you full"],
    nutrition: [
      { label: "Protein", value: "1.3g" },
      { label: "Fat", value: "3g" },
      { label: "Vitamin E", value: "37%" },
    ],
    image: "/images/FruitsPhotos/Fruits/3 מזונות מפתיעים שכדאי להשרות לפני האכילה (והמדע מאחורי זה).jpg",
  },
];

export const todaysBox = fruits;

export type Plan = {
  id: string;
  name: string;
  price: number;
  period: string;
  tagline: string;
  features: string[];
  deliveryDays: string;
  highlighted?: boolean;
};

export const plans: Plan[] = [
  {
    id: "weekly",
    name: "Weekly",
    price: 599,
    period: "/ week",
    tagline: "Perfect to try FruitBoost",
    features: [
      "5 days fresh fruits",
      "Daily soaked almonds",
      "Office delivery",
      "Renew anytime",
      "Pause anytime",
    ],
    deliveryDays: "Mon – Fri",
  },
  {
    id: "monthly",
    name: "Monthly",
    price: 2299,
    period: "/ month",
    tagline: "Best value for teams",
    features: [
      "22 days fresh fruits",
      "Daily soaked almonds",
      "Priority office delivery",
      "Renew anytime",
      "Pause anytime",
      "Free trial day",
    ],
    deliveryDays: "Mon – Sat",
    highlighted: true,
  },
];

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  text: string;
  avatar: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Aarav Mehta",
    role: "Engineering Lead",
    company: "Nimbus Labs",
    rating: 5,
    text: "Our team's 3pm slump is gone. Fresh fruits at the desk every morning — energy and focus visibly improved across the floor.",
    avatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
  {
    id: "t2",
    name: "Sneha Kapoor",
    role: "HR Director",
    company: "Vertex Software",
    rating: 5,
    text: "We replaced the biscuit jar with FruitBoost. Employees love it, and our wellness survey scores jumped 18% in a quarter.",
    avatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
  {
    id: "t3",
    name: "Rohan Iyer",
    role: "Founder",
    company: "Stackmint",
    rating: 5,
    text: "Hygienic, on-time, and genuinely premium quality. The soaked almonds are a small touch that the team talks about every day.",
    avatar:
      "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
];

export type Faq = {
  id: string;
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
  {
    id: "f1",
    question: "Which fruits are included?",
    answer:
      "Each box includes a seasonal rotation of apple, orange, banana, papaya, watermelon, grapes, kiwi and 5 soaked almonds. The exact mix changes daily for variety and freshness.",
  },
  {
    id: "f2",
    question: "Can I cancel tomorrow's box?",
    answer:
      "Yes. Cancel tomorrow's delivery anytime before 8 PM tonight from your dashboard — no charge, no questions asked.",
  },
  {
    id: "f3",
    question: "Can I pause my subscription?",
    answer:
      "Absolutely. Pause for vacations, travel, or work trips and resume whenever you're ready. Your plan days are preserved.",
  },
  {
    id: "f4",
    question: "How payment works?",
    answer:
      "Pay securely online via UPI, cards, net banking, or wallet. Monthly plans are billed once; weekly plans renew every 7 days unless paused.",
  },
  {
    id: "f5",
    question: "Delivery timing?",
    answer:
      "Boxes arrive at your office reception between 8:30 AM and 10:30 AM, before the workday begins.",
  },
  {
    id: "f6",
    question: "Holiday policy?",
    answer:
      "No delivery on national holidays. Those days are automatically excluded from your plan — you're never charged for them.",
  },
  {
    id: "f7",
    question: "Renewal process?",
    answer:
      "Plans auto-renew for your convenience, but you can switch to manual renewal or cancel auto-renew anytime from your dashboard.",
  },
  {
    id: "f8",
    question: "Refund policy?",
    answer:
      "If a box fails our quality check at your desk, report within 2 hours for a same-day replacement or a credit toward your next renewal.",
  },
];

export type TimelineStep = {
  id: number;
  title: string;
  description: string;
  icon: string;
};

export const howItWorksSteps: TimelineStep[] = [
  { id: 1, title: "Register", description: "Create your FruitBoost account in under a minute.", icon: "user" },
  { id: 2, title: "Verify Mobile OTP", description: "Secure your account with a quick OTP verification.", icon: "shield" },
  { id: 3, title: "Choose Company", description: "Pick your company from our verified office network.", icon: "building" },
  { id: 4, title: "Choose Location", description: "Select your exact office floor and reception.", icon: "map" },
  { id: 5, title: "Select Plan", description: "Weekly or monthly — whichever fits your routine.", icon: "calendar" },
  { id: 6, title: "Online Payment", description: "Pay securely with UPI, card, net banking or wallet.", icon: "card" },
  { id: 7, title: "Invoice Generated", description: "Instant GST invoice sent to your email and dashboard.", icon: "receipt" },
  { id: 8, title: "Daily Fruit Delivery", description: "Fresh box at your desk every morning. Enjoy!", icon: "truck" },
];

export const stats = [
  { label: "Happy Customers", value: "1000", suffix: "+" },
  { label: "Companies", value: "100", suffix: "+" },
  { label: "Boxes Delivered", value: "50000", suffix: "+" },
  { label: "Customer Satisfaction", value: "99", suffix: "%" },
];

export const whyChoose = [
  { icon: "shield", title: "Boost Immunity", desc: "Daily vitamin-rich fruits strengthen your natural defenses." },
  { icon: "pill", title: "Rich Vitamins", desc: "A curated mix of seasonal fruits packed with essential nutrients." },
  { icon: "zap", title: "High Energy", desc: "Natural sugars and soaked almonds for sustained energy." },
  { icon: "brain", title: "Improves Focus", desc: "Brain-friendly nutrition that keeps you sharp through the day." },
  { icon: "heart", title: "Supports Heart Health", desc: "Fiber and antioxidants that care for your cardiovascular system." },
  { icon: "leaf", title: "Healthy Lifestyle", desc: "A small daily habit that compounds into lasting wellness." },
];

export const companies = [
  "Nimbus Labs",
  "Vertex Software",
  "Stackmint",
  "Cloudpeak",
  "Northwind IT",
  "Quanta Systems",
  "Lumen Works",
  "Pixel Forge",
];

export const officeLocations = [
  "Nimbus Labs — Tower A, Floor 4",
  "Nimbus Labs — Tower B, Floor 2",
  "Vertex Software — Reception, Ground Floor",
  "Stackmint — Co-working Wing, Floor 3",
  "Cloudpeak — Campus 1, Block C",
  "Northwind IT — Main Building, Floor 5",
];

export type DeliveryRecord = {
  id: string;
  date: string;
  status: "Delivered" | "Cancelled" | "Holiday";
  items: string;
  invoice: string;
};

export const deliveryHistory: DeliveryRecord[] = [
  { id: "d1", date: "2026-07-28", status: "Delivered", items: "Apple, Banana, Almonds", invoice: "INV-2026-0728" },
  { id: "d2", date: "2026-07-25", status: "Delivered", items: "Orange, Grapes, Almonds", invoice: "INV-2026-0725" },
  { id: "d3", date: "2026-07-24", status: "Cancelled", items: "—", invoice: "—" },
  { id: "d4", date: "2026-07-21", status: "Delivered", items: "Papaya, Kiwi, Almonds", invoice: "INV-2026-0721" },
  { id: "d5", date: "2026-07-18", status: "Holiday", items: "—", invoice: "—" },
  { id: "d6", date: "2026-07-17", status: "Delivered", items: "Watermelon, Apple, Almonds", invoice: "INV-2026-0717" },
];

export type Invoice = {
  id: string;
  number: string;
  date: string;
  amount: number;
  status: "Paid" | "Pending";
  transactionId: string;
};

export const invoices: Invoice[] = [
  { id: "i1", number: "INV-2026-0728", date: "2026-07-28", amount: 2299, status: "Paid", transactionId: "TXN88421937" },
  { id: "i2", number: "INV-2026-0628", date: "2026-06-28", amount: 2299, status: "Paid", transactionId: "TXN88110284" },
  { id: "i3", number: "INV-2026-0528", date: "2026-05-28", amount: 2299, status: "Paid", transactionId: "TXN87794420" },
];

// Premium Pexels imagery
export const heroImages = {
  // Actual FruitBoost product images (uploaded)
  box: "/images/ChatGPT_Image_Jul_28,_2026,_10_10_09_PM.png",
  boxPremium: "/images/2c0502dd-4fcc-47e6-a6f5-012f0bc6fa35.png",
  // Supporting images
  office: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1200",
  fruitsSpread: "https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=1600",
  team: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1200",
  founder: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=800",
};

export const lifestyleGallery = [
  "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800",
];
