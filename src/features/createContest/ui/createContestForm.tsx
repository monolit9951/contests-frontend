import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import instance from 'shared/api/api'
import { Button } from 'shared/ui/button'
import { HStack } from 'shared/ui/stack'

import { ContestCreationFormData } from '../model/types'

import { GalleryUpload } from './blocks/galleryUpload'
import { MainInformation } from './blocks/mainInformation'
import { PrizeInformation } from './blocks/prizeInformation'
import { StageOfTheCompetition } from './blocks/stageOfTheCompetition'

const CreateContestForm = () => {
    const navigate = useNavigate()

    const methods = useForm<ContestCreationFormData>({
        defaultValues: {
            name: '',
            status: 'ACTIVE',
            category: '',
            subcategory: 'SUBCATEGORY1',
            backgroundImage: '',
            previewImage: '',
            selectionType: 'RANDOM',
            maxAllowedParticipantAmount: 100,
            dateStart: new Date().toISOString(),
            dateEnd: new Date().toISOString(),
            description: '',
            exampleMedia: [],
            prizes: [],
            contestOpen: true,
        },
    })

    const { handleSubmit } = methods

    const onSubmit = async (data: ContestCreationFormData) => {
        let contestOwnerId: string

        try {
            const response = await instance.get(
                'users?page=0&pageSize=1&sortDirection=ASC'
            )

            contestOwnerId = response.data.content[0].id
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error('Something went wrong: ', err)
            return
        }

        const body = {
            ...data,
            contestOwnerId,
        }

        await instance
            .post('contests', body)
            .then((res) => {
                navigate(`/contests/${res.data.id}`)
            })
            .catch((error) => {
                // eslint-disable-next-line no-console
                console.error(
                    'Error posting contest data:',
                    error.response?.data ?? error.message
                )
            })
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className='contest-form'>
                <MainInformation />
                <StageOfTheCompetition />
                <PrizeInformation />
                <GalleryUpload />

                <HStack className='preview_create_container'>
                    <Button
                        variant='primary'
                        type='submit'
                        className='create_btn'>
                        Create a contest
                    </Button>
                </HStack>
            </form>
        </FormProvider>
    )
}

export default CreateContestForm
