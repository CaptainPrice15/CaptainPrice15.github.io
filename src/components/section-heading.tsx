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
    <div className={cn("text-center mb-16", className)}>
      {subtitle && (
        <span className="text-sm font-semibold text-primary tracking-widest uppercase mb-3 block">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
      <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
    </div>
  );
}
