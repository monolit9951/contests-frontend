import { useState } from 'react'
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
import { Button } from 'shared/ui/button'
import { Divider } from 'shared/ui/divider'
import { Icon } from 'shared/ui/icon'
import { Image } from 'shared/ui/image'
import { ModalWindow } from 'shared/ui/modalWindow'
import { Flex, HStack, VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

import './coverSelectionModal.scss'

interface CoverSelectionModalProps {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    setChosenImg: React.Dispatch<React.SetStateAction<string>>
    isCover: boolean
    setImageValidationMessage: (str: string) => void
}

const covers = [basicCover1, basicCover2, basicCover3, basicCover4]

export const CoverSelectionModal = ({
    isOpen,
    setIsOpen,
    setChosenImg,
    isCover,
    setImageValidationMessage,
}: CoverSelectionModalProps) => {
    const [currImg, setCurrImg] = useState<string>('')
    const [imgName, setImgName] = useState<string>('')
    const [isDisabledUploadBtn, setIsDisabledUploadBtn] =
        useState<boolean>(true)
    const [isUploading, setIsUploading] = useState<boolean>(false)

    const { setValue } = useFormContext()

    const setImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            const maxSize = 6 * 1024 * 1024 // 6MB

            if (file.size > maxSize) {
                setImageValidationMessage('File size exceeds 6 MB')

                return
            }

            setImgName(file.name)
            setCurrImg(URL.createObjectURL(file))
            setIsDisabledUploadBtn(false)
            setImageValidationMessage('')
        }
    }

    const setDefaultImage = (image: string) => {
        if (currImg === image) {
            setImgName('')
            setCurrImg('')
            setIsDisabledUploadBtn(true)
        } else {
            setImgName(image)
            setCurrImg(image)
            setIsDisabledUploadBtn(false)
        }
    }

    const onCancel = () => {
        setImgName('')
        setCurrImg('')
        setIsUploading(false)
        setIsOpen(false)
        setIsDisabledUploadBtn(true)
    }

    const confirmImage = () => {
        if (isCover) {
            setValue('backgroundImage', currImg)
        } else {
            setValue('previewImage', currImg)
        }
        setChosenImg(currImg)
        onCancel()
    }

    return (
        <ModalWindow
            isOpen={isOpen}
            onClose={onCancel}
            className='cover_selection'
            overlayClassName='cover_selection_overlay'
            modalContentClass='cover_selection_content'>
            <VStack className='cover_selection_container'>
                <HStack className='header'>
                    <Text Tag='h3' className='header_text'>
                        Cover selection
                    </Text>
                    <Icon
                        Svg={X}
                        className='header_icon'
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
                                We recommend uploading an image that is at least
                                1704 x 390 pixels in size.
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
                                        1704 x 390 pixels in size. File size –
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
                                onChange={(e) => {
                                    setImage(e)
                                }}
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
        </ModalWindow>
    )
}
