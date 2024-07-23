import { FC, Fragment } from 'react'
import { Contest } from 'entities/contest'
import { PrizeIcon } from 'entities/prize'
import moment from 'moment'
import calendar from 'shared/assets/icons/calendar.svg?react'
import moneyIcon from 'shared/assets/icons/currencyCircleDollar.svg?react'
import itemIcon from 'shared/assets/icons/trophyF.svg?react'
import { capitalizeStr } from 'shared/helpers'
import { Button } from 'shared/ui/button'
import { Icon } from 'shared/ui/icon'
import { Image } from 'shared/ui/image'
import { HStack, VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

import './descriptionSection.scss'

interface Props {
    data: Contest
}

const DescriptionSection: FC<Props> = ({ data }) => {
    const deadline = moment(data.dateEnd).format('DD.MM.YYYY, h a')

    const contestStatus = () => {
        switch (data.status) {
            case 'FINISHED':
                return 'Completed'

            case 'INACTIVE':
                return 'Inactive'

            case 'PAUSED':
                return 'Paused'

            case 'UPCOMING':
                return 'Upcoming'

            default:
                return 'Participate'
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
                                {capitalizeStr(data.status)}
                            </Text>
                        </li>
                        <li>
                            <Text Tag='span' size='sm'>
                                {capitalizeStr(data.subcategory)}
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
                    disabled={!data.contestOpen}
                    onClick={onParticipateClick}
                    className='participate-btn'>
                    <Text Tag='span'>{contestStatus()}</Text>
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
                    {data.exampleMedia && (
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
                    )}
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
                                                    <PrizeIcon
                                                        place={place}
                                                        width={44}
                                                        height={44}
                                                        className='image__no-select'
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
                            <Text Tag='span' bold={!data.contestOpen} size='xl'>
                                {data.contestOpen
                                    ? `${deadline}`
                                    : contestStatus()}
                            </Text>
                        </HStack>
                    </VStack>
                </VStack>
            </HStack>
        </section>
    )
}

export default DescriptionSection
