import { motion } from 'framer-motion';
import { Code2, Rocket, Users, Sparkles } from 'lucide-react';
import SectionHeading from './SectionHeading.jsx';
import { profile, stats } from '../data/portfolio.js';



const highlights = [
  {
    icon: Code2,
    title: "Clean Architecture",
    description:
      "Scalable, testable code with thoughtful separation of concerns.",
  },
  {
    icon: Rocket,
    title: "Performance First",
    description: "Lighthouse-conscious, optimized bundles and snappy UX.",
  },
  {
    icon: Users,
    title: "Team Player",
    description: "Mentor mindset, async-friendly and review-driven culture.",
  },
  {
    icon: Sparkles,
    title: "Pixel Polish",
    description: "A genuine love for design systems and craft details.",
  },
];

const experienceYears = Math.max(1, new Date().getFullYear() - 2021);

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="About Me"
          title={`Passionate developer with ${experienceYears}+ years of experience`}
          description="Building scalable applications and crafting exceptional digital experiences."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          {/* Bio card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="glass relative overflow-hidden p-7 sm:p-8 lg:col-span-7"
          >
            <div className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-brand-500/20 blur-3xl" />
            <h3 className="text-xl font-semibold text-white">Who I am</h3>
            <div className="mt-4 space-y-4 text-slate-300">
              {profile.longIntro.map((p, i) => (
                <p key={i} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-center"
                >
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                  <p className="mt-1 text-xs text-slate-400">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Highlights */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5">
            {highlights.map((h, i) => {
              const Icon = h.icon;
              return (
                <motion.div
                  key={h.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="ring-grad relative glass card-hover p-5"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-500/30 to-cyan-400/20 text-brand-200">
                    <Icon size={18} />
                  </div>
                  <h4 className="mt-4 text-sm font-semibold text-white">
                    {h.title}
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400">
                    {h.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
