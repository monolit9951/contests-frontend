import { FC } from "react";

import ProfileDiagram from "../profileDiagram/profileDiagram";
import ProfileStatisticsStats from "../profileStatisticsStats/profileStatisticsStats";

import './profileStatistics.scss'

const ProfileStatistics: FC = () => {
    return(
        <div className="profileStatistics">
            <div className="profileStatistics_heading">Activity Overview</div>


            <div className="profileStatistics_container">
                <ProfileDiagram />

                <ProfileStatisticsStats />
            </div>
        </div>
    )
}

export default ProfileStatistics