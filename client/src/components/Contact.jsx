import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  Mail,
  MapPin,
  Send,
  Github,
  Linkedin,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { SiFiverr, SiUpwork, SiWhatsapp } from "react-icons/si";
import SectionHeading from "./SectionHeading.jsx";
import api from "../lib/api.js";
import { profile, socials, serviceOptions } from "../data/portfolio.js";

const iconMap = {
  Github,
  Linkedin,
  Mail,
  Fiverr: SiFiverr,
  Upwork: SiUpwork,
  WhatsApp: SiWhatsapp,
};

const initialForm = {
  name: '',
  email: '',
  subject: '',
  service: '',
  message: '',
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const update = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: '' }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Please enter your name';
    if (!form.email.trim()) next.email = 'Please enter your email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = 'Enter a valid email address';
    if (!form.subject.trim()) next.subject = 'Please add a subject';
    if (!form.service.trim()) next.service = 'Please select a service';
    if (!form.message.trim()) next.message = 'Please write a message';
    else if (form.message.trim().length < 10)
      next.message = 'Message should be at least 10 characters';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const t = toast.loading('Sending your message...');
    try {
      const { data } = await api.post(
        import.meta.env.VITE_API_URL + "contact",
        form,
      );
      toast.success(data?.message || 'Email sent successfully! I will reply soon.', {
        id: t,
      });
      setForm(initialForm);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        'Could not send the message. Please try again.';
      toast.error(msg, { id: t });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Let's discuss your next project"
          description="Have a project in mind or just want to say hi? My inbox is always open."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="ring-grad relative glass overflow-hidden p-6 sm:p-8 lg:col-span-7"
          >
            <div className="pointer-events-none absolute -top-20 -left-20 h-60 w-60 rounded-full bg-brand-500/20 blur-3xl" />
            <h3 className="text-lg font-semibold text-white">Send me a message</h3>
            <p className="mt-1 text-sm text-slate-400">
              I usually reply within 24 hours.
            </p>

            <form onSubmit={submit} noValidate className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Name"
                  name="name"
                  value={form.name}
                  onChange={update}
                  error={errors.name}
                  placeholder="Your full name"
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={update}
                  error={errors.email}
                  placeholder="you@example.com"
                />
              </div>
              <Field
                label="Subject"
                name="subject"
                value={form.subject}
                onChange={update}
                error={errors.subject}
                placeholder="What's this about?"
              />
              <Field
                label="Service"
                name="service"
                value={form.service}
                onChange={update}
                error={errors.service}
                placeholder="Select a service"
                select
                options={serviceOptions}
              />
              <Field
                label="Message"
                name="message"
                value={form.message}
                onChange={update}
                error={errors.message}
                placeholder="Tell me a bit about your project, idea or question..."
                textarea
              />

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full sm:w-auto"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} /> Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Side info */}
          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="space-y-4 lg:col-span-5"
          >
            <div className="glass p-6">
              <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-300">
                Contact Information
              </h4>
              <ul className="mt-4 space-y-3.5 text-sm">
                <li className="flex items-start gap-3 text-slate-300">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/[0.04] text-cyan-300">
                    <Mail size={15} />
                  </span>
                  <a href={`mailto:${profile.email}`} className="hover:text-white">
                    {profile.email}
                  </a>
                </li>
                <li className="flex items-start gap-3 text-slate-300">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/[0.04] text-brand-300">
                    <MapPin size={15} />
                  </span>
                  {profile.location}
                </li>
              </ul>
            </div>

            <div className="glass p-6">
              <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-300">
                Connect with me
              </h4>
              <ul className="mt-4 flex flex-wrap gap-2">
                {socials.map((s) => {
                  const Icon = iconMap[s.icon] || Mail;
                  return (
                    <li key={s.name}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-slate-200 transition hover:-translate-y-0.5 hover:border-white/30 hover:text-white"
                      >
                        <Icon size={14} /> {s.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="glass relative overflow-hidden p-6">
              <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />
              <h4 className="flex items-center gap-2 text-sm font-semibold text-white">
                <Sparkles size={14} className="text-cyan-300" />
                Current Availability
              </h4>
              <p className="mt-2 text-sm text-slate-400">
                {profile.availability} — open to freelance and full-time roles.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Available now
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  type = 'text',
  textarea = false,
  select = false,
  options = [],
}) {
  const base =
    'block w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:bg-white/[0.05]';
  const ok = 'border-white/10 focus:border-brand-400/60';
  const bad = 'border-rose-400/60 focus:border-rose-400';
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate-400"
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={5}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${base} resize-none ${error ? bad : ok}`}
        />
      ) : select ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`${base} ${error ? bad : ok}`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option} className="bg-slate-950 text-slate-100">
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${base} ${error ? bad : ok}`}
        />
      )}
      {error && <p className="mt-1 text-xs text-rose-300">{error}</p>}
    </div>
  );
}
