import { FC } from "react";
import commentStat from 'shared/assets/icons/commentStat.svg'
import likeStat from 'shared/assets/icons/likeStat.svg'
import mediaStat from 'shared/assets/icons/mediaStat.svg'
import peopleStat from 'shared/assets/icons/statPeople.svg'

import './profileStatisticsStats.scss'

const ProfileStatisticsStats: FC = () => {
    return(
        <div className="profileStatisticsStats">
            <div className="profileStatisticsStats_grid">

                <div className="profileStatisticsStats_card">
                    <div className="profileStatisticsStats_card_container">
                        <img src={peopleStat} alt="stat" />

                        <div className="profileStatisticsStats_card_right">
                            <span>911</span>
                            <span>Created</span>
                        </div>
                    </div>
                </div>

                <div className="profileStatisticsStats_card">
                    <div className="profileStatisticsStats_card_container">
                        <img src={commentStat} alt="stat" />

                        <div className="profileStatisticsStats_card_right">
                            <span>228</span>
                            <span>Comments</span>
                        </div>
                    </div>
                </div>

                <div className="profileStatisticsStats_card">
                    <div className="profileStatisticsStats_card_container">
                        <img src={mediaStat} alt="stat" />

                        <div className="profileStatisticsStats_card_right">
                            <span>69</span>
                            <span>Media</span>
                        </div>
                    </div>
                </div>

                <div className="profileStatisticsStats_card">
                    <div className="profileStatisticsStats_card_container">
                        <img src={likeStat} alt="stat" />

                        <div className="profileStatisticsStats_card_right">
                            <span>1488</span>
                            <span>Reactions</span>
                        </div>
                    </div>
                </div>

            </div>

            <div className="profileStatisticsStats_additional">
                <ul className="profileStatisticsStats_additional_column">
                    <li>Total Likes <span>222</span></li>
                    <li>Total Dislikes <span>222</span></li>
                    <li>Work Likes <span>222</span></li>
                </ul>

                <ul className="profileStatisticsStats_additional_column">
                    <li>Total Likes <span>222</span></li>
                    <li>Total Dislikes <span>222</span></li>
                    <li>Work Likes <span>222</span></li>
                </ul>
            </div>
        </div>
    )
}

export default ProfileStatisticsStats