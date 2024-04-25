import { SkeletonTheme } from 'react-loading-skeleton'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import clsx from 'clsx'
import { Theme, useTheme } from 'entities/theme'
import { ContestCard } from 'widgets/contestCard'
import { Footer } from 'widgets/footer'
import { Header } from 'widgets/header'
import { Sidebar } from 'widgets/sidebar'

import 'react-toastify/dist/ReactToastify.css'
import './layout.scss'

const BASE_COLOR_LIGHT = '#ebebeb'
const HIGHLIGT_COLOR_LIGHT = '#f5f5f5'

const BASE_COLOR_DARK = '#202020'
const HIGHLIGT_COLOR_DARK = '#44444480'

export const Layout = () => {
    const { theme } = useTheme()

    const baseColor = theme === Theme.DARK ? BASE_COLOR_LIGHT : BASE_COLOR_DARK
    const highlightColor =
        theme === Theme.DARK ? HIGHLIGT_COLOR_LIGHT : HIGHLIGT_COLOR_DARK

    return (
        <div className='layout layout__wrapper'>
            <SkeletonTheme
                baseColor={baseColor}
                highlightColor={highlightColor}>
                <div className='main_layout'>
                    <Header />
                    <Sidebar />
                    <main className='layout__content'>
                        <Outlet />
                        <ContestCard />
                    </main>

                    <Footer className='layout__footer' />
                </div>

                <div
                    className={clsx('layout__toggle-theme', theme)}
                    title='Change theme'
                />

                <ScrollRestoration />
                <ToastContainer
                    position='bottom-right'
                    autoClose={2000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme='colored'
                />
            </SkeletonTheme>
        </div>
    )
}
