import { FC } from "react";
import './profileContestsContest.scss'
import calendar from 'shared/assets/icons/calendar.svg'
const ProfileContestsContest: FC = () => {
    return(
        <div className="profileContest">
            <div className="profileContest_leftGroup">
                <div className="profileContest_leftGroup_heading">Tickle Olympics: Where Laughter Takes the Gold!</div>

                <ul className="profileContest_leftGroup_tagList">
                    <li>Active</li>
                    <li>Winner</li>
                </ul>

                <div className="profileContest_leftGroup_date">
                    <img src={calendar} alt="calendar" />
                    <span>2025-06-23</span>
                </div>
            </div>

            <div className="profileContest_rightGroup">
                <div className="profileContest_rightGroup_desc">Prize</div>
                <div className="profileContest_rightGroup_value">$ 500</div>
            </div>
        </div>
    )
}

export default ProfileContestsContest