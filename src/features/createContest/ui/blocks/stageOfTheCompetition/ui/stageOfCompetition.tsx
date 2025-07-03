import { useEffect, useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import alertIcon from 'shared/assets/icons/alert.svg?react'
import { CompetitionTimeInput } from 'shared/ui/competitionTimeInput'
import { Icon } from 'shared/ui/icon'
import { HStack, VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

import './stageOfTheCompetition.scss'

interface Props {
    dateValidation: string
}

export const StageOfTheCompetition = ({ dateValidation }: Props) => {
    const {
        formState: { errors },
    } = useFormContext()

    const validationMessage = () => {
        if (errors.startTime ?? errors.endTime) {
            return 'Time is required'
        }
        return dateValidation
    }

    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
    if (dateValidation || errors.startTime || errors.endTime) {
        containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    }, [dateValidation, errors.startTime, errors.endTime])

    return (
        <VStack className='stageOfTheCompetition_container' ref={containerRef}>
            <Text Tag='h2' className='stageOfTheCompetition_header'>
                Stage of the competition
            </Text>

            <CompetitionTimeInput isStart />
            <CompetitionTimeInput />

            {(dateValidation || (errors.startTime ?? errors.endTime)) && (
                <HStack className='input-error-container'>
                    <Icon Svg={alertIcon} />
                    <Text Tag='p'>{validationMessage()}</Text>
                </HStack>
            )}
        </VStack>
    )
}
