import { Category } from 'entities/contest'
import { CategoryTheme, useTheme } from 'entities/theme'
import { filterActions, selectCategory } from 'features/filterContests'
import { useAppDispatch, useAppSelector } from 'shared/lib/store'

import './categoryFilterOption.scss'
import { useEffect, useState } from 'react'

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
    // const { toggleCategoryTheme } = useTheme()
    const dispatch = useAppDispatch()
    const [activeStyle, setActiveStyle] = useState<'activeDare' | 'activeContest' | 'activeAll'>('activeAll')
    const onBtnClick = () => {
        if (FilterOption === _currFilter) {
            return
        }
        
        // let category: Category
        // // let categoryTheme: CategoryTheme

        // // switch (FilterOption) {
        // //     case 'DARE':
        // //         category = 'DARE'
        // //         categoryTheme = CategoryTheme.FOR_FUN
        // //         break

        // //     case 'CONTEST':
        // //         category = 'CONTEST'
        // //         categoryTheme = CategoryTheme.FOR_WORK
        // //         break

        // //     default:
        // //         category = ''
        // //         categoryTheme = CategoryTheme.ALL
        // //         break
        // // }
        dispatch(filterActions.changeCategory(FilterOption))
        // setCurrFilter(FilterOption)
        // toggleCategoryTheme(categoryTheme)
    }

    useEffect(() => {
        switch (_currFilter){
            case 'DARE': 
                setActiveStyle('activeDare')
                break
            case 'CONTEST':
                setActiveStyle('activeContest')
                break
            default:
                setActiveStyle('activeAll')
                break
        }
        // console.log(activeStyle)
    }, [_currFilter])
    
    return (
        <button
            type='button'
            className={`filter_option ${FilterOption === _currFilter && activeStyle}`}
            onClick={onBtnClick}>
            {text}
        </button>
    )
}
