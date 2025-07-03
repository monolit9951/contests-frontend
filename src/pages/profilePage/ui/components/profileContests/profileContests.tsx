import { FC, useEffect, useState } from "react";
import './profileContests.scss'
import win from 'shared/assets/icons/win.svg'
import ProfileContestsContest from "../profileContestsContest/profileContestsContest";
import { useGetRequest } from "shared/lib/hooks/useGetRequest";
import { fetchAllContests, fetchProfileContests } from "../../model/sevices/contestServices";

const ProfileContests: FC = () => {

    const userId = '68665fe42ee7c1049206afb4'

    const [contestsEnabled, setContestsEnabled] = useState<boolean>(true)
    const [contestsKey, setContestsKey] = useState<number>(1)
    const [extraPath, setExtraPath] = useState<string>('user-all')

    const {data: contests, isLoaded: contestsLoaded} = useGetRequest({fetchFunc: () => fetchProfileContests(extraPath, userId),  enabled: contestsEnabled, key: [contestsKey]})

    const [contestType, setContestType] = useState<string>('All')


    useEffect(() => {
        if (contestsLoaded){
            console.log(contests)
        }
    }, [contests, contestsLoaded])

    // логика всех контестов
    const handleAllContests = () => {
        setContestType('All')
        setExtraPath('user-all')
        setContestsKey(contestsKey + 1)
    }

    const handleParticipatingContests = () => {
        setContestType('Participating')
        setExtraPath('user-participant')
        setContestsKey(contestsKey + 1)
    }

    const handleWinningContests = () => {
        setContestType('Winning')
        setExtraPath('user-all')
        setContestsKey(contestsKey + 1)
    }

    const handleOrganizingContests = () => {
        setContestType('Organizing')
        setExtraPath('user-owned')
        setContestsKey(contestsKey + 1)
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
            <li><button onClick={handleAllContests} type = "button" className={contestType === 'All' ? 'switched' : ''}>All</button></li>
            <li><button onClick={handleParticipatingContests} type = "button" className={contestType === 'Participating' ? 'switched' : ''}>Participating</button></li>
            <li><button onClick={handleWinningContests} type = "button" className={contestType === 'Winning' ? 'switched' : ''}>Winning</button></li>
            <li><button onClick={handleOrganizingContests} type = "button" className={contestType === 'Organizing' ? 'switched' : ''}>Organizing</button></li>
        </ul>

        <div className="profileContests_contestsList">
        {contestsLoaded && contests.content.map((data, index) => (
                <ProfileContestsContest key={index} data={data}/>
            ))}    
        </div>

        </div>
    )
}

export default ProfileContests