import React, { FC, useState } from "react";
import { Work } from "entities/work";
import sampleWorkImage from 'shared/assets/testImages/sampleWorkImage.png'
import { Button } from "shared/ui/button";
import { ModalWindow } from "shared/ui/modalWindow";
import CustomCheckbox from "widgets/customCheckbox";
import CustomSelector from "widgets/customSelector";
import UserProfileData from "widgets/userProfileData/userProfileData";
import { WorkPreview } from "widgets/worksSection/ui/workPreview/workPreview";

import './winnerWork.scss'
import instance from "shared/api/api";
import { useParams } from "react-router-dom";


interface WinnerWorkInterface {
    isWin?: boolean
    work: Work
}
    const winnerOptions: optionsType[] = 
    [{
        text: '1st Place',
        key: '1'
    },{
        text: '2nd Place',
        key: '2'
    },
    {
        text: '3d Place',
        key: '3'
    }]


const WinnerWork: FC <WinnerWorkInterface> = ({isWin, work}) => {

    const [modalWork, setModalWork] = useState(false)

    const handleWorkModal = () => {
        setModalWork(true)
    }

    const {id} = useParams()
    
    const handleCheckbox = async (event: React.ChangeEvent<HTMLInputElement>) =>{

        if (event.target.checked){
            console.log("ADD POSSIBLE WINNER")
            await instance.post(`contests/${id}/possible-winners/${work.id}`)

        } else {
            console.log("DELETE POSSIBLE WINNER")
            await instance.delete(`contests/${id}/possible-winners/${work.id}`)
        }
    }

    console.log(work)

    return(
        <div className={isWin? "winnerWork winner" : "winnerWork"}>
            <div className="winnerWork_left">

                <img src={sampleWorkImage} alt="workImage" />

                <div className="winnerWork_left_container">
                    <div className="winnerWork_left_contestName">{work.description}</div>

                    <div className="winnerWork_left_creationData">
                        <UserProfileData user = {work.user}/>

                        <div className="winnerWork_left_creationData_date">15.01.2024</div>
                    </div>

                    <div className="winnerWork_left_workText">Minimalist design using modern trends</div>

                    <Button variant="secondary" onClick={handleWorkModal}>Review</Button>
                </div>
            </div>

            <div className="winnerWork_right">
                <CustomCheckbox value="Winner" checked={work.possibleWinner} handleCheckbox={handleCheckbox}/>
                <CustomSelector options={winnerOptions} maxWidth={200} name="Place"/>
            </div>

            {modalWork && <ModalWindow isOpen onClose={() => setModalWork(false)}><WorkPreview work={work} /></ModalWindow>}
        </div>
    )
}

export default WinnerWork