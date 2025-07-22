import { Controller, useFormContext } from 'react-hook-form'
import moment from 'moment'
import { CustomDatePicker, CustomTimePicker } from 'shared/ui/customDatePicker'
import { HStack, VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

import './competitionTimeInput.scss'

interface CompetitionTimeInputProps {
    isStart?: boolean
}

export const CompetitionTimeInput = ({
    isStart,
}: CompetitionTimeInputProps) => {
    const { control, watch, setValue, getValues } = useFormContext()

    const startingDate = getValues('startDate')

    const combineDateTimeStart = () => {
        const dateStart = watch('startDate')
        const timeStart = watch('startTime') 

        if (dateStart && timeStart) {
            const dateStartString = moment(dateStart).format('YYYY-MM-DD')
            const timeStartString = moment(timeStart).format('HH:mm')

            // полная ЛОКАЛЬНАЯ дата и время
            const combinedLocal = moment(`${dateStartString} ${timeStartString}`, 'YYYY-MM-DD HH:mm')

            // полная МИРОВАЯ дата и время
            const utcFormatted = combinedLocal.utc().format('YYYY-MM-DD[T]HH:mm:ss[Z]')

            console.log(utcFormatted)
            setValue('dateStart', utcFormatted)
        }
    }


    const combineDateTimeEnd = () => {
        const dateEnd = watch('endDate')
        const timeEnd = watch('endTime')

        if (dateEnd && timeEnd) {
            const dateEndString = moment(dateEnd).format('yyyy-MM-DD')
            const timeEndString = moment(timeEnd).format('HH:mm')

            // полная ЛОКАЛЬНАЯ ДАТА времени окончания
            const combinedLocal = moment(`${dateEndString} ${timeEndString}`, 'YYYY-MM-DD HH:mm') 

            // полная МИРОВАЯ дата и время окончания
            const utcFormatted = combinedLocal.utc().format('YYYY-MM-DD[T]HH:mm:ss[Z]')
            console.log(utcFormatted)

            setValue('dateEnd', utcFormatted)
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
                        required: true,
                    }}
                    render={({ field }) => (
                        <CustomDatePicker
                            value={field.value}
                            onChange={(date) => {
                                field.onChange(date)
                                if (isStart) {
                                    combineDateTimeStart()
                                } else {
                                    combineDateTimeEnd()
                                }
                            }}
                            min={
                                isStart
                                    ? new Date().toISOString().split('T')[0]
                                    : startingDate
                            }
                            onBlur={field.onBlur}
                            className='input dateInput'
                        />
                    )}
                />
            </VStack>

            <VStack className='timeInput_container'>
                <Text Tag='p'>{isStart ? 'Start' : 'Deadline'} time</Text>

                <Controller
                    name={`${isStart ? 'start' : 'end'}Time`}
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field }) => (
                        <CustomTimePicker
                            value={field.value}
                            onChange={(date) => {
                                field.onChange(date)
                                if (isStart) {
                                    combineDateTimeStart()
                                } else {
                                    combineDateTimeEnd()
                                }
                            }}
                            onBlur={field.onBlur}
                            className='input timeInput'
                        />
                    )}
                />
            </VStack>
        </HStack>
    )
}
