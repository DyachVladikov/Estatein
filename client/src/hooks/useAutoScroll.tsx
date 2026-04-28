import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const useAutoScroll = () => {
  const navigate = useNavigate();

  const scrollToSection = useCallback(
    (sectionId: string, path?: string) => {
      if (path) {
        navigate(path, { state: { scrollTo: sectionId } });
      } else {
        const el = document.querySelector(`[data-js-section="${sectionId}"]`);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY - 120;
        window.scrollTo({ top, behavior: "smooth" });
      }
    },
    [navigate],
  );

  return scrollToSection;
};

export default useAutoScroll;
