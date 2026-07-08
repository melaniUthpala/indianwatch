import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Link, createRootRouteWithContext, useRouter, HeadContent, Scripts } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#050509", color: "#F6F3F0" }}>
      <div style={{ textAlign: "center" }}>
        <h1 className="display-heading" style={{ fontSize: 96 }}>404</h1>
        <p className="body-copy">This page does not exist.</p>
        <Link to="/" className="btn-outline" style={{ marginTop: 24 }}>Return home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#050509", color: "#F6F3F0" }}>
      <div style={{ textAlign: "center", maxWidth: 420 }}>
        <h1 className="display-heading" style={{ fontSize: 32 }}>Something went wrong</h1>
        <p className="body-copy" style={{ margin: "1rem 0 1.5rem" }}>An unexpected error occurred while loading this page.</p>
        <button className="btn-outline" onClick={() => { router.invalidate(); reset(); }}>Try again</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Indian Fragrances — Sacred Essences of India" },
      { name: "description", content: "A cinematic, scroll-driven journey through six sacred essences inspired by the landscapes of India." },
      { name: "author", content: "Indian Fragrances" },
      { property: "og:title", content: "Indian Fragrances — Sacred Essences of India" },
      { property: "og:description", content: "A cinematic, scroll-driven journey through six sacred essences inspired by the landscapes of India." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    let cleanup: (() => void) | null = null;
    (async () => {
      const { default: Lenis } = await import("lenis");
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis({
        duration: 1.6,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.2,
      });
      lenis.on("scroll", ScrollTrigger.update);
      const onTick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);
      cleanup = () => { gsap.ticker.remove(onTick); lenis.destroy(); };
    })();
    return () => { cleanup?.(); };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
