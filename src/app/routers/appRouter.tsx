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

export const AppRouter = () => {
    const { theme, categoryTheme } = useTheme()

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
            <RouterProvider router={router} />
        </div>
    )
}
