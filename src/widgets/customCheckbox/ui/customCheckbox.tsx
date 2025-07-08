import { FC, useState } from "react";
import tick from 'shared/assets/icons/tick.svg'

import './customCheckbox.scss'

// типизация для ивента и передача самого ивента
interface CustomCheckboxInterface {
    value?: string,
    checked?: boolean
    handleCheckbox?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const CustomCheckbox: FC <CustomCheckboxInterface> = ({value = 'Insert value on props', checked = false, handleCheckbox}) =>{
    
    const [inputCheck, setInputCheck] = useState<boolean>(checked ?? false)

    return(
        <div className="customCheckbox">
            <div className="customCheckbox_container">
                <div className={inputCheck? "customCheckbox_check checked" : "customCheckbox_check"}>
                    <img src={tick} alt="tick" className={inputCheck? "checked" : ""}/>
                </div>
                <span>{value}</span>
            </div>

            <input
                type="checkbox"
                checked={inputCheck}
                onChange={(event) => {
                    setInputCheck(event.target.checked)
                    handleCheckbox?.(event) 
                }}
            />

        </div>
    )
}

export default CustomCheckbox