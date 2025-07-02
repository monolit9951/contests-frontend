import { forwardRef, useState } from 'react'
import clsx from 'clsx'
import { Comment, CommentEl } from 'entities/comment'
import instance from 'shared/api/api'
import caretRight from 'shared/assets/icons/caretRight.svg?react'
import { Button } from 'shared/ui/button'
import { Icon } from 'shared/ui/icon'
import Spinner from 'shared/ui/spinner'
import { VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

interface Props {
    data: Comment
    userId: string
    handleDeleteMainCommentCallback: (commentId: string) => void
    isMain?: boolean
    parentId: string
}

const CommentItem = forwardRef<HTMLLIElement, Props>((props, ref) => {
    const { data, userId, handleDeleteMainCommentCallback, isMain, parentId} = props

    const [repliesShown, setRepliesShown] = useState(false)
    const [repliesNum, setRepliesNum] = useState(data.subCommentsAmount ?? 0)
    const [subComments, setSubComments] = useState<Comment[]>([])
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [nextLoading, setNextLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    // const params = `pageSize=8&sortDirection=ASC&parentId=${data.id}`

    // функция загрузки всех сабкомментов
    
    // ------------------------------------------------------------------------------
    // ПЕРЕДЕЛАТЬ, ПОЛУЧАТЬ ПО ДРУГОМУ ЗАПРОСУ, ГДЕ ВСЕ САБКОММЕНТЫ
    // -----------------------------------------------------------------------------


    const fetchSubComments = async () =>{
        try {
            setError(null)
            setLoading(true)
            
            const response = await instance.get(`comment?parentId=${data.id}`)
            console.log(response)
            // setSubComments((prev) => [...prev, ...response.data.content])
            setSubComments(response.data.content)

            console.log(subComments)
            setTotalPages(response.data.totalPages)
        } catch (err) {
            setError(err as Error)
        } finally {
            setLoading(false)
        }
    }

    // отловить нажатие показать реплаи
    const onRepliesClick = async () => {
        setRepliesShown(!repliesShown)
        if (subComments.length) {
            return
        }

        fetchSubComments()
    }

    // функция для пагинации сабкомментов
    const onLoadMore = async () => {
        try {
            setError(null)
            setNextLoading(true)

            const response = await instance.get(
                `comment?page=${page}&${params}`
            )

            setSubComments((prev) => [...prev, ...response.data.content])
            // eslint-disable-next-line no-return-assign
            setPage((prev) => (prev += 1))
        } catch (err) {
            setError(err as Error)
        } finally {
            setNextLoading(false)
        }
    }


    const handleNewSubCommentCallback = () => {
        setRepliesNum(repliesNum + 1)
        fetchSubComments()
        setRepliesShown(true)
    }


    const handleDeleteSubCommentCallback = (commentId: string) =>{
        setSubComments(prev => prev.filter(comment => comment.id !== commentId));
        setRepliesNum(repliesNum-1)
    }

    // console.log(data.id)

    return (
        <li ref={ref}>
            <CommentEl
                data={data}
                userId={userId}
                setRepliesShown={setRepliesShown}
                setRepliesNum={setRepliesNum}
                setTotalPages={setTotalPages}
                setSubComments={setSubComments}
                setNextLoading={setNextLoading}
                setError={setError}
                handleNewSubCommentCallback = {handleNewSubCommentCallback}
                handleDeleteMainCommentCallback = {handleDeleteMainCommentCallback}
                isMain
                parentId={data.id}
            />
            {!!repliesNum && (
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
                            View replies ({repliesNum})
                        </Text>
                    </Button>

                    {loading && <Spinner />}

                    {error && (
                        <Text Tag='p' bold size='xl'>
                            {error.message}
                        </Text>
                    )}

                    {repliesShown && !loading && data && (
                        <ul className='subcomments-list'>
                            {subComments.map((item, index) => (
                                <li key={index}>
                                    <CommentEl
                                        data={item}
                                        userId={userId}
                                        setRepliesShown={setRepliesShown}
                                        setRepliesNum={setRepliesNum}
                                        setTotalPages={setTotalPages}
                                        setSubComments={setSubComments}
                                        setNextLoading={setNextLoading}
                                        setError={setError}
                                        handleNewSubCommentCallback={handleNewSubCommentCallback}
                                        handleDeleteMainCommentCallback={handleDeleteMainCommentCallback}
                                        handleDeleteSubCommentCallback={handleDeleteSubCommentCallback}
                                        parentId = {data.id}
                                    />
                                </li>
                            ))}

                            {nextLoading ||
                                (totalPages !== page && (
                                    <Button
                                        variant='ghost'
                                        onClick={onLoadMore}>
                                        Show more replies
                                    </Button>
                                ))}

                            {nextLoading && <Spinner />}
                        </ul>
                    )}
                </VStack>
            )}
        </li>
    )
})

export default CommentItem
