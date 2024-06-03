import { VStack } from 'shared/ui/stack'

const CommentController = () => {
    const onReportAction = () => {
        console.log('comment reported')
    }

    return (
        <VStack className='comment-action__box'>
            <button
                type='button'
                onClick={onReportAction}
                className='comment-action__button'>
                Report comment
            </button>
        </VStack>
    )
}

export default CommentController
