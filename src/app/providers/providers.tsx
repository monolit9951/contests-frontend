import { FC } from 'react'
import { Provider } from 'react-redux'
import store, { persistor } from 'app/store'
import { ThemeProvider } from 'entities/theme'
import { PersistGate } from 'redux-persist/integration/react'

interface IProviders {
    readonly children: JSX.Element
}

export const Providers: FC<IProviders> = ({ children }) => {
    return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <ThemeProvider>{children}</ThemeProvider>
                </PersistGate>
            </Provider>
    )
}
