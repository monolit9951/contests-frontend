import { FC } from 'react'
import { Button } from 'shared/ui/button'
import { Input } from 'shared/ui/input'
import { HStack, VStack } from 'shared/ui/stack'
import { UserIcon } from 'shared/ui/userIcon'

interface Props {
    inputData: string
    setInputData: (value: string) => void
    onSubmit: () => void
    onClose: () => void
}

const CommentInput: FC<Props> = (props) => {
    const { inputData, setInputData, onSubmit, onClose } = props

    return (
        <HStack className='comment-reply'>
            <UserIcon size={40} wrapperClassName='align__start' />
            <VStack className='comment-reply__input-box'>
                <Input
                    type='text'
                    placeholder='Add a reply...'
                    wrapperClassName='comment-reply__input'
                    value={inputData}
                    autoFocus
                    onChange={(e) => setInputData(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            onSubmit()
                        }
                    }}
                />
                <HStack className='justify__end'>
                    <Button variant='ghost' size='s' onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant='secondary' size='s' onClick={onSubmit}>
                        Reply
                    </Button>
                </HStack>
            </VStack>
        </HStack>
    )
}

export default CommentInput
