import { FC, useState } from "react";
import CustomSelector from "widgets/customSelector";

import './winnerSelectors.scss'
import ControlledSelector from "shared/ui/controlledSelector/ui/controlledSelector";

export interface optionsType {
    label: string,
    value: string
}

interface Props {
    chooseSelectorCallback: (key: string) => void
}

const WinnerSelectors: FC<Props> = ({chooseSelectorCallback}) => {

    const reatingOptions: optionsType[] = 
    [{
        label: 'All works',
        value: 'allWorks'
    },{
        label: 'Winners works',
        value: 'winWorks'
    }]

    const [reatingValue, setReatingValue] = useState<string>(reatingOptions[0].label)

    const onReatingChange = (value: string) => {
        const option = reatingOptions.find(opt => opt.value === value);
        
        if (option) {
            setReatingValue(option.label);
            chooseSelectorCallback(option.value);
        }
    };

    return(
        <div className="customSelectors">
            <ControlledSelector options={reatingOptions} maxWidth={300} onChange={onReatingChange} value={reatingValue}/>
        </div>
    )
}

export default WinnerSelectors