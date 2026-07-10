import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Newscanflow - QR & Barcode Scanner",
    description:
      "Designed, developed, and published a versatile QR code and Barcode scanner + generator application for Android. Features AI-powered suggestions to help users understand scanned content and take relevant actions, all wrapped in a clean Material Design interface.",
    tech: ["Android (Kotlin/Java)", "Android Studio", "Material Design", "CameraX/ML Kit"],
    github: "https://github.com/gourab-das/newscanflow-android",
    live: "https://play.google.com/store/apps/details?id=com.newscanflow.app",
    type: "Mobile",
    coverGradient: "from-teal-400/30 via-cyan-400/20 to-blue-400/30",
    iconEmoji: "📱",
    highlights: [
      "Published on Google Play Store",
      "AI-powered suggestions from scanned codes",
      "Generate and share custom QR codes",
      "Clean Material Design UI with responsive layouts",
    ],
    challenges: [
      "Optimizing real-time camera-based scanning for speed and accuracy",
      "Designing intuitive UX for both scanning and generation flows",
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
    coverGradient: "from-blue-500/30 via-cyan-500/20 to-indigo-500/30",
    iconEmoji: "📊",
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
    coverGradient: "from-amber-500/30 via-orange-500/20 to-yellow-500/30",
    iconEmoji: "🚀",
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
    coverGradient: "from-emerald-500/30 via-green-500/20 to-teal-500/30",
    iconEmoji: "⚙️",
    highlights: [
      "Handled 10k+ SKUs with sub-second sync latency",
      "Implemented optimistic concurrency control to prevent data loss",
    ],
    challenges: [
      "Managing conflict resolution during network partitions",
      "Designing efficient batch sync algorithms",
    ],
  },
];
