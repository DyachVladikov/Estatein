import classNames from "classnames"
import "./Icon.scss"
import { useInlineSvg } from "@/hooks/useInlineSvg.tsx"

interface IconProps {
    className?: string,
    name: string,
    width?: string,
    height?: string,
    color?: string,
    userSelect?: boolean,
    strokeFill?: boolean,
}



const Icon = (props:IconProps) => {

    
    const {
        className,
        name,
        width = "100%",
        height = "100%",
        color = "white",
        userSelect = true,
        strokeFill,
    } = props

    /* const [icon, setIcon] = useState<any>("")

    useEffect(() => {
        setIcon(getSVGElement(name))
    },[]) */

    const { svg } = useInlineSvg(name)

    const poinerEvents = userSelect ? "all" : "none"

    
    return (
        <div className={classNames("icon" , className, {"icon--stroke-fill" : strokeFill})} 
        style={{color: color, width:width, height:height, pointerEvents:poinerEvents}}  
        dangerouslySetInnerHTML={{ __html: svg }}>
            
        </div>
    )
}

export default Icon