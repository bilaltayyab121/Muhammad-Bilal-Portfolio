import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { navLinks, profile } from "../data/portfolio.js";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (location.pathname === '/services') {
      setActive('/services');
      return;
    }

    const sections = navLinks
      .filter((l) => l.href.startsWith('#'))
      .map((l) => document.querySelector(l.href))
      .filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [location.pathname]);

  const handleClick = (e, href) => {
    e.preventDefault();

    if (href.startsWith('/')) {
      navigate(href);
      setOpen(false);
      return;
    }

    const targetHref = `/${href}`;
    if (location.pathname !== '/') {
      navigate(targetHref);
      setOpen(false);
      window.location.hash = href;
      return;
    }

    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setOpen(false);
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container-page">
        <nav
          className={`flex items-center justify-between gap-4 rounded-2xl border border-white/10 px-4 py-3 transition-all duration-300 sm:px-5 ${
            scrolled
              ? "bg-black/40 shadow-card backdrop-blur-xl"
              : "bg-white/[0.03] backdrop-blur-md"
          }`}
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleClick(e, "#home")}
            className="group flex items-center gap-2"
          >
            <div className="relative grid">
            <img
              src="/Muhammad Bilal - Full Stack Web Developer.png"
              alt="Muhammad Bilal - Full Stack Web Developer"
              className="h-9 w-9 place-items-center rounded-xl shadow-glow"
            />
            
            <Sparkles
              size={10}
              className="absolute -right-1 -top-1 text-cyan-300 opacity-80 transition-transform duration-500 group-hover:rotate-12"
            />
            </div>

            <span className="hidden text-sm font-semibold tracking-wide text-white sm:block">
              {`${profile.firstName} ${profile.lastName}`}
              <span className="text-brand-300">.</span>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "text-white"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-white/[0.08] ring-1 ring-white/10"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              onClick={(e) => handleClick(e, "#contact")}
              className="hidden btn-primary lg:inline-flex"
            >
              Hire me
            </a>
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-200 transition hover:bg-white/[0.08] lg:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="glass mt-2 overflow-hidden p-2 lg:hidden"
            >
              <ul className="flex flex-col">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleClick(e, link.href)}
                      className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm transition ${
                        active === link.href
                          ? "bg-white/10 text-white"
                          : "text-slate-300 hover:bg-white/5"
                      }`}
                    >
                      {link.label}
                      <span className="text-xs text-slate-500">→</span>
                    </a>
                  </li>
                ))}
                <li className="mt-2 px-2 pb-1">
                  <a
                    href="#contact"
                    onClick={(e) => handleClick(e, "#contact")}
                    className="btn-primary w-full justify-center"
                  >
                    Hire me
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
