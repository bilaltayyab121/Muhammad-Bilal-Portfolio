import { motion } from 'framer-motion';
import { Layout, Monitor, Server, Smartphone } from 'lucide-react';
import SectionHeading from './SectionHeading.jsx';
import { services } from '../data/portfolio.js';

const iconMap = {
  Layout,
  Monitor,
  Server,
  Smartphone,
};

export default function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Services"
          title="What I can build for your business"
          description="High-impact offerings designed to help startups and brands launch faster, grow smarter, and scale confidently."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Layout;
            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="ring-grad glass card-hover overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-cyan-500/10 text-cyan-300 shadow-glow">
                  <Icon size={22} />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-white">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {service.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
