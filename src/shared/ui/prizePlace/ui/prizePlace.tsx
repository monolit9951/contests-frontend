import { FC } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { PrizeIcon } from 'entities/prize'
import trash from 'shared/assets/icons/trash.svg?react'
import { Button } from 'shared/ui/button'
import { Icon } from 'shared/ui/icon'
import { Combobox, Input } from 'shared/ui/input'
import { HStack, VStack } from 'shared/ui/stack'

import './prizePlace.scss'

interface PrizePlaceProps {
    index: number
    place: number
    last: boolean
    onDelete: (place: number) => void
}

const types = [
    { value: 'MONEY', label: 'Money' },
    { value: 'ITEM', label: 'Item' },
]

export const PrizePlace: FC<PrizePlaceProps> = ({
    index,
    place,
    last,
    onDelete,
}) => {
    const { register, control, setValue } = useFormContext()

    return (
        <VStack className='prizePlace_outercontainer'>
            <HStack>
                <HStack className='prizePlace_container'>
                    <PrizeIcon
                        place={place}
                        width={44}
                        height={44}
                        className='winIcon image__no-select'
                    />

                    <Input
                        label='Number of winners'
                        {...register(`prizes.${index}.winnersAmount`, {
                            required: true,
                        })}
                        type='number'
                        defaultValue={1}
                        min={1}
                        max={1000}
                        placeholder='10'
                        className='winnersNum_input'
                        wrapperClassName='winnersNum_input_container'
                    />

                    <Controller
                        name={`prizes.${index}.prizeType`}
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Combobox
                                name={field.name}
                                label='Prize type'
                                options={types}
                                placeholder='Select type'
                                className='input'
                                width={164}
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />

                    <Input
                        label='Prize name'
                        {...register(`prizes.${index}.prizeText`, {
                            required: true,
                        })}
                        type='text'
                        placeholder='10 000 $'
                        onChange={(e) => {
                            if (!Number.isNaN(Number(e.target.value))) {
                                setValue(
                                    `prizes.${index}.prizeAmount`,
                                    Number(e.target.value)
                                )
                            }
                        }}
                        className='prizeName_input'
                        wrapperClassName='prizeName_input_container'
                    />
                </HStack>

                {last && (
                    <Button
                        variant='div'
                        className='iconBtn_wrapper'
                        onClick={() => onDelete(place)}>
                        <Icon
                            Svg={trash}
                            height={48}
                            width={24}
                            className='deleteIcon'
                        />
                    </Button>
                )}
            </HStack>

            <div className='divider' />
        </VStack>
    )
}
