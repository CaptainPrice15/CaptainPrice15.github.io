import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 sm:mb-12 md:mb-16 max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <span className="eyebrow mb-3 sm:mb-4 block justify-center">
          <span className="eyebrow-dot" aria-hidden="true" />
          {eyebrow}
        </span>
      )}
      {subtitle && !eyebrow && (
        <span className="text-xs sm:text-sm font-semibold text-primary tracking-widest uppercase mb-2 sm:mb-3 block">
          {subtitle}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      <div
        className={cn(
          "mt-4 h-1 w-16 sm:w-20 rounded-full bg-gradient-to-r from-primary to-accent",
          align === "center" ? "mx-auto" : ""
        )}
      />
    </div>
  );
}
