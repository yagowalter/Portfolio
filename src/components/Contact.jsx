import { useState } from "react";
import { sendContactMessage } from "../services/api.js";

export function Contact() {
  const [status, setStatus] = useState({ type: "", message: "" });
  const [sending, setSending] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("full-name").toString().trim(),
      email: formData.get("email").toString().trim(),
      subject: formData.get("subject").toString().trim(),
      message: formData.get("message").toString().trim(),
    };
    setSending(true);
    setStatus({ type: "", message: "" });
    try {
      await sendContactMessage(payload);
      form.reset();
      setStatus({ type: "success", message: "Sua mensagem foi enviada!" });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Erro ao enviar mensagem.",
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="yago-section nav-menu-section" id="contact">
      <div className="yago-container yago-sub-container">
        <div className="yago-wrapper">
          <div className="section-title reveal">
            <h3>Fale comigo</h3>
          </div>
          <div className="section-content">
            <div className="contact-container">
              <div className="contact-info reveal">
                <h3>Informações de Contato</h3>
                <ul className="contact-details">
                  <li className="contact-item">
                    <div className="contact-icon">
                      <i className="ri-mail-send-fill" />
                    </div>
                    <div className="contact-method">
                      <span>E-mail</span>
                      <h4>yago.walter_7@hotmail.com</h4>
                      <a href="mailto:yago.walter_7@hotmail.com">
                        Enviar <i className="ri-arrow-right-up-line" />
                      </a>
                    </div>
                  </li>
                  <li className="contact-item">
                    <div className="contact-icon">
                      <i className="ri-whatsapp-line" />
                    </div>
                    <div className="contact-method">
                      <span>WhatsApp</span>
                      <h4>(83) 99952-5308</h4>
                      <a
                        href="https://wa.me/5583999525308?text=Ol%C3%A1,%20boa%20tarde!"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Enviar <i className="ri-arrow-right-up-line" />
                      </a>
                    </div>
                  </li>
                </ul>
                <h3>Redes Sociais</h3>
                <ul className="contact-social-links">
                  <li>
                    <a
                      href="https://www.instagram.com/_yagowalter/"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Instagram"
                    >
                      <i className="ri-instagram-line" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/in/yago-walter/"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn"
                    >
                      <i className="ri-linkedin-line" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/yagowalter"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub"
                    >
                      <i className="ri-github-fill" />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="contact-form-body reveal">
                <h2>
                  Vamos trabalhar <span>juntos.</span>
                </h2>
                <p>
                  Projetos bons começam com uma boa conversa. Me chama aqui
                  embaixo e a gente resolve!
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="input-group">
                    <input
                      type="text"
                      name="full-name"
                      placeholder="Nome *"
                      autoComplete="name"
                      required
                    />
                  </div>
                  <div className="input-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email *"
                      autoComplete="email"
                      required
                    />
                  </div>
                  <div className="input-group">
                    <input
                      type="text"
                      name="subject"
                      placeholder="Assunto *"
                      required
                    />
                  </div>
                  <div className="input-group">
                    <textarea
                      name="message"
                      placeholder="Sua mensagem *"
                      required
                    />
                  </div>
                  <div className="input-group send-message">
                    <button
                      className="btn btn-primary submit-btn"
                      type="submit"
                      disabled={sending}
                    >
                      {sending ? "Enviando..." : "Enviar"}
                    </button>
                    {status.message && (
                      <div
                        className={`contact-form-alert is-visible${status.type === "error" ? " is-error" : ""}`}
                        role="status"
                      >
                        <span>{status.message}</span>
                        <i
                          className={
                            status.type === "error"
                              ? "ri-error-warning-line"
                              : "ri-checkbox-circle-fill"
                          }
                        />
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
