import { useEffect, useState } from "react";

const phrases = ["Rising Software Engineer", "Java - Full Stack - Cloud"];

function useTypingText() {
  const [text, setText] = useState("");
  useEffect(() => {
    let phraseIndex = 0;
    let characterIndex = 0;
    let deleting = false;
    let timeout;
    const tick = () => {
      const phrase = phrases[phraseIndex];
      characterIndex += deleting ? -1 : 1;
      setText(phrase.slice(0, characterIndex));
      let delay = deleting ? 50 : 90;
      if (!deleting && characterIndex === phrase.length) {
        deleting = true;
        delay = 1400;
      } else if (deleting && characterIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 300;
      }
      timeout = window.setTimeout(tick, delay);
    };
    timeout = window.setTimeout(tick, 250);
    return () => window.clearTimeout(timeout);
  }, []);
  return text;
}

export function Hero() {
  const typingText = useTypingText();
  return (
    <section id="home" className="hero section-padding">
      <div className="hero-side-left reveal">
        <span className="side-text">Me Siga</span>
        <div className="side-line" />
        <div className="social-icons-col">
          <a
            href="https://github.com/yagowalter"
            target="_blank"
            rel="noreferrer"
            className="social-icon"
            aria-label="GitHub"
          >
            <i className="ri-github-fill" />
          </a>
          <a
            href="https://www.linkedin.com/in/yago-walter/"
            target="_blank"
            rel="noreferrer"
            className="social-icon"
            aria-label="LinkedIn"
          >
            <i className="ri-linkedin-fill" />
          </a>
          <a
            href="https://www.instagram.com/_yagowalter/"
            target="_blank"
            rel="noreferrer"
            className="social-icon"
            aria-label="Instagram"
          >
            <i className="ri-instagram-fill" />
          </a>
        </div>
      </div>
      <a
        className="hero-side-right reveal"
        href="#footer"
        aria-label="Rolar até o rodapé"
      >
        <div className="mouse-icon">
          <div className="mouse-wheel" />
        </div>
        <div className="side-line" />
        <span className="side-text">Scroll Down</span>
      </a>
      <div className="container hero-content reveal">
        <div className="hero-text">
          <h1>
            Yago <span className="text-primary">Walter</span>
          </h1>
          <h2 className="role">
            <span className="typing-wrap">
              <span>{typingText}</span>
              <span className="cursor" />
            </span>
          </h2>
          <p className="description">
            Desenvolvedor com foco em ecossistema Java, arquitetura de software
            e aplicações Cloud. Atualmente focado em soluções corporativas de
            alto impacto para o setor financeiro
          </p>
          <div className="hero-actions">
            <a
              href="/pdf/CV%20-%20Yago.Walter.pdf"
              className="btn btn-primary"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fas fa-download" /> Download CV
            </a>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <img
            className="hero-image"
            src="/img/hero_cloud_04_isolated%20(1).png"
            alt=""
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
