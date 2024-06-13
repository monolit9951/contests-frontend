import { forwardRef, useState } from 'react'
import clsx from 'clsx'
import { Comment, CommentEl } from 'entities/comment'
import instance from 'shared/api/api'
import caretRight from 'shared/assets/icons/caretRight.svg?react'
import { Button } from 'shared/ui/button'
import { Icon } from 'shared/ui/icon'
import { VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

interface Props {
    data: Comment
}

const CommentItem = forwardRef<HTMLLIElement, Props>((props, ref) => {
    const { data } = props

    const [repliesShown, setRepliesShown] = useState(false)
    const [repliesNum, setRepliesNum] = useState(
        data.subCommentsAmount ? data.subCommentsAmount : 0
    )
    const [subComments, setSubComments] = useState<Comment[]>([])
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [nextLoading, setNextLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    const params = `pageSize=8&sortDirection=ASC&parentId=${data.id}`

    const onRepliesClick = async () => {
        setRepliesShown(!repliesShown)

        if (subComments.length) {
            return
        }

        try {
            setLoading(true)

            const response = await instance.get(`comment?page=0&${params}`)

            setSubComments((prev) => [...prev, ...response.data.content])
            setTotalPages(response.data.totalPages)
        } catch (err) {
            setError(err as Error)
        } finally {
            setLoading(false)
        }
    }

    const onLoadMore = async () => {
        try {
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

    return (
        <li ref={ref}>
            <CommentEl
                data={data}
                setRepliesShown={setRepliesShown}
                setRepliesNum={setRepliesNum}
                setTotalPages={setTotalPages}
                setSubComments={setSubComments}
                setNextLoading={setNextLoading}
                setError={setError}
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

                    {loading && <p>Loading...</p>}

                    {error && <p>{error.message}</p>}

                    {repliesShown && !loading && (
                        <ul className='subcomments-list'>
                            {subComments.map((item) => (
                                <li>
                                    <CommentEl
                                        data={item}
                                        setRepliesShown={setRepliesShown}
                                        setRepliesNum={setRepliesNum}
                                        setTotalPages={setTotalPages}
                                        setSubComments={setSubComments}
                                        setNextLoading={setNextLoading}
                                        setError={setError}
                                    />
                                </li>
                            ))}

                            {nextLoading ||
                                loading ||
                                (totalPages !== page && (
                                    <Button
                                        variant='ghost'
                                        onClick={onLoadMore}>
                                        Show more replies
                                    </Button>
                                ))}

                            {nextLoading && <p>Loading next...</p>}
                        </ul>
                    )}
                </VStack>
            )}
        </li>
    )
})

export default CommentItem
