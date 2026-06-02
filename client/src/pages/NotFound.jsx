import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-stage px-6 text-center">
      <div className="max-w-md">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-300">
          404
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 text-slate-400">
          Looks like the page you’re after took the day off.
        </p>
        <Link to="/" className="btn-primary mt-8">
          <ArrowLeft size={16} /> Back to home
        </Link>
      </div>
    </div>
  );
}
