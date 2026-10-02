import { useCallback, useEffect, useRef, useState } from "react";

export function useModalTransition(onClose) {
  const [backdropVisible, setBackdropVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const closeTimeout = useRef(null);

  const close = useCallback(() => {
    if (closeTimeout.current) return;
    setBackdropVisible(false);
    setModalVisible(false);
    closeTimeout.current = window.setTimeout(onClose, 500);
  }, [onClose]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const backdropFrame = window.requestAnimationFrame(() =>
      setBackdropVisible(true),
    );
    const modalTimer = window.setTimeout(() => setModalVisible(true), 120);
    const onKeyDown = (event) => event.key === "Escape" && close();
    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.cancelAnimationFrame(backdropFrame);
      window.clearTimeout(modalTimer);
      window.clearTimeout(closeTimeout.current);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [close]);

  return { backdropVisible, modalVisible, close };
}
