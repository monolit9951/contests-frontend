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

    // логика Cancel

    // логика Submit
    const handleWorkSubmit = async() => {

        if (text === ''){
            console.log('EMPTY TEXT')
            return
        }

        // const formData = new FormData()

        // // ТЕСТ ФОТО, УДАЛИТЬ

        console.log(contestId)

        // СОЗДАНИЕ ВОРКА БЕЗ МЕДИА 
        const response = await instance.post(`/works`, {
                contestId: contestId,
                description: text,
                typeWork: "IMAGE"
        })
        const workId = response.data.id
        console.log(workId)
        // ДОБАВЛЕНИЕ МЕДИА В ВОРК

        // ТОЛЬКО ДЛЯ ТЕСТА
        const formData = new FormData()
        const res = await fetch(testImage)
        const blob = await res.blob()
        const file = new File([blob], 'cover.png', { type: blob.type })

        formData.append('mediaDTO', workId)
        formData.append('media', file)
        
        await instance.post('/media', formData)
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
                        label='Additional Comments or Requirements'
                        placeholder='Sample placeholder...'
                        maxLength={300}
                        onChange={handleTextAreaChange}
                    />
                </div>

                <div className="uploadWorkModal_media">
                    <UploadWorkMediaInput />

                    <div className="uploadWorkModal_media_mediaList">
                        <UploadWorkMediaItem />
                        <UploadWorkMediaItem />
                        <UploadWorkMediaItem />
                        <UploadWorkMediaItem />
                    </div>
                </div>

                <div className="uploadWorkModal_buttons">
                    <Button variant='secondary'>Cancel</Button>
                    <Button onClick={handleWorkSubmit}>Submit Quest Entry</Button>
                </div>
            </div>
        </div>
    )
}

export default UploadWorkModal