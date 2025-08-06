import { Category } from 'entities/contest'
import { CategoryTheme, useTheme } from 'entities/theme'
import { filterActions } from 'features/filterContests'
import { useAppDispatch } from 'shared/lib/store'

import './categoryFilterOption.scss'

interface CategoryFilterOptionProps {
    _currFilter: Category
    FilterOption: Category
    // setCurrFilter: React.Dispatch<React.SetStateAction<Category>>
    text: string
}

export const CategoryFilterOption = ({
    _currFilter,
    FilterOption,
    // setCurrFilter,
    text,
}: CategoryFilterOptionProps) => {
    const { toggleCategoryTheme } = useTheme()
    const dispatch = useAppDispatch()

    const onBtnClick = () => {
        if (FilterOption === _currFilter) {
            return
        }

        let category: Category
        let categoryTheme: CategoryTheme

        switch (FilterOption) {
            case 'DARE':
                category = 'DARE'
                categoryTheme = CategoryTheme.FOR_FUN
                break

            case 'CONTEST':
                category = 'CONTEST'
                categoryTheme = CategoryTheme.FOR_WORK
                break

            default:
                category = ''
                categoryTheme = CategoryTheme.ALL
                break
        }
        dispatch(filterActions.changeCategory(category))
        // setCurrFilter(FilterOption)
        toggleCategoryTheme(categoryTheme)
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
