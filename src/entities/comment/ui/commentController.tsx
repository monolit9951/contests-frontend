import { VStack } from 'shared/ui/stack'

interface Props {
    onClose: () => void,
    handleDeleteCommentCallback: () => void
    handleSetEditCallback: () => void
}

const CommentController = ({ onClose, handleDeleteCommentCallback, handleSetEditCallback}: Props) => {
    const onReportAction = () => {
        console.log('comment reported')
        onClose()
    }

    const onEditAction = () => {
        handleSetEditCallback()
        onClose()
    }

    const onDeleteAction = () => {
        handleDeleteCommentCallback()
        onClose()
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
