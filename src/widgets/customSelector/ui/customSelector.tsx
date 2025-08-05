import { FC, useState } from "react"
import tick from 'shared/assets/icons/fullTick.svg'

import './customSelector.scss'

interface optionsType {
    text: string,
    key: string
}

interface CustomSelectorInterface {
    options: optionsType[],
    chooseSelectorCallback: (key: string) => void,
    maxWidth: number
    defaultItem?: boolean                                   // будет ли первый элемент дефолтным
    currentPlace?: string
    error?: boolean
}

const CustomSelector: FC <CustomSelectorInterface>= ({options, maxWidth, chooseSelectorCallback , defaultItem, currentPlace, error}) => {

    const [selectorOpen, setSelectorOpen] = useState<boolean>(false)
        const getInitialOption = () => {
        if (defaultItem) {
            return options[0].text;
        }

        if (currentPlace === null) {
            return "SELECTOR";
        }

        return `Place №${currentPlace}`;
        };

const [currentOption, setCurrentOption] = useState<string>(getInitialOption());
    
    // открытие и закрытие опшнов
    const handleSelectorToggle = () => {
        setSelectorOpen(!selectorOpen)
    }

    // по нажатию на опшн, сделать его активным
    const handleOption = (option: string, key: string) =>{
        setCurrentOption(option)
        setSelectorOpen(false)
        chooseSelectorCallback(key)
    }

    return(
        <div className="customSelector" style={{maxWidth}}>
            <button className={error? "customSelector_header error" : "customSelector_header"} type="button" onClick={handleSelectorToggle} >
                <span className={selectorOpen? "open" : ""}>{currentOption}</span>
                <img className={selectorOpen? "open" : ""} src={tick} alt="tick" />
            </button>

            {selectorOpen && <div className="customSelector_options">
                {options.map((item, index) => (
                    <button type="button" key={index} className="customSelector_options_option" onClick={() => handleOption(item.text, item.key)}>{item.text}</button>
                ))}
            </div>}
        </div>
    )
}

export default CustomSelector