import { FC, useState } from "react";
import { Contest } from "entities/contest";
import win from 'shared/assets/icons/win.svg'
import { useGetRequest } from "shared/lib/hooks/useGetRequest";
import { Button } from "shared/ui/button";

import { fetchProfileContests } from "../../model/sevices/contestServices";
import ProfileContestsContest from "../profileContestsContest/profileContestsContest";

import './profileContests.scss'

interface ProfileContestsInterface {
    userId: string
}

const ProfileContests: FC <ProfileContestsInterface> = ({userId}) => {

    const [contestsKey, setContestsKey] = useState<number>(1)
    const [extraPath, setExtraPath] = useState<string>('user-all')
    const [listPage, setListPage] = useState<number>(0)
    const {data: contests, isLoaded: contestsLoaded} = useGetRequest({fetchFunc: () => fetchProfileContests(extraPath, userId),  enabled: true, key: [contestsKey]})

    const [contestType, setContestType] = useState<string>('All')

    // логика отображения контестов
    const handleAllContests = () => {
        setListPage(0)
        setContestType('All')
        setExtraPath('user-all')
        setContestsKey(contestsKey + 1)
    }

    const handleParticipatingContests = () => {
        setListPage(0)
        setContestType('Participating')
        setExtraPath('user-participant')
        setContestsKey(contestsKey + 1)
    }

    const handleWinningContests = () => {
        setListPage(0)
        setContestType('Winning')
        setExtraPath('user-winner')
        setContestsKey(contestsKey + 1)
    }

    const handleOrganizingContests = () => {
        setListPage(0)
        setContestType('Organizing')
        setExtraPath('user-owned')
        setContestsKey(contestsKey + 1)
    }

    
    // пагинация по нажатию
    const handleMore = () => {
        setListPage(listPage + 1)
        setContestsKey(contestsKey + 1)
    }

    if (typeof contests === 'string') {
    return <div>Error: {contests}</div>
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
                {contestsLoaded && contests?.content.map((data: Contest, index: number) => (
                    <ProfileContestsContest key={index} data={data}/>
                ))}    
            </div>

            <div className="profileContests_showMore">
                <Button variant="secondary" type="button" onClick={handleMore}>More</Button>
            </div>
        </div>
    )
}

export default ProfileContests