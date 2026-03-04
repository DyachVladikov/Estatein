import { useEffect, useState, useMemo } from "react"
import useApi from "./useApi"
import type { Estate } from "@/interfaces/interfaces";

interface Filteres {
    Name: string,
    Location: string,
    PropertyType: string,
    PricingRange: Range,
    PropertySize: Range,
    BuildYear: Range,
}

interface Range {
    min: number,
    max: number,
}

export default function useFilters() {

    const [filters, setFilters] = useState<Filteres>(
        {
            Name: "",
            Location: "", 
            PricingRange: {min:0, max:0}, 
            PropertySize: {min:0, max:0}, 
            BuildYear: {min:0, max:0}, 
            PropertyType:""
        }
    )
    const {data, loading, error} = useApi<Estate[]>("estates")

    console.log(filters);
    

    const filteredData = useMemo(() => {
    if (!data) return [];

    return data.filter((el) => 

        (!filters.Name || el.name.toLowerCase().includes(filters.Name.toLowerCase())) &&

        (!filters.Location || el.place === filters.Location)   &&
        
        (!filters.PropertyType  || el.type === filters.PropertyType)   &&
        
        (!filters.PricingRange?.min || !filters.PricingRange?.max || 
        (el.price / 1000 >= filters.PricingRange.min && el.price /1000 <= filters.PricingRange.max))  &&
        
        (!filters.PropertySize?.min || !filters.PropertySize?.max || 
        (el.area >= filters.PropertySize?.min && el.area <= filters.PropertySize?.max)) &&
        
        (!filters.BuildYear?.min || !filters.BuildYear?.max || 
        (el.buildYear >= filters.BuildYear?.min && el.buildYear <= filters.BuildYear?.max)) 
    );
    }, [data, filters.Name, filters.Location, filters.PropertyType, 
        filters.PricingRange.max, filters.PricingRange.min, 
        filters.PropertySize.min, filters.PropertySize.max,
        filters.BuildYear.min, filters.BuildYear.max]);
    

    useEffect(() => {
        console.log("filtered data:", filteredData);
    }, [filteredData])
    

    const setFilter = (name: string, value: any) => {

        setFilters((prev) => {

            return {
                ...prev,
                [name]: value === "None" ? "" : value
            }
        })
    }

    return setFilter


}