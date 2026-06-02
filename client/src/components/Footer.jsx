import { ExternalLink, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { profile, socials } from '../data/portfolio.js';

const iconMap = { Github, Linkedin, Mail, ExternalLink };

export default function Footer() {
  const year = new Date().getFullYear();

  const toTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative mt-10 border-t border-white/5 py-10">
      <div className="container-page">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="text-sm text-slate-300">
              <span className="font-semibold text-white">
                {profile.name}
              </span>{' '}
              · {profile.role}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              © {year} All rights reserved. Built with React, Tailwind & ☕.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <ul className="flex items-center gap-1.5">
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
                      <Icon size={14} />
                    </a>
                  </li>
                );
              })}
            </ul>
            <button
              type="button"
              onClick={toTop}
              aria-label="Back to top"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-gradient-to-br from-brand-500 to-cyan-500 text-white shadow-glow transition hover:-translate-y-0.5"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-xs italic text-slate-500">
          “{profile.quote.text}” — {profile.quote.author}
        </p>
      </div>
    </footer>
  );
}
