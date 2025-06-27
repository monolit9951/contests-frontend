import { FC } from "react"
import './uploadWorkMediaInput.scss'
import { Button } from "shared/ui/button"
import upload from 'shared/assets/icons/upload.svg'

const UploadWorkMediaInput: FC = () => {
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

            <input type="file" />
        </div>
    )
}

export default UploadWorkMediaInput