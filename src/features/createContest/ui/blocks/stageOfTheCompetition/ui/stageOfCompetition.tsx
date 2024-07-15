import { CompetitionTimeInput } from "shared/ui/competitionTimeInput"
import { VStack } from "shared/ui/stack"
import { Text } from "shared/ui/text"

import "./stageOfTheCompetition.scss"

export const StageOfTheCompetition = () => {
    return(
        <VStack className="stageOfTheCompetition_container">
            <Text Tag="h2" className="stageOfTheCompetition_header">Stage of the competition</Text>
            <CompetitionTimeInput dateTitle="Start date" timeTitle="Start time"/>
            <CompetitionTimeInput dateTitle="Deadline date" timeTitle="Deadline time"/>
        </VStack>
    )
}