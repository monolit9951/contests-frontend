import { FC } from "react";
import './winnerWork.scss'
import sampleWorkImage from 'shared/assets/testImages/sampleWorkImage.png'
import UserProfileData from "widgets/userProfileData/userProfileData";
import { Button } from "shared/ui/button";


interface WinnerWorkInterface {
    isWin?: boolean
}

const handleWorkModal = () => {
    console.log('MODAL SHOW')
}

const WinnerWork: FC <WinnerWorkInterface> = ({isWin}) => {
    return(
        <div className={isWin? "winnerWork winner" : "winnerWork"}>
            <div className="winnerWork_left">

                <img src={sampleWorkImage} alt="workImage" />

                <div className="winnerWork_left_container">
                    <div className="winnerWork_left_contestName">Tickle Olympics: Where Laughter Takes the Gold!</div>

                    <div className="winnerWork_left_creationData">
                        <UserProfileData />

                        <div className="winnerWork_left_creationData_date">15.01.2024</div>
                    </div>

                    <div className="winnerWork_left_workText">Minimalist design using modern trends</div>

                    <Button variant="secondary" onClick={handleWorkModal}>Review</Button>
                </div>
            </div>

            <div className="winnerWork_right">
                
            </div>
        </div>
    )
}

export default WinnerWork