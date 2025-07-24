import { FC, useEffect, useState } from "react";
import WinnerSelectors from "../winnersSelectors/winnerSelectors";
import WinnerWork from "../winnerWork/winnerWork";
import { Button } from "shared/ui/button";
import { Work } from "entities/work";
import { Contest } from "entities/contest";
import { useGetRequest } from "shared/lib/hooks/useGetRequest";
import { getPossibleWinners, getRuledWorks } from "../../model/services/contestService";
import './ownerDecisionPanel.scss'
import { Prize } from "entities/prize";
interface Props {
    contest: Contest
}



const OwnerDecisionPanel: FC<Props> = ({contest}) =>{

    const [worksData, setWorksData] = useState<Work[] | null>(null)

    const [worksKey, setWorksKey] = useState<number>(0)
    const [winnersKey, setWinnersKey] = useState<number>(0)

    const [currentPage, setCurrentPage] = useState<number>(0)

    const {data: works, isLoaded: worksIsLoaded} = useGetRequest({fetchFunc: () => getRuledWorks((contest.id), currentPage), key: [worksKey], enabled: true})
    const {data: winners, isLoaded: winnersLoaded} = useGetRequest({fetchFunc: () => getPossibleWinners(contest.id), key: [winnersKey], enabled: true})

    console.log(contest.prizes)

    const options = contest.prizes.map((prize: Prize) => ({
        text: `Place №${prize.place}` ,
        key: prize.id,
    }));

    // отловить значение селектора (все ворки / победители)
    const chooseSelectorCallback = (key: string) => {

        switch (key){
            case 'allWorks':
                setWorksKey(worksKey + 1)
                setWorksData(works.content)
                break
            case 'winWorks':
                setWinnersKey(winnersKey + 1)
                setWorksData(winners.content)
                break
            default:
                break
        }
    }

    useEffect(() => {
        if (worksIsLoaded){
            setWorksData(works.content)
        }
    }, [worksIsLoaded])

    const handleLoadMore = async () => {
        console.log('next works')
    };


    console.log(works)

    return(
        <div className="ownerDecosonPanel">
            <div className="chooseWinnerPage_selectors">
                    <WinnerSelectors chooseSelectorCallback = {chooseSelectorCallback}/>
                </div>

                <div className="winnersList">
                    {worksIsLoaded && worksData?.map((data: Work, index: number) => (
                        <WinnerWork isWin work = {data} key={index} options = {options} />
                    ))}
                </div>

                <div className="chooseWinnerPage_paginationBtn">
                    <Button variant="primary" onClick={handleLoadMore}>Load more</Button>
                </div>
        </div>
    )
}

export default OwnerDecisionPanel