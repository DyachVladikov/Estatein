import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useScrollOnMount = () => {
  const { state } = useLocation();

  useEffect(() => {
    if (!state?.scrollTo) return;
    const el = document.querySelector(`[data-js-section="${state.scrollTo}"]`);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top, behavior: "smooth" });
  }, [state]);
};

export default useScrollOnMount;
