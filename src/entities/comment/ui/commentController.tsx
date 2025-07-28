import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useAlert } from "shared/lib/hooks/useAlert/useAlert";
import { ModalWindow } from 'shared/ui/modalWindow'
import { VStack } from 'shared/ui/stack'
import ModalReport from 'widgets/modalReport'

interface Props {
    onControllerClose: () => void,
    handleDeleteCommentCallback: () => void
    handleSetEditCallback: () => void
    commentId: string
}

const CommentController = ({ onControllerClose, handleDeleteCommentCallback, handleSetEditCallback, commentId}: Props) => {

    const user = useSelector((state: RootState) => state.user)

    const [modalReport, setModalReport] = useState<boolean>(false)
    const {showAlert, Alert} = useAlert()

    const onReportAction = () => {
        if(user.userId === null){
            showAlert('You not authorized')
            return
        }
        setModalReport(true)

        // onClose()
    }

    const onEditAction = () => {
        if(user.userId === null){
            showAlert('You not authorized')
            return
        }

        handleSetEditCallback()
        onControllerClose()
    }

    const onDeleteAction = () => {
        if(user.userId === null){
            showAlert('You not authorized')
            return
        }
        
        handleDeleteCommentCallback()
        onControllerClose()
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

            {modalReport && <ModalWindow isOpen onClose={() => setModalReport(false)}><ModalReport targetType='COMMENT' targetId={commentId} /></ModalWindow>}
            <Alert />
        </VStack>
    )
}

export default CommentController
