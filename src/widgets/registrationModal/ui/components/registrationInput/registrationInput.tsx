import { FC } from "react";
import './registrationInput.scss'

interface RegistrationInputInterface {
    placeholder: string
    label?: string
    type: string
    // callback
    // img icon
}

const RegistrationInput: FC <RegistrationInputInterface>= ({placeholder, label, type}) => {
    return(
        <div className="registrationInput">
            
            {label && <div className="registrationInput_labbel">{label}</div>}

            <div className="registrationInput_container">
                <input type={type} placeholder={placeholder}/>
                <img src="" alt="type" />
            </div>
        </div>
    )
}

export default RegistrationInput