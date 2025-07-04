import {
    createBrowserRouter,
    createRoutesFromElements,
    Link,
    Navigate,
    Route,
    RouterProvider,
} from 'react-router-dom'
import { Layout } from 'app/layout'
import clsx from 'clsx'
import { useTheme } from 'entities/theme'
import { BattlesPage } from 'pages/battlesPage'
import ChooseWinnerPage from 'pages/chooseWinnerPage/ui/choosewinnerPage'
import { ContestPage } from 'pages/contestPage'
import { ContestsCreationPage } from 'pages/contestsCreationPage'
import { ContestsPage } from 'pages/contestsPage'
import { FeedPage } from 'pages/feedPage'
import { HomePage } from 'pages/homePage'
import ProfilePage from 'pages/profilePage'
import { TopUsersPage } from 'pages/topUsersPage'

import '../styles/index.scss'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { clearUser } from 'widgets/registrationModal/model/slice/userSlice'
import { useEffect, useState } from 'react'
import instance from 'shared/api/api'
import { userByToken } from 'widgets/registrationModal/model/service/registrationModalService'

export const AppRouter = () => {
    const { theme, categoryTheme } = useTheme()


    // проверка юзера по токену, если токена нет, или данные по токену и в редаксе не совпадают - очищение юзера
    const useTypeSelector: TypedUseSelectorHook <RootState> = useSelector
    const user = useTypeSelector((state) => state.user)
    const dispatch = useDispatch()

    const [checkUser, setCheckUser] = useState<boolean>(false)

    useEffect(() => {
        const token = localStorage.getItem('userToken')

        const checkUserAsync = async () => {
            if (token) {
                try {
                    const userResponse = await userByToken(token)
                    if (user.userId !== userResponse.id) {
                        dispatch(clearUser())
                    }
                } catch (e) {
                    dispatch(clearUser())
                }
            } else {
                dispatch(clearUser())
            }

            setCheckUser(true)
        }

        checkUserAsync()
    }, [])




    const routers = createRoutesFromElements(
        <Route
            path='/'
            element={<Layout />}
            handle={{ crumb: <Link to='/'>Home</Link> }}>
            <Route index element={<HomePage />} />
            <Route path='/feed' element={<FeedPage />} />
            <Route path='/battles' element={<BattlesPage />} />
            <Route path='/contests' element={<ContestsPage />} />
            <Route path='/contests/:id' element={<ContestPage />} />
            <Route path='/contestsCreate' element={<ContestsCreationPage />} />
            <Route path='/topUsers' element={<TopUsersPage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/chooseWinner' element={<ChooseWinnerPage />} />
            <Route path='*' element={<Navigate to='/' />} />
        </Route>
    )

    const router = createBrowserRouter(routers, {})

    return (
        <div className={clsx('app', theme, categoryTheme)}>
            {checkUser && <RouterProvider router={router} />}
        </div>
    )
}
