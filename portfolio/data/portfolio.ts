// All portfolio data — populated with real resume content for Bebin R

export const personalInfo = {
  name: "Bebin R",
  firstName: "Bebin",
  title: "AI & Data Science Student | Full Stack Developer | ML Enthusiast",
  headline: "I build end-to-end Machine Learning pipelines & scalable web applications.",
  bio: "I am an Artificial Intelligence & Data Science student and Full Stack Developer based in Coimbatore, Tamil Nadu. With practical experience as a Machine Learning Intern at Techvolt Software, I specialize in building data preprocessing workflows, model training pipelines, and modern web applications.",
  bio2: "Seeking roles in AI, Data Science, Machine Learning, and Full Stack Development to apply technical expertise, contribute to innovative projects, and grow as a technology professional.",
  philosophy: "I believe practical, project-based engineering bridges theoretical AI concepts with production-ready solutions.",
  email: "bbebinr@gmail.com",
  phone: "+91 88073 36368",
  github: "https://github.com/Bebin-Tech",
  linkedin: "https://linkedin.com/in/bebinr",
  location: "Coimbatore, Tamil Nadu, India",
  availableForWork: true,
  resumeUrl: "/resume.pdf",
};

export const skills = {
  frontend: [
    { name: "HTML5", icon: "SiHtml5", color: "#E34F26" },
    { name: "CSS3", icon: "SiCss", color: "#1572B6" },
    { name: "JavaScript", icon: "SiJavascript", color: "#F7DF1E" },
    { name: "React", icon: "SiReact", color: "#61DAFB" },
    { name: "Dart", icon: "SiDart", color: "#0175C2" },
    { name: "Flutter", icon: "SiFlutter", color: "#02569B" },
  ],
  backend: [
    { name: "Python", icon: "SiPython", color: "#3776AB" },
    { name: "Machine Learning", icon: "SiScikitlearn", color: "#F7931E" },
    { name: "Artificial Intelligence", icon: "SiOpenai", color: "#10A37F" },
    { name: "Node.js", icon: "SiNodedotjs", color: "#339933" },
    { name: "REST APIs", icon: "SiPostman", color: "#FF6C37" },
  ],
  database: [
    { name: "MySQL", icon: "SiMysql", color: "#4479A1" },
    { name: "PostgreSQL", icon: "SiPostgresql", color: "#4169E1" },
  ],
  tools: [
    { name: "Git", icon: "SiGit", color: "#F05032" },
    { name: "GitHub", icon: "SiGithub", color: "#ffffff" },
    { name: "VS Code", icon: "SiVscodium", color: "#007ACC" },
    { name: "Docker", icon: "SiDocker", color: "#2496ED" },
  ],
};

export const projects = [
  {
    id: 1,
    title: "KAHE Task Management System",
    description:
      "Developed a comprehensive task management platform for students and faculty to assign, track, and update tasks. Features role-based authentication for admins, faculty, and students with a real-time progress dashboard.",
    image: "/images/project-tasks.jpg",
    tech: ["React", "JavaScript", "Node.js", "MySQL", "Tailwind CSS"],
    github: "https://github.com/Bebin-Tech/kahe-task-management",
    live: "https://task-management.bebintech.dev",
    featured: true,
  },
  {
    id: 2,
    title: "KAHE Classroom Management System",
    description:
      "Built a modern system to manage classroom schedules, resources, and attendance records. Enabled faculty to track student attendance and performance efficiently through an intuitive, responsive interface.",
    image: "/images/project-saas.jpg",
    tech: ["React", "Python", "MySQL", "REST APIs", "Tailwind CSS"],
    github: "https://github.com/Bebin-Tech/kahe-classroom-management",
    live: "https://classroom.bebintech.dev",
    featured: true,
  },
  {
    id: 3,
    title: "End-to-End ML Pipeline Solution",
    description:
      "Automated Machine Learning pipeline covering data ingestion, feature engineering, missing-value imputation, outlier detection, hyperparameter tuning, and cross-validation performance evaluation.",
    image: "/images/project-finance.jpg",
    tech: ["Python", "Machine Learning", "Scikit-Learn", "Pandas", "MySQL"],
    github: "https://github.com/Bebin-Tech/ml-pipeline-solution",
    live: "https://ml-pipeline.bebintech.dev",
    featured: false,
  },
  {
    id: 4,
    title: "Flutter Cross-Platform Mobile App",
    description:
      "Cross-platform mobile application built with Flutter and Dart featuring clean responsive UI layout, state management, REST API connectivity, and seamless mobile app user experience.",
    image: "/images/project-chat.jpg",
    tech: ["Flutter", "Dart", "REST APIs", "Mobile App Development"],
    github: "https://github.com/Bebin-Tech/flutter-mobile-app",
    live: "https://flutter-app.bebintech.dev",
    featured: false,
  },
  {
    id: 5,
    title: "E-Commerce Platform Solution",
    description:
      "A full-featured e-commerce web application with product cataloging, shopping cart management, user authentication, and responsive user interface.",
    image: "/images/project-ecommerce.jpg",
    tech: ["React", "JavaScript", "Node.js", "MySQL", "CSS3"],
    github: "https://github.com/Bebin-Tech/ecommerce-platform",
    live: "https://shop.bebintech.dev",
    featured: false,
  },
];

