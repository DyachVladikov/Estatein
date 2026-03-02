import Button from "@/components/Button"
import "./Search.scss"

const Search = () => {

    return (
        <div className="search container">
            <div className="search-wrapper">
                <div className="search__inside">
                    <input id="search__inside-input" className="search__inside-input" placeholder="Search For A Property" />
                    <Button className="search__inside-button" title="Find Property" label="Find Property" hasIconBefore={true} iconName="search" mode="purple"/>
                </div>
                
            </div>
            <div className="search__filters">

            </div>
        </div>
    )
}

export default Search