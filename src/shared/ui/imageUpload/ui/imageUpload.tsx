import { useState } from 'react'
import X from "shared/assets/icons/X.svg?react"
import { Button } from 'shared/ui/button'
import { Icon } from 'shared/ui/icon'
import Image from 'shared/ui/image/image'
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

export const ImageUpload = ({ text, img, imgAlt }: ImageUploadProps) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <HStack className='imageUpload_container'>
            <VStack className='imagePreview_container'>
                <HStack className='text_icon_container'>
                    <Text Tag='p'>{text}</Text>
                    <Icon Svg={info} height={20} width={20} />
                </HStack>
                <Image src={img} alt={imgAlt} />
            </VStack>
        <ModalWindow isOpen={isOpen} className='cover_selection' overlayClassName='cover_selection_overlay'>
            <VStack className='cover_selection_container'>
                <HStack className='header'>
                    <Text Tag="h3">Cover selection</Text>
                    <Icon Svg={X} width={24} height={24}/>
                </HStack>
                <Text Tag='p'>Choose basic or upload your custom cover</Text>

            </VStack>
        </ModalWindow>
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
                <Button variant='secondary' className='uploadBtn'
                onClick={() => setIsOpen(true)}
                >
                        <Text Tag='p'>Upload</Text>
                        <Icon Svg={upload} width={20} height={20} />
                </Button>
            </VStack>
        </HStack>
    )
}
