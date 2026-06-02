import Navbar from '../components/Navbar.jsx';
import Services from '../components/Services.jsx';
import Projects from '../components/Projects.jsx';
import Footer from '../components/Footer.jsx';
import BackgroundFX from '../components/BackgroundFX.jsx';

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-stage text-slate-100">
      <BackgroundFX />
      <Navbar />
      <main className="relative pt-28 sm:pt-32">
        <Services />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}
