import { Linkedin, Github, Globe, BrainCircuit, Rocket, BarChart3, Shield } from "lucide-react";

const FOCUS_AREAS = [
  {
    icon: BrainCircuit,
    title: "AI Strategy & Implementation",
    desc: "Enterprise AI adoption, responsible AI governance, and LLM-powered solutions.",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    icon: Rocket,
    title: "Business Transformation",
    desc: "Organizational change management, process optimization, and digital transformation.",
    color: "text-fuchsia-600",
    bg: "bg-fuchsia-50",
  },
  {
    icon: BarChart3,
    title: "Value Realization",
    desc: "ROI measurement, business case development, and impact analytics.",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    icon: Shield,
    title: "Enterprise Solutions",
    desc: "Cloud infrastructure, data platforms, and intelligent automation on Azure.",
    color: "text-sky-600",
    bg: "bg-sky-50",
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-10 max-w-3xl mx-auto">
      {/* Hero card */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-orange-400 text-white shadow-lg p-8 md:p-12">
        <div className="absolute -right-8 -top-8 text-[9rem] opacity-20 select-none" aria-hidden>
          💼
        </div>
        <div className="relative space-y-3">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wide ring-1 ring-white/30">
            👋 Behind the app
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight drop-shadow">
            Chris Rosa
          </h1>
          <p className="text-lg font-semibold text-white/90">
            Business Value Advisor · Microsoft
          </p>
          <p className="text-base text-white/85 max-w-xl leading-relaxed">
            I help enterprise organizations unlock AI's potential to solve complex challenges and
            drive measurable business impact. I built Brainy Buddies for the curious learners in
            my life — because the best adventures start with a question.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="https://www.linkedin.com/in/chrisrosadotcom/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white text-violet-700 hover:bg-violet-50 transition-colors px-4 py-2 text-sm font-bold shadow"
            >
              <Linkedin className="size-4" />
              LinkedIn
            </a>
            <a
              href="https://github.com/chrisrosaghub"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white px-4 py-2 text-sm font-bold ring-1 ring-white/40"
            >
              <Github className="size-4" />
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold tracking-tight">About Me</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            I'm a <strong className="text-foreground">Business Value Advisor at Microsoft</strong>,
            specializing in helping enterprise organizations strategically leverage AI and cloud
            technologies to solve their most complex business challenges. My mission is to bridge the
            gap between cutting-edge technology and real-world business value.
          </p>
          <p>
            With deep expertise in AI transformation, enterprise solutions architecture, and
            organizational change management, I work with C-suite executives and business leaders to
            develop comprehensive strategies that drive measurable ROI, operational efficiency, and
            competitive advantage through intelligent technology adoption.
          </p>
          <p>
            Outside of work, I'm passionate about education and making learning fun. Brainy Buddies
            started as a personal project to create an engaging, ad-free learning experience for
            kids — and I hope it brings a little joy (and a lot of stars ⭐) to every session.
          </p>
        </div>
      </section>

      {/* Focus areas */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold tracking-tight">Core Focus Areas</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {FOCUS_AREAS.map(({ icon: Icon, title, desc, color, bg }) => (
            <div
              key={title}
              className="flex gap-4 rounded-2xl border bg-card p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`mt-0.5 shrink-0 rounded-xl ${bg} p-2.5`}>
                <Icon className={`size-5 ${color}`} />
              </div>
              <div>
                <h3 className="font-bold text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Connect */}
      <section className="rounded-2xl border bg-card p-6 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <Globe className="size-5 text-violet-500" />
          <h2 className="text-xl font-extrabold tracking-tight">Let's Connect</h2>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">
          If you're looking to drive enterprise AI transformation or just want to chat about the
          future of intelligent technology, I'd love to connect.
        </p>
        <a
          href="https://www.linkedin.com/in/chrisrosadotcom/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 text-sm font-bold transition-colors shadow"
        >
          <Linkedin className="size-4" />
          Connect on LinkedIn
        </a>
      </section>
    </div>
  );
}
