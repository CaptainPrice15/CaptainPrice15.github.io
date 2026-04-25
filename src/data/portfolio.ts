export const portfolioData = {
  hero: {
    name: "Gourab Das",
    title: "Software Engineer | Team Lead",
    headline: "Building Reliable Systems & Automation for Enterprise Applications",
    subtext: "Team Lead with expertise in .NET, automation, monitoring, and production support.",
  },
  about: {
    story: "I am a Software Engineer and Team Lead with 4.5 years of experience specializing in enterprise systems, production support, and automation. Currently leading a production support team for a major US retail client working on NCR POS systems. I focus on system reliability, operational efficiency, and building automation tools that save time and reduce errors.",
    highlights: [
      "Leadership: Guiding a production support team, ensuring SLA adherence and smooth operations.",
      "Automation Mindset: Leveraging Python and PowerShell to automate repetitive tasks and build reliable pipelines.",
      "System Reliability: Implementing robust monitoring solutions using ELK/Kibana to proactively identify and resolve issues.",
    ],
  },
  skills: {
    backend: [".NET", "C#", "ASP.NET", "REST APIs"],
    database: ["SQL Server", "MongoDB"],
    automation: ["Python", "PowerShell"],
    monitoring: ["ELK Stack", "Kibana"],
    tools: ["Windows", "Linux", "Git"],
  },
  projects: [
    {
      id: "project-1",
      title: "Enterprise Log Analysis & Monitoring",
      description: "Implemented a comprehensive monitoring solution using the ELK Stack to aggregate and analyze logs from various POS systems. Reduced average MTTR (Mean Time To Recovery) significantly.",
      tech: ["ELK Stack", "PowerShell", "Linux"],
      github: "#",
      live: "#",
      type: "Monitoring",
    },
    {
      id: "project-2",
      title: "Automated Deployment Pipeline",
      description: "Developed automated scripting tools using PowerShell and Python to streamline the deployment of updates across hundreds of retail node endpoints.",
      tech: ["Python", "PowerShell", "Windows"],
      github: "#",
      live: "#",
      type: "Automation",
    },
    {
      id: "project-3",
      title: "Backend API for Inventory Sync",
      description: "Built robust RESTful APIs in .NET Core to synchronize inventory data between the central database and edge POS systems securely.",
      tech: [".NET Core", "C#", "SQL Server"],
      github: "#",
      live: "#",
      type: "Backend",
    }
  ],
  experience: [
    {
      company: "Cognizant Technology Solutions",
      role: "Team Lead",
      period: "2023 - Present",
      description: "Leading a dedicated production support team for a US retail client. Focused on NCR POS systems, system reliability, SLA management, and process automation.",
    },
    {
      company: "Cognizant Technology Solutions",
      role: "Enterprise Support Engineer",
      period: "2020 - 2023",
      description: "Provided critical tier-2/3 support for enterprise retail applications. Developed automation scripts to handle routine maintenance and data extraction tasks.",
    }
  ],
  contact: {
    email: "gourabdas.13@gmail.com",
    linkedin: "https://www.linkedin.com/in/gourab-das-4078431b8/",
    phone: "+91 8274987485",
  }
};
