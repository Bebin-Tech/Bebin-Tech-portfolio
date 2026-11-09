// All portfolio data — populated with real resume content for Bebin R

export const personalInfo = {
  name: "Bebin R",
  firstName: "Bebin",
  title: "AI & Data Science Student | Full Stack Developer | ML Enthusiast",
  headline: "I build web applications and explore machine learning with Python.",
  bio: "I am an Artificial Intelligence & Data Science student and Full Stack Developer based in Coimbatore, Tamil Nadu. With practical experience as a Machine Learning Intern at Techvolt Software, I work on data preprocessing, model training, and web applications.",
  bio2: "Seeking roles in AI, Data Science, Machine Learning, and Full Stack Development to apply technical expertise, contribute to innovative projects, and grow as a technology professional.",
  philosophy: "I learn by building projects, testing assumptions, and documenting what works.",
  email: "bbebinr@gmail.com",
  phone: "+91 88073 36368",
  github: "https://github.com/Bebin-Tech",
  instagram: "https://www.instagram.com/bebin.tech/",
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
  ],
  backend: [
    { name: "Django", icon: "SiDjango", color: "#44b78b" },
    { name: "Flask", icon: "SiFlask", color: "#9ca3af" },
    { name: "Python", icon: "SiPython", color: "#3776AB" },
    { name: "Machine Learning", icon: "SiScikitlearn", color: "#F7931E" },
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

export type Project = { id:number; title:string; subtitle:string; featured:boolean; description:string; highlights:string[]; tech:string[]; github:string; workflow?:string[]; image?:string; imageAlt?:string; demo?:string; writeup?:string };
export const projects: Project[] = [
  {
    id: 1,
    title: "KAHE TMS",
    workflow: ["Dean assigns", "HOD delegates", "Faculty submits", "Review & approval"],
    writeup: "/writing/kahe-task-workflow",
    subtitle: "Task Management System",
    featured: true,
    description: "An academic task platform connecting Admin, Dean, HOD, and Faculty. Coordinates department work from assignment and faculty submissions through multi-level review and final approval.",
    highlights: ["4 user roles", "Multi-level approvals", "Task tracking & reports"],
    tech: ["React", "Django REST Framework", "JWT", "PostgreSQL"],
    github: "https://github.com/Bebin-Tech/KAHE-TMS",
  },
  {
    id: 2,
    title: "KAHE CMS",
    workflow: ["Check availability", "Reserve room", "Start session", "Release room"],
    subtitle: "Campus Management System",
    featured: true,
    description: "A campus resource platform for Karpagam Academy of Higher Education. Tracks classroom availability, manages room reservations, and coordinates class sessions with conflict detection and availability notifications.",
    highlights: ["Classroom availability", "Room booking & queues", "Campus administration"],
    tech: ["React", "Django REST Framework", "MySQL", "Tailwind CSS"],
    github: "https://github.com/Bebin-Tech/KAHE-CMS.",
  },
  {
    id: 3,
    title: "SHK Connect",
    workflow: ["Team channels", "Messages & files", "Threads", "Read receipts"],
    subtitle: "Company Management System",
    featured: false,
    description: "A company workspace bringing team communication and operations together. Supports channels, direct messages, threaded conversations, file sharing, expense tracking, and support tickets.",
    highlights: ["Real-time team messaging", "Files & threaded conversations", "Expenses & tickets"],
    tech: ["React", "Flask", "SQLAlchemy", "Socket.IO"],
    github: "https://github.com/Bebin-Tech/SHK-CONNECT",
  },
  {
 id:4, title:"Student Performance Prediction", subtitle:"Machine learning · learning project", featured:false,
 description:"A linear regression experiment on generated student data using four inputs: study hours, attendance, previous marks, and sleep. Includes a dataset, exploratory plots, an 80/20 train/test split, evaluation code, and a local Streamlit interface. Synthetic-data results are not evidence of performance on real students.",
 highlights:["4 input features", "80/20 train/test split", "MAE, RMSE & R² evaluation"],
 tech:["Python", "pandas", "scikit-learn", "Streamlit"],
 github:"https://github.com/Bebin-Tech/Student-performance-pridiction-python-project",
 image:"/images/projects/student-eda.png", imageAlt:"Repository exploratory plot of study hours and final marks in generated student data",
 },
];
export const experience = [{
 id: 1, company: "Techvolt Software, Coimbatore", role: "Machine Learning Intern", type: "Internship", duration: "May 2026 – Present", location: "Coimbatore, Tamil Nadu",
 description: ["Prepare structured data in Python, including handling missing values, encoding categories, and normalizing features.", "Train and evaluate supervised learning models as part of internship projects.", "Explore feature engineering and hyperparameter tuning when comparing model performance."],
 achievements: ["Python", "Data preprocessing", "Model evaluation"],
}];

export const education = {
  degree: {
    title: "B.Sc. Artificial Intelligence & Data Science",
    institution: "Karpagam Academy of Higher Education",
    location: "Coimbatore, Tamil Nadu, India",
    duration: "2025 – Present (Expected 2028)",
    description: "Studying AI and Data Science. Academic projects include KAHE TMS for task approvals and KAHE CMS for classroom availability, room booking, and conflict detection.",
  },
};
