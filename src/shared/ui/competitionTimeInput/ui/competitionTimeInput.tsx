import { Input } from "shared/ui/input"
import { HStack, VStack } from "shared/ui/stack"
import { Text } from "shared/ui/text"

import "./competitionTimeInput.scss"

interface CompetitionTimeInputProps{
    dateTitle: string
    timeTitle: string
}

export const CompetitionTimeInput = ({dateTitle, timeTitle}: CompetitionTimeInputProps) => {
    return (
        <HStack className="competitionTimeInput_container">
            <VStack className="dateInput_container">
                <Text Tag="p">{dateTitle}</Text>
                <Input type="date" placeholder="Placeholder" className="dateInput"/>
            </VStack>
            <VStack className="timeInput_container">
            <Text Tag="p">{timeTitle}</Text>
                <Input type="time" placeholder="Placeholder" className="timeInput"/>
            </VStack>
        </HStack>
    )
}