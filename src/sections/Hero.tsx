import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EXPERIENCE_VIDEO, INTRO_VIDEO, SEGMENTS, TOTAL_SCROLL_PX, TOTAL_VIDEO_DURATION, framesById, frames } from "@/config/frames";
import FrameText from "@/components/FrameText";
import BuyCard from "@/components/BuyCard";
import type { Segment } from "@/config/frames";

const LERP_FACTOR = 0.08;
const SEEK_INTERVAL_MS = 1000 / 24;
const NO_PANEL_FRAMES = new Set(["entry", "loop-complete"]);

type Mode = "IDLE" | "SCRUB" | "LOOP";

function segmentFromTime(t: number): Segment {
  for (const seg of SEGMENTS) {
    if (t >= seg.transitionStart && t < seg.scrollResume) return seg;
  }
  return SEGMENTS[SEGMENTS.length - 1];
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const idleVidRef = useRef<HTMLVideoElement>(null);
  const expVidRef = useRef<HTMLVideoElement>(null);

  const modeRef = useRef<Mode>("IDLE");
  const segmentRef = useRef<Segment>(SEGMENTS[0]);
  const lastProgressRef = useRef(0);
  const lastProgressMsRef = useRef(0);
  const isResettingRef = useRef(false);
  const rafRef = useRef(0);
  const lastSeekMsRef = useRef(0);
  const targetTimeRef = useRef(0);
  const smoothedTimeRef = useRef(0);

  const [mode, setMode] = useState<Mode>("IDLE");
  const [currentFrame, setCurrentFrame] = useState(frames[0]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    let cleanup: (() => void) | null = null;
    let cancelled = false;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const { ScrollToPlugin } = await import("gsap/ScrollToPlugin");
      gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
      if (cancelled) return;

      const video = expVidRef.current;
      const hero = heroRef.current;
      const stage = stageRef.current;
      if (!video || !hero || !stage) return;

      const setupTrigger = () => {
        const st = ScrollTrigger.create({
          trigger: hero,
          start: "top top",
          end: `+=${TOTAL_SCROLL_PX}`,
          pin: stage,
          pinSpacing: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (isResettingRef.current) return;
            const p = self.progress;

            if (p < 0.004) {
              modeRef.current = "IDLE";
              setMode("IDLE");
              video.pause();
              targetTimeRef.current = 0;
              smoothedTimeRef.current = 0;
              setCurrentFrame(frames[0]);
              return;
            }

            if (Math.abs(p - lastProgressRef.current) > 0.0008) {
              lastProgressRef.current = p;
              lastProgressMsRef.current = Date.now();
            }

            if (modeRef.current === "IDLE") {
              modeRef.current = "SCRUB";
              setMode("SCRUB");
              video.pause();
            } else if (modeRef.current === "LOOP") {
              modeRef.current = "SCRUB";
              setMode("SCRUB");
              video.pause();
              smoothedTimeRef.current = segmentRef.current.scrollResume;
            }

            let next = p * TOTAL_VIDEO_DURATION;
            const seg = segmentFromTime(next);
            segmentRef.current = seg;
            next = Math.max(seg.transitionStart, Math.min(seg.scrollResume, next));
            targetTimeRef.current = next;

            const frame = framesById[seg.frameId];
            if (frame && frame.id !== currentFrame.id) setCurrentFrame(frame);

            if (p > 0.98 && !isResettingRef.current) {
              isResettingRef.current = true;
              setTimeout(() => {
                gsap.to(window, {
                  scrollTo: 0,
                  duration: 2.5,
                  ease: "power2.inOut",
                  onComplete: () => {
                    modeRef.current = "IDLE";
                    setMode("IDLE");
                    video.pause();
                    video.currentTime = 0;
                    targetTimeRef.current = 0;
                    smoothedTimeRef.current = 0;
                    setCurrentFrame(frames[0]);
                    isResettingRef.current = false;
                  },
                });
              }, 1500);
            }
          },
        });
        return st;
      };

      let st: ReturnType<typeof ScrollTrigger.create> | null = null;
      const onReady = () => {
        if (!st) st = setupTrigger();
      };
      if (video.readyState >= 1) onReady();
      else video.addEventListener("loadedmetadata", onReady, { once: true });

      const loop = (ts: number) => {
        const delta = targetTimeRef.current - smoothedTimeRef.current;
        if (Math.abs(delta) > 0.0005) smoothedTimeRef.current += delta * LERP_FACTOR;

        if (
          modeRef.current === "SCRUB" &&
          ts - lastSeekMsRef.current >= SEEK_INTERVAL_MS &&
          video.readyState >= 2 &&
          Math.abs(smoothedTimeRef.current - video.currentTime) > 0.04
        ) {
          try { video.currentTime = smoothedTimeRef.current; } catch {}
          lastSeekMsRef.current = ts;
        }

        if (
          modeRef.current === "SCRUB" &&
          Date.now() - lastProgressMsRef.current > 550 &&
          video.currentTime >= segmentRef.current.loopStart &&
          video.currentTime < segmentRef.current.loopEnd
        ) {
          modeRef.current = "LOOP";
          setMode("LOOP");
          video.play().catch(() => {});
        }

        if (modeRef.current === "LOOP") {
          if (video.paused) video.play().catch(() => {});
          if (video.currentTime >= segmentRef.current.loopEnd || video.currentTime < segmentRef.current.loopStart) {
            try { video.currentTime = segmentRef.current.loopStart; } catch {}
          }
        }

        rafRef.current = requestAnimationFrame(loop);
      };
      rafRef.current = requestAnimationFrame(loop);

      cleanup = () => {
        cancelAnimationFrame(rafRef.current);
        video.removeEventListener("loadedmetadata", onReady);
        st?.kill();
      };
    };

    init();
    return () => { cancelled = true; cleanup?.(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isIdle = mode === "IDLE";
  const showPanels = !isIdle && !NO_PANEL_FRAMES.has(currentFrame.id);

  return (
    <section ref={heroRef} id="hero" style={{ position: "relative", minHeight: `calc(100vh + ${TOTAL_SCROLL_PX}px)`, background: "#050509" }}>
      <div ref={stageRef} style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        <video
          ref={idleVidRef}
          src={INTRO_VIDEO}
          autoPlay loop muted playsInline
          crossOrigin="anonymous"
          preload="auto"
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
            opacity: isIdle ? 1 : 0, transition: "opacity 0.9s ease",
            willChange: "transform", transform: "translateZ(0)", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
          }}
        />
        <video
          ref={expVidRef}
          src={EXPERIENCE_VIDEO}
          muted playsInline
          crossOrigin="anonymous"
          preload="auto"
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
            opacity: isIdle ? 0 : 1, transition: "opacity 0.9s ease",
            willChange: "transform", transform: "translateZ(0)", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
          }}
        />

        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(5,5,9,0.55) 100%)", pointerEvents: "none" }} />

        <AnimatePresence>
          {isIdle && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              style={{ position: "absolute", bottom: "3rem", left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.9rem", pointerEvents: "none" }}
            >
              <div style={{ width: 1, height: 60, background: "#F2D28B", animation: "scrollLine 2.4s ease-in-out infinite" }} />
              <span className="label-small" style={{ color: "#F2D28B" }}>Scroll</span>
            </motion.div>
          )}
        </AnimatePresence>

        {showPanels && (
          isMobile ? (
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 10, padding: "90px 16px 110px", pointerEvents: "none", overflowY: "auto" }}>
              <div style={{ pointerEvents: "auto", width: "100%", maxWidth: 340 }}>
                <FrameText frame={currentFrame} visible={showPanels} />
              </div>
              <div style={{ pointerEvents: "auto", width: "100%", maxWidth: 340 }}>
                <BuyCard frame={currentFrame} visible={showPanels} />
              </div>
            </div>
          ) : (
            <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", alignItems: "center", padding: "0 4vw", pointerEvents: "none" }}>
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <FrameText frame={currentFrame} visible={showPanels} />
              </div>
              <div />
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <BuyCard frame={currentFrame} visible={showPanels} />
              </div>
            </div>
          )
        )}

        {!isIdle && (
          <div style={{ position: "absolute", bottom: "1.5rem", left: 0, right: 0, display: "flex", justifyContent: "center", gap: "0.75rem" }}>
            {SEGMENTS.filter((s) => s.id !== "entry" && s.id !== "outro").map((seg) => {
              const active = currentFrame.id === seg.frameId;
              return (
                <span key={seg.id} style={{ width: active ? 24 : 6, height: 2, background: active ? "#F2D28B" : "rgba(242,210,139,0.3)", borderRadius: 2, transition: "all 0.4s ease" }} />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}