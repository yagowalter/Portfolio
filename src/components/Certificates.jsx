import { certificates } from "../data/portfolio.js";

export function Certificates() {
  return (
    <section id="certificates" className="section-padding">
      <div className="container">
        <h2 className="section-title section-title--static reveal">
          Formação &amp; Certificações
        </h2>
        <div className="certs-grid certs-grid--uniform">
          {certificates.map((certificate) => (
            <article
              className={`cert-card cert-card--badge reveal ${certificate.className || ""}`}
              key={certificate.title}
            >
              <div className="badge-img-wrap">
                {certificate.image ? (
                  <img
                    className="badge-img"
                    src={certificate.image}
                    alt={certificate.imageAlt}
                    loading="lazy"
                  />
                ) : (
                  <i
                    className={`${certificate.icon} grad-icon`}
                    aria-hidden="true"
                  />
                )}
              </div>
              <div className="cert-body">
                {certificate.highlight && (
                  <span className="cert-highlight">
                    <i className="ri-shield-check-line" aria-hidden="true" />
                    Certificação Oficial
                  </span>
                )}
                <h3 className="cert-title">{certificate.title}</h3>
                <p className="cert-school">{certificate.school}</p>
                <span className="cert-date">{certificate.date}</span>
              </div>
              <div className="cert-meta">
                <a
                  href={certificate.link}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-link cert-link"
                >
                  <i className="ri-external-link-line" />{" "}
                  {certificate.linkLabel}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
