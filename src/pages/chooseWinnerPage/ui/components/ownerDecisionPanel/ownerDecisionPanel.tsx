import { FC, useState } from "react";
import { Contest } from "entities/contest";
import { Prize } from "entities/prize";
import { Work } from "entities/work";
import { useGetRequest } from "shared/lib/hooks/useGetRequest";
import { Button } from "shared/ui/button";

import { getPossibleWinners, getRuledWorks } from "../../model/services/contestService";
import WinnerSelectors from "../winnersSelectors/winnerSelectors";
import WinnerWork from "../winnerWork/winnerWork";

import './ownerDecisionPanel.scss'

interface Props {
    contest: Contest
}



const OwnerDecisionPanel: FC<Props> = ({contest}) =>{

    const [worksKey, setWorksKey] = useState<number>(0)
    const [winnersKey, setWinnersKey] = useState<number>(0)
    const [currentFilter, setCurrentFilter] = useState<string>('allWorks')

    // eslint-disable-next-line
    // const [currentPage, setCurrentPage] = useState<number>(0)

    const {data: works, isLoaded: worksIsLoaded} = useGetRequest({fetchFunc: () => getRuledWorks((contest.id)), key: [worksKey], enabled: true})
    const {data: winners, isLoaded: winnersLoaded} = useGetRequest({fetchFunc: () => getPossibleWinners(contest.id), key: [winnersKey], enabled: true})

    const options = [
    ...contest.prizes.map((prize: Prize) => ({
        text: `Place №${prize.place}`,
        key: prize.id,
    })),
    { text: 'Empty', key: 'Empty' }
    ];



    console.log(options)

    // отловить значение селектора (все ворки / победители)
    const chooseSelectorCallback = (key: string) => {

        switch (key){
            case 'allWorks':
                setWorksKey(worksKey + 1)
                setCurrentFilter(key)
                break
            case 'winWorks':
                setWinnersKey(winnersKey + 1)
                setCurrentFilter(key)
                break
            default:
                break
        }
    }


    return(
        <div className="ownerDecosonPanel">
            <div className="chooseWinnerPage_selectors">
                    <WinnerSelectors chooseSelectorCallback = {chooseSelectorCallback}/>
                </div>

                <div className="winnersList">
                    {currentFilter === 'allWorks' && worksIsLoaded && works.content.map((data: Work, index: number) => (
                        <WinnerWork isWin work = {data} key={index} options = {options} />
                    ))}
                    {currentFilter === 'winWorks' && winnersLoaded && winners.map((data: Work, index: number) => (
                        <WinnerWork isWin work = {data} key={index} options = {options} />
                    ))}
                </div>

                <div className="chooseWinnerPage_paginationBtn">
                    <Button variant="primary" >Load more</Button>
                </div>
        </div>
    )
}

export default OwnerDecisionPanel