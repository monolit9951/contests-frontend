import { ChangeEvent, FC, useState } from "react";
import instance from "shared/api/api";
import { Button } from "shared/ui/button";
import { Textarea } from "shared/ui/input";
import { v4 as uuidv4 } from 'uuid';

import UploadWorkMediaInput from "./components/uploadWorkMediaInput/uploadWorkMediaInput";
import UploadWorkMediaItem, { MediaItem } from "./components/uploadWorkMediaItem/uploadWorkMediaItem";

import './uploadWorkModal.scss';

interface UploadWorkModalInterface {
  contestId: string;
  onClose: () => void;
}

const UploadWorkModal: FC<UploadWorkModalInterface> = ({ contestId, onClose }) => {
  const [text, setText] = useState<string>('');

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const [mediaArray, setMediaArray] = useState<MediaItem[]>([]);

  const handleMedia = (newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles).map((file) => ({
      id: uuidv4(),
      file,
    }));
    setMediaArray((prev) => [...prev, ...fileArray]);
  };

  const handleMediaInputCallback = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      handleMedia(event.target.files);
    }
  };

  const handleRemoveMediaCallback = (id: string) => {
    setMediaArray((prev) => prev.filter((item) => item.id !== id));
  };


  // создание ворка
  const handleWorkSubmit = async () => {
    if (text === '') {
      return;
    }

    const token = localStorage.getItem('userToken')
    try {
      const response = await instance.post(`/works`, {
        contestId,
        description: text,
      }, {headers: {Authorization: `Bearer ${token}`}});

      console.log(response)

      const workId = response.data.id;

      const formData = new FormData();

      mediaArray.forEach(({ file }) => {
        formData.append('media', file);
      });

      try{
        console.log('ADD MEDIA')
        await instance.post(`/media/${workId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('ADD MEDIA COMPLETED')
        onClose()
      } catch (error){
        if(error){
          instance.delete(`/works/${workId}`)
        }
      }

    } catch (error) {
      console.error('Error submitting work or media:', error);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="uploadWorkModal">
      <div className="uploadWorkModal_container">
        <div className="uploadWorkModal_heading">
          <div className="uploadWorkModal_heading_text">Join the Quest</div>
        </div>

        <div className="uploadWorkModal_description">
          Fill in your information and add media files to participate in the contest.
        </div>

        <div className="uploadWorkModal_inputText">
          <Textarea
            name="text of work"
            label='Additional Comments or Requirements'
            placeholder='Sample placeholder...'
            maxLength={300}
            onChange={handleTextAreaChange}
          />
        </div>

        <div className="uploadWorkModal_media">
          <UploadWorkMediaInput handleMediaInputCallback={handleMediaInputCallback} />

          <div className="uploadWorkModal_media_mediaList">
            {mediaArray.map((mediaItem) => (
              <UploadWorkMediaItem
                key={mediaItem.id}
                mediaItem={mediaItem}
                handleRemoveMediaCallback={handleRemoveMediaCallback}
              />
            ))}
          </div>
        </div>

        <div className="uploadWorkModal_buttons">
          <Button variant='secondary' onClick={handleCancel}>Cancel</Button>
          <Button variant="primary" onClick={handleWorkSubmit}>Submit Quest Entry</Button>
        </div>
      </div>
    </div>
  );
};

export default UploadWorkModal;
