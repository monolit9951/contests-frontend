import { FC, useState } from "react";
import eye from 'shared/assets/icons/eyePassword.svg'

import './registrationInput.scss'

interface RegistrationInputInterface {
    placeholder: string
    label?: string
    type: string
    // callback
    // img icon
}

const RegistrationInput: FC <RegistrationInputInterface>= ({placeholder, label, type}) => {

    const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false)

    const handleTogglePasswordVisible = () =>{
        setPasswordVisibility(!passwordVisibility)
    }

    return(
        <div className="registrationInput">
            
            {label && <div className="registrationInput_labbel">{label}</div>}

            <div className="registrationInput_container">
                <input type={passwordVisibility? 'text' : type} placeholder={placeholder}/>
                {type === "password" && <button onClick={handleTogglePasswordVisible} type="button"><img src={eye} alt="type"/></button>}
            </div>
        </div>
    )
}

export default RegistrationInput