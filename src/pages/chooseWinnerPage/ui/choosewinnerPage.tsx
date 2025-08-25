import { FC, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
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
            if (!(contest?.contestOwner.id === user.userId || user.userRole === 'ADMIN')){
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
                case 'REVIEW':
                    if(user.userRole === 'admin'){
                        setContestAccess(true)
                        setContestAccessPending(false)
                    } else {
                        showAlert('access denied', 'MODERATOR SELECTION, YOUR ROLE != ADMIN')
                        navigate(`/contests/${id}`)
                    }
                    break
                case "ACTIVE":
                    setContestAccess(true)
                    setContestAccessPending(false)
                    break                    
                case 'UPCOMING':
                    showAlert('access denied', 'CONTEST NOT STARTED')
                    navigate(`/contests/${id}`)
                    break
                case 'FINISHED':
                    showAlert('access denied', 'CONTEST ALREADY FINISHED')
                    navigate(`/contests/${id}`)
                    break
                default:
                    showAlert('access denied')
                    navigate(`/contests/${id}`)
            }

        }
    }, [contestIsLoading])

    
    return(
        <>
        <Helmet>
            <title>DareBay | Choose winner</title>
            <meta property="og:title" content='Choose winner page' />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={window.location.href} />
            <meta name="description"  content='DareBay Contest winner selection' />
            <meta property="og:description" content='DareBay Contest winner selection' />
        </Helmet>
        
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

                    <Button variant='primary' type="button">Get random work</Button>

                    {/* По нажатию на кнопку, будет появляться рандомная работа, можно будет просмотреть её превью
                    (как модалку) и затем выбрать её как победителя. либо сгенирировать заново (до 3х раз). После чего
                    можно будет утвердить победителя (или победителей) */}
            </div>}

            <Alert />
        </>
    )
}

export default ChooseWinnerPage