import { Combobox } from "shared/ui/input"
import { VStack } from "shared/ui/stack"
import { Text } from "shared/ui/text"

import "./prizeInformationCombobox.scss"

interface PrizeInformationComboboxProps{
    title: string
    placeholder: string
    options: { value: string; label: string }[]
    value: string
    width?: string | number
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const PrizeInformationCombobox = ({title, placeholder, options, width, value, onChange}: PrizeInformationComboboxProps) => {
    return (
        <VStack className='mainInformationInput_container'>
        <Text Tag='p' className='title'>
        {title}
        </Text>
        <Combobox
            options={options}
            placeholder={placeholder}
            className='input'
            width={width}
            value={value}
            onChange={(e) => onChange(e)}
        />
    </VStack>
    )
}