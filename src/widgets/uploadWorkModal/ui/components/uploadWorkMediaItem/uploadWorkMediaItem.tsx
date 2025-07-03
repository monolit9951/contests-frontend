import { FC, useEffect, useState } from "react";
import './uploadWorkMediaItem.scss';
import X from 'shared/assets/icons/X.svg';

export interface MediaItem {
  id: string;
  file: File;
}

interface UploadWorkMediaItemInterface {
  mediaItem: MediaItem;
  handleRemoveMediaCallback: (id: string) => void;
}

const UploadWorkMediaItem: FC<UploadWorkMediaItemInterface> = ({ mediaItem, handleRemoveMediaCallback }) => {
  const { file, id } = mediaItem;
  const [previewUrl, setPreviewUrl] = useState<string>(URL.createObjectURL(file));

  const isVideo = file.type.startsWith("video/");

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleRemove = () => {
    handleRemoveMediaCallback(id);
  };

  return (
    <div className="uploadWorkMediaItem">
      {isVideo ? (
        <video src={previewUrl} />
      ) : (
        <img src={previewUrl} alt="mediaItem" />
      )}
      <button onClick={handleRemove} type="button">
        <img src={X} alt="cross" />
      </button>
    </div>
  );
};

export default UploadWorkMediaItem;
