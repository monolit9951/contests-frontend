import { FC, useState } from 'react'
import tripleDot from 'shared/assets/icons/tripleDot.svg?react'
import { Button } from 'shared/ui/button'
import { Icon } from 'shared/ui/icon'
import { RateButtons } from 'shared/ui/rateButtons'
import { HStack, VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'
import { UserIcon } from 'shared/ui/userIcon'

import { Comment } from '../model/types'

import CommentController from './commentController'

import './commentEl.scss'

interface Props {
    data?: Comment
}

const CommentEl: FC<Props> = (props) => {
    const { data } = props
    if (data) console.log(data)

    const [actionsShown, setActionsShown] = useState(false)

    const onActionClick = () => {
        setActionsShown(!actionsShown)
    }

    const onReply = () => {}

    return (
        <HStack className='comment__wrapper'>
            <UserIcon size={40} />
            <VStack className='comment__body'>
                <HStack className='comment-info'>
                    <Text Tag='p' bold>
                        {data?.user.name ?? 'Deborah Kertzmann'}
                        <Text Tag='span' size='sm'>
                            {data?.commentDate ?? '1 d'}
                        </Text>
                    </Text>
                    <Icon Svg={tripleDot} clickable onClick={onActionClick} />
                    {actionsShown && <CommentController />}
                </HStack>

                <Text Tag='p' className='comment-text'>
                    {data?.commentText ?? ''}
                    Welcome to the uproarious arena of the Tickle Olympics,
                    where humor and athleticism collide in a whirlwind of
                    laughter and lighthearted competition! Picture this:
                    athletes from around the globe, each armed with a tickling
                    strategy, vying for the coveted gold medal in the art of
                    inducing laughter.
                </Text>

                <HStack className='comment-feedback'>
                    <RateButtons likes={10330} />
                    <Button variant='ghost' size='s' onClick={onReply}>
                        Reply
                    </Button>
                </HStack>
            </VStack>
        </HStack>
    )
}

export default CommentEl
