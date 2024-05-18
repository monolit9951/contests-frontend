import {
    createBrowserRouter,
    createRoutesFromElements,
    Link,
    Route,
    RouterProvider,
} from 'react-router-dom'
import { Layout } from 'app/layout'
import clsx from 'clsx'
import { useTheme } from 'entities/theme'
import { BattlesPage } from 'pages/battlesPage'
import { ContestsCreationPage } from 'pages/contestsCreationPage'
import { ContestsPage } from 'pages/contestsPage/ui/contestsPage'
import { FeedPage } from 'pages/feedPage'
import { HomePage } from 'pages/homePage'
import { TopUsersPage } from 'pages/topUsersPage'

import '../styles/index.scss'

export const AppRouter = () => {
    const { theme } = useTheme()

    const routers = createRoutesFromElements(
        <Route
            path='/'
            element={<Layout />}
            handle={{ crumb: <Link to='/'>Home</Link> }}>
            <Route index element={<HomePage />} />
            <Route path="/battles" element={<BattlesPage />} />
            <Route path="/contests" element={<ContestsPage />} />
            <Route path="/contestsCreate" element={<ContestsCreationPage />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/topUsers" element={<TopUsersPage />} />
        </Route>
    )

    const router = createBrowserRouter(routers, {}) 

    return (
        <div className={clsx('app', theme)}>
            <RouterProvider router={router} />
        </div>
    )
}
