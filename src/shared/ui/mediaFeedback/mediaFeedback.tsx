import { FC, useState } from 'react'
import clsx from 'clsx'
import bubble from 'shared/assets/icons/chat.svg?react'
import share from 'shared/assets/icons/share.svg?react'
import ShareModal from 'widgets/shareModal'

import { Button } from '../button'
import { Icon } from '../icon'
import { ModalWindow } from '../modalWindow'
import { RateButtons } from '../rateButtons'
import { HStack } from '../stack'
import { Text } from '../text'

import './mediaFeedback.scss'
import { useAppDispatch } from 'shared/lib/store'
import { contestWorksActions } from 'pages/contestPage'

interface Props {
    id: string
    likes: number
    comments?: number
    onCommentsClick?: () => void
    className?: string
    liked: null | string
}

const MediaFeedback: FC<Props> = (props) => {
    const { id, likes, comments, onCommentsClick, className, liked } = props

    const [shareModal, setShareModal] = useState<boolean>(false)

    const dispatch = useAppDispatch()
    const handleLikeCallBack = (action: any) => {
        dispatch(contestWorksActions.updateWorkLike({
            workId: id,
            userLike: action.userLike,
            likeAmount: action.likeAmount
        }))
    }

    return (
        <HStack className={clsx('feedback__wrapper', className)}>
            
            <HStack>
                <RateButtons id={id} likes={likes} work border userLike = {liked} handleLikeCallBack = {handleLikeCallBack}/>
                {onCommentsClick && (
                    <Button
                        variant='secondary'
                        size='s'
                        aria-label='comment'
                        onClick={onCommentsClick}
                        className='feedback__button'>
                        <Icon Svg={bubble} width={20} height={20} />
                        <Text Tag='span' size='sm'>
                            {comments}
                        </Text>
                    </Button>
                )}
            </HStack>
            <Button
                variant='secondary'
                size='s'
                icon={share}
                onClick={() => setShareModal(true)}
                className='feedback__button'>
                <Text Tag='p' size='sm' bold>
                    Share
                </Text>
            </Button>

            {shareModal && <ModalWindow isOpen onClose={() => setShareModal(false)}><ShareModal text='some text' url={`${window.location.href}/work/${id}`}/></ModalWindow>}
        </HStack>
    )
}

export default MediaFeedback
