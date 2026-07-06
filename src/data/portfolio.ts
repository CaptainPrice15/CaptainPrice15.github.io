import type { PortfolioData } from "@/lib/types";

export const portfolioData: PortfolioData = {
  hero: {
    name: "Gourab Das",
    title: "Software Engineer | Android & Backend Developer",
    headline:
      "Building Reliable Systems, Android Apps & Modern Web Experiences",
    subtext:
      "Software Engineer with expertise in .NET, Android development, Python, automation, and modern web technologies. Published an app on the Google Play Store.",
  },
  about: {
    story:
      "I'm a Software Engineer at Cognizant Technology Solutions with 4.5 years of experience in enterprise systems, production support, and automation. I also develop Android applications and have published an app on the Google Play Store.\n\nMy strength is backend development with .NET, building modular, production-ready solutions like file monitoring, workflow automation, and background services. I also work on system-level design, including cloud sync, configuration management, and self-running applications.\n\nRecently, I've expanded into full-stack development, modern deployment, and Android app development using Kotlin and Java. My goal is to build scalable products—especially in automation, AI, and mobile technologies—that deliver real-world value.",
    highlights: [
      "Leadership: Guiding a production support team of engineers, ensuring strict SLA adherence, incident resolution, and smooth continuous operations for enterprise applications.",
      "Android Development: Built and published a news aggregation app on the Google Play Store, demonstrating full mobile app lifecycle from development to deployment.",
      "Automation Mindset: Leveraging Python and PowerShell to automate repetitive tasks, reduce manual toil, and build reliable deployment and reporting pipelines.",
      "Agentic AI Expertise: Building and utilizing AI-driven tools (Claude, Codex, Gemini) for code generation, task automation, and intelligent system monitoring.",
      "System Reliability: Implementing robust monitoring solutions using ELK/Kibana to proactively identify and resolve issues.",
    ],
  },
  skills: {
    backend: [".NET", "C#", "ASP.NET", "REST APIs"],
    database: ["SQL Server", "MongoDB"],
    automation: ["Python", "PowerShell", "Power Automate"],
    ai: ["AI Agent Coding (Claude, Codex, Gemini)"],
    monitoring: ["ELK Stack", "Kibana"],
    tools: ["Windows", "Linux", "Git"],
    mobile: ["Android (Kotlin/Java)", "Android Studio", "Material Design"],
  },
  projects: [
    {
      id: "project-1",
      title: "Newscanflow - News App",
      description:
        "Designed, developed, and published a full-featured news aggregation application for Android. The app collects and presents news from multiple sources with a clean, intuitive interface built with Material Design.",
      tech: ["Android (Kotlin/Java)", "Android Studio", "Material Design"],
      github: "https://github.com/gourab-das/newscanflow-android",
      live: "https://play.google.com/store/apps/details?id=com.newscanflow.app",
      type: "Mobile",
      highlights: [
        "Published on Google Play Store",
        "Clean Material Design UI with responsive layouts",
      ],
      challenges: [
        "Optimizing news feed aggregation for mobile performance",
        "Implementing smooth UX with Android best practices",
      ],
    },
    {
      id: "project-2",
      title: "Enterprise Log Analysis & Monitoring",
      description:
        "Implemented a comprehensive monitoring solution using the ELK Stack to aggregate and analyze logs from various POS systems. Reduced average MTTR (Mean Time To Recovery) significantly.",
      tech: ["ELK Stack", "PowerShell", "Linux"],
      github: "https://github.com/gourab-das/enterprise-log-monitoring",
      live: "#",
      type: "Monitoring",
      highlights: [
        "Reduced MTTR by 40% with centralized log aggregation",
        "Automated alert routing via PowerShell scripts",
      ],
      challenges: [
        "Handling high volume of POS log data in real-time",
        "Designing scalable index patterns in Elasticsearch",
      ],
    },
    {
      id: "project-3",
      title: "Automated Deployment Pipeline",
      description:
        "Developed automated scripting tools using PowerShell and Python to streamline the deployment of updates across hundreds of retail node endpoints.",
      tech: ["Python", "PowerShell", "Windows"],
      github: "https://github.com/gourab-das/auto-deployment-pipeline",
      live: "#",
      type: "Automation",
      highlights: [
        "Cut deployment time from 4 hours to 45 minutes",
        "Zero-downtime rolling update strategy",
      ],
      challenges: [
        "Ensuring rollback capability on failure",
        "Coordinating updates across geographically distributed endpoints",
      ],
    },
    {
      id: "project-4",
      title: "Backend API for Inventory Sync",
      description:
        "Built robust RESTful APIs in .NET Core to synchronize inventory data between the central database and edge POS systems securely.",
      tech: [".NET Core", "C#", "SQL Server"],
      github: "https://github.com/gourab-das/inventory-sync-api",
      live: "#",
      type: "Backend",
      highlights: [
        "Handled 10k+ SKUs with sub-second sync latency",
        "Implemented optimistic concurrency control to prevent data loss",
      ],
      challenges: [
        "Managing conflict resolution during network partitions",
        "Designing efficient batch sync algorithms",
      ],
    },
  ],
  experience: [
    {
      company: "Cognizant Technology Solutions",
      role: "Software Engineer / Team Lead",
      period: "Sep 2021 - Present (4.5+ years)",
      description:
        "Progressed from Programmer Analyst Trainee to Support Team Lead across multiple roles. Grew from junior development and testing to leading a production support team for a US retail client on NCR POS systems. Key focus areas include backend service development, automation, monitoring, incident resolution, SLA management, and team leadership.",
    },
  ],
  contact: {
    email: "gourabdas.13@gmail.com",
    linkedin: "https://www.linkedin.com/in/gourab-das-4078431b8/",
    phone: "+91 8274987485",
    github: "https://github.com/gourab-das",
  },
};
