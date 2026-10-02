import { useReveal } from "./hooks/useReveal.js";
import { Header } from "./components/Header.jsx";
import { Hero } from "./components/Hero.jsx";
import { Projects } from "./components/Projects.jsx";
import { Experience } from "./components/Experience.jsx";
import { Skills } from "./components/Skills.jsx";
import { Certificates } from "./components/Certificates.jsx";
import { Contact } from "./components/Contact.jsx";
import { Footer, ScrollToTop } from "./components/Footer.jsx";

export default function App() {
  useReveal();
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <Certificates />
        <Contact />
        <ScrollToTop />
      </main>
      <Footer />
    </>
  );
}
