// src/polyfills/global-shim.ts
if (typeof window !== 'undefined' && (window as any).global === undefined) {
    (window as any).global = window;
}
