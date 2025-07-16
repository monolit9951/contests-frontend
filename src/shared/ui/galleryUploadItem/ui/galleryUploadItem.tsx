import { useState } from 'react'
import alertIcon from 'shared/assets/icons/alert.svg?react'
import placeholderImage from 'shared/assets/icons/placeholder-image.svg?react'
import upload from 'shared/assets/icons/upload.svg?react'
import X from 'shared/assets/icons/X.svg?react'
import { Button } from 'shared/ui/button'
import { Icon } from 'shared/ui/icon'
import { HStack, VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

import './galleryUploadItem.scss'

interface GalleryItem {
    id: number
    hasImage: boolean
    file?: File
    imgUrl: string
}

interface Props {
    galleryItem: GalleryItem
    galleryItems: GalleryItem[]
    setGalleryItems: React.Dispatch<React.SetStateAction<GalleryItem[]>>
}

export const GalleryUploadItem = ({
    galleryItem,
    galleryItems,
    setGalleryItems,
}: Props) => {
    const [errorMessage, setErrorMessage] = useState('')

    const removeImage = () => {
        setGalleryItems((prevItems) => {
            const updatedItems = prevItems.map((item) =>
                item.id === galleryItem.id
                    ? { ...item, hasImage: false, imgUrl: '', imgBlob: {} }
                    : item
            )

            const sortedItems = updatedItems
                .sort((a, b) =>
                    // eslint-disable-next-line no-nested-ternary
                    a.hasImage === b.hasImage ? 0 : a.hasImage ? -1 : 1
                )
                .map((item, index) => ({ ...item, id: index }))

            return sortedItems
        })
    }

    const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files?.[0]
            const maxSize = 6 * 1024 * 1024 // 6MB

            if (file.size > maxSize) {
                setErrorMessage('File size exceeds 6 MB')

                return
            }

            if (file) {
                setGalleryItems((prevItems) =>
                    prevItems.map((item) =>
                        item.id === galleryItem.id
                            ? {
                                  ...item,
                                  hasImage: true,
                                  file,
                                  imgUrl: URL.createObjectURL(file),
                                  imgBlob: file
                              }
                            : item
                    )
                )
            }
        }
    }

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
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label htmlFor='upload-btn_id' className='upload-btn'>
                            <Text Tag='p' className='uploadBtn_text'>
                                Upload
                            </Text>
                            <Icon Svg={upload} width={20} height={20} />
                            {errorMessage && (
                                <HStack className='input-error-container'>
                                    <Icon Svg={alertIcon} />
                                    <Text Tag='p'>{errorMessage}</Text>
                                </HStack>
                            )}
                        </label>
                        <input
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
