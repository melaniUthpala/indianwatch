import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { frames } from "@/config/frames";

function IFLogo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", lineHeight: 1 }}>
      <div style={{ position: "relative", width: 40, height: 40 }}>
        <svg width="40" height="40" viewBox="0 0 40 40" style={{ position: "absolute", inset: 0 }}>
          <circle cx="20" cy="20" r="18.5" fill="none" stroke="#F2D28B" strokeWidth="0.7" opacity="0.7" />
          <path d="M20 3 L21.2 5 L20 7 L18.8 5 Z" fill="#F2D28B" />
          <path d="M20 33 L21.2 35 L20 37 L18.8 35 Z" fill="#F2D28B" />
          <line x1="4" y1="20" x2="7" y2="20" stroke="#F2D28B" strokeWidth="0.7" />
          <line x1="33" y1="20" x2="36" y2="20" stroke="#F2D28B" strokeWidth="0.7" />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Cormorant Garamond", fontSize: 15, color: "#F2D28B", fontWeight: 500 }}>IF</div>
      </div>
      <div style={{ fontFamily: "Inter", fontSize: 6.5, letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(242,210,139,0.55)", marginTop: 2 }}>Fragrances</div>
    </div>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [expOpen, setExpOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header style={{ position: "fixed", top: 20, left: 0, right: 0, zIndex: 100, display: "flex", justifyContent: "center", pointerEvents: "none" }}>
      <nav
        style={{
          pointerEvents: "auto",
          display: "flex",
          alignItems: "center",
          gap: "1.25rem",
          padding: "0.6rem 1.25rem",
          borderRadius: 999,
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          background: scrolled ? "rgba(5,5,9,0.8)" : "rgba(5,5,9,0.45)",
          border: "1px solid rgba(255,255,255,0.06)",
          transition: "background 0.3s ease",
        }}
      >
        <IFLogo />
        <span style={{ width: 1, height: 24, background: "rgba(255,255,255,0.1)" }} />
        <div style={{ position: "relative" }} onMouseEnter={() => setExpOpen(true)} onMouseLeave={() => setExpOpen(false)}>
          <button style={{ background: "none", border: "none", color: "#F6F3F0", fontFamily: "Inter", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "none", padding: "0.35rem 0.5rem" }}>
            Experience ▾
          </button>
          <AnimatePresence>
            {expOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                style={{ position: "absolute", top: "100%", left: 0, marginTop: 10, minWidth: 220, padding: "0.75rem", borderRadius: 16, backdropFilter: "blur(24px)", background: "rgba(5,5,9,0.9)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                {frames.filter((f) => f.price).map((f, i) => (
                  <motion.a
                    key={f.id}
                    href="#catalog"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    style={{ display: "block", padding: "0.5rem 0.75rem", fontFamily: "Cormorant Garamond", fontSize: 14, color: "rgba(246,243,240,0.75)", borderRadius: 8, textDecoration: "none" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(242,210,139,0.07)"; (e.currentTarget as HTMLElement).style.color = "#F6F3F0"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "rgba(246,243,240,0.75)"; }}
                  >
                    {f.title}
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <a href="#catalog" style={{ color: "#F6F3F0", fontFamily: "Inter", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none" }}>Collection</a>
        <a href="#story" style={{ color: "#F6F3F0", fontFamily: "Inter", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none" }}>Story</a>
        <span style={{ width: 1, height: 24, background: "rgba(255,255,255,0.1)" }} />
        <a href="#catalog" className="btn-outline" style={{ fontSize: 10, padding: "0.55rem 1.15rem" }}>Shop Now</a>
      </nav>
    </header>
  );
}
