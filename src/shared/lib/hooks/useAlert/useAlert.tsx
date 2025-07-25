import { useCallback, useState } from "react"
import { Button } from "shared/ui/button"
import './useAlert.scss'

export const useAlert = () => {
    const [primaryText, setPrimaryText] = useState<string | null>(null)
    const [secondaryText, setSecondaryText] = useState<string | null>(null)

    const showAlert = useCallback((pText: string, sText?: string) => {
        setPrimaryText(pText)

        if(sText){
            setSecondaryText(sText)
        }

        setTimeout(() => {
            setPrimaryText(null)
            setSecondaryText(null)
        }, 3000);

    }, [])
    
    const handleCloseAlert = () => {
        setPrimaryText(null)
        setSecondaryText(null)
    }

    const Alert = () =>
        primaryText ? (
            <div className="alert">
                <div className="alert_background"> </div>

                <div className="alert_content">
                    <div className="alert_primary">{primaryText}</div>
                    {secondaryText && <div className="alert_secondary">{secondaryText}</div>}
                    
                    <div className="alert_exit">
                        <Button type="button" variant="primary" onClick={handleCloseAlert}>Close</Button>
                    </div>
                </div>
            </div>
        ) : null;

    return { showAlert, Alert };
}