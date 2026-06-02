import { motion } from 'framer-motion';
import { Layout, Server, Database, Wrench } from 'lucide-react';
import SectionHeading from './SectionHeading.jsx';
import { skillCategories } from '../data/portfolio.js';

const iconMap = { Layout, Server, Database, Wrench };

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Tech Stack"
          title="Tools & technologies I use"
          description="A curated stack I've shipped products with — from frontend craft to cloud infrastructure."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((cat, idx) => {
            const Icon = iconMap[cat.icon] || Layout;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, delay: idx * 0.07 }}
                className="ring-grad relative glass card-hover overflow-hidden p-6"
              >
                <div
                  className={`pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br ${cat.accent} opacity-30 blur-2xl`}
                />

                <div
                  className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${cat.accent} text-white shadow-glow`}
                >
                  <Icon size={18} />
                </div>

                <h3 className="mt-4 text-lg font-semibold text-white">
                  {cat.title}
                </h3>
                <p className="mt-1 text-sm text-slate-400">{cat.description}</p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="chip transition-colors duration-300 hover:border-white/30 hover:bg-white/[0.07] hover:text-white"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
