import { useEffect, useRef, useState } from "react"
import Input from "../Input"
import Select from "../Select"
import "./Form.scss"
import classNames from "classnames"
import Icon from "../Icon"
import Button from "../Button"
import { IMaskInput } from "react-imask"
import useApi from "@/hooks/useApi"

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
    name: keyof FormValues,
    doubleInput?: boolean,
    required?: boolean,
    mask?: string | RegExp,
}

interface SelectEl {
    type: "select",
    title: string,
    placeholder: string,
    iconName?: string,
    modification?: "Large"
    name: keyof FormValues,
    options: string[], 
    required?: boolean,
}

interface FormValues {
    AdditionalPhone: string, 
    AdditionalEmail: string,
    Bathrooms : string,
    Bedrooms : string,
    Budget : string,
    Email : string,
    FirstName : string,
    LastName : string,
    Location : string,
    Message : string,
    Phone : string,
    Type : string,
    Contact: string,
}

const Form = (props: FormProps) => {

    const {
        id,
        elements,
    } = props

    const PATTERNS = {
        EMAIL: /\S+@\S+\.\S+/,
        PHONE: /^\d{11}$/ 
    } as const

    const [values, setValues] = useState<FormValues>({
        AdditionalPhone: "", 
        AdditionalEmail: "",
        Bathrooms: "", 
        Bedrooms: "", 
        Budget: "", 
        Email: "", 
        FirstName: "", 
        LastName: "", 
        Location: "", 
        Message: "", 
        Phone: "", 
        Type: "", 
        Contact: "",
    }) 

    const [formErrors, setformErrors] = useState<Partial<Record<keyof FormValues | "Privacy", {hasError: boolean, message: string}>>>({})
    const [activeCheckBox, setActiveCheckBox] = useState("phone-form-input")
    const [privacyCheckBoxIsChecked, setPrivacyCheckBoxIsChecked] = useState(false)
    const [isLocked, setIsLocked] = useState<boolean>(false)

    const {sendData, resData} = useApi<{message: string, ok: number}>("orders")

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
        if(resData?.ok === 200)
            setIsLocked(true)
    }, [resData])

    const HandlerSendForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newErrors: Partial<Record<keyof FormValues | "Privacy", { hasError: boolean; message: string }>> = {};

        elements.forEach(el => {
            const val = values[el.name];
            const isFieldEmpty = !val || val.trim() === "";

            if (el.required && isFieldEmpty) {
                newErrors[el.name] = { hasError: true, message: "This field is required" };
                return; 
            }

            if (!isFieldEmpty) {
                if ((el.name === "Email" || el.name === "AdditionalEmail") && !PATTERNS.EMAIL.test(val)) {
                    newErrors[el.name] = { 
                        hasError: true, 
                        message: "Please enter a valid email address (e.g. name@mail.com)" 
                    };
                }

                if ((el.name === "Phone" || el.name === "AdditionalPhone") && !PATTERNS.PHONE.test(val)) {
                    newErrors[el.name] = { 
                        hasError: true, 
                        message: "Phone number must contain 11 digits" 
                    };
                }
                
                if (el.name === "Message" && val.length < 10) {
                    newErrors.Message = { 
                        hasError: true, 
                        message: "Message is too short (min 10 characters)" 
                    };
                }
            }
        });

        if (!privacyCheckBoxIsChecked) {
            newErrors.Privacy = { 
                hasError: true, 
                message: "You must agree to the privacy policy" 
            };
        }

        if (Object.keys(newErrors).length === 0 && resData?.ok !== 200) {
            sendData(values)
        } 

        setformErrors(newErrors);
    };

    return (
        <form id={id} onSubmit={(e) => {HandlerSendForm(e)}}>
            <fieldset disabled={isLocked ? true : false}>
                <div className={classNames("form", {"successfully-sent" : isLocked})}>
                    {elements.map((element, index) => {
                            if(element.type === "input" && !element.doubleInput)
                                return <Input id={`${element.title} - ${index}`} key={`${element.title}-${index}`}
                            {...element} type="text" error={formErrors[element.name]}
                            onChange={(el) => {handlerChange(element.name, el); formErrors[element.name] = {hasError: false, message: ""}}} 
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
                                                <IMaskInput mask={"+{7} (000) 000-00-00"} type="text" id="phone-form-input" placeholder="Enter Your Number" onChange={(e) => handlerChange("AdditionalPhone", e.currentTarget.value)} />
                                                <div className="input--double-phone-checkbox input-checkbox is-active" ref={phoneRef} id="phone-form-input"/>
                                            </div>
                                            <div className="input--double-email-wrapper input-wrapper" id="email-form-input" onClick={handlerDoubleInput}>
                                                <Icon name="email" width="24px" height="24px" userSelect={false}/>
                                                <input type="text" id="email-form-input" placeholder="Enter Your Email" onChange={(e) => handlerChange("AdditionalEmail", e.currentTarget.value)}/>
                                                <div className="input--double-email-checkbox  input-checkbox" id="email-form-input" ref={emailRef} />
                                            </div>
                                        </div>
                                    </div>
                                )
                        })}
                        <div className="form-textarea">
                            <label htmlFor="user-message h6">Message</label>
                            <div className="form-textarea-wrapper">
                                <textarea placeholder="Enter your Message here.." id="user-message" onChange={(e) => handlerChange("Message", e.currentTarget.value)}></textarea>
                            </div>
                            
                        </div>
                        <div className="form-send">
                            <div className="form-send__privacy">
                                <input id="form-checkbox" className={classNames("form-send__privacy-checkbox", {"is-checked" : privacyCheckBoxIsChecked}, {"is-unchecked" : formErrors.Privacy?.hasError})} 
                                    type="checkbox" 
                                    onClick={() => {setPrivacyCheckBoxIsChecked((prev) => !prev); formErrors.Privacy = {hasError:false, message: ""}}}
                                    />
                                <label className="form-send__privacy-label description" htmlFor="form-checkbox">I agree with <u>Terms of Use</u> and <u>Privacy Policy</u></label>
                            </div>
                            <Button className={classNames("form-send-button", {"deactivated" : resData?.ok === 200})} title="Send Your Message" label="Send Your Message" mode="purple" type="submit"/>
                        </div>
                </div>
            </fieldset>
            {resData?.ok === 200 && <div className="form-suc-message">{resData?.message}</div>}
            
        </form>
    )
}

export default Form