import { FC, useState } from "react"
import './customSelector.scss'
import tick from 'shared/assets/icons/fullTick.svg'

interface optionsType {
    text: string,
    key: string
}

interface CustomSelectorInterface {
    name: string,
    options: optionsType[],
    chooseSelectorCallback: (key: string) => void,
    maxWidth: number
}

const CustomSelector: FC <CustomSelectorInterface>= ({name, options, maxWidth, chooseSelectorCallback}) => {

    const [selectorOpen, setSelectorOpen] = useState<boolean>(false)
    const [currentOption, setCurrentOption] = useState<string>('Selector')
    
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
        <div className="customSelector">
            <button className="customSelector_header" type="button" onClick={handleSelectorToggle} style={{maxWidth: 600}}>
                <span className={selectorOpen? "open" : ""}>{currentOption}</span>
                <img className={selectorOpen? "open" : ""} src={tick} alt="tick" />
            </button>

            {selectorOpen && <div className="customSelector_options" style={{maxWidth: 600}}>
                {options.map((item, index) => (
                    <button type="button" key={index} className="customSelector_options_option" onClick={() => handleOption(item.text, item.key)}>{item.text}</button>
                ))}
            </div>}
        </div>
    )
}

export default CustomSelector