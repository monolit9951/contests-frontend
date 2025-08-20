import { FC } from "react";
import commentStat from 'shared/assets/icons/commentStat.svg'
import likeStat from 'shared/assets/icons/likeStat.svg'
import mediaStat from 'shared/assets/icons/mediaStat.svg'
import peopleStat from 'shared/assets/icons/statPeople.svg'

import './profileStatisticsStats.scss'

interface Props {
    statistics: any
}


const ProfileStatisticsStats: FC<Props> = ({statistics}) => {

    console.log(statistics)
    
    return(
        <div className="profileStatisticsStats">
            <div className="profileStatisticsStats_grid">

                <div className="profileStatisticsStats_card">
                    <div className="profileStatisticsStats_card_container">
                        <div className="profileStatisticsStats_card_svg">
                            <img src={peopleStat} alt="stat" />
                        </div>

                        <div className="profileStatisticsStats_card_right">
                            <span>{statistics.contestsCreated}</span>
                            <span>Created</span>
                        </div>
                    </div>
                </div>

                <div className="profileStatisticsStats_card">
                    <div className="profileStatisticsStats_card_container">

                        <div className="profileStatisticsStats_card_svg">
                            <img src={commentStat} alt="stat" />
                        </div>

                        <div className="profileStatisticsStats_card_right">
                            <span>{statistics.commentsTotal}</span>
                            <span>Comments</span>
                        </div>
                        
                    </div>
                </div>

                <div className="profileStatisticsStats_card">
                    <div className="profileStatisticsStats_card_container">
                        <div className="profileStatisticsStats_card_svg">
                            <img src={mediaStat} alt="stat" />
                        </div>

                        <div className="profileStatisticsStats_card_right">
                            <span>{statistics.mediaTotal}</span>
                            <span>Media</span>
                        </div>
                    </div>
                </div>

                <div className="profileStatisticsStats_card">
                    <div className="profileStatisticsStats_card_container">
                        <div className="profileStatisticsStats_card_svg">
                            <img src={likeStat} alt="stat" />
                        </div>

                        <div className="profileStatisticsStats_card_right">
                            <span>{statistics.totalLikesGiven}</span>
                            <span>Reactions</span>
                        </div>
                    </div>
                </div>

            </div>

            <div className="profileStatisticsStats_additional">
                <ul className="profileStatisticsStats_additional_column">
                    <li>Total Likes <span>{statistics.totalLikesReceived}</span></li>
                    <li>Total Dislikes <span>{statistics.totalDislikesReceived}</span></li>
                    <li>Work Likes <span>{statistics.workLikesReceived}</span></li>
                </ul>

                <ul className="profileStatisticsStats_additional_column">
                    <li>Total Likes <span>{statistics.totalLikesReceived}</span></li>
                    <li>Total Dislikes <span>{statistics.totalDislikesReceived}</span></li>
                    <li>Work Likes <span>{statistics.workLikesReceived}</span></li>
                </ul>
            </div>
        </div>
    )
}

export default ProfileStatisticsStats