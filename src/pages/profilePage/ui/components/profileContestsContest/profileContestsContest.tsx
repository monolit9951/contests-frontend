import { FC } from "react";
import './profileContestsContest.scss'
import calendar from 'shared/assets/icons/calendar.svg'

interface ProfileContestsContestInterface {
    data: any
}

const ProfileContestsContest: FC <ProfileContestsContestInterface>= ({data}) => {
    return(
        <div className="profileContest">
            <div className="profileContest_leftGroup">
                <div className="profileContest_leftGroup_header">
                    <div className="profileContest_leftGroup_heading">{data.name}</div>

                    {data.prizes && data.prizes.length > 0 && <div className="profileContest_rightGroup">
                        <div className="profileContest_rightGroup_desc">Prize</div>
                        <div className="profileContest_rightGroup_value">{data.prizes[0].prizeType === 'MONEY'? `${data.prizes[0].prizeAmount}$` : data.prizes[0].prizeText}</div>
                    </div>}
                </div>

                <ul className="profileContest_leftGroup_tagList">
                    {data.status && <li><span>{data.status}</span></li>}
                    {data.subcategory && <li><span>{data.subcategory}</span></li>}
                </ul>

                <div className="profileContest_leftGroup_date">
                    <img src={calendar} alt="calendar" />
                    <span>{data.dateStart.split("T")[0]}</span>
                </div>
            </div>

            {data.prizes && data.prizes.length > 0 && <div className="profileContest_rightGroup">
                <div className="profileContest_rightGroup_desc">Prize</div>
                <div className="profileContest_rightGroup_value">{data.prizes[0].prizeType === 'MONEY'? `${data.prizes[0].prizeAmount}$` : data.prizes[0].prizeText}</div>
            </div>}
        </div>
    )
}

export default ProfileContestsContest