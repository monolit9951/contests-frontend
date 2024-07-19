import { Controller, useFormContext } from 'react-hook-form'
import moment from 'moment'
import alertIcon from 'shared/assets/icons/alert.svg?react'
import { Icon } from 'shared/ui/icon'
import { Input } from 'shared/ui/input'
import { HStack, VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

import './competitionTimeInput.scss'

interface CompetitionTimeInputProps {
    isStart?: boolean
}

export const CompetitionTimeInput = ({
    isStart,
}: CompetitionTimeInputProps) => {
    const {
        control,
        watch,
        formState: { errors },
        setValue,
        getValues,
    } = useFormContext()

    const startingDate = getValues('startDate')

    const combineDateTimeStart = () => {
        const dateStart = watch('startDate')
        const timeStart = watch('startTime')

        if (dateStart && timeStart) {
            const combinedStart = new Date(`${dateStart} ${timeStart}`)

            const formattedStart = moment(combinedStart).format(
                'YYYY-MM-DD[T]HH:mm:ss[Z]'
            )
            setValue('dateStart', formattedStart)
        }
    }

    const combineDateTimeEnd = () => {
        const dateEnd = watch('endDate')
        const timeEnd = watch('endTime')

        if (dateEnd && timeEnd) {
            const combinedEnd = new Date(`${dateEnd} ${timeEnd}`)

            const formattedEnd = moment(combinedEnd).format(
                'YYYY-MM-DD[T]HH:mm:ss[Z]'
            )
            setValue('dateEnd', formattedEnd)
        }
    }

    return (
        <HStack className='competitionTimeInput_container'>
            <VStack className='dateInput_container'>
                <Text Tag='p'>{isStart ? 'Start' : 'Deadline'} date</Text>
                <Controller
                    name={`${isStart ? 'start' : 'end'}Date`}
                    control={control}
                    defaultValue={new Date().toISOString().split('T')[0]}
                    rules={{
                        required: `${
                            isStart ? 'Start ' : 'Deadline'
                        } date is required`,
                    }}
                    render={({ field }) => (
                        <Input
                            type='date'
                            {...field}
                            min={
                                isStart
                                    ? new Date().toISOString().split('T')[0]
                                    : startingDate
                            }
                            placeholder='Placeholder'
                            className='dateInput'
                            onChange={(e) => {
                                field.onChange(e)
                                if (isStart) {
                                    combineDateTimeStart()
                                } else {
                                    combineDateTimeEnd()
                                }
                            }}
                        />
                    )}
                />
                {isStart
                    ? errors.startDate && (
                          <HStack className='input-error-container'>
                              <Icon Svg={alertIcon} />
                              <Text Tag='p'>
                                  {errors.startDate.message as string}
                              </Text>
                          </HStack>
                      )
                    : errors.endDate && (
                          <HStack className='input-error-container'>
                              <Icon Svg={alertIcon} />
                              <Text Tag='p'>
                                  {errors.endDate.message as string}
                              </Text>
                          </HStack>
                      )}
            </VStack>
            <VStack className='timeInput_container'>
                <Text Tag='p'>{isStart ? 'Start' : 'Deadline'} time</Text>

                <Controller
                    name={`${isStart ? 'start' : 'end'}Time`}
                    control={control}
                    rules={{
                        required: `${
                            isStart ? 'Start ' : 'Deadline'
                        } time is required`,
                    }}
                    render={({ field }) => (
                        <Input
                            name={field.name}
                            type='time'
                            value={field.value || ''}
                            placeholder='Placeholder'
                            className='timeInput'
                            onChange={(e) => {
                                field.onChange(e)
                                if (isStart) {
                                    combineDateTimeStart()
                                } else {
                                    combineDateTimeEnd()
                                }
                            }}
                        />
                    )}
                />
                {isStart
                    ? errors.startTime && (
                          <HStack className='input-error-container'>
                              <Icon Svg={alertIcon} />
                              <Text Tag='p'>
                                  {errors.startTime.message as string}
                              </Text>
                          </HStack>
                      )
                    : errors.startEnd && (
                          <HStack className='input-error-container'>
                              <Icon Svg={alertIcon} />
                              <Text Tag='p'>
                                  {errors.startEnd.message as string}
                              </Text>
                          </HStack>
                      )}
            </VStack>
        </HStack>
    )
}
