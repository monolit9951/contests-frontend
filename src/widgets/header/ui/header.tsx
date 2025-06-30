import { useState } from 'react'
import { mockNavData } from 'app/api'
import clsx from 'clsx'
import { filterActions } from 'features/filterContests'
import { contestsPageActions } from 'pages/contestsPage'
import burger from 'shared/assets/icons/burger.svg?react'
import { useAppDispatch } from 'shared/lib/store'
import { Icon } from 'shared/ui/icon'
import { Logo } from 'shared/ui/logo'
import { NavElement } from 'shared/ui/navElement'
import { Searchbar } from 'shared/ui/searchbar'
import { UserPanel } from 'widgets/userPanel'

import './header.scss'
import { ModalWindow } from 'shared/ui/modalWindow'
import RegistrationModal from 'widgets/registrationModal'

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

    // открытие навигационного меню
    // const [sidebar, setSideBar] = useState<boolean>(false)

    // const toggleSideBar = () => {
    //     setSideBar(!sidebar)
    // }

    return (
        <header className='header'>
            <div className="header_logoGroup">
                {/* <div className='burgerMenu'>
                    <Icon
                        Svg={burger}
                        height={36}
                        width={36}
                        clickable
                        onClick={toggleSideBar}
                    />
                </div> */}

                <Logo />
            </div>
            <Searchbar
                searchData={inputData}
                onChange={setInputData}
                onSubmit={onSearchSubmit}
                placeholder='Search by any parameters....'
            />
            <UserPanel />

            {/* <div className={clsx('header_sideNavBar', { open: sidebar })}>
                <nav>
                    {mockNavData.map((navItem, index) => (
                        <NavElement key={index} {...navItem} />
                    ))}
                </nav>
            </div> */}

            <ModalWindow isOpen><RegistrationModal /></ModalWindow>
        </header>
    )
}
