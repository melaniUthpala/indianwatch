import { AnimatePresence, motion } from "motion/react";
import type { Frame } from "@/config/frames";
import LiquidGlassCard from "./LiquidGlassCard";

export default function FrameText({ frame, visible }: { frame: Frame; visible: boolean }) {
  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key={frame.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ maxWidth: 300, pointerEvents: "auto" }}
        >
          <LiquidGlassCard>
            {frame.chapter && (
              <p className="label-small" style={{ color: "#F2D28B", marginBottom: "1rem" }}>{frame.chapter}</p>
            )}
            <h2 className="display-heading" style={{ fontSize: "clamp(24px, 3vw, 40px)", marginBottom: "1rem" }}>{frame.title}</h2>
            <p style={{ fontFamily: "Inter", fontSize: 13, fontWeight: 300, lineHeight: 1.75, color: "rgba(246,243,240,0.7)" }}>{frame.subtitle}</p>
          </LiquidGlassCard>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
