import { FC } from "react";
import './uploadWorkModal.scss'
import { Input } from "shared/ui/input";
import { ImageUpload } from "features/createContest/ui/blocks/mainInformation/ui/imageUpload";
import { FormProvider, useForm } from "react-hook-form";
import { GalleryUpload } from "features/createContest/ui/blocks/galleryUpload";

const UploadWorkModal: FC = () => {
    // логика пост запроса

    // логика обработки медиа

    // логика обработки текста

    // методы обработки формы
    const methods = useForm({
        defaultValues: {
            name: '',
            status: 'ACTIVE',
            category: '',
            subcategory: '',
            backgroundImage: '',
            previewImage: '',
            selectionType: 'RANDOM',
            maxAllowedParticipantAmount: 100,
            dateStart: new Date().toISOString(),
            dateEnd: new Date().toISOString(),
            description: '',
            exampleMedia: [],
            prizes: [
                {
                    id: crypto.randomUUID(),
                    place: 1,
                    winnersAmount: 1,
                    prizeType: '',
                    prizeText: '',
                    currency: 'USD',
                    prizeAmount: 0,
                },
                {
                    id: crypto.randomUUID(),
                    place: 2,
                    winnersAmount: 1,
                    prizeType: '',
                    prizeText: '',
                    currency: 'USD',
                    prizeAmount: 0,
                },
                {
                    id: crypto.randomUUID(),
                    place: 3,
                    winnersAmount: 1,
                    prizeType: '',
                    prizeText: '',
                    currency: 'USD',
                    prizeAmount: 0,
                },
            ],
            contestOpen: true,
        },
    })

    return(
        <div className="uploadWorkModal">
            <FormProvider {...methods}>
                <form>
                    <div className="uploadWorkModal_heading">Join the Quest</div>
                    <div className="uploadWorkModal_description">Fill in your information and add media files to participate in the contest.</div>

                    <div className="uploadWorkModal_inputText">
                        <Input label='Additional Comments or Requirements' type='text' placeholder='Enter contest name' />
                    </div>

                    {/* СДЕЛАТЬ КАСТОМНЫЙ, ИЛИ СДЕЛАТЬ ЭТОТ УНИВЕРСАЛЬНЫМ */}
                    <div className="uploadWorkModal_inputMedia">
                        <GalleryUpload />
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}

export default UploadWorkModal