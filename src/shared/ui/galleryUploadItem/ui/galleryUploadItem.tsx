import placeholderImage from 'shared/assets/icons/placeholder-image.svg?react'
import upload from 'shared/assets/icons/upload.svg?react'
import { Button } from 'shared/ui/button'
import { Icon } from 'shared/ui/icon'
import { Text } from 'shared/ui/text'

import './galleryUploadItem.scss'

interface GalleryUploadItemProps {
    isCurrent?: boolean
}

export const GalleryUploadItem = ({
    isCurrent = true,
}: GalleryUploadItemProps) => {
    return isCurrent ? (
        <div className="gallery-upload-item is-current">
            <Text Tag='p' className='is-current_text'>Drag and drop your file here or</Text>
            <Button variant='secondary' className='upload-btn'>
                <Text Tag='p' className='uploadBtn_text'>
                    Upload
                </Text>
                <Icon Svg={upload} width={20} height={20} />
            </Button>
        </div>
    ) : (
        <div className="gallery-upload-item">
            <Icon Svg={placeholderImage} height={56} width={56} />
        </div>
    )
}
