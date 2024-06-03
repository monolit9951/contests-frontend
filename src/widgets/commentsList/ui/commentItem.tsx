import { FC, useState } from 'react'
import clsx from 'clsx'
import { Comment, CommentEl } from 'entities/comment'
import caretRight from 'shared/assets/icons/caretRight.svg?react'
import { Button } from 'shared/ui/button'
import { Icon } from 'shared/ui/icon'
import { VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

interface Props {
    data?: Comment
}

const CommentItem: FC<Props> = (props) => {
    const { data } = props

    const hasReplies = true

    const [repliesShown, setRepliesShown] = useState(false)

    const onRepliesClick = () => {
        setRepliesShown(!repliesShown)
    }

    return (
        <li>
            <CommentEl data={data} />
            {hasReplies && (
                <VStack className='comment-replies__wrapper'>
                    <Button
                        variant='ghost'
                        onClick={onRepliesClick}
                        className='comment-replies__button'>
                        <Icon
                            Svg={caretRight}
                            width={20}
                            height={20}
                            className={clsx(
                                repliesShown
                                    ? 'comment-replies__icon opened'
                                    : 'comment-replies__icon closed'
                            )}
                        />
                        <Text Tag='p' size='sm' bold>
                            View replies (1)
                        </Text>
                    </Button>
                    {repliesShown && (
                        <ul className='subcomments-list'>
                            <li>
                                <CommentEl />
                            </li>
                        </ul>
                    )}
                </VStack>
            )}
        </li>
    )
}

export default CommentItem
