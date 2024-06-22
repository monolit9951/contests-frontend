// import { Icon } from 'shared/ui/icon'
// import { Text } from 'shared/ui/text'

// import './fileUploadInput.scss'
// import { Input } from 'shared/ui/input'

// interface FileUploadInputProps {
//     labelText: string
//     accept?: string
//     iconSvg?: string | React.FC<React.SVGProps<SVGSVGElement>>
//     iconWidth?: number
//     iconHeight?: number
//     onChangeFunc: (event: React.ChangeEvent<HTMLInputElement>) => void
// }

// export const FileUploadInput = ({
//     labelText,
//     accept,
//     iconHeight = 20,
//     iconSvg,
//     iconWidth = 20,
//     onChangeFunc,
//     ...rest
// }: FileUploadInputProps) => {
//     return (
//         <>
//             <label htmlFor='upload-btn_id' className='upload-btn'>
//                 <Text Tag='p' className='uploadBtn_text'>
//                     {labelText}
//                 </Text>
//                 {iconSvg && (
//                     <Icon Svg={iconSvg} width={iconWidth} height={iconHeight} />
//                 )}
//             </label>
//             <Input
//                 type='file'
//                 id='upload-btn_id'
//                 accept={accept}
//                 onChange={(event) => onChangeFunc(event)}
//             />
//         </>
//     )
// }

// ImageUploadButton.tsx
import React from 'react';
import upload from 'shared/assets/icons/upload.svg?react';
import { Icon } from 'shared/ui/icon';
import { Input } from 'shared/ui/input';
import { Text } from 'shared/ui/text';

interface FileUploadInputProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FileUploadInput: React.FC<FileUploadInputProps> = ({ onChange }) => {
    console.log(onChange)
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
                // onChange={onChange}
            />
        </>
    );
};
