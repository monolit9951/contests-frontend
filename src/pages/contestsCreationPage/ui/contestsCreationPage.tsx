import { useCallback, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Prize } from 'entities/prize'
import { Button } from 'shared/ui/button'
import { ContestPaymentModal } from 'shared/ui/contestPaymentModal'
import { HStack, VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'
import swal from 'sweetalert'
import { GalleryUpload } from 'widgets/galleryUpload'
import { MainInformation } from 'widgets/mainInformation'
import { PrizeInformation } from 'widgets/prizeInformation/ui/prizeInformation'
import { StageOfTheCompetition } from 'widgets/stageOfTheCompetition'

import { contestsCreationPageActions } from '../model/slice'

import './contestsCreationPage.scss'

export const ContestsCreationPage = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const contestCreationState = useSelector(
        (state: RootState) => state.contestsCreationPage,
        shallowEqual
    )

    const errors = useSelector((state: RootState) => state.contestsCreationPage.errors )

    const isFormComplete = useCallback(() => {
        const {
            name,
            category,
            subcategory,
            backgroundImage,
            previewImage,
            dateStart,
            dateEnd,
            description,
            exampleMedia,
            prizes,
        } = contestCreationState


        
    const errorsObj = {
        name: '',
        category: '',
        subcategory: '',
        backgroundImage: '',
        previewImage: '',
        dateStart: '',
        dateEnd: '',
        description: '',
        exampleMedia: '',
        prizes: '',
    }


        const nameIsOk = () => /^[\s\S]{3,100}$/.test(name)
        const categoryIsOk = () => category !== ''
        const subcategoryIsOk = () => subcategory !== ''
        const backgroundImageIsOk = () => backgroundImage !== ''
        const previewImageIsOk = () => previewImage !== ''
        const exampleMediaIsOk = () => exampleMedia.length > 0
        const dateStartIsOk = () => {
            const now = new Date()
            const startDate = new Date(dateStart)
            return startDate > now
        }
        const dateEndIsOk = () => {
            const now = new Date()
            const startDate = new Date(dateStart)
            const endDate = new Date(dateEnd)
            return endDate > now && endDate > startDate
        }
        const descriptionIsOk = () => /^[\s\S]{40,500}$/.test(description)
        const prizesAreOk = () =>
            prizes.every(
                (prize: Prize) => prize.winnersAmount > 0 && prize.prizeText !== '' 
            ) && prizes.length > 0


        const setErrors = () => {
            errorsObj.name = nameIsOk()
                ? ''
                : 'Title length should be between 3 and 100 characters'
                errorsObj.category = categoryIsOk()
                ? ''
                : 'You should choose a category'
                errorsObj.subcategory = subcategoryIsOk()
                ? ''
                : 'You should choose a subcategory'
                errorsObj.backgroundImage = backgroundImageIsOk()
                ? ''
                : 'You should choose a background image'
                errorsObj.previewImage = previewImageIsOk()
                ? ''
                : 'You should choose a preview image'
                errorsObj.description = descriptionIsOk()
                ? ''
                : 'Description length should be between 40 and 500 characters'
                errorsObj.dateStart = dateStartIsOk()
                ? ''
                : 'Start date should be in the future'
                errorsObj.dateEnd = dateEndIsOk()
                ? ''
                : 'End date should be in the future and greater than start date'
                errorsObj.prizes = prizesAreOk() ? '' : 'Fill prizes fields'
                errorsObj.exampleMedia = exampleMediaIsOk()
                ? ''
                : 'Add some photos to the gallery'
        }

        setErrors()
        dispatch(contestsCreationPageActions.setErrors(errorsObj))

        const hasErrors = Object.values(errorsObj).some((value) => value !== '')
        
        return !hasErrors
    }, [contestCreationState, dispatch])

    const formatDateTime = (dateString: string): string => {
        const [datePart, timePart] = dateString.split(' ')

        if (!datePart || !timePart) {
            throw new Error('Invalid date string format')
        }

        const [year, month, day] = datePart.split('-').map(Number)
        const [hour, minute] = timePart.split(':').map(Number)

        const date = new Date(Date.UTC(year, month - 1, day, hour, minute, 0))

        if (Number.isNaN(date.getTime())) {
            throw new Error('Invalid date')
        }

        return date.toISOString()
    }

    const CreateContest = useCallback(async () => {
        if (isFormComplete()) {
            const response = await axios.get(
                `http://localhost:8080/api/users?page=1&pageSize=1&sortDirection=ASC`
            )
            const userId = response.data.content[0].id

            const payload = {
                name: contestCreationState.name,
                status: 'ACTIVE',
                category: contestCreationState.category,
                subcategory: contestCreationState.subcategory,
                backgroundImage: contestCreationState.backgroundImage,
                previewImage: contestCreationState.backgroundImage,
                selectionType: 'RANDOM',
                participantAmount: contestCreationState.participantAmount,
                maxAllowedParticipantAmount: 100,
                dateStart: formatDateTime(contestCreationState.dateStart),
                dateEnd: formatDateTime(contestCreationState.dateEnd),
                description: contestCreationState.description,
                exampleMedia: contestCreationState.exampleMedia,
                prizes: contestCreationState.prizes.map((prize: any) => ({
                    id: prize.id,
                    place: prize.place,
                    winnersAmount: prize.winnersAmount,
                    prizeType: prize.prizeType,
                    currency: prize.currency,
                    prizeText: prize.prizeText,
                    prizeAmount: prize.prizeAmount,
                })),
                topWinners: contestCreationState.topWinners,
                popularity: contestCreationState.popularity,
                contestOpen: contestCreationState.contestOpen,
                contestOwnerId: userId,
            }

            axios
                .post('http://localhost:8080/api/contests', payload)
                .then((response) => {
                    swal(
                        'Good job!',
                        'Contest created successfully!',
                        'success'
                    )
                    navigate(`/contests/${response.data.id}`)
                })
                .catch((error) => {
                    console.error(
                        'Error posting contest data:',
                        error.response?.data || error.message
                    )
                })
        } else {
            swal('Something went wrong(', 'Not all fields are filled', 'error')
        }
    }, [isFormComplete, contestCreationState, navigate])

    return (
        <>
            <ContestPaymentModal isOpen={isOpen} setIsOpen={setIsOpen} />
            <VStack className='contestsCreationPage__container'>
                <Text Tag='h2' className='contestsCreationPage__header'>
                    Contest creation
                </Text>
                <VStack className='contestsCreationPage__sections'>
                    <MainInformation />
                    <StageOfTheCompetition />
                    <PrizeInformation error={errors.prizes} />
                    <GalleryUpload error={errors.exampleMedia}/>
                    <HStack className='contestsCreationPage__btns-container'>
                        <Button
                            variant='secondary'
                            className='btn btn--preview'
                            onClick={() => console.log('clicked See preview')}>
                            See preview
                        </Button>
                        <Button
                            variant='primary'
                            className='btn btn--create'
                            onClick={() => CreateContest()}>
                            Create a contest
                        </Button>
                    </HStack>
                </VStack>
            </VStack>
        </>
    )
}
