import { FC } from "react";
import './uploadWorkMediaItem.scss'
import X from 'shared/assets/icons/X.svg'
import testImage from 'shared/assets/testImages/workImgSample2.jpg'

const UploadWorkMediaItem: FC = () => {
    return(
        <div className="uploadWorkMediaItem">
            <img src={testImage} alt="mediaItem" />
            <button><img src={X} alt="cross" /></button>
        </div>
    )
}

export default UploadWorkMediaItem