import { useCallback, useMemo, useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Button } from 'shared/ui/button'
import { ContestPaymentModal } from 'shared/ui/contestPaymentModal'
import { HStack, VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'
import swal from 'sweetalert'
import { GalleryUpload } from 'widgets/galleryUpload'
import { MainInformation } from 'widgets/mainInformation'
import { PrizeInformation } from 'widgets/prizeInformation/ui/prizeInformation'
import { StageOfTheCompetition } from 'widgets/stageOfTheCompetition'

import './contestsCreationPage.scss'

export const ContestsCreationPage = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const navigate = useNavigate()
    const contestCreationState = useSelector(
        (state: RootState) => state.contestsCreationPage,
        shallowEqual
    )

    const isFormComplete = useMemo(() => {
        return (
            contestCreationState.name !== '' &&
            contestCreationState.category !== '' &&
            contestCreationState.subcategory !== '' &&
            contestCreationState.backgroundImage !== '' &&
            contestCreationState.previewImage !== '' &&
            contestCreationState.dateStart !== '' &&
            contestCreationState.dateEnd !== '' &&
            contestCreationState.description !== '' &&
            contestCreationState.exampleMedia.length > 0
        )
    }, [contestCreationState])

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
        if (isFormComplete) {
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
                // maxAllowedParticipantAmount: contestCreationState.maxAllowedParticipantAmount,
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
    }, [isFormComplete, contestCreationState])

    return (
        <>
            <ContestPaymentModal isOpen={isOpen} setIsOpen={setIsOpen} />

            <VStack className='contestsCreationPage_container'>
                <Text Tag='h2'>Contest creation</Text>

                <VStack className='sections_container'>
                    <MainInformation />
                    <StageOfTheCompetition />
                    <PrizeInformation />
                    <GalleryUpload />
                    <HStack className='preview_create_container'>
                        <Button
                            variant='secondary'
                            className='preview_btn'
                            onClick={() => console.log('clicked See preview')}>
                            See preview
                        </Button>
                        <Button
                            variant='primary'
                            className='create_btn'
                            onClick={() => CreateContest()}>
                            Create a contest
                        </Button>
                    </HStack>
                </VStack>
            </VStack>
        </>
    )
}
