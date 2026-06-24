// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth for site content.
// Edit this file to update the portfolio – no component changes required.
// ─────────────────────────────────────────────────────────────────────────────

const experienceYears = Math.max(1, new Date().getFullYear() - 2021);

export const profile = {
  name: "Muhammad Bilal",
  firstName: "Muhammad",
  lastName: "Bilal",
  role: "Full Stack Developer",
  tagline: "Software Engineer · MERN · Cloud",
  location: "Lahore, Pakistan",
  availability: "Available for new projects",
  email: "bilaltayyab121@gmail.com",
  phone: "+92 322 0456775",
  // resumeUrl: "/Muhammad_Bilal_Resume.pdf",
  shortIntro:
    "I craft elegant digital experiences with modern web technologies. I'm a passionate full-stack developer with experience building scalable applications across the MERN stack and the cloud.",
  longIntro: [
    `I'm a passionate full-stack developer with over ${experienceYears}+ years of experience creating digital solutions that make a difference. My journey started with a curiosity about how websites work, and it has evolved into a deep expertise in modern web technologies.`,
    "I specialize in building scalable applications using React, Node.js and cloud technologies. Whether it is architecting microservices, optimizing database performance, or crafting pixel-perfect user interfaces, I bring both technical expertise and creative problem-solving to every project.",
    "When I'm not coding, you'll find me contributing to open-source projects, mentoring junior developers, or exploring the latest tech trends. I believe in continuous learning and sharing knowledge with the community.",
  ],
  quote: {
    text: "Clean code always looks like it was written by someone who cares.",
    author: "Robert C. Martin",
  },
};

export const stats = [
  { label: "Projects", value: "50+" },
  { label: "Years Experience", value: `${experienceYears}+` },
  { label: "Technologies", value: "15+" },
  { label: "Happy Clients", value: "20+" },
];

export const socials = [
  {
    name: "GitHub",
    href: "https://github.com/bilaltayyab121",
    icon: "Github",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/bilaltayyab121/",
    icon: "Linkedin",
  },
  {
    name: "Fiverr",
    href: "https://www.fiverr.com/bilaltayyab121",
    icon: "Fiverr",
  },
  {
    name: "Upwork",
    href: "https://www.upwork.com/freelancers/~bilaltayyab121",
    icon: "Upwork",
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/923220456775",
    icon: "WhatsApp",
  },
  {
    name: "Email",
    href: "mailto:bilaltayyab121@gmail.com",
    icon: "Mail",
  },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "#contact" },
];

export const serviceOptions = [
  "Web Development",
  "Mobile App Development",
  "UI / UX Design",
  "E-commerce Solutions",
  "API & Backend Services",
  "WordPress Development",
  "Bubble Development",
];

