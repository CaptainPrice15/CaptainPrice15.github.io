import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollProgress } from "@/components/scroll-progress";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Gourab Das | Software Engineer & Team Lead",
    template: "%s | Gourab Das",
  },
  description:
    "Portfolio of Gourab Das — Team Lead and Software Engineer specializing in system reliability, automation, .NET, Python, and enterprise-scale solutions.",
  keywords: [
    "Gourab Das",
    "Software Engineer",
    "Team Lead",
    ".NET",
    "Python",
    "Next.js",
    "Portfolio",
    "Cognizant",
  ],
  authors: [{ name: "Gourab Das" }],
  openGraph: {
    title: "Gourab Das | Software Engineer & Team Lead",
    description:
      "Building reliable systems, automation & modern website designs.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ScrollProgress />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
