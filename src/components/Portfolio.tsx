import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  Check,
  Code2,
  Copy,
  Database,
  Download,
  Github,
  GraduationCap,
  Languages,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  Sparkles,
  Terminal,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PortfolioChrome from "@/components/PortfolioChrome";

const navItems = [
  ["About", "about"],
  ["Skills", "skills"],
  ["Project", "project"],
  ["Journey", "journey"],
  ["Contact", "contact"],
];

const skills = [
  "React.js",
  "JavaScript",
  "HTML & CSS",
  "Web Development",
  "Front-End Development",
  "DBMS",
  "Git & GitHub",
  "Microsoft Excel",
  "Problem Solving",
  "Communication",
  "Content Creation",
  "Social Media Marketing",
];

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

function SectionLabel({ children, number }: { children: ReactNode; number: string }) {
  return (
    <div className="mb-7 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-violet-300">
      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-violet-400/40 bg-violet-400/10 text-[10px] text-white">
        {number}
      </span>
      {children}
    </div>
  );
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [navVisible, setNavVisible] = useState(true);

  useEffect(() => {
    let previousY = window.scrollY;
    const sections = ["home", ...navItems.map(([, id]) => id)];
    const onScroll = () => {
      const currentY = window.scrollY;
      setNavVisible(currentY < previousY || currentY < 120);
      previousY = currentY;
      let current = "home";
      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section && section.offsetTop - 180 <= currentY) current = id;
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const copyEmail = async () => {
    await navigator.clipboard.writeText("18sharmagagan@gmail.com");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#070816] text-[#f6f3ff] selection:bg-violet-500 selection:text-white">
      <PortfolioChrome />
      <nav className={`fixed inset-x-0 top-3 z-50 mx-auto w-[calc(100%-1.25rem)] max-w-7xl rounded-2xl border border-white/10 bg-[#070816]/80 shadow-2xl backdrop-blur-2xl transition-transform duration-500 sm:w-[calc(100%-2rem)] ${navVisible ? "translate-y-0" : "-translate-y-28"}`}>
        <div className="mx-auto flex h-16 items-center justify-between px-3 sm:px-5">
          <a href="#home" className="group flex items-center gap-3" aria-label="Gaganverse home">
            <img src="/assets/gs-monogram.png" alt="GS monogram" className="h-11 w-11 rounded-2xl object-cover ring-1 ring-white/15 transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105" />
            <div>
              <div className="text-sm font-extrabold tracking-tight">GAGANVERSE</div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.28em] text-cyan-300">Portfolio / 2026</div>
            </div>
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {navItems.map(([label, id]) => (
              <a key={id} href={`#${id}`} aria-current={activeSection === id ? "location" : undefined} className={`nav-link text-xs font-bold uppercase tracking-wider ${activeSection === id ? "text-cyan-300" : "text-slate-400 hover:text-white"}`}>
                {label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <button onClick={() => window.dispatchEvent(new Event("open-command-palette"))} className="flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 text-xs font-semibold text-slate-300 transition hover:border-cyan-300/30 hover:text-white" aria-label="Open command palette">
              <Search className="h-3.5 w-3.5" /><span className="hidden xl:inline">Quick find</span><kbd className="hidden rounded border border-white/10 px-1.5 py-0.5 text-[9px] text-slate-500 lg:block">⌘K</kbd>
            </button>
            <Button asChild className="h-10 rounded-full bg-violet-500 px-4 text-xs font-bold text-white shadow-[0_0_28px_rgba(109,94,247,0.28)] hover:bg-violet-400">
              <a href="mailto:18sharmagagan@gmail.com">Let&apos;s connect <ArrowUpRight className="ml-1.5 h-4 w-4" /></a>
            </Button>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-full border border-white/10 bg-white/5 p-2.5 lg:hidden" aria-label="Toggle navigation" aria-expanded={menuOpen}>
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-white/10 bg-[#0b0d20] px-5 py-5 lg:hidden">
            {navItems.map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} className="flex items-center justify-between border-b border-white/10 py-4 text-base font-semibold">
                {label}<ArrowDownRight className="h-4 w-4 text-cyan-300" />
              </a>
            ))}
          </div>
        )}
      </nav>

      <section id="home" className="relative min-h-screen overflow-hidden pt-20">
        <img src="/assets/hero-portal.png" alt="Abstract luminous digital portal" className="absolute inset-0 h-full w-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-[#070816]/55" />
        <div className="absolute bottom-0 left-0 right-0 h-36 bg-[#070816]/85 blur-3xl" />
        <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1.12fr_.88fr] lg:py-24">
          <div className="hero-enter max-w-4xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-[#0d132c]/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-200 backdrop-blur-md">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-60" /><span className="relative h-2 w-2 rounded-full bg-cyan-300" /></span>
              Open to meaningful opportunities
            </div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-violet-300 sm:text-base">Hello, I&apos;m Gagandeep Sharma</p>
            <h1 className="hero-title max-w-5xl text-[3.6rem] font-black leading-[0.88] tracking-[-0.065em] text-white sm:text-7xl lg:text-[6.6rem]">
              <span>I</span> <span>BUILD</span> <span>FOR</span><br /><span className="text-cyan-300">THE</span> <span className="text-cyan-300">WEB.</span>
            </h1>
            <div className="mt-7 flex h-8 items-center gap-3 text-base font-semibold text-slate-300 sm:text-lg">
              <span className="typing-line">React interfaces. Responsive experiences. Real usability.</span><span className="typing-caret" />
            </div>
            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
              Computer Science Engineering student crafting responsive digital experiences with React, JavaScript, HTML, and CSS.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="magnetic-btn h-14 rounded-full bg-violet-500 px-7 text-base font-bold text-white shadow-[0_0_36px_rgba(109,94,247,0.38)] hover:bg-violet-400">
                <a href="#project">View featured work <ArrowDownRight className="ml-2 h-5 w-5" /></a>
              </Button>
              <Button asChild variant="outline" className="magnetic-btn h-14 rounded-full border-white/20 bg-[#0b0d20]/65 px-7 text-base font-bold text-white backdrop-blur-md hover:bg-white/10 hover:text-white">
                <a href="/Gagandeep-Sharma-Resume.pdf" target="_blank" rel="noreferrer">Resume <Download className="ml-2 h-5 w-5" /></a>
              </Button>
            </div>
            <div className="mt-7 flex items-center gap-3">
              <a className="social-link" href="https://github.com/sharmagagan18" target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a>
              <a className="social-link" href="https://linkedin.com/in/gagandeep-sharma-397387420" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a>
              <a className="social-link" href="mailto:18sharmagagan@gmail.com" aria-label="Email"><Mail /></a>
              <span className="ml-2 text-[10px] font-bold uppercase tracking-[.18em] text-slate-500">Connect with me</span>
            </div>
          </div>

          <div className="hero-enter-delay relative mx-auto w-full max-w-md lg:ml-auto">
            <div data-tilt className="glass-profile relative rounded-[2.2rem] border border-white/15 bg-[#0b0d20]/75 p-5 shadow-2xl backdrop-blur-xl sm:p-7">
              <div className="mb-10 flex items-center justify-between">
                <span className="rounded-full border border-violet-300/25 bg-violet-300/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-violet-200">Developer profile</span>
                <Code2 className="h-5 w-5 text-cyan-300" />
              </div>
              <div className="mb-7 flex h-24 w-24 items-center justify-center rounded-[2rem] border border-cyan-300/20 bg-[#141836] text-3xl font-black text-cyan-300 shadow-[0_0_45px_rgba(103,232,249,0.15)]">GS</div>
              <h2 className="text-2xl font-extrabold tracking-tight">Computer Science<br />Engineering Student</h2>
              <div className="mt-7 space-y-3 border-t border-white/10 pt-6 text-sm text-slate-300">
                <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-violet-300" />Amroha, Uttar Pradesh, India</div>
                <div className="flex items-center gap-3"><Sparkles className="h-4 w-4 text-violet-300" />Front-end focused builder</div>
              </div>
              <div className="float-card absolute -right-3 -top-3 rounded-2xl border border-cyan-300/25 bg-[#0b1530] px-4 py-3 text-center shadow-xl sm:-right-8 sm:top-12">
                <div className="text-lg font-black text-cyan-300">01</div><div className="text-[9px] font-bold uppercase tracking-widest text-slate-300">Live project</div>
              </div>
              <div className="float-card-delayed absolute -bottom-9 -left-3 hidden items-center gap-3 rounded-2xl border border-violet-300/25 bg-[#10142b]/95 px-4 py-3 shadow-xl backdrop-blur-xl sm:flex sm:-left-10">
                <Terminal className="h-4 w-4 text-violet-300" /><div><p className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Stack</p><p className="text-xs font-bold">React · Vite · Tailwind</p></div>
              </div>
            </div>
          </div>
        </div>
        <a href="#about" className="scroll-cue absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[9px] font-bold uppercase tracking-[.25em] text-slate-400 md:flex"><span>Scroll to explore</span><span className="h-8 w-px bg-cyan-300" /></a>
      </section>

      <section id="about" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <Reveal>
          <SectionLabel number="01">Behind the screen</SectionLabel>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:gap-16">
            <div>
              <h2 className="section-title">Curious mind.<br /><span className="text-violet-300">Practical builder.</span></h2>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
                I&apos;m a Computer Science Engineering student with hands-on experience building responsive web applications. I care about creating user-friendly digital solutions and continuously sharpening my technical skills through projects and internships.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[["01", "Project built"], ["01", "Internship"], ["02", "Languages"], ["12", "Core skills"]].map(([value, label]) => (
                <div key={label} data-tilt className="rounded-[1.7rem] border border-white/10 bg-[#0d1024] p-5 transition-all duration-300 hover:border-cyan-300/25 sm:p-6">
                  <div className="text-3xl font-black text-cyan-300 sm:text-4xl">{value}</div>
                  <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</div>
                </div>
              ))}
              <div className="code-window col-span-2 rounded-[1.7rem] border border-white/10 bg-[#090b18] p-5 font-mono text-xs leading-6 text-slate-400">
                <div className="mb-3 flex gap-1.5"><i className="bg-rose-400" /><i className="bg-amber-300" /><i className="bg-emerald-400" /></div>
                <p><span className="text-violet-300">const</span> developer = &#123;</p>
                <p className="pl-4">focus: <span className="text-cyan-300">&quot;responsive experiences&quot;</span>,</p>
                <p className="pl-4">mindset: <span className="text-cyan-300">&quot;keep learning&quot;</span></p>
                <p>&#125;;</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="skills" className="border-y border-white/10 bg-[#0a0c1c] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <SectionLabel number="02">Capabilities</SectionLabel>
            <div className="grid items-center gap-12 lg:grid-cols-[.88fr_1.12fr] lg:gap-16">
              <div data-tilt className="skill-orbit relative rounded-[2.2rem] border border-white/10 bg-[#10142b] p-3">
                <img src="/assets/dev-workspace.png" alt="Abstract development workspace" loading="lazy" className="aspect-square w-full rounded-[1.7rem] object-cover" />
                <div className="absolute bottom-7 left-7 rounded-2xl border border-white/15 bg-[#090b1b]/85 px-4 py-3 backdrop-blur-md">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300">Current focus</p>
                  <p className="mt-1 font-bold">Responsive web experiences</p>
                </div>
                <span className="orbit-chip orbit-one">React.js</span>
                <span className="orbit-chip orbit-two">JavaScript</span>
                <span className="orbit-chip orbit-three">Git</span>
              </div>
              <div>
                <h2 className="section-title">Tools I use to turn<br /><span className="text-cyan-300">ideas into interfaces.</span></h2>
                <div className="mt-8 flex flex-wrap gap-3">
                  {skills.map((skill, index) => (
                    <span key={skill} className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-1 ${index < 7 ? "border-violet-300/25 bg-violet-300/10 text-violet-100" : "border-white/10 bg-white/5 text-slate-300"}`}>
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  <div className="skill-mini-card"><Code2 /><span>Front-end</span></div>
                  <div className="skill-mini-card"><Database /><span>DBMS</span></div>
                  <div className="skill-mini-card"><Github /><span>Version control</span></div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="project" className="relative overflow-hidden py-24 lg:py-32">
        <img src="/assets/blueprint-texture.png" alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <SectionLabel number="03">Featured work</SectionLabel>
            <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <h2 className="section-title max-w-3xl">One project.<br /><span className="text-violet-300">Built end-to-end.</span></h2>
              <p className="max-w-sm text-sm leading-6 text-slate-400">No filler. A focused application designed around the real workflows of a modern library.</p>
            </div>
            <div data-tilt className="project-showcase group overflow-hidden rounded-[2rem] border border-white/12 bg-[#0c0f22]/95 shadow-2xl lg:grid lg:grid-cols-[.9fr_1.1fr]">
              <div className="relative flex min-h-[360px] flex-col justify-between overflow-hidden border-b border-white/10 p-7 sm:p-10 lg:border-b-0 lg:border-r">
                <div className="project-grid absolute inset-0 opacity-40 transition-transform duration-700 group-hover:scale-110" />
                <div className="relative flex items-start justify-between">
                  <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"><BookOpen className="h-7 w-7 text-cyan-300" /></div>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">01 / 01</span>
                </div>
                <div className="relative">
                  <div className="mb-5 flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-400" /><span className="text-xs font-bold uppercase tracking-widest text-emerald-300">Completed project</span></div>
                  <h3 className="text-4xl font-black leading-none tracking-tight sm:text-5xl">Library<br />Management<br />System</h3>
                </div>
              </div>
              <div className="p-7 sm:p-10 lg:p-12">
                <p className="text-lg leading-8 text-slate-300">A responsive Library Management System developed using React.js, Vite, Tailwind CSS, and JavaScript.</p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {["Admin & student modules", "Book management", "Issue / return workflows", "Dashboard analytics", "LocalStorage persistence", "Responsive interface"].map((feature) => (
                    <div key={feature} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.035] px-4 py-3 text-sm text-slate-300"><span className="rounded-full bg-violet-400/15 p-1"><Check className="h-3 w-3 text-violet-300" /></span>{feature}</div>
                  ))}
                </div>
                <div className="mt-9 flex flex-wrap items-center gap-3 border-t border-white/10 pt-7">
                  {["React.js", "Vite", "Tailwind CSS", "JavaScript"].map((tech) => <span key={tech} className="rounded-full bg-white/5 px-3 py-1.5 text-xs font-bold text-slate-300">{tech}</span>)}
                  <div className="flex w-full flex-wrap gap-2 pt-2 sm:ml-auto sm:w-auto sm:pt-0">
                    <a href="https://lms-project-gagan.vercel.app/" target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full bg-cyan-300 px-4 py-2 text-sm font-bold text-[#071018] transition-all hover:-translate-y-0.5 hover:bg-cyan-200">Live demo <ArrowUpRight className="h-4 w-4" /></a>
                    <a href="https://github.com/sharmagagan18" target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#0a0c1c] transition-all hover:-translate-y-0.5">GitHub <Github className="h-4 w-4" /></a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="journey" className="border-y border-white/10 bg-[#0a0c1c] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <SectionLabel number="04">Learning journey</SectionLabel>
            <h2 className="section-title mb-12">Experience meets<br /><span className="text-cyan-300">education.</span></h2>
            <div className="journey-timeline">
              <article className="journey-card timeline-card">
                <div className="journey-icon"><BriefcaseBusiness /></div>
                <div className="flex-1">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2"><span className="eyebrow">Professional experience</span><span className="date-pill">07/2026 — 08/2026</span></div>
                  <h3 className="text-2xl font-extrabold">Python Internship</h3>
                  <p className="mt-1 font-semibold text-violet-300">InternPe · Remote</p>
                  <p className="mt-5 leading-7 text-slate-400">A 6-week Industrial Training in Python programming and application development.</p>
                </div>
              </article>
              <article className="journey-card timeline-card">
                <div className="journey-icon"><GraduationCap /></div>
                <div className="flex-1">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2"><span className="eyebrow">Higher education</span><span className="date-pill">08/2024 — Present</span></div>
                  <h3 className="text-2xl font-extrabold">B.Tech, Computer Science Engineering</h3>
                  <p className="mt-1 font-semibold text-cyan-300">Teerthanker Mahaveer University</p>
                  <p className="mt-5 flex items-center gap-2 text-slate-400"><MapPin className="h-4 w-4" />Moradabad, Uttar Pradesh</p>
                </div>
              </article>
              <article className="journey-card timeline-card">
                <div className="journey-icon"><BookOpen /></div>
                <div className="flex-1 lg:flex lg:items-center lg:justify-between lg:gap-10">
                  <div><span className="eyebrow">Foundation</span><h3 className="mt-3 text-2xl font-extrabold">Senior Secondary Education</h3><p className="mt-1 font-semibold text-violet-300">Krishna Public School</p></div>
                  <span className="date-pill mt-5 inline-flex lg:mt-0">04/2010 — 2024</span>
                </div>
              </article>
            </div>
            <div className="mt-7 flex items-center gap-4 rounded-[1.5rem] border border-white/10 bg-[#0d1024] p-5 sm:p-6"><div className="rounded-2xl bg-violet-400/10 p-3"><Languages className="h-6 w-6 text-violet-300" /></div><div><p className="text-xs font-bold uppercase tracking-widest text-slate-500">Languages</p><p className="mt-1 font-bold">English & Hindi</p></div></div>
          </Reveal>
        </div>
      </section>

      <section id="contact" className="relative px-5 py-24 sm:px-8 lg:py-36">
        <Reveal className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-[2.4rem] border border-violet-300/20 bg-[#11142c] p-7 shadow-[0_0_80px_rgba(109,94,247,0.13)] sm:p-12 lg:p-16">
            <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_.8fr]">
              <div>
                <span className="eyebrow text-cyan-300">Have an idea or opportunity?</span>
                <h2 className="mt-5 text-5xl font-black leading-[0.95] tracking-[-0.05em] sm:text-7xl">LET&apos;S BUILD<br /><span className="text-violet-300">SOMETHING.</span></h2>
                <p className="mt-6 max-w-lg text-slate-300">I&apos;m always interested in meaningful conversations, collaborative projects, and opportunities to learn while creating useful digital experiences.</p>
              </div>
              <div className="space-y-3">
                <a href="mailto:18sharmagagan@gmail.com" className="contact-link"><Mail /><span><small>Email me</small>18sharmagagan@gmail.com</span><ArrowUpRight /></a>
                <a href="tel:+917819040247" className="contact-link"><Phone /><span><small>Call me</small>+91 78190 40247</span><ArrowUpRight /></a>
                <button onClick={copyEmail} className="contact-link w-full text-left"><Copy /><span><small>Quick action</small>{copied ? "Email copied!" : "Copy email address"}</span>{copied ? <Check className="text-emerald-300" /> : <ArrowUpRight />}</button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="border-t border-white/10 px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-3"><img src="/assets/gs-monogram.png" alt="" className="h-10 w-10 rounded-xl object-cover" /><div><p className="text-sm font-extrabold">Gagandeep Sharma</p><p className="text-xs text-slate-500">Designed for the web · 2026</p></div></div>
          <div className="flex items-center gap-3">
            <a className="social-link" href="https://linkedin.com/in/gagandeep-sharma-397387420" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a>
            <a className="social-link" href="https://github.com/sharmagagan18" target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a>
            <a className="social-link" href="mailto:18sharmagagan@gmail.com" aria-label="Email"><Mail /></a>
          </div>
        </div>
      </footer>
    </main>
  );
}
