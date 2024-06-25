import { useState } from 'react'
import { filterActions } from 'features/filterContests'
import { contestsPageActions } from 'pages/contestsPage'
import { useAppDispatch } from 'shared/lib/store'
import { Logo } from 'shared/ui/logo'
import { Searchbar } from 'shared/ui/searchbar'
import { UserPanel } from 'widgets/userPanel'

import './header.scss'

export const Header = () => {
    const [inputData, setInputData] = useState('')

    const dispatch = useAppDispatch()

    const onSearchSubmit = () => {
        if (inputData.trim()) {
            dispatch(contestsPageActions.setSearchString(inputData.trim()))
            dispatch(filterActions.clearFilters())
            return
        }
        dispatch(contestsPageActions.setSearchString(inputData.trim()))
        setInputData('')
    }

    return (
        <nav className='header'>
            <Logo />
            <Searchbar
                searchData={inputData}
                onChange={setInputData}
                onSubmit={onSearchSubmit}
                placeholder='Search by any parameters....'
            />
            <UserPanel />
        </nav>
    )
}
