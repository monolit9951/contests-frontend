import { FC, useState } from "react";
import tick from 'shared/assets/icons/fullTick.svg'

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  value: string | null;
  onChange: (value: string) => void;
  error?: boolean
}

const ControlledSelector: FC<SelectProps> = ({ options, value, onChange, error = false}) => {

    const maxWidth = 300
    
    const [selectorOpen, setSelectorOpen] = useState<boolean>(false)

    const handleSelectorToggle =() => {
        setSelectorOpen(!selectorOpen)
    }


    return (
        <div className="customSelector" style={{maxWidth}}>
            <button className={error? "customSelector_header error" : "customSelector_header"} type="button" onClick={handleSelectorToggle} >
                <span className={selectorOpen? "open" : ""}>{value}</span>
                <img className={selectorOpen? "open" : ""} src={tick} alt="tick" />
            </button>

            {selectorOpen && <div className="customSelector_options">
                {options.map((item: Option, index: number) => (
                    <button type="button" key={index} className="customSelector_options_option" onClick={() => onChange('da')}>{item.label}</button>
                ))}
            </div>}
        </div>
    );
};

export default ControlledSelector;
