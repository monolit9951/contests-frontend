import { Input } from "shared/ui/input"
import { VStack } from "shared/ui/stack"
import { Text } from "shared/ui/text"

import "./mainInformationInput.scss"

interface MainInformationInputProps{
    text: string
    placeholder: string
}


export const MainInformationInput = ({text, placeholder}: MainInformationInputProps) =>{
    return (
        <VStack className="mainInformationInput_container">
            <Text Tag="p" className="title">{text}</Text>
            <Input type="text" placeholder={placeholder} className="input"/>
        </VStack>
    )
} 