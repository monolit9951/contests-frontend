import {
    createHashRouter,
    createRoutesFromElements,
    Link,
    Route,
    RouterProvider,
} from 'react-router-dom'
import { Layout } from 'app/layout'
import clsx from 'clsx'
import { useTheme } from 'entities/theme'
import { HomePage } from 'pages/homePage'

import '../styles/index.scss'

export const AppRouter = () => {
    const { theme } = useTheme()

    const routers = createRoutesFromElements(
        <Route
            path='/'
            element={<Layout />}
            handle={{ crumb: <Link to='/'>Home</Link> }}>
            <Route index element={<HomePage />} />
        </Route>
    )

    const router = createHashRouter(routers, {})

    return (
        <div className={clsx('app', theme)}>
            <RouterProvider router={router} />
        </div>
    )
}
