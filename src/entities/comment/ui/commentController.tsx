import { VStack } from 'shared/ui/stack'

interface Props {
    onClose: () => void,
    handleDeleteCommentCallback: () => void
}

const CommentController = ({ onClose, handleDeleteCommentCallback}: Props) => {
    const onReportAction = () => {
        console.log('comment reported')
        onClose()
    }

    const onEditAction = () => {
        console.log('comment editor called')
        onClose()
    }

    const onDeleteAction = () => {
        handleDeleteCommentCallback()
    }

    return (
        <VStack className='comment-action__box'>
            <button
                type='button'
                onClick={onReportAction}
                className='comment-action__button'>
                Report comment
            </button>
            <button
                type='button'
                onClick={onEditAction}
                className='comment-action__button'>
                Edit comment
            </button>
            <button
                type='button'
                onClick={onDeleteAction}
                className='comment-action__button'>
                Delete comment
            </button>
        </VStack>
    )
}

export default CommentController
