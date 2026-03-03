import { useEffect, useState, useMemo } from "react"
import useApi from "./useApi"
import { useQueryClient, useQuery } from '@tanstack/react-query';
import type { Estate } from "@/interfaces/interfaces";

interface Filteres {
    location: string,
    propertyType: string,
    pricingRange: PricingRange,
    propertySize: number,
    buildYear: string,
}

interface PricingRange {
    min: number,
    max: number,
}

export default function useFilters() {

    const [filters, setFilters] = useState<Filteres>({location: "", pricingRange: {min:0, max:0}, propertySize: 0, buildYear: "2018-07-22", propertyType:""})
    const {data, loading, error} = useApi<Estate[]>("estates")

    const filteredData = useMemo(() => {
    if (!data) return [];

    return data.filter((el) => 
        (!filters.location || el.place === filters.location) &&
        
        (!filters.propertyType || el.type === filters.propertyType) &&
        
        (!filters.pricingRange?.min || !filters.pricingRange?.max || 
        (el.price >= filters.pricingRange.min && el.price <= filters.pricingRange.max)) &&
        
        (!filters.propertySize || el.area === filters.propertySize) &&
        
        (!filters.buildYear || String(el.buildYear) === filters.buildYear)
    );
    }, [data, filters.location, filters.propertyType, filters.pricingRange, filters.propertySize, filters.buildYear]);
    

    useEffect(() => {
        console.log("filtered data:", filteredData);
    }, [filteredData])
    

    const setFilter = (name: string, value: any) => {

        setFilters((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    return setFilter


}