import Skeleton from 'react-loading-skeleton'
import clsx from 'clsx'

interface Props {
    media: boolean
}

const WorkCardSkeleton = ({ media }: Props) => {
    return (
        <div
            className={clsx(
                'work-card-skeleton',
                media ? 'media-work' : 'text-work'
            )}>
            {media ? (
                <Skeleton borderRadius={24} />
            ) : (
                <>
                    <div className='user-box'>
                        <Skeleton
                            width={40}
                            height={40}
                            circle
                            className='user-img'
                        />
                        <div>
                            <Skeleton height={40} width='100%' />
                        </div>
                    </div>
                    <Skeleton count={6} />
                    <Skeleton height={40} />
                </>
            )}
        </div>
    )
}

export default WorkCardSkeleton
