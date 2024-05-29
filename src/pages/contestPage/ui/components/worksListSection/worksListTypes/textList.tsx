import { FC } from 'react'
import { WorkCard } from 'entities/work'
import { Button } from 'shared/ui/button'
import { VStack } from 'shared/ui/stack'

interface Props {
    ownerId: string
}

export const TextWorksList: FC<Props> = ({ ownerId }) => {
    const onLoadMore = () => {
        // eslint-disable-next-line no-console
        console.log(ownerId)
    }
    return (
        <VStack className='participants-works__list-wrapper align__center '>
            <ul className='participants-works__list'>
                <WorkCard isText />
                <WorkCard isText />
                <WorkCard isText />
                <WorkCard isText />
                <WorkCard isText />
                <WorkCard isText />
                <WorkCard isText />
                <WorkCard isText />
                <WorkCard isText />
            </ul>

            <Button variant='secondary' onClick={onLoadMore}>
                See more works
            </Button>
        </VStack>
    )
}
