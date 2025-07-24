import React, { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { Work } from "entities/work";
import instance from "shared/api/api";
import sampleWorkImage from 'shared/assets/testImages/sampleWorkImage.png'
import { Button } from "shared/ui/button";
import { ModalWindow } from "shared/ui/modalWindow";
import CustomCheckbox from "widgets/customCheckbox";
import CustomSelector from "widgets/customSelector";
import UserProfileData from "widgets/userProfileData/userProfileData";
import { WorkPreview } from "widgets/worksSection/ui/workPreview/workPreview";

import './winnerWork.scss'
import moment from "moment";
import { Video } from "shared/ui/videoPlayer";
import sampleVideo from "shared/assets/testVideos/testVideo.mp4"

interface WinnerWorkInterface {
    isWin?: boolean
    work: Work
    options: optionsType[]
}



const WinnerWork: FC <WinnerWorkInterface> = ({isWin, work, options}) => {

    const [modalWork, setModalWork] = useState<boolean>(false)
    const [prizeId, setPrizeId] = useState<string>('')
    const [placeError, setPlaceError] = useState<boolean>(false)

    const handleWorkModal = () => {
        setModalWork(true)
    }
    
    const handleCheckbox = async (event: React.ChangeEvent<HTMLInputElement>) =>{

        if (event.target.checked){
            console.log("ADD POSSIBLE WINNER")
            // получить 
            console.log(prizeId)
            try{
                await instance.post(`winners/${work.id}/possible/${prizeId}`)
            } catch (error){
                if(error.response.data.error === 'All places for this prize are already taken.'){
                    setPlaceError(true)
                }
            }

        } else {
            console.log("DELETE POSSIBLE WINNER")
            try{
                await instance.delete(`winners/possible/${work.id}`)
            } catch (error){
                if(error.response.data.error === 'All places for this prize are already taken.'){
                    setPlaceError(true)
                }
            }
        }
    }

    const handlePlaceSelector = (key: string) => {
        setPlaceError(false)
        setPrizeId(key)
    }

    const creationDate = moment.utc(work.workAddingDate).local().fromNow();

    return(
        <div className={isWin? "winnerWork winner" : "winnerWork"}>
            <div className="winnerWork_left">
                
                <div className="winnerWork_left_media">
                    {/* заменить */}
                    {work.media[0].typeMedia === 'IMAGE' ? <img src={sampleWorkImage} alt="workImage" /> 
                        :
                        <Video url={sampleVideo} light/>
                    }
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
                <CustomCheckbox value="Winner" checked={work.possibleWinner} handleCheckbox={handleCheckbox}/>
                <CustomSelector options={options} maxWidth={200} name="Place" chooseSelectorCallback={handlePlaceSelector} currentPlace = {work.place} error = {placeError}/>
            </div>

            {modalWork && <ModalWindow isOpen onClose={() => setModalWork(false)}><WorkPreview work={work} /></ModalWindow>}
        </div>
    )
}

export default WinnerWork