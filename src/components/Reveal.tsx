import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({ children, delay = 0, y = 20, className = "" }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type TagColor = "green" | "yellow" | "red" | "light";

const tagClass: Record<TagColor, string> = {
  green: "bg-green-100 text-brand-green",
  yellow: "bg-yellow-100 text-brand-yellow",
  red: "bg-red-100 text-brand-red",
  light: "bg-light-green-100 text-brand-light",
};

export function SectionHeading({ tag, title, subtitle, center = true, tagColor = "green" }: { tag?: string; title: string; subtitle?: string; center?: boolean; tagColor?: TagColor }) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {tag && <span className={`inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest ${tagClass[tagColor]}`}>{tag}</span>}
      <h2 className="h2 mt-4">{title}</h2>
      {subtitle && <p className="body mt-3">{subtitle}</p>}
    </Reveal>
  );
}
