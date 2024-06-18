import { Fragment } from 'react'
import { Contest } from 'entities/contest'
import calendar from 'shared/assets/icons/calendar.svg?react'
import moneyIcon from 'shared/assets/icons/currencyCircleDollar.svg?react'
import itemIcon from 'shared/assets/icons/trophyF.svg?react'
import first from 'shared/assets/icons/win1.svg'
import second from 'shared/assets/icons/win2.svg'
import third from 'shared/assets/icons/win3.svg'
import { Button } from 'shared/ui/button'
import { Icon } from 'shared/ui/icon'
import { Image } from 'shared/ui/image'
import { HStack, VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

import './descriptionSection.scss'

interface Props {
    data: Contest
}

const DescriptionSection = ({ data }: Props) => {
    const deadline = data.dateEnd

    const contestInactive = () => {
        switch (data.status) {
            case 'FINISHED':
                return true
            case 'INACTIVE':
                return true
            default:
                return false
        }
    }

    const prizeIcon = (place: number) => {
        switch (place) {
            case 1:
                return first

            case 2:
                return second

            default:
                return third
        }
    }

    const onParticipateClick = () => {}

    return (
        <section className='contest-description'>
            <HStack className='justify__between align__start'>
                <VStack>
                    <Text Tag='h1' bold size='title' className='contest-title'>
                        {data.name}
                    </Text>
                    <ul className='tags-list'>
                        <li>
                            <Text Tag='span' size='sm'>
                                {data.subcategory}
                            </Text>
                        </li>
                        <li>
                            <Text Tag='span' size='sm'>
                                {data.maxAllowedParticipantAmount} participants
                            </Text>
                        </li>
                    </ul>
                </VStack>
                <Button
                    variant='primary'
                    disabled={contestInactive()}
                    onClick={onParticipateClick}>
                    <Text Tag='span'>
                        {contestInactive() ? 'Inactive' : 'Participate'}
                    </Text>
                </Button>
            </HStack>
            <HStack className='contest-info'>
                <VStack className='contest-info__left-block'>
                    <VStack>
                        <Text Tag='h4' bold size='l'>
                            Description
                        </Text>
                        <Text Tag='p'>{data.description}</Text>
                    </VStack>
                    <VStack>
                        <Text Tag='h4' bold size='l'>
                            Victory conditions
                        </Text>
                        <ul className='win-conditions'>
                            <li>
                                <Text Tag='p'>{data.description}</Text>
                            </li>
                            <li>
                                <Text Tag='p'>{data.description}</Text>
                            </li>
                        </ul>
                    </VStack>
                    <VStack>
                        <Text Tag='h4' bold size='l'>
                            Examples
                        </Text>
                        <ul className='example-list'>
                            {data.exampleMedia?.map((item, idx) => (
                                <li key={item + idx}>
                                    <Image
                                        src={item}
                                        alt={`Example ${idx + 1}`}
                                        width={135}
                                        height={132}
                                        className='example-media'
                                    />
                                </li>
                            ))}
                        </ul>
                    </VStack>
                </VStack>
                <VStack className='contest-info__right-block'>
                    <VStack className='prize-info__wrapper'>
                        <Text Tag='h4' bold size='l'>
                            Prize information
                        </Text>
                        <ul className='prizes-list'>
                            {data.prizes.map((item, idx) => {
                                const {
                                    id,
                                    place,
                                    winnersAmount,
                                    currency,
                                    prizeAmount,
                                    prizeType,
                                    prizeText,
                                } = item

                                return (
                                    <Fragment key={id}>
                                        {idx !== 0 && (
                                            <hr className='separator' />
                                        )}
                                        <li className='prize-item'>
                                            <Text Tag='span'>
                                                {winnersAmount} winner
                                                {winnersAmount > 1 && 's'}
                                            </Text>
                                            <HStack className='justify__between'>
                                                <HStack className='align__center'>
                                                    <Image
                                                        src={prizeIcon(place)}
                                                        alt='place icon'
                                                    />
                                                    <Text
                                                        Tag='span'
                                                        size='xl'
                                                        bold
                                                        className='prize-text'>
                                                        {prizeType === 'ITEM'
                                                            ? prizeText
                                                            : `${prizeAmount.toFixed(
                                                                  0
                                                              )} 
                                                        ${currency}`}
                                                    </Text>
                                                </HStack>
                                                <Icon
                                                    Svg={
                                                        prizeType === 'ITEM'
                                                            ? itemIcon
                                                            : moneyIcon
                                                    }
                                                />
                                            </HStack>
                                        </li>
                                    </Fragment>
                                )
                            })}
                        </ul>
                    </VStack>
                    <VStack className='deadline-info__wrapper'>
                        <Text Tag='h4' bold size='l'>
                            Deadline
                        </Text>
                        <HStack className='align__center'>
                            <Icon Svg={calendar} width={36} height={36} />
                            <Text Tag='span' bold={contestInactive()} size='xl'>
                                {
                                    contestInactive()
                                        ? 'Inactive'
                                        : `${deadline}` /* `${deadline[2]}.${
                                          deadline[1] < 10
                                              ? `0${deadline[1]}`
                                              : deadline[1]
                                      }.${deadline[0]}, ${
                                          deadline[3] > 12
                                              ? `${deadline[3] - 12} pm`
                                              : `${deadline[3]} am`
                                      }` */
                                }
                            </Text>
                        </HStack>
                    </VStack>
                </VStack>
            </HStack>
        </section>
    )
}

export default DescriptionSection
