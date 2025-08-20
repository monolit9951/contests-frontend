import { FC } from "react";

import ProfileDiagram from "../profileDiagram/profileDiagram";
import ProfileStatisticsStats from "../profileStatisticsStats/profileStatisticsStats";

import './profileStatistics.scss'
import { useGetRequest } from "shared/lib/hooks/useGetRequest";
import { fetchUserStatistic } from "../../model/sevices/statisticServices";
import Spinner from "shared/ui/spinner";

interface Props {
    userId: string
}

const ProfileStatistics: FC<Props> = ({userId}) => {
    
    const {data: statistics, isLoaded: statisticsLoaded} = useGetRequest({fetchFunc: () => fetchUserStatistic(userId), enabled: true, key: []})
    
    return(        

        <div className="profileStatistics">
            
            <div className="profileStatistics_heading">Activity Overview</div>


            {statisticsLoaded? <div className="profileStatistics_container">
                <ProfileDiagram statistics={statistics}/>

                <ProfileStatisticsStats statistics={statistics}/>
            </div> 
            :
            <Spinner center />}
        </div>
    )
}

export default ProfileStatistics