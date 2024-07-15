import { useState } from 'react'
import win1 from 'shared/assets/icons/win1.svg?react'
import win2 from 'shared/assets/icons/win2.svg?react'
import win3 from 'shared/assets/icons/win3.svg?react'
import win4 from 'shared/assets/icons/win4.svg?react'
import { Button } from 'shared/ui/button'
import { PrizePlace } from 'shared/ui/prizePlace'
import { VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

import { WinPlace } from '../entities/entities'

import './prizeInformation.scss'

export const PrizeInformation = () => {
    const [prizes, setPrizes] = useState<WinPlace[]>([
        {
            winIcon: win1,
            place: 1,
            winnersAmount: 0,
            prize: {
                prizeType: '',
                prizeText: '',
                currency: '',
                prizeAmount: 0,
            },
        },
        {
            winIcon: win2,
            place: 2,
            winnersAmount: 0,
            prize: {
                prizeType: '',
                prizeText: '',
                currency: '',
                prizeAmount: 0,
            },
        },
        {
            winIcon: win3,
            place: 3,
            winnersAmount: 0,
            prize: {
                prizeType: '',
                prizeText: '',
                currency: '',
                prizeAmount: 0,
            },
        },
        {
            winIcon: win4,
            place: 4,
            winnersAmount: 0,
            prize: {
                prizeType: '',
                prizeText: '',
                currency: '',
                prizeAmount: 0,
            },
        },
    ])

    const addPrize = () => {
        setPrizes((prevPrizes) => {
            let winIcon
            switch (prevPrizes.length + 1) {
                case 1:
                    winIcon = win1
                    break
                case 2:
                    winIcon = win2
                    break
                case 3:
                    winIcon = win3
                    break
                default:
                    winIcon = win4
                    break
            }
            return [
                ...prevPrizes,
                {
                    winIcon,
                    place: prevPrizes.length + 1,
                    winnersAmount: 0,
                    prize: {
                        prizeType: '',
                        prizeText: '',
                        currency: '',
                        prizeAmount: 0,
                    },
                },
            ]
        })
    }

    const deletePrize = (index: number) => {
        setPrizes((prevPrizes) => {
            const updatedPrizes = prevPrizes
                .filter((_, i) => i !== index)
                .map((prize, i) => {
                    let winIcon
                    switch (i + 1) {
                        case 1:
                            winIcon = win1
                            break
                        case 2:
                            winIcon = win2
                            break
                        case 3:
                            winIcon = win3
                            break
                        default:
                            winIcon = win4
                            break
                    }
                    return {
                        ...prize,
                        winIcon,
                        place: i + 1,
                    }
                })
            return updatedPrizes
        })
    }

    return (
        <VStack className='prizeInformation_container'>
            <Text Tag='h2' className='prizeInformation_header'>
                Prize Information
            </Text>
            <VStack className='prizePlaces_container'>
                {prizes.map((prize, index) => (
                    <PrizePlace
                        key={index}
                        index={index}
                        winIcon={prize.winIcon}
                        onDelete={() => deletePrize(index)}
                    />
                ))}
            </VStack>
            <Button
                variant='secondary'
                className='addPrizePlace_btn'
                onClick={() => addPrize()}>
                <Text Tag='p'>Add prize place</Text>
            </Button>
        </VStack>
    )
}
