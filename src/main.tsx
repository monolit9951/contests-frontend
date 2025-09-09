// ПОЛИФИЛС ОБЯЗАТЕЛЬНО ПЕРВЫМ
// eslint-disable-next-line
import "./polyfills/global-shim";
import React from 'react'
import { createRoot } from 'react-dom/client'
// eslint-disable-next-line
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from 'app/App'


import './index.css'

const container = document.querySelector('#root') as HTMLElement
const root = createRoot(container)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,             // кеш на 5 минут
      gcTime: 30 * 60 * 1000,               // хранить в кеше 30 минут
      refetchOnWindowFocus: false,
    },
  },
});

root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </React.StrictMode>
)
