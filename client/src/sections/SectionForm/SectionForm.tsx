import Section from "@/layouts/Section"
import "./SectionForm.scss"
import Form from "@/components/Form"
import type {FormProps} from "@/components/Form/Form"

const SectionForm = () => {

    const form : FormProps = {
        id: "section-form",
        elements: [
            {
                type: "input",
                title: "First Name",
                placeholder: "Enter First Name",
                name: "FirstName",
                required: true,
            },
            {
                type: "input",
                title: "Last Name",
                placeholder: "Enter Last Name",
                name: "LastName",
                required: true,
            },
            {
                type: "input",
                title: "Email",
                placeholder: "Enter your Email",
                name: "Email",
                required: true,
                mask: /^[a-zA-Z0-9@._-]+$/,
            },
            {
                type: "input",
                title: "Phone",
                placeholder: "Enter Phone Number",
                name: "Phone",
                required: true,
                mask: "+{7} (000) 000-00-00"
            },
            {
                type: "select",
                title: "Preferred Location",
                placeholder: "Select Location",
                name: "Location",
                options: [
                    "Malibu",
                    "Napa",
                    "Santa Barbara",
                    "Palm Springs",
                    "None",
                ]
            },
            {
                type: "select",
                title: "Property Type",
                placeholder: "Select Property Type",
                name: "Type",
                options: [
                   "Estate",
                    "Beach House",
                    "Villa",
                    "Penthouse",
                    "None",
                ]
            },
            {
                type: "select",
                title: "No. of Bathrooms",
                placeholder: "Select no. of Bedrooms",
                name: "Bathrooms",
                options: [
                   "1",
                    "2",
                    "3",
                    "4",
                    "5+",
                ]
            },
            {
                type: "select",
                title: "No. of Bedrooms",
                placeholder: "Select no. of Bedrooms",
                name: "Bedrooms",
                options: [
                   "1",
                    "2",
                    "3",
                    "4",
                    "5+",
                ]
            },
            {
                type: "select",
                title: "Budget",
                placeholder: "Select Budget",
                name: "Budget",
                options: [
                   "200k - 800k",
                    "800k - 1,5m",
                    "1,5m - 3m",
                    "3m - 5m",
                    "5m+",
                ],
                modification: "Large",
            },
            {
                type: "input",
                title: "Preferred Contact Method",
                placeholder: "",
                name: "Contact",
                doubleInput: true,
            },
        ],
    }

    return (
        <Section className="section-form" title="Let's Make it Happen"
        description="Ready to take the first step toward your dream property? Fill out the form below, and our real estate wizards will work their magic to find your perfect match. Don't wait; let's embark on this exciting journey together."
        hasButton={false} hasSlider={false}
        >
            <Form {...form}/>
        </Section>
    )
}

export default SectionForm