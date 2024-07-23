import { FC } from 'react'
import caretLeft from 'shared/assets/icons/caretLeft.svg?react'
import caretRight from 'shared/assets/icons/caretRight.svg?react'
import { Button } from 'shared/ui/button'
import { Icon } from 'shared/ui/icon'
import { HStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

interface Props {
    monthDate: Date
    decreaseMonth: () => void
    increaseMonth: () => void
    prevMonthButtonDisabled: boolean
    nextMonthButtonDisabled: boolean
}

export const CustomHeader: FC<Props> = (props) => {
    const {
        monthDate,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
    } = props

    return (
        <HStack className='justify__between align__center'>
            <Text Tag='h3' size='l' bold>
                {monthDate.toLocaleString('en-US', {
                    month: 'long',
                    year: 'numeric',
                })}
            </Text>

            <HStack className='datepicker-header__button-wrapper'>
                <Button
                    variant='ghost'
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}>
                    <Icon Svg={caretLeft} width={14} height={14} />
                </Button>
                <Button
                    variant='ghost'
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}>
                    <Icon Svg={caretRight} width={14} height={14} />
                </Button>
            </HStack>
        </HStack>
    )
}
