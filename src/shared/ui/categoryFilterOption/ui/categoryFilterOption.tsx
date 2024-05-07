import { FilterOptions } from 'shared/consts'

import './categoryFilterOption.scss'

interface CategoryFilterOptionProps {
    _currFilter: FilterOptions,
    FilterOption: FilterOptions,
    setCurrFilter: React.Dispatch<React.SetStateAction<FilterOptions>>,
    text: string 
}

export const CategoryFilterOption = ({_currFilter, FilterOption, setCurrFilter, text}: CategoryFilterOptionProps) => {
    return (
        <button
            type='button'
            className={`filter_option ${
                _currFilter === FilterOption ? 'activeFilter' : ''
            }`}
            onClick={() => setCurrFilter(FilterOption)}>
            {text}
        </button>
    )
}
