import { motion } from 'framer-motion';
import { Briefcase, MapPin, CalendarDays, CheckCircle2 } from 'lucide-react';
import SectionHeading from './SectionHeading.jsx';
import { experiences } from '../data/portfolio.js';

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Experience"
          title="My professional journey"
          description="A timeline of my career growth and the impact I've delivered along the way."
        />

        <div className="relative mt-16">
          {/* timeline line */}
          <div
            aria-hidden
            className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-brand-500/0 via-white/15 to-cyan-500/0 sm:left-1/2 sm:-translate-x-1/2"
          />

          <ul className="space-y-10">
            {experiences.map((exp, i) => {
              const left = i % 2 === 0;
              return (
                <li key={exp.id} className="relative">
                  {/* Dot */}
                  <span className="absolute left-4 top-6 z-10 grid h-3 w-3 -translate-x-1/2 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-cyan-400 ring-4 ring-bg sm:left-1/2">
                    <span className="absolute h-3 w-3 animate-ping rounded-full bg-brand-400/60" />
                  </span>

                  <div
                    className={`grid gap-4 sm:grid-cols-2 ${
                      left ? '' : 'sm:[&>*:first-child]:order-2'
                    }`}
                  >
                    {/* Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ duration: 0.5 }}
                      className={`ring-grad relative glass card-hover ml-10 p-6 sm:ml-0 ${
                        left ? 'sm:mr-8' : 'sm:ml-8'
                      }`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            {exp.role}
                          </h3>
                          <p className="text-sm text-brand-300">
                            {exp.company}
                          </p>
                        </div>
                        <span className="chip">
                          <Briefcase size={12} /> {exp.type}
                        </span>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays size={12} /> {exp.period}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin size={12} /> {exp.location}
                        </span>
                      </div>

                      <ul className="mt-5 space-y-2.5">
                        {exp.responsibilities.map((r, idx) => (
                          <li
                            key={idx}
                            className="flex gap-2.5 text-sm text-slate-300"
                          >
                            <CheckCircle2
                              size={15}
                              className="mt-0.5 shrink-0 text-cyan-400"
                            />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>

                      <ul className="mt-5 flex flex-wrap gap-1.5">
                        {exp.stack.map((tech) => (
                          <li key={tech} className="chip text-[11px]">
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </motion.div>

                    {/* Spacer (alternating) */}
                    <div className="hidden sm:block" />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
