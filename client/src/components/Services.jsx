import { motion } from 'framer-motion';
import { Layout, Monitor, Server, Smartphone } from 'lucide-react';
import SectionHeading from './SectionHeading.jsx';
import { services } from '../data/portfolio.js';

const iconMap = { Layout, Monitor, Server, Smartphone };

export default function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Services"
          title="How I help businesses grow"
          description="From web applications to APIs and product design, I build solutions that deliver results."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Layout;
            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55 }}
                className="ring-grad group relative glass overflow-hidden p-6"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-white/10 text-brand-300 shadow-glow">
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
