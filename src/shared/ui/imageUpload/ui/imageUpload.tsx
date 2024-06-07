import { useState } from 'react'
import X from 'shared/assets/icons/X.svg?react'
import basicCover1 from 'shared/assets/img/basicCover1.png'
import basicCover2 from 'shared/assets/img/basicCover2.png'
import basicCover3 from 'shared/assets/img/basicCover3.png'
import basicCover4 from 'shared/assets/img/basicCover4.png'
import { Button } from 'shared/ui/button'
import { Divider } from 'shared/ui/divider'
import { Icon } from 'shared/ui/icon'
import Image from 'shared/ui/image/image'
import { ModalWindow } from 'shared/ui/modalWindow'
import { HStack, VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

import info from '../../../assets/icons/question-mark.svg?react'
import upload from '../../../assets/icons/upload.svg?react'
import questionMark from 'shared/assets/icons/question-mark.svg?react'

import './imageUpload.scss'


interface ImageUploadProps {
    text: string
    img: string
    imgAlt: string
}

const covers = [
    { img: basicCover1 },
    { img: basicCover2 },
    { img: basicCover3 },
    { img: basicCover4 },
]

export const ImageUpload = ({ text, img, imgAlt }: ImageUploadProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isUploading, setIsUploading] = useState<boolean>(false)

    const imgClassName =
        img === '/src/shared/assets/img/cardIMGPlaceholder.jpg' ||
        img === '/src/shared/assets/img/coverIMGPlaceholder.jpg'
            ? 'defaultImg'
            : ''
    return (
        <>
            <ModalWindow
                isOpen={isOpen}
                className='cover_selection'
                overlayClassName='cover_selection_overlay'
                // contentClassName='cover_selection_content'
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

                    <Divider
                        marginX={0}
                        marginY={24}
                    />

                    {isUploading ? (
                        <VStack className='uploading__cover'>
                            <HStack className='uploading__cover__label'>
                                <Icon
                                    Svg={questionMark}
                                    width={20}
                                    height={20}
                                    className='uploading__cover__label__icon'
                                />
                                <Text Tag='p' className='uploading__cover__label__text'>
                                    We recommend uploading an image that is at
                                    least 1704 x 390 pixels in size.
                                </Text>
                            </HStack>

                            <VStack className='uploading__cover__preview'>

                            </VStack>
                        </VStack>
                    ) : (
                        <>
                            <Text Tag='p' className='basic-covers_header'>
                                Choose basic or upload your custom cover
                            </Text>

                            <HStack className='basic-covers_container'>
                                {covers.map((cover) => (
                                    <Image
                                        src={cover.img}
                                        alt='img not found'
                                        className='basic-cover'
                                    />
                                ))}
                            </HStack>

                            <Divider
                                marginX={0}
                                marginY={16}
                            />

                            <VStack className='custom-cover-upload_container'>
                                <Text Tag='p' className='semibold text'>
                                    Drag and drop your file here or upload
                                </Text>
                                <Text Tag='p' className='text'>
                                    We recommend uploading an image that is at
                                    least
                                    <br />
                                    1704 x 390 pixels in size. File size – no
                                    more than 6 MB
                                </Text>
                                <Button
                                    variant='secondary'
                                    className='upload-btn'
                                    onClick={() => setIsUploading(true)}>
                                    <Text Tag='p' className='upload-btn_text'>
                                        Upload custom cover
                                    </Text>
                                    <Icon
                                        Svg={upload}
                                        className='upload-btn_icon'
                                    />
                                </Button>
                            </VStack>
                        </>
                    )}

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
                            onClick={() => console.log('Upload')}>
                            Upload
                        </Button>
                    </HStack>
                </VStack>
            </ModalWindow>

            <HStack className='imageUpload_container'>
                <VStack className='imagePreview_container'>
                    <HStack className='text_icon_container'>
                        <Text Tag='p'>{text}</Text>
                        <Icon Svg={info} height={20} width={20} />
                    </HStack>
                    <HStack className='imageUpload_imagecontainer'>
                        <Image
                            src={img}
                            alt={imgAlt}
                            className={imgClassName}
                        />
                    </HStack>
                </VStack>

                <VStack className='text_btn_container'>
                    <Text Tag='p' className='text'>
                        To make your cover look attractive on all devices,
                        <br />
                        we recommend uploading an image
                        <br />
                        that is at least 1704 x 390 pixels in size.
                        <br />
                        File size – no more than 6 MB
                    </Text>
                    <Button
                        variant='secondary'
                        className='uploadBtn'
                        onClick={() => setIsOpen(true)}>
                        <Text Tag='p'>Upload</Text>
                        <Icon Svg={upload} width={20} height={20} />
                    </Button>
                </VStack>
            </HStack>
        </>
    )
}
