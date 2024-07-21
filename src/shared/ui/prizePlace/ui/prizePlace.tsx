import React, { useEffect,useState } from 'react'
import { useDispatch } from 'react-redux'
import { Prize } from 'entities/prize'
import { contestsCreationPageActions } from 'pages/contestsCreationPage/model/slice/index'
import trash from 'shared/assets/icons/trash.svg?react'
import win1 from 'shared/assets/icons/win1.svg?react'
import win2 from 'shared/assets/icons/win2.svg?react'
import win3 from 'shared/assets/icons/win3.svg?react'
import win4 from 'shared/assets/icons/win4.svg?react'
import { Button } from 'shared/ui/button'
import { Icon } from 'shared/ui/icon'
import { Input } from 'shared/ui/input'
import { PrizeInformationCombobox } from 'shared/ui/prizeInformationCombobox'
import { HStack, VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

import './prizePlace.scss'

interface PrizePlaceProps {
    prize: Prize
}

const types = [
    { value: 'MONEY', label: 'Money' },
    { value: 'ITEM', label: 'Item' },
]

export const PrizePlace: React.FC<PrizePlaceProps> = ({ prize }) => {
    const dispatch = useDispatch()
    const [comboValue, setComboValue] = useState(prize.prizeType)
    const [winnersAmount, setWinnersAmount] = useState<number | string>(
        prize.winnersAmount
    )
    const [prizeText, setPrizeText] = useState(prize.prizeText)


    useEffect(() => {
        setComboValue(prize.prizeType)
        setWinnersAmount(prize.winnersAmount)
        setPrizeText(prize.prizeText)
    }, [prize])

    const handleInputChange = (field: string, value: any) => {
        dispatch(
            contestsCreationPageActions.updatePrizePlace({
                place: prize.place,
                updates: { [field]: value },
            })
        )
    }


    const getWinIcon = () => {
        switch (prize.place) {
            case 1:
                return win1
            case 2:
                return win2
            case 3:
                return win3
            default:
                return win4
        }
    }

    const onDelete = () => {
        dispatch(contestsCreationPageActions.deletePrizePlace(prize.place))
    }

    return (
        <VStack className='prizePlace_outercontainer'>
            <HStack className='prizePlace_container'>
                <Icon
                    Svg={getWinIcon()}
                    height={44}
                    width={44}
                    className='winIcon'
                />

                <VStack className='winnersNum_input_container'>
                    <Text Tag='p' className='inputTitle'>
                        Number of winners
                    </Text>
                    <Input
                        type='number'
                        placeholder='10'
                        min={1}
                        value={winnersAmount}
                        className='winnersNum_input'
                        onChange={({target: {value}}) => {
                            setWinnersAmount(value)
                            handleInputChange(
                                'winnersAmount',
                                parseInt(value, 10)
                            )
                        }}
                    />
                </VStack>
                <PrizeInformationCombobox
                    title='Prize type'
                    placeholder='Select type'
                    options={types}
                    width={164}
                    value={comboValue}
                    onChange={({ target: { value } }) => {
                        if (value === 'MONEY' || value === 'ITEM') {
                            setComboValue(value)
                            handleInputChange('prizeType', value)
                        }
                    }}
                />
                <VStack className='prizeName_input_container'>
                    <Text Tag='p' className='inputTitle'>
                        Prize name
                    </Text>
                    <Input
                        type='text'
                        placeholder='10 000 $'
                        value={prizeText}
                        className='prizeName_input'
                        onChange={({target: {value}}) => {
                            setPrizeText(value)
                            handleInputChange('prizeText', value)
                        }}
                    />
                </VStack>
                <Button
                    variant='div'
                    className='iconBtn_wrapper'
                    onClick={() => onDelete()}>
                    <Icon
                        Svg={trash}
                        height={48}
                        width={24}
                        className='deleteIcon'
                    />
                </Button>
            </HStack>

            <div className='divider' />
        </VStack>
    )
}
