import { useFieldArray, useFormContext } from 'react-hook-form'
import { ContestCreationFormData } from 'features/createContest/model/types'
import alertIcon from 'shared/assets/icons/alert.svg?react'
import { Button } from 'shared/ui/button'
import { Icon } from 'shared/ui/icon'
import { PrizePlace } from 'shared/ui/prizePlace'
import { HStack, VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

import './prizeInformation.scss'

export const PrizeInformation = () => {
    const {
        control,
        formState: { errors },
    } = useFormContext<ContestCreationFormData>()

    const {
        fields,
        remove,
        append: appendPrize,
    } = useFieldArray({
        control,
        name: `prizes`,
    })

    const addPrize = () => {
        appendPrize({
            id: crypto.randomUUID(),
            place: fields.length + 1,
            winnersAmount: 1,
            prizeType: '',
            prizeText: '',
            currency: 'USD',
            prizeAmount: 0,
        })
    }

    const deletePrize = (indexToRemove: number) => {
        remove(indexToRemove)
    }

    return (
        <VStack className='prizeInformation_container'>
            <Text Tag='h2' className='prizeInformation_header'>
                Prize Information
            </Text>

            <VStack className='prizePlaces_container'>
                {fields.map((field, idx) => (
                    <PrizePlace
                        key={field.id}
                        place={field.place}
                        index={idx}
                        last={fields.length - 1 === idx && idx !== 0}
                        onDelete={() => deletePrize(idx)}
                    />
                ))}
            </VStack>

            <Button
                variant='secondary'
                className='addPrizePlace_btn'
                onClick={() => addPrize()}>
                <Text Tag='p'>Add prize place</Text>
            </Button>
            {errors.prizes && (
                <HStack className='input-error-container'>
                    <Icon Svg={alertIcon} />
                    <Text Tag='p'>Prize info is required</Text>
                </HStack>
            )}
        </VStack>
    )
}
