import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ExternalLink, Github, Star } from 'lucide-react';
import SectionHeading from './SectionHeading.jsx';
import { projects, projectFilters } from '../data/portfolio.js';

const gridVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.94, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -12,
    scale: 0.96,
    filter: 'blur(6px)',
    transition: { duration: 0.25, ease: 'easeIn' },
  },
};

export default function Projects({ maxItems }) {
  const [filter, setFilter] = useState('All');

  const visible = useMemo(() => {
    if (filter === 'All') return projects;
    return projects.filter((p) => p.category === filter);
  }, [filter]);

  const visibleProjects = maxItems ? visible.slice(0, maxItems) : visible;

  return (
    <section id="projects" className="relative py-24 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Featured Work"
          title="A showcase of my recent work"
          description="Explore my portfolio of projects built with modern technologies and best practices."
        />

        {/* Filters */}
        <LayoutGroup id="project-filter">
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {projectFilters.map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`relative rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                    active
                      ? "border-transparent text-white"
                      : "border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-brand-500 to-cyan-500 shadow-glow"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}
                  {f}
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        {/* Grid — re-mounts on every filter change so the cascade plays each time */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            variants={gridVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {visibleProjects.map((p) => (
              <motion.article
                key={p.id}
                variants={cardVariants}
                className="ring-grad group relative glass card-hover overflow-hidden"
              >
                {/* Cover */}
                <div
                  className={`relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br ${p.cover}`}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.25),transparent_60%)]" />
                  <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay" />
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="font-mono text-5xl font-bold text-white/85 drop-shadow-lg transition-transform duration-500 group-hover:scale-110">
                      {p.title.charAt(0)}
                    </span>
                  </div>
                  {p.featured && (
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
                      <Star
                        size={10}
                        className="fill-amber-300 text-amber-300"
                      />
                      Featured
                    </span>
                  )}
                  <span className="absolute right-3 top-3 chip bg-black/40 backdrop-blur">
                    {p.category}
                  </span>
                </div>

                {/* Body */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-white">
                    {p.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-slate-400">
                    {p.description}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {p.tech.slice(0, 5).map((t) => (
                      <li key={t} className="chip text-[11px]">
                        {t}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex items-center gap-3">
                    {p.liveUrl && p.liveUrl !== "#" ? (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-300 transition hover:text-cyan-200"
                      >
                        Live <ExternalLink size={14} />
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-sm text-slate-500">
                        Live <ExternalLink size={14} />
                      </span>
                    )}
                    {p.repoUrl && p.repoUrl !== "#" ? (
                      <a
                        href={p.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-200 transition hover:text-white"
                      >
                        Code <Github size={14} />
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-sm text-slate-500">
                        Code <Github size={14} />
                      </span>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {maxItems && visible.length > maxItems && (
          <div className="mt-12 flex flex-col items-center gap-3 text-center">
            <p className="text-sm text-slate-400">
              Showing {maxItems} of {visible.length} projects.
            </p>
            <Link
              to="/projects"
              className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
            >
              See all projects
            </Link>
          </div>
        )}

        {visible.length === 0 && (
          <p className="mt-12 text-center text-sm text-slate-400">
            No projects in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}
