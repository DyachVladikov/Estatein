import PropertyBanner from "@/sections/PropertyBanner"
import "./Properties.scss"
import Search from "@/sections/Search"
import FilteredEstateContextProvider from "@/context/FilteredEstate"
import Discover from "@/sections/Discover"
import SectionForm from "@/sections/SectionForm"

const Properties = () => {

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