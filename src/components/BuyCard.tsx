import { AnimatePresence, motion } from "motion/react";
import type { Frame } from "@/config/frames";
import LiquidGlassCard from "./LiquidGlassCard";

export default function BuyCard({ frame, visible }: { frame: Frame; visible: boolean }) {
  if (!frame.price) return null;
  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key={frame.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 12 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ maxWidth: 280, pointerEvents: "auto" }}
        >
          <LiquidGlassCard>
            <p className="label-small" style={{ color: "#F2D28B", fontSize: 9, letterSpacing: "0.35em", marginBottom: "0.75rem" }}>Fragrance</p>
            <h3 className="display-heading" style={{ fontSize: 26, marginBottom: "1rem" }}>{frame.title}</h3>
            {frame.notes && (
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.25rem 0" }}>
                {frame.notes.map((n) => (
                  <li key={n} style={{ fontFamily: "Inter", fontSize: 12, color: "rgba(246,243,240,0.6)", margin: "0.35rem 0" }}>
                    <span style={{ color: "#F2D28B", marginRight: "0.5rem" }}>◆</span>{n}
                  </li>
                ))}
              </ul>
            )}
            <p className="display-heading" style={{ fontSize: 28, marginBottom: "1.25rem", color: "#F2D28B" }}>{frame.price}</p>
            <button className="btn-outline" style={{ width: "100%", marginBottom: "0.75rem", fontSize: 10 }}>{frame.ctaPrimary}</button>
            {frame.ctaSecondary && (
              <a href="#catalog" style={{ display: "block", textAlign: "center", fontSize: 11, color: "rgba(246,243,240,0.5)", textDecoration: "underline" }}>{frame.ctaSecondary}</a>
            )}
          </LiquidGlassCard>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
