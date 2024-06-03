import { FC, useState } from 'react'
import { Input } from 'shared/ui/input'
import { HStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'
import { UserIcon } from 'shared/ui/userIcon'
import { CommentsList } from 'widgets/commentsList'

import './commentsSection.scss'

interface Props {
    data?: Comment
}

const СommentsSection: FC<Props> = (props) => {
    const { data } = props
    if (data) console.log(data)

    const [inputData, setInputData] = useState('')

    const onSubmit = () => {
        console.log(inputData.trim())
        setInputData('')
    }

    return (
        <section className='participants-comments'>
            <Text
                Tag='h2'
                size='title'
                bold
                className='participants-comments__title'>
                Comments
                <Text Tag='span' size='xl'>
                    (comments.length)
                </Text>
            </Text>

            <HStack className='participants-comments__input-wrapper'>
                <UserIcon size={40} />
                <Input
                    type='text'
                    placeholder='Add comment...'
                    wrapperClassName='participants-comments__input'
                    value={inputData}
                    onChange={(e) => setInputData(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            onSubmit()
                        }
                    }}
                />
            </HStack>

            <CommentsList className='participants-comments__list' />
        </section>
    )
}

export default СommentsSection
