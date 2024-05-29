declare module '*.jpg'
declare module '*.png'
declare module '*.webp'

declare type RootState = ReturnType<typeof import('./store').store.getState>
declare type AppDispatch = typeof import('./store').store.dispatch
