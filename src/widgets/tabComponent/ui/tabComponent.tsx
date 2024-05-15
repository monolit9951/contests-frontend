import React, {ChangeEvent, useState} from 'react';
import clsx from 'clsx';
import {useTheme} from "entities/theme";
import {FileUploadComponent} from "features/fileUploader";
import {Button} from "shared/ui/button";
import {HStack} from "shared/ui/stack";

import './tabComponent.scss';

interface TabComponentProps {
    onFileUpload: (file: File) => void;
    onDeleteFile: () => void;
}

export const TabComponent: React.FC<TabComponentProps> = ({ onFileUpload, onDeleteFile }) => {
    const {theme } = useTheme();
    const [message, setMessage] = useState<string>('');
    const [activeTab, setActiveTab] = useState<'upload' | 'textarea'>('upload');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileSelect = (file: File) => {
        setSelectedFile(file);
    };

    const handleTypeMessage = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(event.target.value);
    };

    const handleUpload = () => {
        if (selectedFile) {
            onFileUpload(selectedFile);
            setSelectedFile(null);
        } else if (message) {
            setMessage('');
        }
    };

    const handleDeleteFile = () => {
        setSelectedFile(null);
        onDeleteFile();
    };
    const getButtonText = () => {
        switch (true) {
            case !!selectedFile && activeTab === 'upload':
                return 'Upload';
            case !!message && activeTab === 'textarea':
                return 'Publish';
            default:
                return 'Submit';
        }
    };
    return (
        <div className={clsx('tab-component', theme)}>
            <HStack className='tab-buttons'>
                <Button
                    variant='clickable-div'
                    className={clsx('tab-button', theme, { active: activeTab === 'upload' })}
                    onClick={() => setActiveTab('upload')}
                >
                    Upload File
                </Button>
                <Button
                    variant='clickable-div'
                    className={clsx('tab-button', theme, { active: activeTab === 'textarea' })}
                    onClick={() => setActiveTab('textarea')}
                >
                    Textarea
                </Button>
            </HStack>
            <div className={clsx('tab-content', theme)}>
                {activeTab === 'upload' ? (
                    <FileUploadComponent onFileSelect={handleFileSelect}
                                         onDelete={handleDeleteFile}
                                         disabled={false}
                                         selectedFile={selectedFile} />
                ) : (
                    <textarea
                        className="textarea"
                        placeholder="Type your message here..."
                        value={message}
                        onChange={handleTypeMessage}
                    />
                )}
                <Button
                    variant="primary"
                    onClick={handleUpload}
                    disabled={!selectedFile && !message}
                    className="upload-button"
                >
                    {getButtonText()}
                </Button>
            </div>
        </div>
    );
};

