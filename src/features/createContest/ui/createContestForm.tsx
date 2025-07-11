import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import instance from 'shared/api/api'
import { Button } from 'shared/ui/button'
import { ModalWindow } from 'shared/ui/modalWindow'
import { HStack } from 'shared/ui/stack'
import { RegistrationModal } from 'widgets/registrationModal'

import { ContestCreationFormData } from '../model/types'

import { GalleryUpload } from './blocks/galleryUpload'
import { MainInformation } from './blocks/mainInformation'
import { PrizeInformation } from './blocks/prizeInformation'
import { StageOfTheCompetition } from './blocks/stageOfTheCompetition'

import './createContestForm.scss'

const CreateContestForm = () => {
    const [submitError, setSubmitError] = useState(false)
    const [dateValidation, setDateValidation] = useState('')
    const [pending, setPending] = useState(false)

    const navigate = useNavigate()

    const methods = useForm<ContestCreationFormData>({
        defaultValues: {
            name: '',
            status: 'ACTIVE',
            category: '',
            subcategory: '',
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

        // дата начала больше текущей даты
        if (moment(data.dateStart).isSameOrBefore(moment())) {
            setDateValidation('Starting date must be greater than current date')
            return
        }

        // дата окончания больше даты начала
        if (moment(data.dateEnd).isSameOrBefore(moment(data.dateStart))) {
            setDateValidation('Deadline cannot be before or equal to starting date')
            return
        }

        setDateValidation('')

        const formData = new FormData()

        formData.append('name', data.name)
        formData.append('status', data.status)
        // formData.append('category', data.category)
        // formData.append('subcategory', data.subcategory)
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
                formData.append('exampleMedia[]', file)
            })
        }

        // ПОЛЬЗОВАТЕЛЬ ПОЛУЧАЕТСЯ ПУТЁМ АВТОРИЗАЦИИ
        // let contestOwnerId: string

        // try {
        //     const response = await instance.get(
        //         'users?page=0&pageSize=1&sortDirection=ASC'
        //     )

        //     contestOwnerId = response.data.content[0].id
        // } catch (err) {
        //     // eslint-disable-next-line no-console
        //     console.error('Something went wrong: ', err)
        //     return
        // }

        // formData.append('contestOwnerId', contestOwnerId)

        // вывод формдаты для теста
        console.log('--- FormData содержимое ---');
        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }

        try {
            setPending(true)
            const token = localStorage.getItem('userToken')
            const response = await instance.post('contests', formData,
                 {headers: {Authorization: `Bearer ${token}`}}
                )

            navigate(`/contests/${response.data.id}`)
        } catch (error: Error | any) {
            // eslint-disable-next-line no-console
            console.error(
                'Error posting contest data:',
                error.response?.data ?? error.message
            )
        } finally {
            setPending(false)
        }
    }

    const onError = () => {
        setSubmitError(true)
    }

    const user = useSelector((state: RootState) => state.user)
    const [authReq, setAuthReq] = useState<boolean>(false)


    // авторизация пользователя работает и так, но на всякий случай проверим и заставим зарегаться
    const handleSubmitWithoutClick = () => {
        if(user.userId === null){
            setAuthReq(true)
        }
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
                        onClick={handleSubmitWithoutClick}
                        disabled={pending}
                        className='create_btn'>
                        {pending ? 'Pending...' : 'Create a contest'}
                    </Button>
                </HStack>
            </form>

            {authReq && <ModalWindow isOpen onClose={() => setAuthReq(false)}><RegistrationModal auth/></ModalWindow>}
        </FormProvider>
    )
}

export default CreateContestForm
