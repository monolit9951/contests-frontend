import { FC, useMemo, useState } from "react";
import { Work } from "entities/work";
import moment from "moment";
import instance from "shared/api/api";
import { useAlert } from "shared/lib/hooks/useAlert/useAlert";
import { Button } from "shared/ui/button";
import { ModalWindow } from "shared/ui/modalWindow";
import { Video } from "shared/ui/videoPlayer";
import CustomCheckbox from "widgets/customCheckbox";
import CustomSelector from "widgets/customSelector";
import UserProfileData from "widgets/userProfileData/userProfileData";
import { WorkPreview } from "widgets/worksSection/ui/workPreview/workPreview";

import { optionsType } from "../winnersSelectors/winnerSelectors";

import './winnerWork.scss'

interface WinnerWorkInterface {
    isWin?: boolean
    work: Work
    options: optionsType[]
}



const WinnerWork: FC <WinnerWorkInterface> = ({isWin, work, options}) => {

    const [modalWork, setModalWork] = useState<boolean>(false)
    const [prizeId, setPrizeId] = useState<string>('')
    const [placeError, setPlaceError] = useState<boolean>(false)
    const [isWinner, setIsWinner] = useState<boolean>(work.possibleWinner)
    const {showAlert, Alert} = useAlert()
    const token = localStorage.getItem('userToken')
    const creationDate = moment.utc(work.workAddingDate).local().fromNow();
    const [currentPlace, setCurrentPlace] = useState<string>(work.place)


    // открытие модалки работы
    const handleWorkModal = () => {
        setModalWork(true)
    }

    // добавление и удаление возможного победителя
    const handleCheckbox = async() => {
        if(isWinner){
            // удаляем победителя
            try{
                await instance.delete(`winners/possible/${work.id}`, {headers: {Authorization: `Bearer ${token}`}})
                setIsWinner(false)
                setCurrentPlace('Empty')
            } catch (error){
                showAlert('ERROR', 'CHANGE THAT ERROR')
            }
        } else{
            // добавляем победителя
            try{
                await instance.post(`winners/${work.id}/possible/${prizeId}`, {}, {headers: {Authorization: `Bearer ${token}`}})
                setIsWinner(true)
            } catch (error){
                if(error){
                    setPlaceError(true)
                    showAlert('ERROR', 'CHANGE THAT ERROR')
                }
            }
        }
    }

    // отловить выбор места
    const handlePlaceSelector = (key: string) => {
        setPlaceError(false)
        setPrizeId(key)
    }

    // колбек для очищения селектора

    // МЕМОИЗАЦИЯ ДЛЯ ПРЕДОТВРАЩЕНИЯ ПЕРЕРЕНДЕРА
    const videoBlock = useMemo(() => {
        if(work.media !== null){
            if (work.media !== null && work.media[0].typeMedia === 'IMAGE') {
                return <img src={work.media[0].mediaLink} alt="workImage" />;
            } 
                return <Video url={work.media[0].mediaLink} light />;
        }

        return <div>no media</div>
        
    }, [work.media]);

    return(
        <div className={isWin? "winnerWork winner" : "winnerWork"}>
            <div className="winnerWork_left">
                
                <div className="winnerWork_left_media">
                    {videoBlock}
                </div>

                <div className="winnerWork_left_container">
                    <div className="winnerWork_left_contestName">{work.description}</div>

                    <div className="winnerWork_left_creationData">
                        <UserProfileData user = {work.user}/>

                        <div className="winnerWork_left_creationData_date">{creationDate}</div>
                    </div>

                    <div className="winnerWork_left_workText">Minimalist design using modern trends</div>

                    <Button variant="secondary" onClick={handleWorkModal}>Review</Button>
                </div>
            </div>

            <div className="winnerWork_right">
                <CustomCheckbox value="Winner" checked={isWinner} handleCheckbox={handleCheckbox} controlled/>
                <CustomSelector options={options} maxWidth={200} chooseSelectorCallback={handlePlaceSelector} currentPlace = {currentPlace} error = {placeError}/>
            </div>

            {modalWork && <ModalWindow isOpen onClose={() => setModalWork(false)}><WorkPreview work={work} /></ModalWindow>}

            <Alert />
        </div>
    )
}

export default WinnerWork