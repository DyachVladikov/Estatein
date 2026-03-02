import { useState, useEffect } from 'react';

export const useInlineSvg = (iconName: string) => {

    const [svg, setSvg] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!iconName) {
            setSvg("");
            setLoading(false);
            return;
        }

        const loadSvg = async () => {
            const iconPath = `/icons/${iconName}.svg`;
            
            if ((window as any).__svgCache?.[iconPath]) {
                setSvg((window as any).__svgCache[iconPath]);
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(iconPath);
                if (!response.ok) throw new Error("Not found");
                
                const svgCode = await response.text();
                
                if (!(window as any).__svgCache) (window as any).__svgCache = {};
                (window as any).__svgCache[iconPath] = svgCode;
                
                setSvg(svgCode);
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        loadSvg();
    }, [iconName]);

    return { svg, loading, error };
};
