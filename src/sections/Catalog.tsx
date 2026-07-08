import { frames } from "@/config/frames";

export default function Catalog() {
  const products = frames.filter((f) => f.price);
  return (
    <section id="catalog" style={{ background: "#050509", padding: "8rem 2rem", position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p className="label-small" style={{ color: "#F2D28B", marginBottom: "1rem" }}>The Collection</p>
        <h2 className="display-heading" style={{ fontSize: "clamp(36px, 5vw, 64px)", marginBottom: "1rem" }}>Six essences. One passage.</h2>
        <div style={{ width: 60, height: 1, background: "#F2D28B", margin: "2rem 0 4rem" }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {products.map((f) => (
            <article
              key={f.id}
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 4, padding: "2rem", transition: "all 0.3s ease" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(242,210,139,0.2)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <p className="label-small" style={{ color: "#F2D28B", marginBottom: "0.75rem" }}>{f.chapter}</p>
              <h3 className="display-heading" style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{f.title}</h3>
              <div style={{ width: 30, height: 1, background: "rgba(242,210,139,0.4)", margin: "0.75rem 0 1rem" }} />
              {f.notes && (
                <p className="body-copy" style={{ marginBottom: "1rem" }}>{f.notes.join(" · ")}</p>
              )}
              <p className="display-heading" style={{ fontSize: "1.6rem", color: "#F2D28B", marginBottom: "1rem" }}>{f.price}</p>
              <a href="#hero" style={{ fontFamily: "Inter", fontSize: 12, color: "#F2D28B", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase" }}>Discover →</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
