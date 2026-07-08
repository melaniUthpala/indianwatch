interface Panel {
  label: string;
  title: string;
  body: string;
  image: string;
  imageRight: boolean;
  accent: string;
  caption: string;
}

const panels: Panel[] = [
  {
    label: "The Philosophy",
    title: "Born from sacred\nlandscapes of India",
    body: "Each essence is drawn from a specific terrain — a desert at dawn, a jungle after rain, a Himalayan ridge at altitude. We do not blend in laboratories. We observe, we collect, we distill.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&auto=format&fit=crop&q=80",
    imageRight: true,
    accent: "#F2D28B",
    caption: "Terrain / Himalaya, 3200m",
  },
  {
    label: "The Craft",
    title: "Cold-process extraction,\nzero synthetic accord",
    body: "Our process takes 14 days per batch. Every ingredient is sourced within 200km of its origin terrain. The result is a fragrance that carries the memory of a real place.",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=900&auto=format&fit=crop&q=80",
    imageRight: false,
    accent: "#d4a0a8",
    caption: "Distillation / Studio Notes",
  },
];

export default function Story() {
  return (
    <section id="story" style={{ background: "#050509", padding: "6rem 2rem 8rem", position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {panels.map((p, i) => (
          <div
            key={i}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center", marginBottom: "7rem" }}
          >
            <div style={{ order: p.imageRight ? 1 : 2 }}>
              <p className="label-small" style={{ color: p.accent, marginBottom: "1.25rem" }}>{p.label}</p>
              <h3 className="display-heading" style={{ fontSize: "clamp(28px, 3.5vw, 44px)", whiteSpace: "pre-line", marginBottom: "1.5rem" }}>{p.title}</h3>
              <div style={{ width: 32, height: 1, background: p.accent, marginBottom: "1.5rem" }} />
              <p className="body-copy">{p.body}</p>
            </div>
            <div style={{ order: p.imageRight ? 2 : 1, position: "relative", height: 420, borderRadius: 4, overflow: "hidden" }}>
              <img src={p.image} alt={p.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(5,5,9,0) 60%, rgba(5,5,9,0.5) 100%)" }} />
              <span className="label-small" style={{ position: "absolute", bottom: "1rem", left: "1rem", color: "rgba(246,243,240,0.8)" }}>{p.caption}</span>
            </div>
          </div>
        ))}
        <div style={{ borderTop: "1px solid rgba(242,210,139,0.1)", borderBottom: "1px solid rgba(242,210,139,0.1)", padding: "3rem 0", textAlign: "center" }}>
          <p className="display-heading" style={{ fontSize: "clamp(20px, 2vw, 28px)", fontStyle: "italic", color: "rgba(246,243,240,0.85)", maxWidth: 700, margin: "0 auto" }}>
            "Scent is the only sense that bypasses reason entirely — it arrives as pure feeling."
          </p>
          <p className="label-small" style={{ marginTop: "1.5rem" }}>— Indian Fragrances, Studio Notes</p>
        </div>
      </div>
    </section>
  );
}
