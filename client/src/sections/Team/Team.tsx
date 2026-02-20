import Section from "@/layouts/Section"
import "./Team.scss"
import { useState, useEffect } from "react"
import useApi from "@/hooks/useApi"
import type { Employee, Error } from "@/interfaces/interfaces"
import EmployeeCard from "@/components/EmployeeCard"

const Team = () => {

    const [hasError, setHasError] = useState<Error>({HasError: false, status: 200})
    const [load, setLoading] = useState<boolean>(true)

    const {data: employees, loading, error} = useApi<Employee[]>("employees")

    useEffect(() => {
       setHasError({HasError: error.HasError, status:error.status})
       setLoading(loading)
       
       
    }, [employees, error, loading])  

    if(load)
    {
        return (
            <span>Loading...</span>
        )
    }

    return (
        <Section className="team" title="Meet the Estatein Team" 
        description="At Estatein, our success is driven by the dedication and expertise of our team. Get to know the people behind our mission to make your real estate dreams a reality."
        hasButton={false}
        hasSlider={false}
        >
            <div className="team-wrapper">
                {employees?.map((employee) => (
                    <EmployeeCard {...employee} key={employee._id}/>
                ))} 
                {hasError.HasError && (
                    <div className="section-error">
                        <span>{hasError.message || "=("}</span>
                    </div>
                )}
            </div>
        </Section>
    )
}

export default Team