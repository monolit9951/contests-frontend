import Skeleton from "react-loading-skeleton"

import './feedWorkSkeleton.scss'

const FeedWorkSkeleton = () =>{
    return(
        <div className="feedWorkSkeleton">
            <div className="feedWorkSkeleton_profile">
                <Skeleton width={50} height={50} borderRadius={25}/>

                <div className="feedWorkSkeleton_profile_info">
                    <Skeleton width={200} height={23} />
                    <Skeleton width={100} height={23} />
                </div>
            </div>
            
            <Skeleton height={612} borderRadius={24} className="feedWorkSkeleton_media"/>
        </div>
    )
}

export default FeedWorkSkeleton