import { useState } from 'react'
import { FilterOptions } from 'shared/consts'
import { CategoryFilterOption } from 'shared/ui/categoryFilterOption'

import './categoryFilter.scss'

export const CategoryFilter = () => {
    const [_currFilter, setCurrFilter] = useState<FilterOptions>(
        FilterOptions.All
    )
    return (
        <div className='categoryFilter_container'>
            <CategoryFilterOption
                _currFilter={_currFilter}
                setCurrFilter={setCurrFilter}
                FilterOption={FilterOptions.All}
                text='All'
            />
            <CategoryFilterOption
                _currFilter={_currFilter}
                setCurrFilter={setCurrFilter}
                FilterOption={FilterOptions.For_fun}
                text='For fun'
            />
            <CategoryFilterOption
                _currFilter={_currFilter}
                setCurrFilter={setCurrFilter}
                FilterOption={FilterOptions.For_work}
                text='For work'
            />
        </div>
    )
}
