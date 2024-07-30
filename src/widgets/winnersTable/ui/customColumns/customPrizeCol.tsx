import { FC } from 'react'
import { HStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

export const PrizeRenderer: FC<{ value: string }> = ({ value }) => {
    const [type, text, amount, currency] = value.split(',')

    const currencySymbol = () => {
        switch (currency) {
            case 'EUR':
                return '\u20AC'
            case 'PLN':
                return 'z\u0142'
            case 'UAH':
                return '\u20B4'

            default:
                return '\u0024'
        }
    }

    return (
        <HStack>
            <Text
                Tag='p'
                title={
                    type === 'ITEM' ? text : `${amount} ${currencySymbol()}`
                }>
                {type === 'ITEM' ? text : `${amount} ${currencySymbol()}`}
            </Text>
        </HStack>
    )
}
