import { ChangeEvent, FC, useState } from "react";
import eye from 'shared/assets/icons/eyePassword.svg'

import './registrationInput.scss'

interface RegistrationInputInterface {
    placeholder: string
    label?: string
    type: string
    changeCallBack: (value: string) => void
    value: string
}

const RegistrationInput: FC <RegistrationInputInterface>= ({placeholder, label, type, changeCallBack, value}) => {

    const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false)

    const handleTogglePasswordVisible = () =>{
        setPasswordVisibility(!passwordVisibility)
    }

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        changeCallBack(event.target.value)
    }

    return(
        <div className="registrationInput">
            
            {label && <div className="registrationInput_labbel">{label}</div>}

            <div className="registrationInput_container">
                <input type={passwordVisibility? 'text' : type} value={value} placeholder={placeholder} onChange={handleInput}/>
                {type === "password" && <button onClick={handleTogglePasswordVisible} type="button"><img src={eye} alt="type"/></button>}
            </div>
        </div>
    )
}

export default RegistrationInput