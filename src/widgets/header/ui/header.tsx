import { useState } from 'react'
import { filterActions } from 'features/filterContests'
import { contestsPageActions } from 'pages/contestsPage'
import { useAppDispatch } from 'shared/lib/store'
import { Button } from 'shared/ui/button'
import { Logo } from 'shared/ui/logo'
import { ModalWindow } from 'shared/ui/modalWindow'
import { Searchbar } from 'shared/ui/searchbar'
import {RegistrationModal} from 'widgets/registrationModal'
import { UserPanel } from 'widgets/userPanel'

import './header.scss'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { UserState } from 'widgets/registrationModal/model/slice/userSlice'

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

    const [registrationModal, setRegistrationModal] = useState<boolean>(false)

    const handleRegistration = () => {
        setRegistrationModal(true)
    }

    const useTypeSelector: TypedUseSelectorHook <RootState> = useSelector
    const user = useTypeSelector((state) => state.user)
    
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
            {/* <button onClick={handleRegistration} type='button'>registration</button> */}

            {user.userId? <UserPanel /> : <Button type='button' onClick={handleRegistration} variant='primary'>Log in/ Sign in</Button>}

            {/* <div className={clsx('header_sideNavBar', { open: sidebar })}>
                <nav>
                    {mockNavData.map((navItem, index) => (
                        <NavElement key={index} {...navItem} />
                    ))}
                </nav>
            </div> */}

            {registrationModal && <ModalWindow 
                isOuterClose 
                isOpen={registrationModal} 
                onClose={() => setRegistrationModal(false)}>
                    <RegistrationModal />
                </ModalWindow>
            }
        </header>
    )
}
