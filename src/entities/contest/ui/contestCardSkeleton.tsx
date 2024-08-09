import Skeleton from 'react-loading-skeleton'

const ContestCardSkeleton = () => {
    return (
        <div className='contest-card-skeleton contest-card-wrapper'>
            <div className='user-box'>
                <Skeleton width={44} height={44} circle className='user-img' />
                <div>
                    <Skeleton height={44} width='100%' />
                </div>
            </div>
            <div>
                <Skeleton width={377} height={212} className='image' />
            </div>
            <div className='contest-title-box'>
                <Skeleton className='contest-title' />
                <Skeleton className='contest-title' />
            </div>
            <div>
                <Skeleton height={40} />
            </div>
        </div>
    )
}

export default ContestCardSkeleton
