import { useState } from 'react'

import './contestsFilter.scss'

enum FilterOptions {
    All,
    For_fun,
    For_work,
}

export const ContestsFilter = () => {
    const [_currFilter, setCurrFilter] = useState<FilterOptions>(
        FilterOptions.All
    )
    return (
        <div className='contestsFilter_container'>
            <button
                type='button'
                className={`filter_option ${_currFilter === FilterOptions.All ? 'activeFilter' : ''}`}
                onClick={() => setCurrFilter(FilterOptions.All)}>
                All
            </button>
            <button
                type='button'
                className={`filter_option ${_currFilter === FilterOptions.For_fun ? 'activeFilter' : ''}`}
                onClick={() => setCurrFilter(FilterOptions.For_fun)}>
                For fun
            </button>
            <button
                type='button'
                className={`filter_option ${_currFilter === FilterOptions.For_work ? 'activeFilter' : ''}`}
                onClick={() => setCurrFilter(FilterOptions.For_work)}>
                For work
            </button>
        </div>
    )
}