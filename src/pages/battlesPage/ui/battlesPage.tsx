import { Helmet } from "react-helmet-async";
import { CustomVideoPlayer } from "shared/ui/customVideoPlayer";

import "./battlesPage.scss";

export const BattlesPage = () => {
 

  return (
    <div className="battlesPage">
      <Helmet>
        <title>DareBay | Battles</title>
        <meta property="og:title" content="All contests, main page" />
      </Helmet>

      {/* <h2>BattlesPage</h2> */}
      <div style={{width: '600px', height: '600px'}}>
        <CustomVideoPlayer src='https://ia800400.us.archive.org/23/items/youtube-bQ08lJ7BZ0k/bQ08lJ7BZ0k.webm'/>
      </div>
    </div>
  );
};