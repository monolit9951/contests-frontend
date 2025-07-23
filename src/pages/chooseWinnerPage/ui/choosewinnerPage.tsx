import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Contest } from "entities/contest";
import { Work } from "entities/work";
import useAxios from "shared/lib/hooks/useAxios";
import { useGetRequest } from "shared/lib/hooks/useGetRequest";
import { Button } from "shared/ui/button";

import CurrentWinners from "./components/currentWinners/currentWinners";
import WinnerSelectors from "./components/winnersSelectors/winnerSelectors";
import WinnerWork from "./components/winnerWork/winnerWork";
import { getPossibleWinners, getRuledWorks } from "./model/services/contestService";

import './chooseWinnerPage.scss'
import { useSelector } from "react-redux";

// добавить параметр контестАйди
const ChooseWinnerPage: FC = () => {

    const {id} = useParams()

    const [worksKey, setWorksKey] = useState<number>(0)
    const [winnersKey, setWinnersKey] = useState<number>(0)
    const [worksEnabled, setWorksEnabled] = useState<boolean>(false)
    const [winnerEnabled, setWinnersEnabled] = useState<boolean>(false)


    const { data: contest, isLoading: contestIsLoading} = useAxios<Contest>(`contests/${id}`)
    // const { data: works, isLoading: worksIsLoading} = useAxios<Work[]>(`works/byContestId/${id}`)
    const {data: works, isLoaded: worksIsLoaded} = useGetRequest({fetchFunc: () => getRuledWorks(String(id)), key: [worksKey], enabled: worksEnabled})
    // const {data: winners, isLoaded: winnersIsLoaded} = useGetRequest({fetchFunc: () => getPossibleWinners(String(id)), key: [winnersKey], enabled: winnerEnabled})


    const [contestAccess, setContestAccess] = useState<boolean>(false)
    const [contestAccessPending, setContestAccessPending] = useState<boolean>(true)

    const user = useSelector((state: RootState) => state.user)

    const navigate = useNavigate()

    useEffect(() => {
        if(!contestIsLoading){
            console.log(contest?.contestOwner.id, user.userId)

            // если зашёл не создатель или не админ
            if (!(contest?.contestOwner.id === user.userId || user.userRole === 'admin')){
                alert('ACCESS DENIED (you are not creator or admin)')
                navigate(`/contests/${id}`)
                return
            }

            console.log(contest?.status)

            switch (contest?.status) {
                case 'SELECTION_IN_PROGRESS':
                    setContestAccess(true)
                    setContestAccessPending(false)
                    setWorksEnabled(true)
                    setWinnersEnabled(true)
                    setWorksKey(worksKey + 1)
                    setWinnersKey( winnersKey + 1)
                    break
                case 'WINNER_CONFIRMATION':
                    setContestAccess(true)
                    setContestAccessPending(false)
                    // ПОКА НЕ ЗНАЮ КАК ЭТО БУДЕТ РЕАЛИЗОВАНО
                    break
                case 'MODERATOR_SELECTION':
                    if(user.userRole === 'admin'){
                        setContestAccess(true)
                        setContestAccessPending(false)
                        setWorksEnabled(true)
                        setWinnersEnabled(true)
                        setWorksKey(worksKey + 1)
                        setWinnersKey( winnersKey + 1)
                    } else {
                        alert('MODERATOR SELECTION, YOUR ROLE != ADMIN')
                        navigate(`/contests/${id}`)
                    }
                    break
                case "ACTIVE":
                    setContestAccess(true)
                    setContestAccessPending(false)
                    setWorksEnabled(true)
                    setWinnersEnabled(true)
                    setWorksKey(worksKey + 1)
                    setWinnersKey( winnersKey + 1)
                    break                    
                case 'UPCOMING':
                    alert('CONTEST NOT STARTED')
                    navigate(`/contests/${id}`)
                    break
                case 'FINISHED':
                    alert('CONTEST ALREADY FINISHED')
                    navigate(`/contests/${id}`)
                    break
                default:
                    alert('default')
                    navigate(`/contests/${id}`)
            }

        }
    }, [contestIsLoading])



    // логика рандомной работы

    const getRandomWork = async() => {
        console.log('Get Random Work')
    }

    return(
        <>
            {contestAccessPending && <div>LOADER</div>}
            {!contestAccessPending && contestAccess && contest?.selectionType === 'CREATOR_DECISION' && <div className="chooseWinnerPage">
                <div className="chooseWinnerPage_header">
                    <div className="chooseWinnerPage_header_left">
                        <div className="chooseWinnerPage_header_heading">Contest Winners Selection</div>
                        <div className="chooseWinnerPage_header_desc">Select winners and assign them places</div>
                    </div>

                    {!contestIsLoading && <div className="chooseWinnerPage_header_right">
                        <ul>
                            <li>{contest?.participantAmount} participants</li>
                            {/* <li>Empty tag</li> */}
                            {/* <li>{contest?.subcategory}</li> */}
                        </ul>
                    </div>}
                </div>

                {/* {winners && <CurrentWinners winners ={winners.content}/>} */}
                
                <div className="chooseWinnerPage_selectors">
                    <WinnerSelectors />
                </div>

                <div className="winnersList">
                    {worksIsLoaded && works?.content?.map((data: Work, index: number) => (
                        <WinnerWork isWin work = {data} key={index} />
                    ))}
                </div>

                <div className="chooseWinnerPage_paginationBtn">
                    <Button variant="primary" >Load more</Button>
                </div>
            </div>}

            {!contestAccessPending && contestAccess && contest?.selectionType === 'RANDOM' &&<div className="chooseWinnerPage_random">
                    <h3>RANDOM WINNER (не реализовано)</h3>

                    <Button variant='primary' type="button" onClick={getRandomWork}>Get random work</Button>

                    {/* По нажатию на кнопку, будет появляться рандомная работа, можно будет просмотреть её превью
                    (как модалку) и затем выбрать её как победителя. либо сгенирировать занов (до 3х раз). После чего
                    можно будет утвердить победителя (или победителей) */}
            </div>}
        </>
    )
}

export default ChooseWinnerPage