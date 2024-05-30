import { Textarea } from "shared/ui/input"
import { VStack } from "shared/ui/stack"
import { Text } from "shared/ui/text"

import "./descriptionInput.scss"

export const DescriptionInput = () => {
    return(
        <VStack className="descriptionInput_container">
            <Text Tag="p" className="title">Description</Text>
            <Textarea className="description_placeholder" placeholder="Write more information..."/>
            <Text Tag="p" className="description_requirements">Please enter at least 40 characters</Text>

        </VStack>
    )
}