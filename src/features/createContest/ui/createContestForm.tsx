import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import instance from 'shared/api/api'
import { Button } from 'shared/ui/button'
import { HStack } from 'shared/ui/stack'

import { ContestCreationFormData } from '../model/types'

import { GalleryUpload } from './blocks/galleryUpload'
import { MainInformation } from './blocks/mainInformation'
import { PrizeInformation } from './blocks/prizeInformation'
import { StageOfTheCompetition } from './blocks/stageOfTheCompetition'

import './createContestForm.scss'

const CreateContestForm = () => {
    const [submitError, setSubmitError] = useState(false)
    const [dateValidation, setDateValidation] = useState('')

    const navigate = useNavigate()

    const methods = useForm<ContestCreationFormData>({
        defaultValues: {
            name: '',
            status: 'ACTIVE',
            category: 'FOR_FUN',
            subcategory: 'SUBCATEGORY1',
            backgroundImage: '',
            previewImage: '',
            selectionType: 'RANDOM',
            maxAllowedParticipantAmount: 100,
            dateStart: new Date().toISOString(),
            dateEnd: new Date().toISOString(),
            description: '',
            exampleMedia: [],
            prizes: [
                {
                    id: crypto.randomUUID(),
                    place: 1,
                    winnersAmount: 1,
                    prizeType: '',
                    prizeText: '',
                    currency: 'USD',
                    prizeAmount: 0,
                },
                {
                    id: crypto.randomUUID(),
                    place: 2,
                    winnersAmount: 1,
                    prizeType: '',
                    prizeText: '',
                    currency: 'USD',
                    prizeAmount: 0,
                },
                {
                    id: crypto.randomUUID(),
                    place: 3,
                    winnersAmount: 1,
                    prizeType: '',
                    prizeText: '',
                    currency: 'USD',
                    prizeAmount: 0,
                },
            ],
            contestOpen: true,
        },
    })

    const { handleSubmit } = methods

    const onSubmit = async (data: ContestCreationFormData) => {
        const hasExampleMedia = data.exampleMedia?.some((file) => file)

        if (
            moment(data.dateStart).toDate().toISOString() <
            moment().format('YYYY-MM-DD[T]HH:mm:ss[Z]')
        ) {
            setDateValidation('Starting date must be greater than current date')

            return
        }

        if (data.dateStart >= data.dateEnd) {
            setDateValidation('Deadline cannot be before starting date')

            return
        }

        setDateValidation('')

        const formData = new FormData()

        formData.append('name', data.name)
        formData.append('status', data.status)
        formData.append('category', data.category)
        formData.append('subcategory', data.subcategory)
        formData.append('backgroundImage', data.backgroundImage)
        formData.append('previewImage', data.previewImage)
        formData.append('selectionType', data.selectionType)
        formData.append(
            'maxAllowedParticipantAmount',
            JSON.stringify(data.maxAllowedParticipantAmount)
        )
        formData.append('dateStart', data.dateStart)
        formData.append('dateEnd', data.dateEnd)
        formData.append('description', data.description)
        // formData.append('prizes', JSON.stringify(data.prizes))
        data.prizes.forEach((prize, index) => {
            formData.append(`prizes[${index}][id]`, prize.id)
            formData.append(`prizes[${index}][prizeType]`, prize.prizeType)
            formData.append(`prizes[${index}][currency]`, prize.currency)
            formData.append(`prizes[${index}][prizeText]`, prize.prizeText)
            formData.append(
                `prizes[${index}][prizeAmount]`,
                prize.prizeAmount.toString()
            )
            formData.append(`prizes[${index}][place]`, prize.place.toString())
            formData.append(
                `prizes[${index}][winnersAmount]`,
                prize.winnersAmount.toString()
            )
        })
        formData.append('contestOpen', JSON.stringify(data.contestOpen))

        if (hasExampleMedia) {
            data.exampleMedia.forEach((file) => {
                formData.append('exampleMedia', file)
            })
        }

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

        formData.append('contestOwnerId', contestOwnerId)

        // for (const [key, value] of formData.entries()) {
        //     console.log(`${key}: ${value}`)
        // }

        await instance
            .post('contests', formData)
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

    const onError = () => {
        setSubmitError(true)
    }

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={handleSubmit(onSubmit, onError)}
                className='contest-form'>
                <MainInformation submitError={submitError} />
                <StageOfTheCompetition dateValidation={dateValidation} />
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
