import "./battlesPage.scss"
import Plyr from "plyr-react"
import verticalVideo from '../../../shared/assets/testVideos/testVideo.mp4'
import "plyr-react/plyr.css";
import { Video } from "shared/ui/videoPlayer";

export const BattlesPage = () => {
    return(
        <div className="battlesPage_container">
            {/* <Plyr source={{type: "video", sources: [{src: verticalVideo, type: "video/mp4"}]}}/> */}
            <Video url={verticalVideo}/>
        </div>
    )
}