const cols = [
  { title: "Experience", links: ["Maheshwari", "Mahalakshmi", "Mahakali", "Mahashakti", "Jungle Essence", "Himalaya Essence"] },
  { title: "Navigate", links: ["Collection", "Story", "Contact"] },
  { title: "House", links: ["Philosophy", "Craft", "Sourcing"] },
];

export default function Footer() {
  return (
    <footer style={{ background: "#050509", padding: "5rem 2rem 3rem", position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "3rem" }}>
          <div style={{ position: "relative", width: 44, height: 44, marginBottom: "1rem" }}>
            <svg width="44" height="44" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="18.5" fill="none" stroke="#F2D28B" strokeWidth="0.7" opacity="0.7" />
              <path d="M20 3 L21.2 5 L20 7 L18.8 5 Z" fill="#F2D28B" />
              <path d="M20 33 L21.2 35 L20 37 L18.8 35 Z" fill="#F2D28B" />
              <line x1="4" y1="20" x2="7" y2="20" stroke="#F2D28B" strokeWidth="0.7" />
              <line x1="33" y1="20" x2="36" y2="20" stroke="#F2D28B" strokeWidth="0.7" />
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Cormorant Garamond", fontSize: 16, color: "#F2D28B" }}>IF</div>
          </div>
          <h4 className="display-heading" style={{ fontSize: "1.4rem", letterSpacing: "0.3em", textTransform: "uppercase" }}>Indian Fragrances</h4>
          <p style={{ fontFamily: "Inter", fontSize: "0.65rem", color: "#9E9EAE", letterSpacing: "0.15em", marginTop: "0.5rem" }}>Sacred Essences of India</p>
        </div>
        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(242,210,139,0.3), transparent)", margin: "0 auto 3rem", maxWidth: 500 }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "2rem", marginBottom: "3rem" }}>
          {cols.map((c) => (
            <div key={c.title}>
              <p className="label-small" style={{ color: "#F2D28B", marginBottom: "1rem" }}>{c.title}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {c.links.map((l) => (
                  <li key={l} style={{ margin: "0.5rem 0" }}>
                    <a href="#" style={{ fontFamily: "Inter", fontSize: 13, color: "rgba(246,243,240,0.6)", textDecoration: "none" }}>{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(242,210,139,0.1)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <span style={{ fontFamily: "Inter", fontSize: "0.65rem", color: "#9E9EAE" }}>© 2025 Indian Fragrances. All rights reserved.</span>
          <span style={{ fontFamily: "Inter", fontSize: "0.65rem", color: "#9E9EAE" }}>Crafted with intention.</span>
        </div>
      </div>
    </footer>
  );
}
