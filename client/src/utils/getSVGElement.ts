export default function getSVGElement(svgName:string | unknown): string  | unknown {
    
    if(typeof(svgName) != "string")
        return ""
    const currentName = svgName.slice(0,svgName.length)   


    const modules = import.meta.glob('../../src/assets/icons/*.svg', { 
        query: '?raw', 
        import: 'default',
        eager: true 
    });

    const svgCode = modules[`../assets/icons/${currentName}.svg`];
    

    return svgCode
    
}