export const experience = [
  {
    id: 1,
    company: "Techvolt Software, Coimbatore",
    role: "Machine Learning Intern",
    type: "Internship",
    duration: "May 2026 – Present",
    location: "Coimbatore, Tamil Nadu",
    description: [
      "Designed and executed end-to-end Machine Learning pipelines in Python, covering data ingestion, feature engineering, model training, and performance evaluation.",
      "Applied supervised learning algorithms to real-world datasets; improved model accuracy through iterative hyperparameter tuning and cross-validation strategies.",
      "Performed comprehensive data preprocessing workflows including missing-value imputation, outlier detection, normalisation, and categorical encoding on structured datasets.",
      "Delivered practical, project-based ML solutions that bridged theoretical concepts with production-ready implementation, receiving positive feedback from mentors.",
    ],
    achievements: ["End-to-End ML Pipelines", "Hyperparameter Optimization", "Production Ready ML"],
  },
  {
    id: 2,
    company: "Karpagam Academy of Higher Education",
    role: "AI & Data Science Student",
    type: "Academic",
    duration: "2025 – Present",
    location: "Coimbatore, Tamil Nadu",
    description: [
      "Pursuing a Bachelor of Science in Artificial Intelligence & Data Science while building hands-on ML and full-stack web and mobile projects.",
      "Developed KAHE Task Management System with role-based authentication and real-time task progress monitoring.",
      "Engineered KAHE Classroom Management System for efficient classroom scheduling and attendance tracking.",
    ],
    achievements: ["B.Sc AI & DS", "Full Stack & ML Developer", "Academic Excellence"],
  },
];

export const education = {
  degree: {
    title: "B.Sc. Artificial Intelligence & Data Science",
    institution: "Karpagam Academy of Higher Education",
    location: "Coimbatore, Tamil Nadu, India",
    duration: "2025 – Present (Expected 2028)",
    description: "Specializing in Artificial Intelligence, Machine Learning pipelines, Data Science methodologies, Full Stack Web Development, and Mobile Application Development.",
    gpa: "First Class",
  },
  certifications: [
    {
      title: "Machine Learning Internship Certificate",
      issuer: "Techvolt Software, Coimbatore",
      date: "2026",
      color: "#06b6d4",
    },
    {
      title: "Full Stack & Mobile App Development",
      issuer: "KAHE / Self-Driven",
      date: "2025",
      color: "#3b82f6",
    },
    {
      title: "Python Data Science & Supervised Learning",
      issuer: "Certification Course",
      date: "2025",
      color: "#8b5cf6",
    },
  ],
};

export const githubData = {
  username: "Bebin-Tech",
  stats: {
    repos: 18,
    stars: 45,
    followers: 28,
    contributions: 420,
  },
  repos: [
    {
      name: "kahe-task-management",
      description: "Task management platform for students and faculty with role-based authentication",
      language: "JavaScript",
      languageColor: "#F7DF1E",
      stars: 18,
      forks: 5,
      url: "https://github.com/Bebin-Tech/kahe-task-management",
    },
    {
      name: "kahe-classroom-management",
      description: "Classroom scheduling and attendance management system for faculty",
      language: "Python",
      languageColor: "#3776AB",
      stars: 14,
      forks: 4,
      url: "https://github.com/Bebin-Tech/kahe-classroom-management",
    },
    {
      name: "ml-pipeline-solution",
      description: "End-to-end Machine Learning data ingestion and model training pipeline",
      language: "Python",
      languageColor: "#3776AB",
      stars: 12,
      forks: 3,
      url: "https://github.com/Bebin-Tech/ml-pipeline-solution",
    },
  ],
};
