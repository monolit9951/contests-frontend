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
    { value: 'COINS', label: 'Coins' },
]

export const PrizePlace: FC<PrizePlaceProps> = ({
    index,
    place,
    last,
    onDelete,
}) => {
    const {
        register,
        control,
        // formState: { errors },
        // getValues,
        setValue
    } = useFormContext()

    return (
        <VStack className='prizePlace_outercontainer'>

            <HStack>
                <HStack className='prizePlace_container'>
                    <div className="prizePlace_firstPart">
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
                                    options={types}
                                    name={field.name}
                                    value={types.find(
                                        (c) => c.value === field.value
                                    )}
                                    onChange={(val) => field.onChange(val?.value)}
                                    label='Prize type'
                                    placeholder='Select type'
                                />
                            )}
                        />
                    </div>

                    <div className="prizePlace_secondPart">
                        <Input
                            label='Prize name'
                            {...register(`prizes.${index}.prizeText`, {
                                required: true,
                            })}
                            type='number'
                            placeholder='10 000'
                            onChange={(e) => {
                                if (!Number.isNaN(Number(e.target.value))) {
                                    setValue(
                                        `prizes.${index}.prizeAmount`,
                                        Number(e.target.value)
                                    )
                                }
                            }}
                            autoComplete='off'
                            className='prizeName_input'
                            wrapperClassName='prizeName_input_container'
                        />

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
                    </div>
                </HStack>
            </HStack>

            {/* <div className='divider' /> */}
        </VStack>
    )
}
