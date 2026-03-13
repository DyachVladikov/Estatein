import "./Input.scss"

interface InputProps {
    id:string,
    title: string,
    placeholder:string,
    type?: "text" | "checkBox",
    value: string,
    modeI?: "double"
    onChange: (el:string) => void,
}

const Input = (props: InputProps) => {

    const {
        id,
        title,
        placeholder,
        type = "text",
        value,
        modeI,
        onChange,
    } = props

    return (
        <div className="input">
            {modeI != "double" && (<label className="input-title h6" htmlFor={id}>{title}</label>)}
            <div className="input-wrapper">
                <input id={id} placeholder={placeholder} type={type} value={value}
                onChange={(el) => {
                    onChange(el.currentTarget.value)
                }}
                />
            </div>
        </div>
    )
}

export default Input