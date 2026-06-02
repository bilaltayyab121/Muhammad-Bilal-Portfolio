import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import About from '../components/About.jsx';
import Skills from '../components/Skills.jsx';
import Services from '../components/Services.jsx';
import Experience from '../components/Experience.jsx';
import Projects from '../components/Projects.jsx';
import Contact from '../components/Contact.jsx';
import Footer from '../components/Footer.jsx';
import BackgroundFX from '../components/BackgroundFX.jsx';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-stage text-slate-100">
      <BackgroundFX />
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Services />
        <Experience />
        <Projects maxItems={6} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
