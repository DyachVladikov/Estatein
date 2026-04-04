import Section from "@/layouts/Section";
import "./EstateForm.scss";
import Form from "@/components/Form";
import type { FormProps } from "@/components/Form/Form";
import useApi from "@/hooks/useApi";
import type { Estate } from "@/interfaces/interfaces";

const EstateForm = ({ id }: { id?: string }) => {
  const { data } = useApi<Estate>("properties", id);

  const form: FormProps = {
    id: "estate-form",
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
        mask: "+{7} (000) 000-00-00",
      },
      {
        type: "block",
        title: "Selected Property",
        placeholder: "Seaside Serenity Villa, Malibu, California",
        name: "Location",
        iconName: "location",
      },
    ],
  };
  return (
    <Section
      className="estate-form"
      hasSlider={false}
      hasButton={false}
      isGrid
      description="Interested in this property? Fill out the form below, and our real estate experts will get back to you with more details, including scheduling a viewing and answering any questions you may have."
      title="Inquire About Seaside Serenity Villa"
    >
      <Form {...form} mode="estate" blockValue={data?.place} />
    </Section>
  );
};

export default EstateForm;
