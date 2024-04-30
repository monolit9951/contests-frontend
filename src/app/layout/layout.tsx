import { SkeletonTheme } from 'react-loading-skeleton'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import clsx from 'clsx'
import { Theme, useTheme } from 'entities/theme'
import avatar from 'shared/assets/img/userIMG.jpg';
import {ContestCard} from "widgets/contestCard";
import { Footer } from 'widgets/footer'
import { Header } from 'widgets/header'

import 'react-toastify/dist/ReactToastify.css'
import './layout.scss'

const BASE_COLOR_LIGHT = '#ebebeb'
const HIGHLIGT_COLOR_LIGHT = '#f5f5f5'

const BASE_COLOR_DARK = '#202020'
const HIGHLIGT_COLOR_DARK = '#44444480'

export const Layout = () => {
    const { theme, toggleTheme } = useTheme()

    const baseColor = theme === Theme.LIGHT ? BASE_COLOR_LIGHT : BASE_COLOR_DARK
    const highlightColor =
        theme === Theme.LIGHT ? HIGHLIGT_COLOR_LIGHT : HIGHLIGT_COLOR_DARK

    const mockData = {
        date: "2024-05-10",
        name: "John Doe",
        rating: "4.5",
        category: { des: "Programming", color: "#FF5733" },
        prize: {
            img: avatar,
            description: "Win $1000 and a trophy",
            background: 'var(--green)',
        },
        title: "Coding Challenge",
        tags: ["React", "JavaScript", "Web Development"],
        user: {
            name: "John Doe",
            avatar,
            isVerified: true,
            isTop: "Top 3",
            rate: "4.5",
        },
    };

    return (
        <div className='layout layout__wrapper'>
            <SkeletonTheme
                baseColor={baseColor}
                highlightColor={highlightColor}>
                <Header />
                <main className='layout__content'>
                    <Outlet />
                    <ContestCard {...mockData}/>
                </main>

                <Footer className='layout__footer' />

                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                <div
                    className={clsx('layout__toggle-theme', theme)}
                    title='Change theme'
                    onClick={toggleTheme}
                 />

                <ScrollRestoration/>
            </SkeletonTheme>
        </div>
    )
}
