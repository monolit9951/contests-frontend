import { ChangeEvent, FC, useState } from "react";
import instance from "shared/api/api";
import { useAlert } from "shared/lib/hooks/useAlert/useAlert";
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
  const [textareaError, setTextAreaError] = useState<string>('')
  const {showAlert, Alert} = useAlert()
  const [mediaArray, setMediaArray] = useState<MediaItem[]>([]);


  // отловить изменение текста
  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaError('')
    setText(event.target.value);
  };

  // добавление файлов
  const handleMedia = (newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles).map((file) => ({
      id: uuidv4(),
      file,
    }));
    setMediaArray((prev) => [...prev, ...fileArray]);
  };

  // инпут файлов
  const handleMediaInputCallback = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      handleMedia(event.target.files);
    }
  };

  // удаление файлов
  const handleRemoveMediaCallback = (id: string) => {
    setMediaArray((prev) => prev.filter((item) => item.id !== id));
  };


  // создание ворка
  const handleWorkSubmit = async () => {
    // if (text === '' || text.length < 10 || text.length > 500) {
    //   setTextAreaError('Text must be from 10 to 500 letters')
    //   return;
    // }

    const token = localStorage.getItem('userToken')
    try {
      const response = await instance.post(`/works`, {
        contestId,
        description: text,
      }, {headers: {Authorization: `Bearer ${token}`}});


      if(mediaArray.length > 0){

        const workId = response.data.id;
        const formData = new FormData();

        mediaArray.forEach(({ file }) => {
          formData.append('media', file);
        });

        try{
          await instance.post(`/media/${workId}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          });
          onClose()
        } catch (error){
          showAlert('Error', 'CHANGE THAT ERROR')
          if(error){
            instance.delete(`/works/${workId}`)
          }
        }
      } else{
        onClose()
      }
    } catch (error) {
      // console.log(error.response.data)
      showAlert('Error', 'CHANGE THAT ERROR')
      // console.error('Error submitting work or media:', error);
    }
  };

  // закрыть модалку на кенцел
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
            error = {textareaError}
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

      <Alert />
    </div>
  );
};

export default UploadWorkModal;
