import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Contest } from "entities/contest";
import { useAlert } from "shared/lib/hooks/useAlert/useAlert";
import useAxios from "shared/lib/hooks/useAxios";
import { Button } from "shared/ui/button";

import OwnerDecisionPanel from "./components/ownerDecisionPanel/ownerDecisionPanel";
import PrizeList from "./components/prizeList/prizeList";

import './chooseWinnerPage.scss'

// добавить параметр контестАйди
const ChooseWinnerPage: FC = () => {

    const {id} = useParams()

    const { data: contest, isLoading: contestIsLoading} = useAxios<Contest>(`contests/${id}`)

    const {showAlert, Alert} = useAlert()

    const [contestAccess, setContestAccess] = useState<boolean>(false)
    const [contestAccessPending, setContestAccessPending] = useState<boolean>(true)

    const user = useSelector((state: RootState) => state.user)

    const navigate = useNavigate()

    // защита при рендере страницы
    useEffect(() => {
        if(!contestIsLoading){

            // если зашёл не создатель или не админ
            if (!(contest?.contestOwner.id === user.userId || user.userRole === 'admin')){
                showAlert('ACCESS DENIED (you are not creator or admin)')
                navigate(`/contests/${id}`)
                return
            }

            // в зависимости от статуса позволять проход дальше
            switch (contest?.status) {
                case 'SELECTION_IN_PROGRESS':
                    setContestAccess(true)
                    setContestAccessPending(false)
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
                    } else {
                        showAlert('MODERATOR SELECTION, YOUR ROLE != ADMIN')
                        navigate(`/contests/${id}`)
                    }
                    break
                case "ACTIVE":
                    setContestAccess(true)
                    setContestAccessPending(false)
                    break                    
                case 'UPCOMING':
                    showAlert('CONTEST NOT STARTED')
                    navigate(`/contests/${id}`)
                    break
                case 'FINISHED':
                    showAlert('CONTEST ALREADY FINISHED')
                    navigate(`/contests/${id}`)
                    break
                default:
                    showAlert('default')
                    navigate(`/contests/${id}`)
            }

        }
    }, [contestIsLoading])

    
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


                <PrizeList prizes={contest.prizes}/>

                {/* {winners && <CurrentWinners winners ={winners.content}/>} */}
                
                {contest.selectionType === "CREATOR_DECISION" && <OwnerDecisionPanel contest = {contest}/>}
            </div>}

            {!contestAccessPending && contestAccess && contest?.selectionType === 'RANDOM' &&<div className="chooseWinnerPage_random">
                    <h3>RANDOM WINNER (не реализовано)</h3>

                    <Button variant='primary' type="button" onClick={getRandomWork}>Get random work</Button>

                    {/* По нажатию на кнопку, будет появляться рандомная работа, можно будет просмотреть её превью
                    (как модалку) и затем выбрать её как победителя. либо сгенирировать занов (до 3х раз). После чего
                    можно будет утвердить победителя (или победителей) */}
            </div>}

            <Alert />
        </>
    )
}

export default ChooseWinnerPage