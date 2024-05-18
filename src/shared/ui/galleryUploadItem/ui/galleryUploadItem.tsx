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
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                alignItems: 'center',
                justifyContent: 'center',
                height: '228px',
                width: '228px',
                border: '1px dashed var(--grey)',
                borderRadius: '8px',
                background: 'var(--green-dark)',
            }}>
            <Text Tag='p'>Drag and drop your file here or</Text>
            <Button variant='secondary' className='uploadBtn'>
                <Text Tag='p' className='uploadBtn_text'>
                    Upload
                </Text>
                <Icon Svg={upload} width={20} height={20} />
            </Button>
        </div>
    ) : (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '228px',
                width: '228px',
                border: '1px dashed var(--grey)',
                borderRadius: '8px',
                background: 'var(--green-dark)',
            }}>
            <Icon Svg={placeholderImage} height={56} width={56} />
        </div>
    )
}
