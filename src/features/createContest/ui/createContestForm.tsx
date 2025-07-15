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
            backgroundImage: '',
            previewImage: '',
            category: '',
            selectionType: 'RANDOM',
            maxAllowedParticipantAmount: 100,
            dateStart: new Date().toISOString(),
            dateEnd: new Date().toISOString(),
            description: '',
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
      
        const dto = {
            "name": data.name,
            "participantAmount": 0, 
            "maxAllowedParticipantAmount": 100, 
            "dateStart": data.dateStart, 
            "dateEnd": data.dateEnd, 
            "prizes": [{"prizeType": "ITEM", "winnersAmount": 2, "currency": null, "prizeText": "100$", "prizeAmount": 10},{ "id": "686e47a30bcf052ed0bdc3cc", "prizeType": "ITEM", "winnersAmount": 1, "currency": null, "prizeText": "50$", "prizeAmount": 0}], 
            "selectionType":"RANDOM", 
            "description": data.description
        }


        const formData = new FormData()  

        formData.append(
            'dto', 
            new Blob([JSON.stringify(dto)], { type: 'application/json' }),
            'dto.json'
        );

        formData.append('backgroundImage', data.backgroundImage)
        formData.append('previewImage', data.previewImage)

        console.log(data.backgroundImage)
        
        try {
            setPending(true)
            const token = localStorage.getItem('userToken')

            const response = await instance.post('contests', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })

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
