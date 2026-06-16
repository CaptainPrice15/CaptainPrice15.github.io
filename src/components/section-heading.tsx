import { cn } from "@/lib/utils";

export function SectionHeading({
  title,
  subtitle,
  className,
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn("text-center mb-10 sm:mb-12 md:mb-16", className)}>
      {subtitle && (
        <span className="text-xs sm:text-sm font-semibold text-primary tracking-widest uppercase mb-2 sm:mb-3 block">
          {subtitle}
        </span>
      )}
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">{title}</h2>
      <div className="h-1 w-16 sm:w-20 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
    </div>
  );
}
