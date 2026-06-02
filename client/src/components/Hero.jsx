import { motion } from 'framer-motion';
import {
  ArrowRight,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { profile, socials, stats } from '../data/portfolio.js';

const iconMap = { Github, Linkedin, Mail, ExternalLink };

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.05 * i, duration: 0.6, ease: 'easeOut' },
  }),
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center pt-28 sm:pt-32"
    >
      <div className="container-page relative">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left content */}
          <div className="lg:col-span-7">
            <motion.span
              variants={fadeUp}
              custom={0}
              initial="hidden"
              animate="show"
              className="section-eyebrow"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {profile.availability}
            </motion.span>

            <motion.h1
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate="show"
              className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              Hello, I’m{' '}
              <span className="text-gradient">{profile.name}</span>
              <br />
              <span className="text-slate-300">a </span>
              <span className="relative inline-block">
                <span className="text-gradient">{profile.role}</span>
                <span className="absolute inset-x-0 -bottom-2 h-1 rounded-full bg-gradient-to-r from-brand-500/0 via-brand-400 to-cyan-400/0" />
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              initial="hidden"
              animate="show"
              className="mt-6 max-w-2xl text-base text-slate-300 sm:text-lg"
            >
              {profile.shortIntro}
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={3}
              initial="hidden"
              animate="show"
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a href="#projects" className="btn-primary">
                View Projects <ArrowRight size={16} />
              </a>
              <a href="#contact" className="btn-ghost">
                Contact Me
              </a>
              {profile.resumeUrl && (
                <a
                  href={profile.resumeUrl}
                  download
                  className="btn-ghost"
                >
                  <Download size={16} /> Resume
                </a>
              )}
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={4}
              initial="hidden"
              animate="show"
              className="mt-8 flex items-center gap-4 text-sm text-slate-400"
            >
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-brand-300" />
                {profile.location}
              </div>
              <span className="h-3 w-px bg-white/15" />
              <ul className="flex items-center gap-2">
                {socials.map((s) => {
                  const Icon = iconMap[s.icon] || Mail;
                  return (
                    <li key={s.name}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={s.name}
                        className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition hover:-translate-y-0.5 hover:border-white/30 hover:text-white"
                      >
                        <Icon size={15} />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </div>

          {/* Right card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="relative lg:col-span-5"
          >
            <div className="relative mx-auto max-w-md">
              {/* glow */}
              <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-brand-500/30 via-cyan-400/20 to-fuchsia-500/30 blur-2xl" />

              <div className="glass-strong relative overflow-hidden rounded-3xl p-6 shadow-card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-rose-400/80" />
                    <span className="h-3 w-3 rounded-full bg-amber-300/80" />
                    <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-slate-400">
                    portfolio.tsx
                  </span>
                </div>

                <pre className="mt-5 overflow-x-auto rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-[12.5px] leading-relaxed text-slate-300">
{`const dev = {
  name: "${profile.name}",
  role: "${profile.role}",
  stack: [
    "React", "Node.js",
    "MongoDB", "TypeScript"
  ],
  available: true,
  build: () => "premium ✨ products",
};`}
                </pre>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  {stats.slice(0, 4).map((s) => (
                    <div
                      key={s.label}
                      className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
                    >
                      <p className="text-2xl font-bold text-white">{s.value}</p>
                      <p className="text-xs text-slate-400">{s.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between rounded-xl border border-white/10 bg-gradient-to-r from-brand-500/15 via-brand-500/5 to-cyan-500/15 p-3">
                  <div className="flex items-center gap-2 text-sm text-slate-200">
                    <Sparkles size={14} className="text-cyan-300" />
                    Open to opportunities
                  </div>
                  <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[11px] font-medium text-emerald-300">
                    Online
                  </span>
                </div>
              </div>

              {/* floating chips */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -left-6 top-10 hidden rotate-[-8deg] sm:block"
              >
                <div className="glass px-3 py-2 text-xs font-medium text-slate-200 shadow-card">
                  ⚡ React · Node · MongoDB
                </div>
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -right-4 bottom-12 hidden rotate-[6deg] sm:block"
              >
                <div className="glass px-3 py-2 text-xs font-medium text-slate-200 shadow-card">
                  🚀 Shipping premium UI
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
