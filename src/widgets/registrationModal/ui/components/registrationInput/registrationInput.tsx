import { ChangeEvent, FC, useState } from "react";
import eye from 'shared/assets/icons/eyePassword.svg'
import eyeClosed from 'shared/assets/icons/eyeClosed.svg'
import iValidation from 'shared/assets/icons/iValidation.svg'
import './registrationInput.scss'

interface RegistrationInputInterface {
    placeholder: string
    label?: string
    type: string
    changeCallBack: (value: string) => void
    value: string
    validationText: string
}

const RegistrationInput: FC <RegistrationInputInterface>= ({placeholder, label, type, changeCallBack, value, validationText}) => {

    const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false)

    const handleTogglePasswordVisible = () =>{
        setPasswordVisibility(!passwordVisibility)
    }

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        changeCallBack(event.target.value)
    }

    return(
        <div className="registrationInput">
            <div className="registrationInput_explain">
                {label && <div className={validationText === ''? "registrationInput_labbel" : "registrationInput_labbel validation"}>{label}</div>}
            </div>
            <div className={validationText === ''? "registrationInput_container": "registrationInput_container validation"}>
                <input type={passwordVisibility? 'text' : type} value={value} placeholder={placeholder} onChange={handleInput}/>
                {type === "password" && !passwordVisibility && <button onClick={handleTogglePasswordVisible} type="button"><img src={eye} alt="type"/></button>}
                {type === "password" && passwordVisibility && <button onClick={handleTogglePasswordVisible} type="button"><img src={eyeClosed} alt="type"/></button>}
            </div>

            {validationText !== '' && <div className="registrationInput_validation">
                <img src={iValidation} alt="valid" />
                <span>{validationText}</span>
            </div>}
        </div>
    )
}

export default RegistrationInput