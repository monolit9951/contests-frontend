import { useState } from "react"

import "./contestsFilter.scss"


enum FilterOptions {
    All,
    For_fun,
    For_work
}

export const ContestsFilter = () => {
    // add _ prefix to say yo compiler that this value is intentionally unused(as for now)
    const [_currFilter, setCurrFilter] =useState<FilterOptions>(FilterOptions.All)

    
    return (
        <div className="contestsFilter_container">
            <button type="button" className="filter_option" onClick={() => setCurrFilter(FilterOptions.All)}>All</button>
            <button type="button" className="filter_option" onClick={() => setCurrFilter(FilterOptions.For_fun)}>For fun</button>
            <button type="button" className="filter_option" onClick={() => setCurrFilter(FilterOptions.For_work)}>For work</button>
        </div>
    )
}