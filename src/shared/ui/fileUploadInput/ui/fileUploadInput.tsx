import upload from 'shared/assets/icons/upload.svg?react'
import { Icon } from 'shared/ui/icon'
import { Text } from 'shared/ui/text'

export const FileUploadInput = () => {
    return (
        <>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor='upload-btn_id' className='upload-btn'>
                <Text Tag='p' className='uploadBtn_text'>
                    Upload
                </Text>
                <Icon Svg={upload} width={20} height={20} />
            </label>
            <input type='file' id='upload-btn_id' accept='image/*' />
        </>
    )
}
