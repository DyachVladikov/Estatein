import classNames from "classnames"
import "./Icon.scss"
import getSVGElement from "../../utils/getSVGElement.ts"
import { useEffect, useState } from "react"

interface IconProps {
    className?: string,
    name: string,
    width?: string,
    height?: string,
    color?: string,
    userSelect?: boolean
}



const Icon = (props:IconProps) => {

    
    const {
        className,
        name,
        width = "100%",
        height = "100%",
        color = "white",
        userSelect = true,
    } = props

    const [icon, setIcon] = useState<string>("")

    useEffect(() => {
        setIcon(getSVGElement(name))
    },[])

    const poinerEvents = userSelect ? "all" : "none"

    
    return (
        <div className={classNames("icon" , className)} 
        style={{color: color, width:width, height:height, pointerEvents:poinerEvents}}  
        dangerouslySetInnerHTML={{ __html: icon }}>
            
        </div>
    )
}

export default Icon