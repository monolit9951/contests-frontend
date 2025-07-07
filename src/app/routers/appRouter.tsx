import { useEffect, useState } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
  Link,
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'

import { RootState } from 'app/providers/store'
import { useTheme } from 'entities/theme'
import { Layout } from 'app/layout'
import { HomePage } from 'pages/homePage'
import { FeedPage } from 'pages/feedPage'
import { BattlesPage } from 'pages/battlesPage'
import { ContestsPage } from 'pages/contestsPage'
import { ContestPage } from 'pages/contestPage'
import { ContestsCreationPage } from 'pages/contestsCreationPage'
import { TopUsersPage } from 'pages/topUsersPage'
import ProfilePage from 'pages/profilePage'
import ChooseWinnerPage from 'pages/chooseWinnerPage/ui/choosewinnerPage'
import { ModalWindow } from 'shared/ui/modalWindow'
import { RegistrationModal } from 'widgets/registrationModal'
import ProtectedRoute from 'widgets/protectedRoute'
import { userByToken } from 'widgets/registrationModal/model/service/registrationModalService'
import { clearUser, setUser } from 'widgets/registrationModal/model/slice/userSlice'

import '../styles/index.scss'

export const AppRouter = () => {
  const { theme, categoryTheme } = useTheme()
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user)

  const [checkUser, setCheckUser] = useState(false)
  const [userAuth, setUserAuth] = useState(false)

  const [currentSearch, setCurrentSearch] = useState(window.location.search)

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.location.search !== currentSearch) {
        setCurrentSearch(window.location.search)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [currentSearch])


  useEffect(() => {
    const searchParams = new URLSearchParams(currentSearch)
    if (searchParams.get('auth') === 'false') {
      setUserAuth(true)
    }
  }, [currentSearch])

  // обработка токена и проверка юзера
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)

    const googleToken = searchParams.get('token')
    if (googleToken) {
      localStorage.setItem('userToken', googleToken)
      searchParams.delete('token')
    }

    const token = localStorage.getItem('userToken')

    const checkUserAsync = async () => {
      if (token) {
        try {
          const userResponse = await userByToken(token)
          if (user.userId !== userResponse.id) {
            dispatch(clearUser())
            localStorage.removeItem('userToken')
          } else {
            dispatch(setUser(userResponse))
          }
        } catch {
          dispatch(clearUser())
          localStorage.removeItem('userToken')
        }
      } else {
        dispatch(clearUser())
        localStorage.removeItem('userToken')
      }

      setCheckUser(true)
    }

    checkUserAsync()
  }, [])

  const handleModalRegClose = () => {
    setUserAuth(false)
  }

  const routes = createRoutesFromElements(
    <Route path='/' element={<Layout />} handle={{ crumb: <Link to='/'>Home</Link> }}>
      <Route index element={<HomePage />} />
      <Route path='/feed' element={<FeedPage />} />
      <Route path='/battles' element={<BattlesPage />} />
      <Route path='/contests' element={<ContestsPage />} />
      <Route path='/contests/:id' element={<ContestPage />} />
      <Route path='/topUsers' element={<TopUsersPage />} />
      <Route element={<ProtectedRoute auth />}>
        <Route path='/contestsCreate' element={<ContestsCreationPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/chooseWinner' element={<ChooseWinnerPage />} />
      </Route>
      <Route path='*' element={<Navigate to='/' />} />
    </Route>
  )

  const router = createBrowserRouter(routes)

  return (
    <div className={clsx('app', theme, categoryTheme)}>
      {checkUser && <RouterProvider router={router} />}
      {userAuth && (
        <ModalWindow isOpen={userAuth} onClose={handleModalRegClose}>
          <RegistrationModal auth />
        </ModalWindow>
      )}
    </div>
  )
}
