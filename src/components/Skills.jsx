import { useCallback, useEffect, useState } from "react";
import { stacks } from "../data/portfolio.js";
import { useModalTransition } from "../hooks/useModalTransition.js";

function StackModal({ stack, onClose }) {
  const { backdropVisible, modalVisible, close } = useModalTransition(onClose);

  return (
    <div
      className={`stack-modal-backdrop${backdropVisible ? " active" : ""}`}
      style={{ display: "flex" }}
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && close()}
    >
      <section
        className={`stack-modal${modalVisible ? " active" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="stack-modal-title"
      >
        <button
          className="modal-close-btn"
          type="button"
          onClick={close}
          aria-label="Fechar"
        >
          <i className="ri-close-line" />
        </button>
        <div className="modal-content">
          <div className="modal-title">
            <h3 id="stack-modal-title">{stack.title}</h3>
            <p>{stack.subtitle}</p>
          </div>
          <h4>{stack.heading}</h4>
          <ul className="my-stacks">
            {stack.items.map((item) => (
              <li key={item}>
                <i className="ri-checkbox-circle-fill" />
                <p>{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export function Skills() {
  const [selectedStack, setSelectedStack] = useState(null);
  const closeModal = useCallback(() => setSelectedStack(null), []);
  return (
    <section id="stack">
      <div className="yago-section nav-menu-section">
        <div className="yago-container yago-sub-container">
          <div className="yago-wrapper">
            <div className="section-title reveal">
              <h3>Tecnologias &amp; Ferramentas</h3>
            </div>
            <div className="section-content">
              <div className="stack-container">
                {stacks.map((stack) => (
                  <article className="card-with-modal reveal" key={stack.title}>
                    <button
                      className="stack-card"
                      type="button"
                      onClick={() => setSelectedStack(stack)}
                    >
                      <div className="stack-info">
                        <i className={`${stack.icon} stack-icon`} />
                        <h4>{stack.title}</h4>
                        <span className="stack-see-more">
                          Veja mais
                          <i className="ri-arrow-right-up-fill" />
                        </span>
                      </div>
                    </button>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {selectedStack && (
        <StackModal stack={selectedStack} onClose={closeModal} />
      )}
    </section>
  );
}
