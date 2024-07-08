import { useContext } from 'react'
import {
    CategoryTheme,
    LOCAL_STORAGE_CATEGORY_THEME_KEY,
    LOCAL_STORAGE_THEME_KEY,
    Theme,
    ThemeContext,
} from 'entities/theme'

interface UseThemeResults {
    readonly theme?: Theme
    readonly categoryTheme?: CategoryTheme
    readonly toggleTheme: () => void
    readonly toggleCategoryTheme: (category: CategoryTheme) => void
}

export const useTheme = (): UseThemeResults => {
    const { theme, categoryTheme, setTheme, setCategoryTheme } =
        useContext(ThemeContext)

    const toggleTheme = () => {
        const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK
        setTheme?.(newTheme)
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
    }

    const toggleCategoryTheme = (category: CategoryTheme) => {
        const newCategoryTheme = () => {
            switch (category) {
                case CategoryTheme.FOR_FUN:
                    return CategoryTheme.FOR_FUN

                case CategoryTheme.FOR_WORK:
                    return CategoryTheme.FOR_WORK

                default:
                    return CategoryTheme.ALL
            }
        }

        setCategoryTheme?.(newCategoryTheme())
        localStorage.setItem(
            LOCAL_STORAGE_CATEGORY_THEME_KEY,
            newCategoryTheme()
        )
    }

    return { theme, categoryTheme, toggleCategoryTheme, toggleTheme }
}
