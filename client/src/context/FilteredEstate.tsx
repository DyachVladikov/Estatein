import React, {useState, createContext } from "react";
import type {Dispatch, SetStateAction } from "react"
import type { Estate } from "@/interfaces/interfaces";

type FilteredEstateState = Estate[];

interface FilteredEstateContextType {
  filteredEstate: FilteredEstateState;
  setFilteredEstate: Dispatch<SetStateAction<FilteredEstateState>>;
}

export const FilteredEstateContext = createContext<FilteredEstateContextType>({
    filteredEstate: [],
    setFilteredEstate: () => {}
})

const FilteredEstateContextProvider = ({children} : {children: React.ReactNode}) => {

    const [filteredEstate, setFilteredEstate] = useState<FilteredEstateState>([])    

    return (
        <FilteredEstateContext.Provider value={{
            filteredEstate, setFilteredEstate
        }}>
            {children}
        </FilteredEstateContext.Provider>
    )
}

export default FilteredEstateContextProvider