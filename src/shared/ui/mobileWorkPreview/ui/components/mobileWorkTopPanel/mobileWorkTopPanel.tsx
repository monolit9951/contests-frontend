import { FC } from "react";
import popBackTick from 'shared/assets/icons/popBackTick.svg'
import verticalDots from 'shared/assets/icons/verticalDots.svg'

import './mobileWorkTopPanel.scss'

const MobileWorkTopPanel: FC = () =>{
    return(
        <div className="mobileWorkPreview_topOverlay">
            <div className="mobileWorkPreview_topOverlay_back">
                <img src={popBackTick} alt="popBack" />
            </div>

            <h3 className='mobileWorkPreview_topOverlay_contest'>Some contest name</h3>
            
            <div className="workControls">
                <img src={verticalDots} alt="dots" />
            </div>
        </div>
    )
}

export default MobileWorkTopPanel