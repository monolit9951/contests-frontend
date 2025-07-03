import { ChangeEvent, FC, useRef, useState } from "react"
import upload from 'shared/assets/icons/upload.svg'
import { Button } from "shared/ui/button"

import './uploadWorkMediaInput.scss'

interface UploadWorkMediaInputInterface {
    handleMediaInputCallback: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const UploadWorkMediaInput: FC <UploadWorkMediaInputInterface>= ({handleMediaInputCallback}) => {

    const inputRef = useRef<HTMLInputElement | null>(null);

    // если будет дублированное видео
    const handleChange = (event: ChangeEvent<HTMLInputElement>) =>{
        handleMediaInputCallback(event)

        if (inputRef.current){
            inputRef.current.value = ''
        }
    }

    return(
        <div className="uploadWorkMediaInput">
            <div className="uploadWorkMediaInput_container">
                <div className="uploadWorkMediaInput_explain">Drag and drop your file here or</div>
                
                <div className="uploadWorkMediaInput_decorativeButton">
                    <div className="uploadWorkMediaInput_decorativeButton_container">
                        <span>Upload</span>
                        <img src={upload} alt="dada" />
                    </div>
                </div>
            </div>

            <input type="file" ref={inputRef} onChange={handleChange}/>
        </div>
    )
}

export default UploadWorkMediaInput