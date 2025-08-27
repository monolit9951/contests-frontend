import { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import clsx from 'clsx'
import questionMark from 'shared/assets/icons/question-mark.svg?react'
import check from 'shared/assets/icons/select-check.svg?react'
import upload from 'shared/assets/icons/upload.svg?react'
import X from 'shared/assets/icons/X.svg?react'
import basicCover1 from 'shared/assets/img/basicCover1.png'
import basicCover2 from 'shared/assets/img/basicCover2.png'
import basicCover3 from 'shared/assets/img/basicCover3.png'
import basicCover4 from 'shared/assets/img/basicCover4.png'
import { allowedImageTypes } from 'shared/helpers/allowedMediaTypes'
import { useAlert } from 'shared/lib/hooks/useAlert/useAlert'
import { Button } from 'shared/ui/button'
import { Divider } from 'shared/ui/divider'
import { Icon } from 'shared/ui/icon'
import { Image } from 'shared/ui/image'
import { ModalWindow } from 'shared/ui/modalWindow'
import { Flex, HStack, VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'
import ImageCropper from 'widgets/imageCropper/ui/imageCropper'

import './coverSelectionModal.scss'

interface CoverSelectionModalProps {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    setChosenImg: React.Dispatch<React.SetStateAction<string | Blob>>
    isCover: boolean
    setImageValidationMessage: (str: string) => void
    extra: string
}

const covers = [basicCover1, basicCover2, basicCover3, basicCover4]

export const CoverSelectionModal = ({
    isOpen,
    setIsOpen,
    setChosenImg,
    isCover,
    setImageValidationMessage,
    extra
}: CoverSelectionModalProps) => {
    // не помню точно, но можно курр имг заменить на стринг | блоб
    const [currImg, setCurrImg] = useState<string>('')
    const [imgName, setImgName] = useState<string>('')
    const [isDisabledUploadBtn, setIsDisabledUploadBtn] =
        useState<boolean>(true)
    const [isUploading, setIsUploading] = useState<boolean>(false)
    const [currBlob, setCurrBlob] = useState<Blob | string>('')
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    // const [currFile, setCurrFile] = useState<any>(null)
    const { setValue } = useFormContext()
    const {showAlert, Alert} = useAlert()

    // подготовленные базовые фото
    const setDefaultImage = async (image: string) => {
        if (currImg === image) {
            setImgName('')
            setCurrImg('')
            setIsDisabledUploadBtn(true)
        } else {
            setImgName(image)
            setCurrImg(image)
            setIsDisabledUploadBtn(false)
             try {
                const response = await fetch(image)
                const blob = await response.blob()
                setCurrBlob(blob)
            } catch (err) {
                // console.error('Ошибка при загрузке изображения:', err)
                setImageValidationMessage('Failed to load image blob')
            }
        }
    }

    // отмена
    const onCancel = () => {
        setImgName('')
        setCurrImg('')
        setIsUploading(false)
        setIsOpen(false)
        setIsDisabledUploadBtn(true)
    }

    // окончательное добавление
    const confirmImage = () => {
        if (isCover) {
            setValue('backgroundImage', currBlob)
        } else {
            setValue('previewImage', currBlob)
        }
        setChosenImg(currImg)
        onCancel()
    }

    const [imageSrc, setImageSrc] = useState<string | null>(null)

    // получаем фото
    const handleFileChange = async(event: React.ChangeEvent<HTMLInputElement>) =>{
        const file = event.target.files?.[0]
        if(file && !allowedImageTypes.includes(file?.type)){
            showAlert('ERROR', "Wrong file type 1111")
            return
        }

        // setCurrFile(file)
        if(file){
            if(file.size > 6 * 1024 * 1024){
                setImageValidationMessage('File size exceeds 6 MB')
                return
            }
            const reader = new FileReader()
            reader.onload = () => {
                setImageSrc(reader.result as string)
                setImgName(file.name)
            }
            reader.readAsDataURL(file)
            setIsUploading(true)
        }
        
    }

    // возвращаем обработанное фото
    const handleCropComplete = (blob: Blob) => {
        setCurrImg(URL.createObjectURL(blob))
        setCurrBlob(blob)
        setIsDisabledUploadBtn(false)
        setImageSrc(null)
    }

    
    // обработка правильного aspect-ration
    const [numerator, denominator] = extra.split('/').map(Number)
    const extraNumber = Number((numerator / denominator).toFixed(3))

    useEffect(() => {
        const onDragEnter = (e: DragEvent) => {
            e.preventDefault();
            setIsDragging(true);
        };

        const onDragLeave = (e: DragEvent) => {
        e.preventDefault();
            if (e.relatedTarget === null) setIsDragging(false);
        };

        const onDragOver = (e: DragEvent) => {
            e.preventDefault();
        };

        const onDrop = (e: DragEvent) => {
            e.preventDefault();
            setIsDragging(false);

            if(e.dataTransfer && !allowedImageTypes.includes(e.dataTransfer?.files[0].type)){
                showAlert('ERROR', 'Wrong file type')
                return
            }

            if (e.dataTransfer?.files && inputRef.current) {
                const fileList = new DataTransfer();
                Array.from(e.dataTransfer.files).forEach(file => fileList.items.add(file));
                inputRef.current.files = fileList.files;

                // вручную вызвать change, т.к. inputRef.current.value не обновляется
                const event = new Event('change', { bubbles: true });
                inputRef.current.dispatchEvent(event);
            }
        };

        window.addEventListener("dragenter", onDragEnter);
        window.addEventListener("dragleave", onDragLeave);
        window.addEventListener("dragover", onDragOver);
        window.addEventListener("drop", onDrop);

        return () => {
        window.removeEventListener("dragenter", onDragEnter);
        window.removeEventListener("dragleave", onDragLeave);
        window.removeEventListener("dragover", onDragOver);
        window.removeEventListener("drop", onDrop);
        };
    }, []);

    return (
        <ModalWindow
            isOpen={isOpen}
            onClose={onCancel}
            className='cover_selection'
            overlayClassName='cover_selection_overlay'
            modalContentClass='cover_selection_content'>
            <VStack className='cover_selection_container'>
                <HStack className='cover_selection_header'>
                    <Text Tag='h3' className='cover_selection_header_text'>
                        Cover selection
                    </Text>
                    <Icon
                        Svg={X}
                        className='cover_selection_header_icon'
                        clickable
                        onClick={onCancel}
                        width={24}
                        height={24}
                    />
                </HStack>

                <Divider marginX={0} marginY={24} />

                {isUploading ? (
                    <VStack className='uploading__cover'>
                        <HStack className='uploading__cover__label'>
                            <Icon
                                Svg={questionMark}
                                width={20}
                                height={20}
                                className='uploading__cover__label__icon'
                            />
                            <Text
                                Tag='p'
                                className='uploading__cover__label__text'>
                                We recommend uploading an image that is at least {extra} pixels in size.
                            </Text>
                        </HStack>

                        <VStack className='uploading__cover__preview'>
                            <Image
                                src={currImg}
                                alt='image not found'
                                className='uploading__cover__preview__image'
                            />
                        </VStack>

                        <Divider marginX={16} marginY={24} />

                        <HStack className='btns_container'>
                            <Button
                                className='btn cancel'
                                variant='secondary'
                                onClick={() => setIsUploading(false)}>
                                Back
                            </Button>
                            <Button
                                className='btn upload'
                                variant='primary'
                                onClick={() => confirmImage()}>
                                Confirm
                            </Button>
                        </HStack>
                    </VStack>
                ) : (
                    <>
                        <Text Tag='p' className='basic-covers_header'>
                            Choose basic or upload your custom cover
                        </Text>

                        <HStack className='basic-covers_container'>
                            {covers.map((cover) => (
                                <Flex
                                    key={cover}
                                    className={clsx('basic-cover', {
                                        'is-active': currImg === cover,
                                    })}>
                                    <Image
                                        src={cover}
                                        alt='img not found'
                                        onClick={() => setDefaultImage(cover)}
                                    />
                                    <Icon Svg={check} width={20} height={20} />
                                </Flex>
                            ))}
                        </HStack>

                        <Divider marginX={0} marginY={16} />

                        <VStack className='custom-cover-upload_container'>
                            {currImg !== '' ? (
                                <Text Tag='p'>
                                    Loaded {imgName} successfuly!
                                </Text>
                            ) : (
                                <>
                                    <Text Tag='p' className='semibold text'>
                                        Drag and drop your file here or upload
                                    </Text>
                                    <Text Tag='p' className='text'>
                                        We recommend uploading an image that is
                                        at least
                                        <br />
                                        {extra} pixels in size. File size –
                                        no more than 6 MB
                                    </Text>
                                </>
                            )}
                            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                            <label
                                htmlFor='custom-cover-upload-btn_id'
                                className='custom-cover-upload-btn'>
                                <Text
                                    Tag='p'
                                    className='custom-cover-upload-btn-text'>
                                    Upload custom cover
                                </Text>
                                <Icon
                                    Svg={upload}
                                    width={24}
                                    height={24}
                                    className='custom-cover-upload-btn-icon'
                                />
                            </label>

                            <input
                                type='file'
                                id='custom-cover-upload-btn_id'
                                accept='.webp,.png,.jpg,.jpeg'
                                ref={inputRef}

                                onChange={handleFileChange}
                            />
                        </VStack>

                        <Divider marginX={16} marginY={24} />

                        <HStack className='btns_container'>
                            <Button
                                className='btn cancel'
                                variant='secondary'
                                onClick={onCancel}>
                                Cancel
                            </Button>
                            <Button
                                className='btn upload'
                                variant='primary'
                                onClick={() => setIsUploading(true)}
                                disabled={isDisabledUploadBtn}>
                                Continue
                            </Button>
                        </HStack>
                    </>
                )}
            </VStack>

            <Alert />
            {isDragging && <div className='dragOverlay'> </div>}
            {imageSrc && <ImageCropper imageSrc = {imageSrc} aspect = {extraNumber} onCropComplete={handleCropComplete}/>}
        </ModalWindow>
    )
}
