import { useEffect, useRef, useState } from "react";
import { ArrowUp, BriefcaseBusiness, Code2, Download, ExternalLink, Github, Home, Linkedin, Mail, Search } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

const destinations = [
  { label: "Go to home", hint: "Introduction", href: "#home", icon: Home },
  { label: "View featured project", hint: "Library Management System", href: "#project", icon: Code2 },
  { label: "Open LMS live demo", hint: "lms-project-gagan.vercel.app", href: "https://lms-project-gagan.vercel.app/", icon: ExternalLink, external: true },
  { label: "Explore the journey", hint: "Experience & education", href: "#journey", icon: BriefcaseBusiness },
  { label: "Open GitHub", hint: "github.com/sharmagagan18", href: "https://github.com/sharmagagan18", icon: Github, external: true },
  { label: "Open LinkedIn", hint: "Connect professionally", href: "https://linkedin.com/in/gagandeep-sharma-397387420", icon: Linkedin, external: true },
  { label: "Send an email", hint: "18sharmagagan@gmail.com", href: "mailto:18sharmagagan@gmail.com", icon: Mail },
  { label: "View resume", hint: "PDF document", href: "/Gagandeep-Sharma-Resume.pdf", icon: Download, external: true },
];

export default function PortfolioChrome() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [ready, setReady] = useState(() => window.sessionStorage.getItem("gaganverse-introduced") === "true" || window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [query, setQuery] = useState("");
  const skipIntroRef = useRef(ready);
  const progressRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => {
      setReady(true);
      window.sessionStorage.setItem("gaganverse-introduced", "true");
    }, skipIntroRef.current ? 0 : 450);
    let scrollFrame = 0;
    const updateScroll = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress / 100})`;
        setShowBackToTop(progress > 12);
        scrollFrame = 0;
      });
    };
    const updatePointer = (event: PointerEvent) => {
      if (glowRef.current) glowRef.current.style.transform = `translate3d(${event.clientX - 190}px, ${event.clientY - 190}px, 0)`;
      if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${event.clientX - 5}px, ${event.clientY - 5}px, 0)`;
    };
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
      if (event.key === "Escape") setPaletteOpen(false);
    };
    const openPalette = () => setPaletteOpen(true);
    const supportsTilt = window.matchMedia("(hover: hover) and (pointer: fine)").matches && !reducedMotion;
    const tiltCards = supportsTilt ? Array.from(document.querySelectorAll<HTMLElement>("[data-tilt]")) : [];
    const cleanups = tiltCards.map((card) => {
      const move = (event: PointerEvent) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(1000px) rotateX(${-y * 3}deg) rotateY(${x * 3}deg) translateY(-4px)`;
      };
      const leave = () => { card.style.transform = ""; };
      card.addEventListener("pointermove", move);
      card.addEventListener("pointerleave", leave);
      return () => { card.removeEventListener("pointermove", move); card.removeEventListener("pointerleave", leave); };
    });

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", openPalette);
    return () => {
      window.clearTimeout(timer);
      window.cancelAnimationFrame(scrollFrame);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", openPalette);
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  const matches = destinations.filter((item) => `${item.label} ${item.hint}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <div className={`loader ${ready ? "loader-ready" : ""}`} aria-hidden="true">
        <img src="/assets/gs-monogram.png" alt="" className="h-16 w-16 rounded-2xl object-cover" />
        <div className="loader-track"><span /></div>
        <p>INITIALIZING GAGANVERSE</p>
      </div>
      <div ref={progressRef} className="fixed left-0 top-0 z-[80] h-[2px] w-full origin-left scale-x-0 bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,.8)]" aria-hidden="true" />
      <div ref={glowRef} className="pointer-glow" aria-hidden="true" />
      <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />
      <div className="star-field" aria-hidden="true">{Array.from({ length: 24 }, (_, i) => <i key={i} style={{ left: `${(i * 37) % 97}%`, top: `${(i * 61) % 91}%`, animationDelay: `${(i % 7) * .4}s` }} />)}</div>
      {showBackToTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-[#11142c]/90 text-white shadow-xl backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-300/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300" aria-label="Back to top">
          <ArrowUp className="h-4 w-4" />
        </button>
      )}

      <Dialog open={paletteOpen} onOpenChange={setPaletteOpen}>
        <DialogContent className="overflow-hidden rounded-[1.5rem] border-white/15 bg-[#0b0e20]/95 p-0 text-white shadow-2xl backdrop-blur-2xl sm:max-w-xl">
          <DialogTitle className="sr-only">Quick navigation</DialogTitle>
          <DialogDescription className="sr-only">Search portfolio pages and external links</DialogDescription>
          <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
            <Search className="h-5 w-5 text-cyan-300" />
            <input aria-label="Search portfolio actions" autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Where would you like to go?" className="h-10 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500" />
            <kbd className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-slate-400">ESC</kbd>
          </div>
          <div className="max-h-[380px] overflow-y-auto p-2">
            <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-[.2em] text-slate-500">Quick actions</p>
            {matches.map((item) => {
              const Icon = item.icon;
              return (
                <a key={item.label} href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noreferrer" : undefined} onClick={() => setPaletteOpen(false)} className="group flex items-center gap-4 rounded-xl px-3 py-3 transition hover:bg-white/[0.07] focus-visible:bg-white/[0.07] focus-visible:outline-none">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-violet-300 group-hover:text-cyan-300"><Icon className="h-4 w-4" /></span>
                  <span><strong className="block text-sm">{item.label}</strong><small className="text-xs text-slate-500">{item.hint}</small></span>
                </a>
              );
            })}
            {matches.length === 0 && <p className="px-3 py-10 text-center text-sm text-slate-500">No matching action found.</p>}
          </div>
          <div className="border-t border-white/10 px-5 py-3 text-[10px] text-slate-500">Tip: press <strong className="text-slate-300">Ctrl K</strong> anytime</div>
        </DialogContent>
      </Dialog>
    </>
  );
}
