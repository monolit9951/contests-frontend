import "./battlesPage.scss"
import { Video } from "shared/ui/videoPlayer"
import videoSample from "shared/assets/testVideos/testVideo.mp4"
import Plyr from "plyr-react"
// import "plyr-react/plyr.css";
export const BattlesPage = () => {
    return(
        <div className="container">
            <Video src={videoSample} />
        </div>
    )
}