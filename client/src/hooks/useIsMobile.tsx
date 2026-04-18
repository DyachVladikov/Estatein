import { useEffect, useState } from "react";

function useIsMobile(viewport: number): boolean {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= viewport);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= viewport);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [viewport]);

  return isMobile;
}

export default useIsMobile;
