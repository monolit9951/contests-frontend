import { FC } from "react";
import WinnerSelectors from "../winnersSelectors/winnerSelectors";
import WinnerWork from "../winnerWork/winnerWork";
import { Button } from "shared/ui/button";
import { Work } from "entities/work";
import { Contest } from "entities/contest";
import { useGetRequest } from "shared/lib/hooks/useGetRequest";
import { getRuledWorks } from "../../model/services/contestService";

interface Props {
    contest: Contest
}



const OwnerDecisionPanel: FC<Props> = ({contest}) =>{

    const {data: works, isLoaded: worksIsLoaded} = useGetRequest({fetchFunc: () => getRuledWorks(String(contest.id), 0), key: [], enabled: true})

    // отловить значение селектора (все ворки / победители)
    const chooseSelectorCallback = (key: string) => {
        console.log(key)
        // switch (key){
        //     case 'allWorks':
        //         setWorksData(works.content)
        //         setWorksPage(0)
        //         break
        //     case 'winWorks':
        //         setWinnersKey(winnersKey + 1)
        //         setWorksData(winners.content)
        //         break
        //     default:
        //         break
        // }
    }

    return(
        <div className="ownerDecosonPanel">
            <div className="chooseWinnerPage_selectors">
                    <WinnerSelectors chooseSelectorCallback = {chooseSelectorCallback}/>
                </div>

                <div className="winnersList">
                    {worksIsLoaded && works.content?.map((data: Work, index: number) => (
                        <WinnerWork isWin work = {data} key={index} />
                    ))}
                </div>

                <div className="chooseWinnerPage_paginationBtn">
                    <Button variant="primary" >Load more</Button>
                </div>
        </div>
    )
}

export default OwnerDecisionPanel