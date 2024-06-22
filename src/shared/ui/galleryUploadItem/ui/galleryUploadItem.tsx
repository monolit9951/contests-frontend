import placeholderImage from 'shared/assets/icons/placeholder-image.svg?react'
import upload from 'shared/assets/icons/upload.svg?react'
import X from 'shared/assets/icons/X.svg?react'
import { Button } from 'shared/ui/button'
import { Icon } from 'shared/ui/icon'
import { Input } from 'shared/ui/input'
import { VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

import './galleryUploadItem.scss'

interface GalleryUploadItemProps {
    galleryItem: {
        id: number
        hasImage: boolean
        imgUrl: string
    }
    galleryItems: {
        id: number
        hasImage: boolean
        imgUrl: string
    }[]
    setGalleryItems: React.Dispatch<
        React.SetStateAction<
            {
                id: number
                hasImage: boolean
                imgUrl: string
            }[]
        >
    >
}

export const GalleryUploadItem = ({
    galleryItem,
    galleryItems,
    setGalleryItems,
}: GalleryUploadItemProps) => {
    const removeImage = () => {
        setGalleryItems((prevItems) => {
            const updatedItems = prevItems.map((item) =>
                item.id === galleryItem.id ? { ...item, hasImage: false, imgUrl: '' } : item
            );

            const sortedItems = updatedItems
                .sort((a, b) => (a.hasImage === b.hasImage ? 0 : a.hasImage ? -1 : 1))
                .map((item, index) => ({ ...item, id: index }));

            return sortedItems;
        });
    };

    const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setGalleryItems((prevItems) =>
                prevItems.map((item) =>
                    item.id === galleryItem.id
                        ? { ...item, hasImage: true, imgUrl: URL.createObjectURL(file) }
                        : item
                )
            );
        }
    };

    if (galleryItem.hasImage === false) {
        const isCurrentOrPreviousHasImage =
            galleryItem.id === 0 ||
            galleryItems[galleryItem.id - 1].hasImage === true

        return (
            <div className='gallery-upload-item is-current'>
                {isCurrentOrPreviousHasImage ? (
                    <VStack>
                        <Text Tag='p' className='is-current_text'>
                            Drag and drop your file here or
                        </Text>

                        <label htmlFor='upload-btn_id' className='upload-btn'>
                            <Text Tag='p' className='uploadBtn_text'>
                                Upload
                            </Text>
                            <Icon Svg={upload} width={20} height={20} />
                            </label>
                        <Input
                            type='file'
                            id='upload-btn_id'
                            accept='image/*'
                            onChange={(event) => {
                                uploadImage(event)
                            }}
                        />
                        
                    </VStack>
                ) : (
                    <div className='gallery-upload-item'>
                        <Icon Svg={placeholderImage} height={56} width={56} />
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className='gallery-upload-item is-current'>
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                }}>
                <img
                    alt='not found'
                    width='100%'
                    height='100%'
                    className='gallery-upload-item_image'
                    src={galleryItem.imgUrl}
                />
                <Button
                    variant='div'
                    className='remove_btn'
                    onClick={() => removeImage()}>
                    <Icon Svg={X} className='remove_btn_icon' />
                </Button>
            </div>
        </div>
    )
}
