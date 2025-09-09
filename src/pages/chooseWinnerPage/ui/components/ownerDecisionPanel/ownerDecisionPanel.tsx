import { FC, useState } from "react";
import { Contest } from "entities/contest";
import { Prize } from "entities/prize";
import { Work } from "entities/work";
import instance from "shared/api/api";
import { useAlert } from "shared/lib/hooks/useAlert/useAlert";
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
    const {showAlert, Alert} = useAlert()
    // eslint-disable-next-line
    // const [currentPage, setCurrentPage] = useState<number>(0)

    const {data: works} = useGetRequest({fetchFunc: () => getRuledWorks((contest.id), 0, 3), key: [worksKey], enabled: true})
    const {data: winners} = useGetRequest({fetchFunc: () => getPossibleWinners((contest.id), 0, 3), key: [winnersKey], enabled: true})

    // создаём опции
    const options = [
    ...contest.prizes.map((prize: Prize) => ({
        label: `Place №${prize.place}`,
        value: prize.id,
    }))]

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

    // const handleLoadMore = () => {
    //     console.log('loadMore')
    // }

    const handleFinalSubmit = async () => {
        try{
            const token = localStorage.getItem('userToken')
            const headers = token ? { Authorization: `Bearer ${token}` } : {};

            await instance.post(`/winners/confirm/${contest.id}}`, null, {headers})

            showAlert('SUCCESS', "WINNERS CONFIRMED")
        
        } catch (error) {
            showAlert("ERROR", "CANNOT CONFIRM WINNERS")
        }
    }
    
    return(
        <div className="ownerDecosonPanel">
            <div className="chooseWinnerPage_selectors">
                <WinnerSelectors chooseSelectorCallback = {chooseSelectorCallback}/>
            </div>

            <div className="winnersList">
                {currentFilter === 'allWorks' && works?.content?.map((data: Work, index: number) => (
                    <WinnerWork work = {data} key={index} options = {options} />
                ))}
                {currentFilter === 'winWorks' && winners?.map((data: Work, index: number) => (
                    <WinnerWork work = {data} key={index} options = {options} />
                ))}
                
                {currentFilter === 'winWorks' && 
                    <div className="chooseWinnerPage_paginationBtn">
                        <Button type="button" variant="primary" onClick={handleFinalSubmit}>Final Submit</Button>
                    </div>
                }
            </div>

            <div className="chooseWinnerPage_paginationBtn">
                <Button variant="primary" type="button">Load more</Button>
            </div>
            
            <Alert />
        </div>
    )
}

export default OwnerDecisionPanel