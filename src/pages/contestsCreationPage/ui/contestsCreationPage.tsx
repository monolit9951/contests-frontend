import { Button } from "shared/ui/button"
import { HStack, VStack } from "shared/ui/stack"
import { Text } from "shared/ui/text"
import { GalleryUpload } from "widgets/galleryUpload"
import { MainInformation } from "widgets/mainInformation"
import { PrizeInformation } from "widgets/prizeInformation/ui/prizeInformation"
import { StageOfTheCompetition } from "widgets/stageOfTheCompetition"

import "./contestsCreationPage.scss"

export const ContestsCreationPage = () => {
    return(
        <VStack className="contestsCreationPage_container">
            <Text Tag="h2">Contest creation</Text>

            <VStack className="sections_container">

           <MainInformation/>
            <StageOfTheCompetition/>
            <PrizeInformation/>
            <GalleryUpload/>
            <HStack className="preview_create_container">
                <Button variant="secondary" className="preview_btn">See preview</Button>
                <Button variant="primary" className="create_btn">Create a contest</Button>
            </HStack>
            </VStack>
        </VStack>
    )
}