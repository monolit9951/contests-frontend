import { createContext } from 'react'

export enum Theme {
    LIGHT = 'light',
    DARK = 'dark',
}

export enum CategoryTheme {
    ALL = 'all',
    FOR_FUN = 'fun',
    FOR_WORK = 'work',
}

export interface IThemeContext {
    theme?: Theme
    categoryTheme?: CategoryTheme
    setTheme?: (theme: Theme) => void
    setCategoryTheme?: (categoryTheme: CategoryTheme) => void
}

export const ThemeContext = createContext<IThemeContext>({})

export const LOCAL_STORAGE_THEME_KEY = 'theme'

export const LOCAL_STORAGE_CATEGORY_THEME_KEY = 'categoryTheme'
