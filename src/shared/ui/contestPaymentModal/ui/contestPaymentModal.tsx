import alert from 'shared/assets/icons/alert.svg?react'
import wallet from 'shared/assets/icons/wallet.svg?react'
import X from 'shared/assets/icons/X.svg?react'
import { Button } from 'shared/ui/button'
import { Divider } from 'shared/ui/divider'
import { Icon } from 'shared/ui/icon'
import { ModalWindow } from 'shared/ui/modalWindow'
import { HStack, VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

import './contestPaymentModal.scss'

interface ContestPaymentModalProps {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ContestPaymentModal = ({
    isOpen,
    setIsOpen,
}: ContestPaymentModalProps) => {
    return (
        <ModalWindow isOpen={isOpen} modalContentClass='paymentModal'>
            <HStack className='paymentModal__content__header'>
                <HStack className='paymentModal__content__header__icontextContainer'>
                    <Icon
                        Svg={alert}
                        className='paymentModal__content__header__icontextContainer__alertIcon'
                    />
                    <Text
                        Tag='h3'
                        className='paymentModal__content__header__icontextContainer__text'>
                        Top up your balance
                    </Text>
                </HStack>
                <Icon
                    Svg={X}
                    className='paymentModal__content__header__xIcon'
                    clickable
                    onClick={() => setIsOpen(false)}
                    width={24}
                    height={24}
                />
            </HStack>

            <Divider marginX={0} marginY={24} />

            <VStack className='paymentModal__body'>
                <HStack className='paymentModal__body__iconWrapper'>
                    <Icon
                        Svg={wallet}
                        className='paymentModal__body__icon'
                        width={56}
                        height={56}
                    />
                </HStack>

                <Text Tag='p' className='paymentModal__body__boldText'>
                    There is currently not enough money in your account to cover
                    <br />
                    the competition prize fund
                </Text>

                <VStack className='paymentModal__body__balanceInfo'>
                    <Text
                        Tag='p'
                        className='paymentModal__body__balanceInfo__text'>
                        Account information in balance
                    </Text>
                </VStack>

                <Text Tag='p' className='paymentModal__body__text'>
                    Please fund your account or change the prize amount in the
                    competition
                </Text>
            </VStack>

            <Divider marginX={0} marginY={24} />

            <HStack className='paymentModal__btnsContainer'>
                <Button
                    className='paymentModal__btnsContainer__btn cancel'
                    variant='secondary'
                    onClick={() => setIsOpen(false)}>
                    <Text
                        Tag='p'
                        className='paymentModal__btnsContainer__btn__text'>
                        Cancel
                    </Text>
                </Button>
                <Button
                    className='paymentModal__btnsContainer__btn topUp'
                    variant='primary'>
                    <Text Tag='p'>Top up your account</Text>
                </Button>
            </HStack>
        </ModalWindow>
    )
}
