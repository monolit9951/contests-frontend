import { useCallback, useState } from "react"

export const useAlert = () => {
    const [message, setMessage] = useState<string | null>(null)

    const showAlert = useCallback((text: string) => {
        setMessage(text)

        setTimeout(() => {
            setMessage(null)
        }, 3000);

    }, [])
    
    const Alert = () =>
        message ? (
            <div>{message}</div>
        ) : null;

    return { showAlert, Alert };
}