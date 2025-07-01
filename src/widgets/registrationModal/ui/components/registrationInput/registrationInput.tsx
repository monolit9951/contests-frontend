import { FC, useState } from "react";
import './registrationInput.scss'
import eye from 'shared/assets/icons/eyePassword.svg'

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
                {type === "password" && <img src={eye} alt="type" onClick={handleTogglePasswordVisible}/>}
            </div>
        </div>
    )
}

export default RegistrationInput