import React from 'react';
import upload from 'shared/assets/icons/upload.svg?react';
import { Icon } from 'shared/ui/icon';
import { Input } from 'shared/ui/input';
import { Text } from 'shared/ui/text';

interface FileUploadInputProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FileUploadInput: React.FC<FileUploadInputProps> = ({ onChange }) => {
    return (
        <>
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
            />
        </>
    );
};
