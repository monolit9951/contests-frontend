import { FC, useState } from "react"
import './uploadWorkMediaInput.scss'
import { Button } from "shared/ui/button"
import upload from 'shared/assets/icons/upload.svg'

interface UploadWorkMediaInputInterface {
    handleMediaInputCallback: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const UploadWorkMediaInput: FC <UploadWorkMediaInputInterface>= ({handleMediaInputCallback}) => {

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

            <input type="file" onChange={handleMediaInputCallback}/>
        </div>
    )
}

export default UploadWorkMediaInput