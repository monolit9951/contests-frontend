import { useDispatch, useSelector } from 'react-redux'
import { setContestDescription } from 'pages/contestsCreationPage/model/services'
import { Textarea } from 'shared/ui/input'
import { VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

import './descriptionInput.scss'

export const DescriptionInput = () => {
    const dispatch: AppDispatch = useDispatch()
    
    const value = useSelector((state: RootState) => {
        return state.contestsCreationPage.description;
    });

    const TextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(setContestDescription(e.target.value))
    }

    return (
        <VStack className='descriptionInput_container'>
            <Text Tag='p' className='title'>
                Description
            </Text>
            <Textarea
                className='description_placeholder'
                placeholder='Write more information...'
                value={value}
                onChange={(e) => TextareaChange(e)}
            />
            <Text Tag='p' className='description_requirements'>
                Please enter at least 40 characters
            </Text>
        </VStack>
    )
}
