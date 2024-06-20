import { Category } from 'entities/contest'
import { filterActions } from 'features/filterContests'
import { FilterOptions } from 'shared/consts'
import { useAppDispatch } from 'shared/lib/store'

import './categoryFilterOption.scss'

interface CategoryFilterOptionProps {
    _currFilter: FilterOptions
    FilterOption: FilterOptions
    setCurrFilter: React.Dispatch<React.SetStateAction<FilterOptions>>
    text: string
}

export const CategoryFilterOption = ({
    _currFilter,
    FilterOption,
    setCurrFilter,
    text,
}: CategoryFilterOptionProps) => {
    const dispatch = useAppDispatch()

    const onBtnClick = () => {
        if (FilterOption === _currFilter) {
            return
        }

        let category: Category

        switch (FilterOption) {
            case 1:
                category = 'FOR_FUN'
                break

            case 2:
                category = 'FOR_WORK'
                break

            default:
                category = ''
                break
        }
        dispatch(filterActions.changeCategory(category))
        setCurrFilter(FilterOption)
    }

    return (
        <button
            type='button'
            className={`filter_option ${
                _currFilter === FilterOption ? 'activeFilter' : ''
            }`}
            onClick={onBtnClick}>
            {text}
        </button>
    )
}
