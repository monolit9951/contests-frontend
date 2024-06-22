import React, { useState } from 'react'
import trash from 'shared/assets/icons/trash.svg?react'
import { Button } from 'shared/ui/button'
import { Icon } from 'shared/ui/icon'
import { Combobox, Input } from 'shared/ui/input'
import { MainInformationCombobox } from 'shared/ui/mainInformationCombobox/ui/mainInformationCombobox'
import { HStack, VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'
import { WinPlace } from 'widgets/prizeInformation/entities/entities'

import './prizePlace.scss'
import { PrizeInformationCombobox } from 'shared/ui/prizeInformationCombobox'

interface PrizePlaceProps {
    winIcon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
    place: number
    onDelete: (index: number) => void
    index: number
    // handlePrizeTypeChange: (index: number, value: string) => void
}

const types = [
    { value: 'type1', label: 'Type 1' },
    { value: 'type2', label: 'Type 2' },
    { value: 'type3', label: 'Type 3' },
]

export const PrizePlace: React.FC<PrizePlaceProps> = ({
    winIcon,
    place,
    onDelete,
    // handlePrizeTypeChange,
    index,
}) => {

    const [comboValue, setComboValue] = useState()

    // const handlePrizeTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     setComboValue
    // }

    return (
        <VStack className='prizePlace_outercontainer'>
            <HStack className='prizePlace_container'>
                <Icon
                    Svg={winIcon}
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
                        className='winnersNum_input'
                    />
                </VStack>
                {/* <MainInformationCombobox */}
                <PrizeInformationCombobox
                    title='Prize type'
                    placeholder='Select type'
                    // className='prizePlace_container__combobox'
                    options={types}
                    width={164}
                    value={comboValue}
                    onChange={(e) => setComboValue(e.target.value)}
                    // onChange={(e) => console.log(e)}
                />
                <VStack className='prizeName_input_container'>
                    <Text Tag='p' className='inputTitle'>
                        Prize name
                    </Text>
                    <Input
                        type='text'
                        placeholder='10 000 $'
                        className='prizeName_input'
                    />
                </VStack>
                <Button
                    variant='div'
                    className='iconBtn_wrapper'
                    onClick={() => onDelete(index)}>
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
