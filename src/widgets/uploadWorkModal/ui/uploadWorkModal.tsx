import { FC } from "react";
import './uploadWorkModal.scss'
import { Input } from "shared/ui/input";
import { ImageUpload } from "features/createContest/ui/blocks/mainInformation/ui/imageUpload";
import { FormProvider } from "react-hook-form";

const UploadWorkModal: FC = () => {
    // логика пост запроса

    // логика обработки медиа

    // логика обработки текста
    return(
        <div className="uploadWorkModal">
            <FormProvider >
                <form>
                    <div className="uploadWorkModal_heading">Join the Quest</div>
                    <div className="uploadWorkModal_description">Fill in your information and add media files to participate in the contest.</div>

                    <div className="uploadWorkModal_inputText">
                        <Input label='Additional Comments or Requirements' type='text' placeholder='Enter contest name' />
                    </div>

                    <div className="uploadWorkModal_inputMedia">
                        <ImageUpload text='Cover image' extra='1704/390'/>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}

export default UploadWorkModal