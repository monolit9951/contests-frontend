import { FC } from "react";
import trophy from 'shared/assets/icons/trophyF.svg'

import './workPreviewContest.scss'

const WorkPreviewContest: FC = () => {
    return(
        <div className="workPreviewContest">
            <div className="workPreviewContest_img">
                <img src={trophy} alt="" />
            </div>
            
            <div className="workPreviewContest_name">Trickle Olympics</div>
            <span>·</span>
            <div className="workPreviewContest_status">Active</div>
        </div>
    )
}

export default WorkPreviewContest