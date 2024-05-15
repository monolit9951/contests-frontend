import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {Button} from "shared/ui/button";
import {Flex, VStack} from "shared/ui/stack";
import {Text} from "shared/ui/text";

import './upload.scss';

interface FileUploadProps {
    onFileSelect: (file: File) => void;
    onDelete: () => void;
    disabled: boolean;
    selectedFile: File | null;
}

export const FileUploadComponent: React.FC<FileUploadProps> = ({ onFileSelect, disabled, onDelete, selectedFile }) => {
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {}, [selectedFile]);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            onFileSelect(file);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragOver(true);
    };

    const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragOver(false);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragOver(false);
        const file = event.dataTransfer.files[0];
        onFileSelect(file);
    };

    const handleDelete = () => {
        onDelete();
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleCustomButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <VStack className="align__center upload-wrapper">
            <div
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={dragOver ? 'drag-over' : 'drop-disabled'}
            >
                <input ref={fileInputRef} type="file" onChange={handleFileChange} style={{display: 'none'}}
                       disabled={disabled}/>
                <Button variant="ghost" onClick={handleCustomButtonClick} disabled={disabled}>
                    {selectedFile ? 'Choose another one' : 'Choose a file'}
                </Button>
                {selectedFile && (
                    <Flex className="align__center">
                        <Text Tag='p'>{selectedFile.name}</Text>
                        <Button variant="secondary" onClick={handleDelete} className='x'>
                            x
                        </Button>
                    </Flex>
                )}
            </div>
        </VStack>
    );
};
