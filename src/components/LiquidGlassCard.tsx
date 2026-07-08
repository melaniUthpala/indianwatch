import { motion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  borderRadius?: number;
  blurIntensity?: "sm" | "md" | "lg" | "xl";
}

const blurMap = { sm: "backdrop-blur-sm", md: "backdrop-blur-md", lg: "backdrop-blur-lg", xl: "backdrop-blur-xl" };

export default function LiquidGlassCard({ children, className, style, borderRadius = 20, blurIntensity = "lg" }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      style={{
        borderRadius,
        boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(242,210,139,0.05)",
        ...style,
      }}
      className={cn("relative bg-black/25 border border-white/10", blurMap[blurIntensity])}
    >
      <div
        className="relative"
        style={{
          borderRadius,
          boxShadow: "inset 1px 1px 0 rgba(255,255,255,0.12), inset -1px -1px 0 rgba(0,0,0,0.3)",
          padding: "1.75rem",
        }}
      >
        <div className={cn(className)}>{children}</div>
      </div>
    </motion.div>
  );
}
