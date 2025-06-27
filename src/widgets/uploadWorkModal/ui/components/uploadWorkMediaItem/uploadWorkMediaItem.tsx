import { FC, useEffect, useState } from "react";
import './uploadWorkMediaItem.scss'
import X from 'shared/assets/icons/X.svg'
import testImage from 'shared/assets/testImages/workImgSample2.jpg'

interface UploadWorkMediaItemInterface {
    mediaFile: File
    handleRemoveMediaCallback: (fileName: string) => void
}

const UploadWorkMediaItem: FC <UploadWorkMediaItemInterface> = ({mediaFile, handleRemoveMediaCallback}) => {


    const [previewUrl, setPreviewUrl] = useState<string>(URL.createObjectURL(mediaFile));

    const isVideo = mediaFile.type.startsWith("video/");

    useEffect(() => {
        const url = URL.createObjectURL(mediaFile);
        setPreviewUrl(url);

        // Очистка URL при размонтировании компонента, чтобы не было утечек памяти
        return () => URL.revokeObjectURL(url);
    }, [mediaFile]);
    const handleRemove = () => {
        handleRemoveMediaCallback(mediaFile.name)
    }

    return(
        <div className="uploadWorkMediaItem">
            
            {isVideo? 
                <video src={previewUrl}/>
                :
                <img src={previewUrl} alt="mediaItem" />
            }
            <button onClick={handleRemove} type="button"><img src={X} alt="cross" /></button>
        </div>
    )
}

export default UploadWorkMediaItem