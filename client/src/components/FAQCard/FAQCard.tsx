import Button from "../Button"
import "./FAQCard.scss"
import type { FAQ } from "@/interfaces/interfaces"

const FAQCard = (props:FAQ) => {

    const {
        answer,
        question,
    } = props

    return (
        <div className="faqcard">
            <span className="faqcard-question h5">
                {question}
            </span>
            <span className="faqcard-answer description">
                {answer}
            </span>
            <Button className="faqcard-button" title="Read More" label="Read More" />
        </div>
    )
}

export default FAQCard