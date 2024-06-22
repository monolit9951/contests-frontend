import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setContestExampleMedia } from 'pages/contestsCreationPage/model/services'
import questionMark from 'shared/assets/icons/question-mark.svg?react'
import { GalleryUploadItem } from 'shared/ui/galleryUploadItem'
import { Icon } from 'shared/ui/icon'
import { HStack, VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

import './galleryUpload.scss'

export const GalleryUpload = () => {
    const [galleryItems, setGalleryItems] = useState([
        { id: 0, hasImage: false, imgUrl: '' },
        { id: 1, hasImage: false, imgUrl: '' },
        { id: 2, hasImage: false, imgUrl: '' },
        { id: 3, hasImage: false, imgUrl: '' },
        { id: 4, hasImage: false, imgUrl: '' },
        { id: 5, hasImage: false, imgUrl: '' },
        { id: 6, hasImage: false, imgUrl: '' },
        { id: 7, hasImage: false, imgUrl: '' },
    ])

    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        const mediaUrls = galleryItems
            .filter(item => item.imgUrl !== '')
            .map(item => item.imgUrl);

        dispatch(setContestExampleMedia(mediaUrls));
        console.log("Dispatch setContestExampleMedia");
    }, [galleryItems, dispatch]);


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
                {galleryItems.map((galleryItem) => (
                    <GalleryUploadItem
                        galleryItem={galleryItem}
                        galleryItems={galleryItems}
                        setGalleryItems={setGalleryItems}
                    />
                ))}
            </div>
        </VStack>
    )
}
