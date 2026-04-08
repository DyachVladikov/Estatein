import EstateDetails from "@/sections/EstateDetails";
import "./PropertyDetails.scss";
import EstateForm from "@/sections/EstateForm";
import { useParams } from "react-router-dom";
import PricingDetails from "@/sections/PricingDetails";

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <EstateDetails id={id} />
      <EstateForm id={id} />
      <PricingDetails id={id} />
    </>
  );
};

export default PropertyDetails;
