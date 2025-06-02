import { useState } from 'react'
import { filterActions } from 'features/filterContests'
import { contestsPageActions } from 'pages/contestsPage'
import burger from 'shared/assets/icons/burger.svg?react'
import { useAppDispatch } from 'shared/lib/store'
import { Icon } from 'shared/ui/icon'
import { Logo } from 'shared/ui/logo'
import { Searchbar } from 'shared/ui/searchbar'
import { UserPanel } from 'widgets/userPanel'

import './header.scss'
import {Flex} from "shared/ui/stack";

export const Header = () => {
    const [inputData, setInputData] = useState('')
    const [sidebarOpen, setSidebarOpen] = useState(false)

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

    const isMobile = window.innerWidth <= 768

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    return (
        <header className='header'>
            {isMobile && (
                <div className='burgerMenu'>
                    <Icon
                        Svg={burger}
                        height={36}
                        width={36}
                        clickable
                        onClick={toggleSidebar}
                    />
                </div>
            )}
            {!isMobile && (<Logo />)}
            <Flex className='mobile-right-header'>
                <Searchbar
                    searchData={inputData}
                    onChange={setInputData}
                    onSubmit={onSearchSubmit}
                    placeholder='Search by any parameters....'
                />
                <UserPanel />
            </Flex>

        </header>
    )
}
