import { useEffect } from "react";

export function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    const observeReveal = (element) => {
      if (element.matches?.(".reveal")) observer.observe(element);
      element
        .querySelectorAll?.(".reveal")
        .forEach((child) => observer.observe(child));
    };
    document
      .querySelectorAll(".reveal")
      .forEach((element) => observer.observe(element));

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) =>
        mutation.addedNodes.forEach(observeReveal),
      );
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}
