import { FC, useState } from "react";
import tick from 'shared/assets/icons/fullTick.svg'

import './controlledSelector.scss'


interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  value: string | null;
  onChange: (value: string) => void;
  error?: boolean
  maxWidth: number
}

const ControlledSelector: FC<SelectProps> = ({maxWidth, options, value = 'Empty', onChange, error = false}) => {

    
    const [selectorOpen, setSelectorOpen] = useState<boolean>(false)

    const handleSelectorToggle = () => {
        setSelectorOpen(!selectorOpen)
    }

    const handleSelectorChoise = (chosenValue: string) =>{
        onChange(chosenValue)
        setSelectorOpen(false)
    }


    return (
        <div className="customSelector" style={{maxWidth}}>
            <button className={error? "customSelector_header error" : "customSelector_header"} type="button" onClick={handleSelectorToggle} >
                <span className={selectorOpen? "open" : ""}>{value}</span>
                <img className={selectorOpen? "open" : ""} src={tick} alt="tick" />
            </button>

            {selectorOpen && <div className="customSelector_options">
                {options.map((item: Option, index: number) => (
                    <button type="button" key={index} className="customSelector_options_option" onClick={() => handleSelectorChoise(item.value)}>{item.label}</button>
                ))}
            </div>}
        </div>
    );
};

export default ControlledSelector;
