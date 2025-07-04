import { ChangeEvent, FC, useState } from "react";
import eye from 'shared/assets/icons/eyePassword.svg'

import './registrationInput.scss'

interface RegistrationInputInterface {
    placeholder: string
    label?: string
    type: string
    changeCallBack: (value: string) => void
    value: string
    validation: boolean
}

const RegistrationInput: FC <RegistrationInputInterface>= ({placeholder, label, type, changeCallBack, value, validation}) => {

    const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false)

    const handleTogglePasswordVisible = () =>{
        setPasswordVisibility(!passwordVisibility)
    }

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        changeCallBack(event.target.value)
    }

    return(
        <div className="registrationInput">
            
            {label && <div className={validation? "registrationInput_labbel" : "registrationInput_labbel validation"}>{label}</div>}

            <div className={validation? "registrationInput_container": "registrationInput_container validation"}>
                <input type={passwordVisibility? 'text' : type} value={value} placeholder={placeholder} onChange={handleInput}/>
                {type === "password" && <button onClick={handleTogglePasswordVisible} type="button"><img src={eye} alt="type"/></button>}
            </div>
        </div>
    )
}

export default RegistrationInput