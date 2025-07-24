import { ChangeEvent, FC, useState } from "react";
import tick from 'shared/assets/icons/tick.svg'

import './customCheckbox.scss'

// типизация для ивента и передача самого ивента
interface CustomCheckboxInterface {
    value?: string,
    checked?: boolean
    handleCheckbox?: ((event: React.ChangeEvent<HTMLInputElement>) => void) | (() => void)
    controled?: boolean
}

const CustomCheckbox: FC <CustomCheckboxInterface> = ({value = 'Insert value on props', checked = false, handleCheckbox, controled = false}) =>{
    
    const [inputCheck, setInputCheck] = useState<boolean>(checked ?? false)

    const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
        if(controled){
            handleCheckbox()
        } else {
            setInputCheck(event.target.checked)
            handleCheckbox?.(event) 
        }
    }

    return(
        <div className="customCheckbox">
            <div className="customCheckbox_container">
                <div className={controled? (checked? "customCheckbox_check checked" : "customCheckbox_check") : (inputCheck? "customCheckbox_check checked" : "customCheckbox_check")}>
                    <img src={tick} alt="tick" className={controled? (checked? "checked" : "") : (inputCheck? "checked" : "")}/>
                </div>
                <span>{value}</span>
            </div>

            <input
                type="checkbox"
                checked={controled? checked : inputCheck}
                onChange={(event) => handleCheck(event)}
            />

        </div>
    )
}

export default CustomCheckbox