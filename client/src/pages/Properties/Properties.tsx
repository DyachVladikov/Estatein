import PropertyBanner from "@/sections/PropertyBanner"
import "./Properties.scss"
import Search from "@/sections/Search"
import FilteredEstateContextProvider from "@/context/FilteredEstate"
import Discover from "@/sections/Discover"
import SectionForm from "@/sections/SectionForm"
import useScrollOnMount from "@/hooks/useScrollOnMount"

const Properties = () => {
    useScrollOnMount();
    return (
        <FilteredEstateContextProvider>
            <PropertyBanner />
            <Search />
            <Discover />
            <SectionForm />
        </FilteredEstateContextProvider>
    )
}

export default Properties