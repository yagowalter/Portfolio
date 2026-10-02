import { useCallback, useEffect, useState } from "react";
import { projects as localProjects } from "../data/portfolio.js";
import { getProjects, isProjectsApiConfigured } from "../services/api.js";
import { useModalTransition } from "../hooks/useModalTransition.js";

function ProjectModal({ project, onClose }) {
  const { backdropVisible, modalVisible, close } = useModalTransition(onClose);

  return (
    <div
      className={`portfolio-modal-backdrop${backdropVisible ? " active" : ""}`}
      style={{ display: "flex" }}
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && close()}
    >
      <section
        className={`portfolio-modal${modalVisible ? " active" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
      >
        <button
          className="modal-close-btn"
          type="button"
          onClick={close}
          aria-label="Fechar projeto"
        >
          <i className="ri-close-line" />
        </button>
        <div className="modal-content">
          <div className="modal-img">
            <img src={project.image} alt={project.imageAlt || project.title} />
          </div>
          <h2 className="modal-title" id="project-modal-title">
            {project.modalTitle || project.title}
          </h2>
          <p className="description">{project.description}</p>
          <div className="modal-actions minimal">
            {project.links?.map((link) => (
              <a
                className="modal-link"
                href={link.href}
                target="_blank"
                rel="noreferrer"
                key={link.href}
              >
                <i className={link.icon} />
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function Projects() {
  const [projects, setProjects] = useState(localProjects);
  const [loading, setLoading] = useState(isProjectsApiConfigured);
  const [selectedProject, setSelectedProject] = useState(null);
  const closeModal = useCallback(() => setSelectedProject(null), []);

  useEffect(() => {
    if (!isProjectsApiConfigured()) return undefined;
    let active = true;
    getProjects()
      .then((data) => {
        if (active && Array.isArray(data)) setProjects(data);
      })
      .catch(() => {
        if (active) setProjects(localProjects);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="yago-section nav-menu-section" id="portfolio">
      <div className="yago-container yago-sub-container">
        <div className="yago-wrapper">
          <div className="section-title reveal">
            <h3>Projetos</h3>
            <p className="section-subtitle">Meus Projetos Criativos</p>
          </div>
          <div className="section-content">
            <div className="portfolio-container">
              {loading
                ? Array.from({ length: 3 }, (_, index) => (
                    <div
                      className="project-skeleton"
                      key={index}
                      aria-label="Carregando projeto"
                    />
                  ))
                : projects.map((project) => (
                    <article
                      className="card-with-modal reveal"
                      key={project.id}
                    >
                      <button
                        className="portfolio-card"
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        aria-label={`Ver detalhes de ${project.title}`}
                      >
                        <div className="card-img">
                          <img
                            src={project.image}
                            alt={project.imageAlt || project.title}
                            loading="lazy"
                          />
                        </div>
                        <div className="card-info">
                          <span>{project.category}</span>
                          <h4>{project.title}</h4>
                          <i
                            className="ri-arrow-right-up-line card-btn"
                            aria-hidden="true"
                          />
                        </div>
                      </button>
                    </article>
                  ))}
            </div>
          </div>
        </div>
      </div>
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={closeModal} />
      )}
    </section>
  );
}
