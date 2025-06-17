import { SkeletonTheme } from 'react-loading-skeleton'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import clsx from 'clsx'
import { Theme, useTheme } from 'entities/theme'
import { Footer } from 'widgets/footer'
import { Header } from 'widgets/header'
import { Sidebar } from 'widgets/sidebar'

import 'react-loading-skeleton/dist/skeleton.css'
import 'react-toastify/dist/ReactToastify.css'
import './layout.scss'

const BASE_COLOR_LIGHT = '#ebebeb'
const HIGHLIGT_COLOR_LIGHT = '#f5f5f5'

const BASE_COLOR_DARK = '#262626'
const HIGHLIGT_COLOR_DARK = '#44444480'

export const Layout = () => {
    const { theme } = useTheme()

    const baseColor = theme === Theme.LIGHT ? BASE_COLOR_LIGHT : BASE_COLOR_DARK
    const highlightColor =
        theme === Theme.LIGHT ? HIGHLIGT_COLOR_LIGHT : HIGHLIGT_COLOR_DARK


    return (
        <div className='layout layout__wrapper'>
            <SkeletonTheme
                baseColor={baseColor}
                highlightColor={highlightColor}>
                <div
                    className={clsx(
                        'main_layout',
                        theme === Theme.LIGHT
                            ? 'main_layout--light'
                            : 'main_layout--dark'
                    )}>
                    <Header />
                    <Sidebar />
                    <main className='layout__content'>
                        <Outlet />
                    </main>

                    <Footer className='layout__footer' />
                </div>
                <ScrollRestoration />
            </SkeletonTheme>
        </div>
    )
}
