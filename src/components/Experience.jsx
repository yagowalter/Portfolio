import { useEffect, useState } from "react";
import { experience } from "../data/portfolio.js";

export function Experience() {
  const [activeItems, setActiveItems] = useState(() => new Set());

  useEffect(() => {
    const timeline = document.getElementById("experience-timeline");
    if (!timeline) return undefined;
    let framePending = false;
    const timelineItems = Array.from(
      timeline.querySelectorAll(".timeline-item"),
    );
    const itemObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const itemIndex = Number(entry.target.dataset.timelineIndex);
          setActiveItems((current) => {
            if (current.has(itemIndex)) return current;
            return new Set(current).add(itemIndex);
          });
          itemObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.1 },
    );
    timelineItems.forEach((item) => itemObserver.observe(item));

    const updateProgress = () => {
      framePending = false;
      const bounds = timeline.getBoundingClientRect();
      const progress = Math.max(
        0,
        Math.min(1, (window.innerHeight * 0.8 - bounds.top) / bounds.height),
      );
      timeline.style.setProperty("--line-progress", progress.toFixed(4));
    };
    const scheduleUpdate = () => {
      if (framePending) return;
      framePending = true;
      window.requestAnimationFrame(updateProgress);
    };

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    updateProgress();
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      itemObserver.disconnect();
    };
  }, []);

  return (
    <section id="experience" className="section-padding">
      <div className="container">
        <h2 className="section-title reveal">Experiência</h2>
        <div
          className="timeline"
          id="experience-timeline"
          style={{ "--line-progress": 0 }}
        >
          <div className="timeline-line" aria-hidden="true">
            <span className="timeline-line-fill" />
          </div>
          {experience.map((job, index) => (
            <article
              className={`timeline-item ${index % 2 === 0 ? "left" : "right"}${activeItems.has(index) ? " active" : ""}`}
              data-timeline-index={index}
              key={`${job.company}-${job.date}`}
            >
              <div className="timeline-marker" />
              <div className="timeline-content-wrapper">
                <div className="timeline-connector" />
                <div className="timeline-node">
                  <i className={job.icon} />
                </div>
                <div className="timeline-card">
                  <span className="timeline-date">{job.date}</span>
                  <h3 className="timeline-title">{job.title}</h3>
                  <p className="timeline-company">{job.company}</p>
                  <ul className="timeline-list">
                    {job.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
