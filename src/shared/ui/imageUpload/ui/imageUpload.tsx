import { useState } from 'react'
import questionMark from 'shared/assets/icons/question-mark.svg?react'
import X from 'shared/assets/icons/X.svg?react'
import basicCover1 from 'shared/assets/img/basicCover1.png'
import basicCover2 from 'shared/assets/img/basicCover2.png'
import basicCover3 from 'shared/assets/img/basicCover3.png'
import basicCover4 from 'shared/assets/img/basicCover4.png'
import { Button } from 'shared/ui/button'
import { CoverSelectionModal } from 'shared/ui/coverSelectionModal'
import { Divider } from 'shared/ui/divider'
import { Icon } from 'shared/ui/icon'
import Image from 'shared/ui/image/image'
import { Input } from 'shared/ui/input'
import { ModalWindow } from 'shared/ui/modalWindow'
import { HStack, VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

import info from '../../../assets/icons/question-mark.svg?react'
import upload from '../../../assets/icons/upload.svg?react'

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
    const [currImg, setCurrImg] = useState<string>()

    const imgClassName =
        img === '/src/shared/assets/img/cardIMGPlaceholder.jpg' ||
        img === '/src/shared/assets/img/coverIMGPlaceholder.jpg'
            ? 'defaultImg'
            : ''
    return (
        <>
            <CoverSelectionModal covers={covers} isOpen={isOpen} isUploading={isUploading} setCurrImg={setCurrImg} setIsOpen={setIsOpen} setIsUploading={setIsUploading} currImg={currImg} imgAlt={imgAlt}/>        

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
                    <Text Tag='p' className='text_btn_container_text'>
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
                        className='text_btn_container_uploadBtn'
                        onClick={() => setIsOpen(true)}>
                        <Text Tag='p' className='text_btn_container_uploadBtn_text'>Upload</Text>
                        <Icon Svg={upload} width={20} height={20} />
                    </Button>
                </VStack>
            </HStack>
        </>
    )
}
