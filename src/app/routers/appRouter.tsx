import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Link,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { Layout } from 'app/layout'
import { RootState } from 'app/providers/store'
import clsx from 'clsx'
import { useTheme } from 'entities/theme'
import { BattlesPage } from 'pages/battlesPage'
import ChooseWinnerPage from 'pages/chooseWinnerPage/ui/choosewinnerPage'
import { ContestPage } from 'pages/contestPage'
import { ContestsCreationPage } from 'pages/contestsCreationPage'
import { ContestsPage } from 'pages/contestsPage'
import { FeedPage } from 'pages/feedPage'
import ProfilePage from 'pages/profilePage'
import ProfileSettingsPage from 'pages/profileSettingsPage'
import { TopUsersPage } from 'pages/topUsersPage'
import { ModalWindow } from 'shared/ui/modalWindow'
import ProtectedRoute from 'widgets/protectedRoute'
import { RegistrationModal } from 'widgets/registrationModal'
import { userByToken } from 'widgets/registrationModal/model/service/registrationModalService'
import { clearUser, setUser } from 'widgets/registrationModal/model/slice/userSlice'

import '../styles/index.scss'
import ModalWorkPage from 'pages/modalWorkPage/ui/modalWorkPage'

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
    }

    const token = localStorage.getItem('userToken')

    const checkUserAsync = async () => {
      if (token) {
        try {
          const userResponse = await userByToken(token)

          // если пользователя нет, либо пользователь в сторадже такой же как и в токене
          if(user.userId === null || user.userId === userResponse.id){
            dispatch(setUser({
              userId: userResponse.id,
              userName: userResponse.name,
              userLogin: userResponse.login,
              userRole: userResponse.role,
              userProfileImg: userResponse.profileImage
            }))
          } else {
            // console.log('USER AND TOKEN NOT MATCH')
            dispatch(clearUser())
            localStorage.removeItem('userToken')
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
    <Route index element={<FeedPage />} />

    <Route path='/battles' element={<BattlesPage />} />
    <Route path='/contests' element={<ContestsPage />} />
    <Route path='/contests/:contestId' element={<ContestPage />} >
      {/* <Route path='/work/:workId' element={<ModalWorkPage />}/> */}
    </Route>
    <Route path='/topUsers' element={<TopUsersPage />} />
    <Route path='profile/:id' element={<ProfilePage />} />

    <Route element={<ProtectedRoute auth />}>
      <Route path='/contestsCreate' element={<ContestsCreationPage />} />
      <Route path='/profile' element={<ProfilePage />} />
      <Route path='/chooseWinner/:id' element={<ChooseWinnerPage />} />
      <Route path='/profile/settings' element={<ProfileSettingsPage />} />
    </Route>

    <Route path='*' element={<Navigate to='/' replace />} />
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
