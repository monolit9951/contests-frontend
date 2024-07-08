import { useState } from 'react'
import { Category } from 'entities/contest'
import { selectCategory } from 'features/filterContests'
import { useAppSelector } from 'shared/lib/store'
import { CategoryFilterOption } from 'shared/ui/categoryFilterOption'

import './categoryFilter.scss'

export const CategoryFilter = () => {
    const category = useAppSelector(selectCategory)

    const [_currFilter, setCurrFilter] = useState<Category>(category)

    return (
        <div className='categoryFilter_container'>
            <CategoryFilterOption
                _currFilter={_currFilter}
                setCurrFilter={setCurrFilter}
                FilterOption=''
                text='All'
            />
            <CategoryFilterOption
                _currFilter={_currFilter}
                setCurrFilter={setCurrFilter}
                FilterOption='FOR_FUN'
                text='For fun'
            />
            <CategoryFilterOption
                _currFilter={_currFilter}
                setCurrFilter={setCurrFilter}
                FilterOption='FOR_WORK'
                text='For work'
            />
        </div>
    )
}
