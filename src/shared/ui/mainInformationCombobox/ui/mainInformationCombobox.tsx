import { Combobox } from "shared/ui/input"
import { VStack } from "shared/ui/stack"
import { Text } from "shared/ui/text"

import "./mainInformationCombobox.scss"

interface MainInformationComboboxProps{
    title: string
    placeholder: string
    options: { value: string; label: string }[]
    width?: string | number
}

export const MainInformationCombobox = ({title, placeholder, options, width}: MainInformationComboboxProps) => {
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
        />
    </VStack>
    )
}