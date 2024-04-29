import magnifyingGlass from "../../../assets/icons/magnifyingGlass.svg"

import "./searchbar.scss"

export const Searchbar = () => {
    return (
        <div className="searchbar_container">
            <img className="icon" src={magnifyingGlass} alt="magnifyingGlass"/>
            <input className="searchbar" placeholder="Search by any parameters...."/>
        </div>
    //     <div className="input-icons">
    //     <img className="fa fa-key icon" src={search} alt="search"/>
    //     <input className="input-field" type="password" placeholder="Password"/>
    // </div>
    )
} 