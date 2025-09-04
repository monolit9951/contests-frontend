import { useEffect, useState } from 'react'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
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

            {user.userId? <UserPanel /> : <Button type='button' onClick={handleRegistration} className='header_registration' variant='primary'>Log in<span>/ Sign in</span></Button>}


            {registrationModal && <ModalWindow 
                portal
                isOuterClose 
                isOpen={registrationModal} 
                onClose={() => setRegistrationModal(false)}>
                    <RegistrationModal onClose={() => setRegistrationModal(false)}/>
                </ModalWindow>
            }
        </header>
    )
}
