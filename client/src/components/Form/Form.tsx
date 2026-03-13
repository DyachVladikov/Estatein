import { useEffect, useRef, useState } from "react"
import Input from "../Input"
import Select from "../Select"
import "./Form.scss"
import classNames from "classnames"
import Icon from "../Icon"

export interface FormProps {
    id: string,
    elements: ElementsCfg[],
}

type ElementsCfg = FormElement  | SelectEl

interface FormElement {
    type: "input" | "checkbox"
    title: string,
    placeholder: string,
    iconName?: string,
    name: string,
    doubleInput?: boolean
    mode?: "Large"
}

interface SelectEl {
    type: "select",
    title: string,
    placeholder: string,
    iconName?: string,
    modification?: "Large"
    name: string,
    options: string[], 
}

const Form = (props: FormProps) => {

    const {
        id,
        elements,
    } = props

    const [values, setValues] = useState<Record<string, any>>({})
    const [activeCheckBox, setActiveCheckBox] = useState("phone-form-input")

    const phoneRef = useRef<HTMLDivElement>(null)
    const emailRef = useRef<HTMLDivElement>(null)

    const handlerChange = (name: string, value: any) => {
        setValues((prev) => ({...prev, [name] : value}))
    }
    const handlerDoubleInput = (e:any) => { 
        if(e.target.id != activeCheckBox)
        {
            phoneRef.current?.classList.toggle("is-active")
            emailRef.current?.classList.toggle("is-active")
        }
        setActiveCheckBox(e.target.id)
    }

    useEffect(() => {
        console.log(values);
        
    }, [values])

    return (
        <form id={id}>
            <div className="form">
                {elements.map((element, index) => {
                        if(element.type === "input" && !element.doubleInput)
                            return <Input id={`${element.title} - ${index}`} key={`${element.title}-${index}`}
                        {...element} type="text" 
                        onChange={(el) => {handlerChange(element.name, el)}} 
                        value={values[element.name] || ""}
                        />
                        if(element.type === "select")
                            return (
                                <div className={classNames("form-select", {"form-select--large" : element.modification === "Large"})} key={`${element.title}-${index}`}>
                                    <h3 className="select-title h6" >{element.title}</h3>
                                    <Select className="form-mode" 
                                    iconName=""  
                                    items={{type: "strings", items: element.options}} 
                                    {...element} 
                                    onChange={(el, name) => {handlerChange(name, el)}} />
                                </div>
                        )
                        if(element.doubleInput)
                            return (
                                <div className="input--double" key={`${element.title}-${index}`}>
                                    <h3 className="input--double-label h6">{element.title}</h3>
                                    <div className="input--double-wrapper">
                                        <div className="input--double-phone-wrapper input-wrapper" id="phone-form-input" onClick={(e) => handlerDoubleInput(e)}>
                                            <Icon name="phone" width="24px" height="24px" userSelect={false}/>
                                            <input id="phone-form-input" placeholder="Enter Your Number" onChange={(e) => handlerChange("AdditionalPhone", e.currentTarget.value)} />
                                            <div className="input--double-phone-checkbox input-checkbox is-active" ref={phoneRef} id="phone-form-input"/>
                                        </div>
                                        <div className="input--double-email-wrapper input-wrapper" id="email-form-input" onClick={handlerDoubleInput}>
                                            <Icon name="email" width="24px" height="24px" userSelect={false}/>
                                            <input id="email-form-input" placeholder="Enter Your Email" onChange={(e) => handlerChange("AdditionalEmail", e.currentTarget.value)}/>
                                            <div className="input--double-email-checkbox  input-checkbox" id="email-form-input" ref={emailRef} />
                                        </div>
                                    </div>
                                </div>
                            )
                    })}
            </div>
        </form>
    )
}

export default Form