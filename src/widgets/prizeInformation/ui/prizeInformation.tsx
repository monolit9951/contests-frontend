import { useDispatch, useSelector } from 'react-redux'
import { Prize } from 'entities/prize'
import { contestsCreationPageActions } from 'pages/contestsCreationPage/model/slice/index'
import alertIcon from 'shared/assets/icons/alert.svg?react'
import { Button } from 'shared/ui/button'
import { Icon } from 'shared/ui/icon'
import { PrizePlace } from 'shared/ui/prizePlace'
import { HStack, VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

import './prizeInformation.scss'

interface PrizeInformationProps {
    error: string
}

export const PrizeInformation = ({ error }: PrizeInformationProps) => {
    const prizes: Prize[] = useSelector(
        (state: RootState) => state.contestsCreationPage.prizes
    )

    const dispatch = useDispatch()

    const addPrize = () => {
        const newPrize = {
            place: prizes.length + 1,
            winnersAmount: 0,
            prizeType: '',
            prizeText: '',
            currency: '',
            prizeAmount: 0,
        }

        dispatch(contestsCreationPageActions.addPrizePlace(newPrize))
    }

    return (
        <VStack className='prizeInformation_container'>
            <Text Tag='h2' className='prizeInformation_header'>
                Prize Information
            </Text>
            <VStack className='prizePlaces_container'>
                {prizes.map((prize) => (
                    <PrizePlace key={prize.place} prize={prize} />
                ))}
            </VStack>
            <Button
                variant='secondary'
                className='addPrizePlace_btn'
                onClick={() => addPrize()}>
                <Text Tag='p'>Add prize place</Text>
            </Button>
            {error && (
                <HStack className='prize-information__error'>
                    <Icon Svg={alertIcon} />
                    <Text Tag='span'>{error}</Text>
                </HStack>
            )}
        </VStack>
    )
}
