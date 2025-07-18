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
    const {data: winners, isLoaded: winnersIsLoaded} = useGetRequest({fetchFunc: () => getPossibleWinners(String(id)), key: [winnersKey], enabled: winnerEnabled})


    const [contestAccess, setContestAccess] = useState<boolean>(false)
    const [contestAccessPending, setContestAccessPending] = useState<boolean>(true)

    const user = useSelector((state: RootState) => state.user)

    const navigate = useNavigate()

    useEffect(() => {
        // contest loading
        if(!contestIsLoading){
            console.log('loaded')

            // if there is winners already
            if(contest?.winners === null){
             // if role is not admin or creator is not logined user
                if (user.role !== "ADMIN" && contest?.contestOwner.id !== user.userId){
                    setContestAccess(false)
                    setContestAccessPending(false)
                    alert('Access denied, you are not the contest creator')
                    navigate(`/contests/${id}`)
                } else {
                    setContestAccess(true)
                    setContestAccessPending(false)
                    setWorksEnabled(true)
                    setWinnersEnabled(true)
                    setWorksKey(worksKey + 1)
                    setWinnersKey( winnersKey + 1)
                }
            }  else {
                setContestAccess(false)
                setContestAccessPending(false)
                alert('ACCESS DENIED, ALREADY GOT WINNERS')
                navigate(`/contests/${id}`)
            }
        }
    }, [contestIsLoading])

    return(
        <>
            {contestAccessPending && <div>LOADER</div>}
            {!contestAccessPending && contestAccess && <div className="chooseWinnerPage">
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
        </>
    )
}

export default ChooseWinnerPage