import { Button } from 'shared/ui/button'
import { Icon } from 'shared/ui/icon'
import Image from 'shared/ui/image/image'
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
    return (
        <HStack className='imageUpload_container'>
            <VStack className='imagePreview_container'>
                <HStack className='text_icon_container'>
                    <Text Tag='p'>{text}</Text>
                    <Icon Svg={info} height={20} width={20} />
                </HStack>
                <Image src={img} alt={imgAlt} width='100%' height='100%' />
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
                <Button variant='secondary' className='uploadBtn'>
                        <Text Tag='p'>Upload</Text>
                        <Icon Svg={upload} width={20} height={20} />
                </Button>
            </VStack>
        </HStack>
    )
}
