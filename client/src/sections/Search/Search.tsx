import Button from "@/components/Button"
import "./Search.scss"
import Select from "@/components/Select"
import { useEffect, useState } from "react"
import useFilters from "@/hooks/useFilters"

interface Filteres {
    location: string,
    propertyType: string,
    pricingRange: PricingRange,
    propertySize: number,
    buildYear: Date,
}

interface PricingRange {
    min: number,
    max: number,
}

const Search = () => {

    const SelectProperties = [
        {
            iconName: "location",
            placeholder: "Location",
            items: [
                "Malibu",
                "Napa",
                "Santa Barbara",
                "Palm Springs",
            ],
            name: "location-filter",
        },
    ]

    const setFilter = useFilters();


    return (
        <div className="search container">
            <div className="search-wrapper">
                <div className="search__inside">
                    <input id="search__inside-input" className="search__inside-input" placeholder="Search For A Property" />
                    <Button className="search__inside-button" title="Find Property" label="Find Property" hasIconBefore={true} iconName="search" mode="purple"/>
                </div>
                
            </div>
            <ul className="search__filters-list">
                {SelectProperties.map((propeties) => (
                    <li className="search__filters-item" key={`${propeties}-filter`}>
                        <Select {...propeties}
                        onChange={(filter: unknown) => {
                            setFilter(propeties.placeholder.toLowerCase(), filter)
                        }}
                        />
                    </li>
                ))}
                
            </ul>
        </div>
    )
}

export default Search