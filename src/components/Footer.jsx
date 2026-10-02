import { useCallback, useEffect, useState } from "react";
import { useModalTransition } from "../hooks/useModalTransition.js";

const footerLinks = [
  ["home", "Home"],
  ["portfolio", "Projetos"],
  ["experience", "Experiência"],
  ["stack", "Stack"],
  ["certificates", "Certificados"],
  ["contact", "Contato"],
];
const cloudServices = [
  <>
    <b>S3</b> armazena os arquivos do site (HTML/CSS/JS/imagens).
  </>,
  <>
    <b>CloudFront</b> entrega o site rápido no mundo todo (CDN).
  </>,
  <>
    <b>CodePipeline</b> faz deploy automático a cada commit no GitHub.
  </>,
  <>
    <b>CloudFormation</b> define a infraestrutura como código.
  </>,
  <>
    <b>Route 53</b> gerencia DNS e domínio.
  </>,
  <>
    <b>API Gateway + Lambda</b> processam o formulário de contato com um backend
    serverless.
  </>,
  <>
    <b>SES</b> envia os e-mails do formulário usando domínio verificado.
  </>,
];

export function Footer() {
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <>
      <footer className="yago-footer" id="footer">
        <div className="container yago-container">
          <div className="inner">
            <div className="yago-logo">
              <a href="#home">
                <span>YW</span>
              </a>
            </div>
            <ul className="footer-menu">
              {footerLinks.map(([id, label]) => (
                <li className="footer-menu-item" key={id}>
                  <a href={`#${id}`}>{label}</a>
                </li>
              ))}
            </ul>
            <p className="copy-right">
              Desenvolvendo sistemas web eficientes, automações e soluções de
              software de ponta a ponta.
            </p>
            <div className="footer-tech-line">
              <button
                className="footer-tech-trigger"
                type="button"
                onClick={() => setModalOpen(true)}
                aria-haspopup="dialog"
              >
                <i className="ri-information-line" />
                <span>Como este site funciona em cloud</span>
              </button>
              <div className="footer-tech-mini">
                AWS - CloudFront - S3 - CI/CD - Serverless
              </div>
            </div>
          </div>
        </div>
      </footer>
      {modalOpen && <FooterModal onClose={closeModal} />}
    </>
  );
}

function FooterModal({ onClose }) {
  const { backdropVisible, modalVisible, close } = useModalTransition(onClose);
  return (
    <div
      className={`footer-tech-backdrop${backdropVisible ? " active" : ""}`}
      style={{ display: "flex" }}
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && close()}
    >
      <section
        className={`footer-tech-modal${modalVisible ? " active" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="footer-tech-title"
      >
        <button
          className="footer-tech-close"
          type="button"
          onClick={close}
          aria-label="Fechar"
        >
          <i className="ri-close-line" />
        </button>
        <div className="footer-tech-content">
          <h3 id="footer-tech-title">Como este site funciona</h3>
          <p>
            Este portfólio é um site estático hospedado na AWS com deploy
            automatizado e distribuição global.
          </p>
          <ul className="footer-tech-list">
            {cloudServices.map((description, index) => (
              <li key={index}>
                <i className="ri-checkbox-circle-fill" />
                <span>{description}</span>
              </li>
            ))}
          </ul>
          <div className="footer-tech-tags">
            {[
              "S3",
              "CloudFront",
              "CodePipeline",
              "CloudFormation",
              "Route 53",
              "API Gateway",
              "Lambda",
              "SES",
            ].map((tag) => (
              <span className="tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function ScrollToTop() {
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    const updateScroll = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      setScroll(maxScroll > 0 ? window.scrollY / maxScroll : 0);
    };
    window.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);
  return (
    <div className={`to-top-btn${scroll > 0.02 ? " active" : ""}`}>
      <a href="#home" aria-label="Voltar ao início">
        <span>To Top</span>
      </a>
      <div
        className="scroll-indicator-bar"
        style={{ height: `${scroll * 100}%` }}
      />
    </div>
  );
}