export const services = [
  {
    id: "web-dev",
    title: "Web Development",
    description:
      "Building fast, responsive and scalable web applications with modern React and Node.js stacks.",
    icon: "Monitor",
  },
  {
    id: "mobile-dev",
    title: "Mobile App Development",
    description:
      "Creating mobile-friendly and progressive experiences that work seamlessly across devices.",
    icon: "Smartphone",
  },
  {
    id: "ui-ux",
    title: "UI / UX Design",
    description:
      "Designing polished interfaces and user journeys that convert visitors into customers.",
    icon: "Layout",
  },
  {
    id: "backend-api",
    title: "API & Backend Services",
    description:
      "Developing secure APIs, integrations, and cloud-ready backend systems for production apps.",
    icon: "Server",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Skills — grouped into 4 categories with Lucide icon names + tailwind hues.
// ─────────────────────────────────────────────────────────────────────────────
export const skillCategories = [
  {
    id: "frontend",
    title: "Frontend",
    icon: "Layout",
    accent: "from-indigo-500 to-violet-500",
    description:
      "Pixel-perfect, accessible interfaces that feel fast and look premium.",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "Vue.js",
      "Redux Toolkit",
      "Framer Motion",
    ],
  },
  {
    id: "backend",
    title: "Backend",
    icon: "Server",
    accent: "from-cyan-500 to-blue-500",
    description: "Robust APIs, real-time systems and secure auth flows.",
    items: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "GraphQL",
      "Socket.io",
      "JWT / OAuth",
      "Microservices",
    ],
  },
  {
    id: "database",
    title: "Database",
    icon: "Database",
    accent: "from-emerald-500 to-teal-500",
    description: "Modeling, optimization and scalable data layers.",
    items: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Mongoose", "Prisma"],
  },
  {
    id: "tools",
    title: "Tools & DevOps",
    icon: "Wrench",
    accent: "from-fuchsia-500 to-pink-500",
    description: "Shipping reliably with modern workflows and cloud infra.",
    items: [
      "Git & GitHub",
      "Docker",
      "AWS",
      "CI/CD",
      "Vercel",
      "Postman",
      "Figma",
      "Linux",
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Work experience — sourced from the reference portfolio. Newest first.
// ─────────────────────────────────────────────────────────────────────────────
export const experiences = [
  {
    id: "hashlogics",
    role: "Software Engineer",
    company: "Hashlogics",
    type: "Full-time",
    location: "Lahore, Pakistan",
    period: "Mar 2025 — Present",
    stack: ["React", "Node.js", "AWS", "PostgreSQL", "Docker", "Redis"],
    responsibilities: [
      "Led development of microservices architecture serving 1M+ users.",
      "Mentored a team of 5 junior developers and established code-review processes.",
      "Implemented CI/CD pipelines that reduced deployment time by 70%.",
      "Architected a real-time notification system using WebSockets and Redis.",
    ],
  },
  {
    id: "vidaflow",
    role: "MERN Stack Developer",
    company: "VidaFlow",
    type: "Contract",
    location: "Remote",
    period: "Nov 2024 — Mar 2025",
    stack: [
      "React",
      "React Native",
      "Node.js",
      "Express.js",
      "MongoDB",
      "TypeScript",
    ],
    responsibilities: [
      "Designed and developed a comprehensive School Management System using the MERN stack.",
      "Implemented secure user authentication and role-based access control.",
      "Developed RESTful APIs for seamless CRUD operations.",
      "Built a React Native mobile application for attendance tracking and notifications.",
      "Designed and integrated an analytics dashboard for real-time reporting.",
    ],
  },
  {
    id: "tsf",
    role: "Junior Web Developer",
    company: "The Social Face",
    type: "Full-time",
    location: "Lahore, Pakistan",
    period: "2021 — 2022",
    stack: ["HTML", "CSS", "JavaScript", "React", "Git"],
    responsibilities: [
      "Developed responsive websites using HTML, CSS and JavaScript.",
      "Collaborated with senior developers on React-based projects.",
      "Participated in Agile development processes and daily standups.",
      "Ensured optimal performance and UX through responsive design techniques.",
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Projects — featured + secondary. Add or edit freely.
// ─────────────────────────────────────────────────────────────────────────────
export const projects = [
  {
    id: "ecommerce",
    title: "Cars 365 Studio",
    category: "Web App",
    featured: true,
    description:
      "A modern, scalable e-commerce platform with Stripe integration, real-time inventory management, advanced search and a fully responsive storefront.",
    tech: ["React.js", "Node.js", "MongoDB", "Express.js", "Tailwind CSS"],
    image: "/Cars365Studio.PNG",
    cover: "from-indigo-500 via-violet-500 to-fuchsia-500",
    liveUrl: "https://cars365studio.com/",
    repoUrl: "#",
  },
  {
    id: "Habibi-Pita",
    title: "Habibi Pita",
    category: "Web App",
    featured: true,
    description:
      "Collaborative task manager with real-time updates, drag-and-drop boards and granular team permissions.",
    tech: ["React", "Node.js", "Socket.io", "MongoDB", "Redux"],
    image: "Habibi Pita.PNG",
    cover: "from-cyan-500 via-sky-500 to-indigo-500",
    liveUrl: "https://habibi-pita.vercel.app/",
    repoUrl: "#",
  },
  {
    id: "Finance-Dashboard",
    title: "Money Map 180 Dashboard",
    category: "Dashboard",
    featured: true,
    description:
      "Advanced analytics dashboard with ML-powered insights, beautiful data visualisation and predictive analytics for business intelligence.",
    tech: ["Bubble.io"],
    image: "Money Map 180.PNG",
    cover: "from-emerald-500 via-teal-500 to-cyan-500",
    liveUrl: "https://moneymap180.com/",
  },
  {
    id: "sms",
    title: "Sparqe",
    category: "Full Stack",
    featured: false,
    description:
      "End-to-end school management with role-based dashboards, attendance tracking, payroll and an analytics module.",
    tech: ["Bubble.io"],
    image: "Sparqe.PNG",
    cover: "from-rose-500 via-pink-500 to-fuchsia-500",
    liveUrl: "https://sparqe.net/",
    repoUrl: "#",
  },
  {
    id: "banking",
    title: "Mobile Banking App",
    category: "Mobile",
    featured: false,
    description:
      "Secure mobile banking with biometric authentication, real-time transactions and Plaid integration.",
    tech: ["React Native", "Node.js", "PostgreSQL", "Plaid API"],
    image: "",
    cover: "from-amber-500 via-orange-500 to-rose-500",
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    id: "social",
    title: "Social Media Platform",
    category: "Web App",
    featured: false,
    description:
      "Full-featured social platform with real-time messaging, content sharing and a personalised feed.",
    tech: ["Vue.js", "Express.js", "MongoDB", "Socket.io"],
    image: "",
    cover: "from-violet-500 via-purple-500 to-indigo-500",
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    id: "lms",
    title: "Learning Management System",
    category: "Full Stack",
    featured: false,
    description:
      "Comprehensive LMS with video streaming, interactive quizzes, certificates and progress tracking.",
    tech: ["Next.js", "Prisma", "PostgreSQL", "AWS S3"],
    image: "",
    cover: "from-sky-500 via-blue-500 to-violet-500",
    liveUrl: "#",
    repoUrl: "#",
  },
];

export const projectFilters = ['All', 'Web App', 'Full Stack', 'Dashboard', 'Mobile'];
