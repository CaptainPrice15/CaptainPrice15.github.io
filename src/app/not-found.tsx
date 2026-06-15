"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[60vh]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center px-4"
      >
        <h1 className="text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-4">
          404
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Page not found. It may have been moved or does not exist.
        </p>
        <Button asChild size="lg" className="rounded-full">
          <Link href="/">
            <Home className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}
