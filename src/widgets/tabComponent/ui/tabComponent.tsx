import React, { useState } from 'react';
import clsx from 'clsx';
import {useTheme} from "entities/theme";
import {FileUploadComponent} from "features/fileUploader";
import {Button} from "shared/ui/button";

import './tabComponent.scss';

interface TabComponentProps {
    onFileUpload: (file: File) => void;
    onDeleteFile: () => void;
}

export const TabComponent: React.FC<TabComponentProps> = ({ onFileUpload, onDeleteFile }) => {
    const [activeTab, setActiveTab] = useState<'upload' | 'textarea'>('upload');
    const {theme } = useTheme();
    return (
        <div className="tab-component">
            <div className="tab-buttons">
                <Button
                    variant='primary'
                    className={clsx('tab-button', { active: activeTab === 'upload' })}
                    onClick={() => setActiveTab('upload')}
                >
                    Upload File
                </Button>
                <Button
                    variant='primary'
                    className={clsx('tab-button', { active: activeTab === 'textarea' })}
                    onClick={() => setActiveTab('textarea')}
                >
                    Textarea
                </Button>
            </div>
            <div className={clsx('tab-content', theme)}>
                {activeTab === 'upload' ? (
                    <FileUploadComponent onUpload={onFileUpload} onDelete={onDeleteFile} disabled={false} />
                ) : (
                    <textarea className="textarea" placeholder="Enter your text here" />
                )}
            </div>
        </div>
    );
};

