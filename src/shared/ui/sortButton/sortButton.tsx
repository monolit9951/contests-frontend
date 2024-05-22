import clsx from 'clsx'
import { filterActions, selectSortDirection } from 'features/filterContests'
import caretDown from 'shared/assets/icons/caretDown.svg?react'
import caretUp from 'shared/assets/icons/caretUp.svg?react'
import { useAppDispatch, useAppSelector } from 'shared/lib/store'
import { Icon } from 'shared/ui/icon'

import './sortButton.scss'

const SortButton = () => {
    const dispatch = useAppDispatch()

    const sortDirection = useAppSelector(selectSortDirection)

    const onSortClick = () => {
        dispatch(filterActions.changeSortDirection())
    }

    return (
        <button
            type='button'
            aria-label='Sort by direction'
            onClick={onSortClick}
            className='button__sort'>
            <Icon
                Svg={caretUp}
                width={20}
                height={20}
                className={clsx(sortDirection === 'ASC' && 'active')}
            />
            <Icon
                Svg={caretDown}
                width={20}
                height={20}
                className={clsx(sortDirection === 'DESC' && 'active')}
            />
        </button>
    )
}

export default SortButton
