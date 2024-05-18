import questionMark from 'shared/assets/icons/question-mark.svg?react'
import { GalleryUploadItem } from 'shared/ui/galleryUploadItem'
import { Icon } from 'shared/ui/icon'
import { HStack, VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

import './galleryUpload.scss'

export const GalleryUpload = () => {
    return (
        <VStack className='galleryUpload_container'>
            <VStack className='title_container'>
                <HStack className='header_container'>
                    <Text Tag='h2' className='header'>
                        Gallery
                    </Text>
                    <Icon Svg={questionMark} height={20} width={21} />
                </HStack>
                <Text Tag='p' className='header_label'>
                    You can upload to this gallery examples of robots to be
                    performed by competition participants, as well as
                    photographs of prizes
                </Text>
            </VStack>

            <div className='grid_photo_container'>
                <GalleryUploadItem />
                <GalleryUploadItem isCurrent={false} />
                <GalleryUploadItem isCurrent={false} />
                <GalleryUploadItem isCurrent={false} />
                <GalleryUploadItem isCurrent={false} />
                <GalleryUploadItem isCurrent={false} />
                <GalleryUploadItem isCurrent={false} />
                <GalleryUploadItem isCurrent={false} />
            </div>
        </VStack>
    )
}
