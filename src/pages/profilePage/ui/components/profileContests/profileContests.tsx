import { FC, useState } from "react";
import './profileContests.scss'
import win from 'shared/assets/icons/win.svg'
import ProfileContestsContest from "../profileContestsContest/profileContestsContest";

const ProfileContests: FC = () => {

    const [contestType, setContestType] = useState<string>('All')

    // логика всех контестов
    const handleAllContests = () => {
        setContestType('All')
        console.log('switched to All')
    }

    const handleParticipatingContests = () => {
        setContestType('Participating')
        console.log('switched to Participating')
    }

    const handleWinningContests = () => {
        setContestType('Winning')
        console.log('switched to Winning')
    }

    const handleOrganizingContests = () => {
        setContestType('Organizing')
        console.log('switched to Organizing')
    }

    return(
        <div className="profileContests">
            <div className="profileContests_header">
                <div className="profileContests_header_heading">
                    <span>Contests</span>
                    <img src={win} alt="win" />
                </div>

                <div className="profileContests_header_desc">Manage your profile, wallet and contents</div>
            </div>

        <ul className="profileContests_switch">
            <li><button onClick={handleAllContests} className={contestType === 'All' ? 'switched' : ''}>All</button></li>
            <li><button onClick={handleParticipatingContests} className={contestType === 'Participating' ? 'switched' : ''}>Participating</button></li>
            <li><button onClick={handleWinningContests} className={contestType === 'Winning' ? 'switched' : ''}>Winning</button></li>
            <li><button onClick={handleOrganizingContests} className={contestType === 'Organizing' ? 'switched' : ''}>Organizing</button></li>
        </ul>

        <div className="profileContests_contestsList">
            <ProfileContestsContest />
            <ProfileContestsContest />
            <ProfileContestsContest />
            <ProfileContestsContest />
            <ProfileContestsContest />
        </div>

        </div>
    )
}

export default ProfileContests