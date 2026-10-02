import { useEffect, useState } from "react";

const navigation = [
  ["home", "Home", "ri-home-5-line"],
  ["portfolio", "Projetos", "ri-briefcase-line"],
  ["experience", "Experiência", "ri-git-repository-line"],
  ["stack", "Stack", "ri-code-s-slash-line"],
  ["certificates", "Certificações", "ri-medal-line"],
  ["contact", "Contato", "ri-chat-1-line"],
];

export function Header() {
  const [activeSection, setActiveSection] = useState("home");
  const [navState, setNavState] = useState({ visible: true, atTop: true });

  useEffect(() => {
    let hideTimeout;
    const updateActiveSection = () => {
      const viewportPoint = window.scrollY + window.innerHeight * 0.45;
      const atTop = window.scrollY < 10;
      const active = navigation.find(([id]) => {
        const section = document.getElementById(id);
        return (
          section &&
          viewportPoint >= section.offsetTop &&
          viewportPoint < section.offsetTop + section.offsetHeight
        );
      });
      if (active) setActiveSection(active[0]);
      setNavState((current) =>
        current.visible && current.atTop === atTop
          ? current
          : { visible: true, atTop },
      );
      document
        .querySelector(".yago-header")
        ?.classList.toggle("shrink", window.scrollY > 0);

      window.clearTimeout(hideTimeout);
      if (!atTop) {
        hideTimeout = window.setTimeout(
          () => setNavState({ visible: false, atTop: false }),
          3500,
        );
      }
    };
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    updateActiveSection();
    return () => {
      window.clearTimeout(hideTimeout);
      window.removeEventListener("scroll", updateActiveSection);
    };
  }, []);

  return (
    <>
      <header className="yago-header">
        <div className="yago-container">
          <div className="inner">
            <div className="yago-logo">
              <a href="#home">
                <span>YW</span>
              </a>
            </div>
            <div className="header-btns">
              <div className="yago-main-btn border-btn lets-talk-btn">
                <a href="#contact">Vamos conversar</a>
              </div>
              <a
                href="#contact"
                className="lets-talk-icon"
                aria-label="Vamos conversar"
              >
                <i className="ri-chat-1-fill" />
              </a>
            </div>
          </div>
        </div>
      </header>
      <div className="bottom-nav-container">
        <nav
          className={`bottom-nav${navState.visible ? " active" : ""}`}
          aria-label="Navegação principal"
        >
          <div className="bottom-nav-inner">
            <button
              className={`menu-hide-btn${navState.visible && !navState.atTop ? " active" : ""}`}
              type="button"
              onClick={() =>
                setNavState((current) => ({ ...current, visible: false }))
              }
              aria-label="Ocultar navegação"
            >
              <i className="ri-arrow-left-down-line" />
            </button>
            <ul className="menu">
              {navigation.map(([id, label, icon]) => (
                <li className="menu-item" key={id}>
                  <a
                    className={activeSection === id ? "current" : ""}
                    href={`#${id}`}
                    onClick={() => setActiveSection(id)}
                  >
                    <i className={icon} />
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <button
          className={`menu-show-btn${navState.visible ? "" : " active"}`}
          type="button"
          onClick={() =>
            setNavState((current) => ({ ...current, visible: true }))
          }
          aria-label="Mostrar navegação"
        >
          <span className="bar-01" />
          <span className="bar-02" />
        </button>
      </div>
    </>
  );
}
