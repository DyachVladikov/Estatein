import Button from "@/components/Button"
import "./Search.scss"
import Select from "@/components/Select"
import useFilters from "@/hooks/useFilters"
import ScrollBar from "@/components/RangeBar"

const Search = () => {

    const SelectProperties = [
        {
            iconName: "location",
            placeholder: "Location",
            items: 
                {
                    type: "strings" as const,
                    items: [
                        "Malibu",
                        "Napa",
                        "Santa Barbara",
                        "Palm Springs",
                        "None",
                    ],
                },
            name: "location-filter",
        },
        {
            iconName: "type",
            placeholder: "Property Type",
            items: 
                {
                    type: "strings" as const,
                    items: [
                        "Estate",
                        "Beach House",
                        "Villa",
                        "Penthouse",
                        "None",
                    ],
                },
            name: "type-filter",
        },
        {
            iconName: "price",
            placeholder: "Price range",
            items: 
            {
                type: "custom" as const,
                items: [
                    <ScrollBar 
                    min={100} max={5000} initialMax={4800} initialMin={200} key={"price-range"} mode="price" 
                    rangeValues={1000}
                    step={100}
                    onChange={(e) => setFilter("PricingRange", e)
                    }
                    />,
                ],
            },
            name: "price-filter",
        },
        {
            iconName: "size",
            placeholder: "Property Size",
            items: 
            {
                type: "custom" as const,
                items: [
                    <ScrollBar 
                    min={200} max={1000} initialMax={800} initialMin={300} key={"size-range"} mode="size" rangeValues={150}
                    onChange={(e) => setFilter("PropertySize", e)
                    }
                    />,
                ],
            },
            name: "size-filter",
        },
        {
            iconName: "build",
            placeholder: "Build Year",
            items: 
            {
                type: "custom" as const,
                items: [
                    <ScrollBar 
                    min={2015} max={2026} initialMax={2026} initialMin={2015} key={"build-range"} mode ="build" 
                    rangeValues ={1}
                    step={1}
                    onChange={(e) => setFilter("BuildYear", e)
                    }
                    />,
                ],
            },
            name: "build-filter",
        }, 
    ]

    const setFilter = useFilters();


    return (
        <div className="search container">
            <div className="search-wrapper">
                <div className="search__inside">
                    <input id="search__inside-input" 
                    className="search__inside-input" placeholder="Search For A Property" 
                    onChange={(el) => {
                        setFilter("Name", el.currentTarget.value)
                    }}
                    />
                    <Button className="search__inside-button" title="Find Property" label="Find Property" hasIconBefore={true} iconName="search" mode="purple"/>
                </div>
                
            </div>
            <ul className="search__filters-list">
                {SelectProperties.map((propeties) => (
                    <li className="search__filters-item" key={`${propeties.placeholder}-filter`}>
                        <Select {...propeties}
                        onChange={(filter: unknown) => {
                            setFilter(propeties.placeholder.replace(/\s/g, ''), filter)
                        }}
                        />
                    </li>
                ))}
                
            </ul>
        </div>
    )
}

export default Search