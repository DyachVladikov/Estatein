import { useRef, useState } from "react"
import Icon from "../Icon"
import "./Select.scss"
import classNames from "classnames"

interface StringItems {
  type: "strings";
  items: string[];
}

interface CustomItems {
  type: "custom";
  items: React.ReactNode; 
}

type ItemsConfig = StringItems | CustomItems;

interface SelectProps {
    iconName: string,
    placeholder: string,
    items: ItemsConfig,
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
            {items.type === "strings" && (
                <div className="select-mobile-wrapper select-custom__button visible-mobile">
                    <Icon className="select-custom__button-placeholder-icon" name={iconName} width="24px" color="var(--color-gray-60)"/>
                    <select name={name} className={classNames("select-mobile", {"is-selected" : selectedValue != ""})} value={selectedValue}
                    onChange={(e) => {
                        setSelectedValue(e.currentTarget.value);
                        SelectHandler(e.currentTarget.value);
                    }}
                    >
                        <option value="" disabled hidden>
                            {placeholder} 
                        </option>
                        {items.items.map((item,index) => (
                            <option className="select-mobile-option" 
                            key={`${name}-${item}-${index}-mobile`}
                            >
                                {item}
                            </option>
                        ))}
                    </select>
                    <div className="select-custom__button-arrow-icon" ref={arrowRef}>
                        <Icon name="select-arrow-down" strokeFill userSelect={false} width="24px"/>
                    </div>
                </div>
            )} 
            <div className={classNames("select-custom", {"hidden-mobile" : items.type != "custom"})}>
                <div className="select-custom__button" tabIndex={1} onClick={HideOrShowDropDown}>
                    <div className="select-custom__button-placeholder">
                        <Icon className="select-custom__button-placeholder-icon" name={iconName} width="24px" color="var(--color-gray-60)"/>
                        <span className={classNames("select-custom__button-field", {"is-selected" : (selectedValue != "" && selectedValue != "None")})}>
                            {(selectedValue === "" || selectedValue === "None") ? placeholder : selectedValue }
                        </span>
                    </div>
                    <div className="select-custom__button-arrow-icon" ref={arrowRef}>
                        <Icon name="select-arrow-down" strokeFill userSelect={false} width="24px"/>
                    </div>
                </div>
                <div className="select-custom__dropdown" ref={dropdownRef}>
                {items.type === "strings" ? (
                    items.items.map((item, index) => (
                    <span
                        key={`${name}-${item}-${index}-custom`}
                        className={classNames("select-custom__dropdown-item", {
                        isSelected: selectedValue === item,
                        })}
                        onClick={() => {
                        setSelectedValue(item);
                        SelectHandler(item);
                        HideOrShowDropDown();
                        }}
                    >
                        {item}
                    </span>
                    ))
                ) : (
                    <div>
                        {items.items}
                    </div>
                )}
                </div>
            </div>
        </div>
    )
}

export default Select