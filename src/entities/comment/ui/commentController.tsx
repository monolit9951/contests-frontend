import { useState } from 'react'
import { useSelector } from 'react-redux'
import { ModalWindow } from 'shared/ui/modalWindow'
import { VStack } from 'shared/ui/stack'
import ModalReport from 'widgets/modalReport'

interface Props {
    onClose: () => void,
    handleDeleteCommentCallback: () => void
    handleSetEditCallback: () => void
}

const CommentController = ({ onClose, handleDeleteCommentCallback, handleSetEditCallback}: Props) => {

    const user = useSelector((state: RootState) => state.user)

    const [modalReport, setModalReport] = useState<boolean>(false)

    const onReportAction = () => {
        if(user.userId === null){
            alert("You not authorized")
            return
        }
        console.log('report')
        setModalReport(true)

        onClose()
    }

    const onEditAction = () => {
        if(user.userId === null){
            alert("You not authorized")
            return
        }

        handleSetEditCallback()
        onClose()
    }

    const onDeleteAction = () => {
        if(user.userId === null){
            alert("You not authorized")
            return
        }
        
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

            {modalReport && <ModalWindow isOpen onClose={() => setModalReport(false)}><div>DASDSDSD</div></ModalWindow>}
        </VStack>
    )
}

export default CommentController
