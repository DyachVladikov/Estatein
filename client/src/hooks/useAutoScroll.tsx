import { useCallback } from "react";

const useAutoScroll = () => {
  const scrollToSection = useCallback((sectionId:string) => {
    const el = document.querySelector(`[data-js-section="${sectionId}"]`);

    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
  }, []);
  return scrollToSection;
};

export default useAutoScroll