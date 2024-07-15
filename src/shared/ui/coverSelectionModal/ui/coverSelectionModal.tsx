import { useState } from 'react'
import { useDispatch } from 'react-redux'
import clsx from 'clsx'
import {
    setContestBackgroundImage,
    setContestPreivewImage,
} from 'pages/contestsCreationPage/model/services'
import questionMark from 'shared/assets/icons/question-mark.svg?react'
import check from 'shared/assets/icons/select-check.svg?react'
import X from 'shared/assets/icons/X.svg?react'
import { Button } from 'shared/ui/button'
import { Divider } from 'shared/ui/divider'
import { Icon } from 'shared/ui/icon'
import { Image } from 'shared/ui/image'
import { ModalWindow } from 'shared/ui/modalWindow'
import { Flex, HStack, VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

import upload from '../../../assets/icons/upload.svg?react'

import './coverSelectionModal.scss'

interface CoverSelectionModalProps {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    isUploading: boolean
    setIsUploading: React.Dispatch<React.SetStateAction<boolean>>
    covers: {
        img: any
    }[]
    currImg: string | undefined
    setCurrImg: React.Dispatch<React.SetStateAction<string | undefined>>
    imgAlt: string
}

export const CoverSelectionModal = ({
    isOpen,
    setIsOpen,
    isUploading,
    covers,
    currImg,
    setCurrImg,
    setIsUploading,
    imgAlt,
}: CoverSelectionModalProps) => {
    const dispatch: AppDispatch = useDispatch()
    const [imgName, setImgName] = useState<string>()
    const [isDisabledUploadBtn, setIsDisabledUploadBtn] =
        useState<boolean>(true)

    const setImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setImgName(file.name)
            setCurrImg(URL.createObjectURL(file))
            setIsDisabledUploadBtn(false)
        }
    }

    const setDefaultImage = (image: string) => {
        setImgName(image)
        setCurrImg(image)
        setIsDisabledUploadBtn(false)
    }

    const confirmImage = () => {
        if (imgAlt === 'coverIMGPlaceholder') {
            dispatch(setContestBackgroundImage(currImg))
        } else {
            dispatch(setContestPreivewImage(currImg))
        }
        setIsUploading(false)
        setCurrImg(undefined)
        setImgName(undefined)
        setIsOpen(false)
    }

    return (
        <ModalWindow
            isOpen={isOpen}
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
                        onClick={() => setIsOpen(false)}
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
                            {covers.map((cover) => {
                                const imgClassname = clsx('basic-cover', {
                                    'is-active': currImg === cover.img,
                                })
                                return (
                                    <Flex className={imgClassname}>
                                        <Image
                                            src={cover.img}
                                            alt='img not found'
                                            onClick={() =>
                                                setDefaultImage(cover.img)
                                            }
                                        />
                                        <Icon
                                            Svg={check}
                                            width={20}
                                            height={20}
                                        />
                                    </Flex>
                                )
                            })}
                        </HStack>

                        <Divider marginX={0} marginY={16} />

                        <VStack className='custom-cover-upload_container'>
                            {currImg && currImg !== '' ? (
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
                                        accept='image/*'
                                        onChange={(event) => {
                                            setImage(event)
                                        }}
                                    />
                                </>
                            )}
                        </VStack>

                        <Divider marginX={16} marginY={24} />

                        <HStack className='btns_container'>
                            <Button
                                className='btn cancel'
                                variant='secondary'
                                onClick={() => setIsOpen(false)}>
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
