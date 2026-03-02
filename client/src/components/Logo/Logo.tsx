import "./Logo.scss"

import { img } from "@/utils/RepairOmgSrc"

const Logo = () => {

    return (
        <div className="logo">
            <img src={img("icons/Logo.svg")}/>
        </div>
    )
}

export default Logo