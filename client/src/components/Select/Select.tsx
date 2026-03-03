import { useRef, useState } from "react"
import Icon from "../Icon"
import "./Select.scss"
import classNames from "classnames"

interface SelectProps {
    iconName: string,
    placeholder: string,
    items: string[],
    mode?: "black",
    name: string,
    onChange: (value:string) => void
}

const Select = (props:SelectProps) => {

    const {
        iconName,
        placeholder,
        items,
        mode,
        name,
        onChange
    } = props

    const dropdownRef = useRef<HTMLDivElement>(null)
    const arrowRef = useRef<HTMLDivElement>(null)

    const [selectedValue, setSelectedValue] = useState("")

    const HideOrShowDropDown = () => {
        dropdownRef.current?.classList.toggle("is-expanded")
        arrowRef.current?.classList.toggle("is-rotated")
    }

    const SelectHandler = (item: string) => {
        onChange?.(item);
    }

    return (
        <div className="select">
            <select name={name} className="select-mobile visible-mobile">
                {items.map((item,index) => (
                    <option className="select-mobile-option" key={`${item}-${index}-mobile`}>{item}</option>
                ))}
            </select>
            <div className="select-custom hidden-mobile" >
                <div className="select-custom__button" tabIndex={1} onClick={HideOrShowDropDown}>
                    <div className="select-custom__button-placeholder">
                        <Icon className="select-custom__button-placeholder-icon" name={iconName} width="24px" color="var(--color-gray-60)"/>
                        <span className={classNames("select-custom__button-field", {"is-selected" : selectedValue != ""})}>
                            {selectedValue === "" ? placeholder : selectedValue }
                        </span>
                    </div>
                    <div className="select-custom__button-arrow-icon" ref={arrowRef}>
                        <Icon name="select-arrow-down" strokeFill userSelect={false} width="24px"/>
                    </div>
                </div>
                <div className="select-custom__dropdown" ref={dropdownRef}>
                    {items.map((item,index) => (
                        <span className={classNames("select-custom__dropdown-item", {"is-selected" : selectedValue === item})} key={`${item}-${index}-custom`}
                        onClick={() => {
                            setSelectedValue(item)
                            SelectHandler(item)
                            HideOrShowDropDown()
                        }}
                        >
                            {item}
                        </span>
                    ))}
                </div>
                
            </div>
        </div>
    )
}

export default Select