import { Helmet } from "react-helmet-async";
import videoSample from 'shared/assets/testVideos/testVideo.mp4'
import "./battlesPage.scss";
import { CustomVideoPlayer } from "shared/ui/customVideoPlayer";

export const BattlesPage = () => {
 

  return (
    <div className="battlesPage">
      <Helmet>
        <title>DareBay | Battles</title>
        <meta property="og:title" content="All contests, main page" />
      </Helmet>

      {/* <h2>BattlesPage</h2> */}
      <div style={{width: '600px', height: '600px'}}>
        <CustomVideoPlayer src={videoSample}/>
      </div>
    </div>
  );
};