import { useState } from 'react'
import clsx from 'clsx'
import info from 'shared/assets/icons/question-mark.svg?react'
import upload from 'shared/assets/icons/upload.svg?react'
import cardIMGPlaceholder from 'shared/assets/img/cardIMGPlaceholder.jpg'
import coverIMGPlaceholder from 'shared/assets/img/coverIMGPlaceholder.jpg'
import { Button } from 'shared/ui/button'
import { CoverSelectionModal } from 'shared/ui/coverSelectionModal'
import { Icon } from 'shared/ui/icon'
import Image from 'shared/ui/image/image'
import { HStack, VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

import './imageUpload.scss'

interface ImageUploadProps {
    text: string
    extra: string
}

export const ImageUpload = ({ text, extra }: ImageUploadProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [chosenImg, setChosenImg] = useState<string>('')
    const [imageValidationMessage, setImageValidationMessage] = useState('')
    

    return (
        <>
            <CoverSelectionModal
                isOpen={isOpen}
                setChosenImg={setChosenImg}
                setIsOpen={setIsOpen}
                isCover={text === 'Cover image'}
                setImageValidationMessage={setImageValidationMessage}
                extra={extra}
            />

            <HStack className='imageUpload_container'>
                <VStack className='imagePreview_container'>
                    <HStack className='text_icon_container'>
                        <Text Tag='p'>{text}</Text>
                        <Icon Svg={info} height={20} width={20} />
                    </HStack>
                    <HStack className='imageUpload_imagecontainer'>
                        <Image
                            src={
                                chosenImg ||
                                (text === 'Cover image'
                                    ? coverIMGPlaceholder
                                    : cardIMGPlaceholder)
                            }
                            alt='Preview image'
                            className={clsx(
                                !chosenImg && 'defaultImg',
                                text === 'Cover image' && 'coverImg'
                            )}
                        />
                    </HStack>
                </VStack>

                <VStack className='text_btn_container'>
                    <Text Tag='p' className='text_btn_container_text'>
                        To make your cover look attractive on all devices,
                        <br />
                        we recommend uploading an image
                        <br />
                        that is at least {extra} pixels in size.
                        <br />
                        File size – no more than 6 MB
                    </Text>
                    {imageValidationMessage && (
                        <Text Tag='p' className='text_btn_container_error'>
                            {imageValidationMessage}
                        </Text>
                    )}

                    <Button
                        variant='secondary'
                        className='text_btn_container_uploadBtn'
                        onClick={() => setIsOpen(true)}>
                        <Text
                            Tag='p'
                            className='text_btn_container_uploadBtn_text'>
                            Upload
                        </Text>
                        <Icon Svg={upload} width={20} height={20} />
                    </Button>
                </VStack>
            </HStack>
        </>
    )
}
