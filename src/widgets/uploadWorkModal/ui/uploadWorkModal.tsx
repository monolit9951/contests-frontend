import { ChangeEvent, FC, TextareaHTMLAttributes, useState } from "react";
import './uploadWorkModal.scss'
import { Input, Textarea } from "shared/ui/input";
import { ImageUpload } from "features/createContest/ui/blocks/mainInformation/ui/imageUpload";
import { FormProvider, useForm } from "react-hook-form";
import { GalleryUpload } from "features/createContest/ui/blocks/galleryUpload";
import { Button } from "shared/ui/button";
import instance from "shared/api/api";
import testImage from 'shared/assets/testImages/contestRedSquare.png'
import UploadWorkMediaInput from "./components/uploadWorkMediaInput/uploadWorkMediaInput";
import UploadWorkMediaItem from "./components/uploadWorkMediaItem/uploadWorkMediaItem";

interface UploadWorkModalInterface {
    contestId: string
}

const UploadWorkModal: FC <UploadWorkModalInterface> = ({contestId}) => {


    // логика текстАреа
    const [text, setText] = useState<string>('')

    const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value)
    }


    // массив ссылок на файлы
    const [mediaArray, setMediaArray] = useState<File[]>([])
    
    const handleMedia = (newFiles: FileList | File[]) => {
        const fileArray = Array.from(newFiles);
        setMediaArray((prev) => [...prev, ...fileArray]);
        console.log(mediaArray)
    }


    // логика Submit
const handleWorkSubmit = async () => {
  if (text === '') {
    console.log('EMPTY TEXT');
    return;
  }

  if (mediaArray.length === 0) {
    console.log('No media files added');
    // можно либо прервать, либо разрешить отправить без медиа
  }

  try {
    // Создаем работу с текстом
    const response = await instance.post(`/works`, {
      contestId: contestId,
      description: text,
    });
    const workId = response.data.id;
    console.log('Created work with id:', workId);

    // Формируем formData и добавляем все файлы из mediaArray
    const formData = new FormData();

    mediaArray.forEach((file, index) => {
      formData.append('media', file); 
    });

    // Отправляем медиа
    const mediaResponse = await instance.post(`/media/${workId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Media upload response:', mediaResponse.data);

  } catch (error) {
    console.error('Error submitting work or media:', error);
  }
}



    const handleMediaInputCallback = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            handleMedia(event.target.files);
        }
    };

    const handleRemoveMediaCallback = (fileName: string) => {
        setMediaArray((prev) => prev.filter((file) => file.name !== fileName));
    }

    return(
        <div className="uploadWorkModal">
            <div className="uploadWorkModal_container">
                <div className="uploadWorkModal_heading">
                    <div className="uploadWorkModal_heading_text"> Join the Quest</div>
                </div>

                <div className="uploadWorkModal_description">Fill in your information and add media files to participate in the contest.</div>

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
                        {mediaArray.length > 0 && mediaArray.map((file: File, index: number) => (
                            <UploadWorkMediaItem mediaFile = {file} key={index} handleRemoveMediaCallback={handleRemoveMediaCallback} />
                        ))}
                    </div>
                </div>

                <div className="uploadWorkModal_buttons">
                    <Button variant='secondary'>Cancel</Button>
                    <Button variant="primary" onClick={handleWorkSubmit}>Submit Quest Entry</Button>
                </div>
            </div>
        </div>
    )
}

export default UploadWorkModal