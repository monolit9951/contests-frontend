import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import upload from 'shared/assets/icons/upload.svg';
import { allowedMediaTypes } from "shared/helpers/allowedMediaTypes";
import { useAlert } from "shared/lib/hooks/useAlert/useAlert";

import './uploadWorkMediaInput.scss';

interface UploadWorkMediaInputInterface {
  handleMediaInputCallback: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


const UploadWorkMediaInput: FC<UploadWorkMediaInputInterface> = ({ handleMediaInputCallback }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const {showAlert, Alert} = useAlert()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if(event.target.files !== null && allowedMediaTypes.includes(event.target.files[0].type)){
      handleMediaInputCallback(event);
      if (inputRef.current) inputRef.current.value = '';
    } else {
      showAlert('Error', 'Invalid type of media')
    }
  };

  useEffect(() => {
    const onDragEnter = (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(true);
    };

    const onDragLeave = (e: DragEvent) => {
      e.preventDefault();
      if (e.relatedTarget === null) setIsDragging(false);
    };

    const onDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    const onDrop = (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      if (e.dataTransfer?.files && inputRef.current) {
        const fileList = new DataTransfer();
        Array.from(e.dataTransfer.files).forEach(file => fileList.items.add(file));
        inputRef.current.files = fileList.files;

        // вручную вызвать change, т.к. inputRef.current.value не обновляется
        const event = new Event('change', { bubbles: true });
        inputRef.current.dispatchEvent(event);
      }
    };

    window.addEventListener("dragenter", onDragEnter);
    window.addEventListener("dragleave", onDragLeave);
    window.addEventListener("dragover", onDragOver);
    window.addEventListener("drop", onDrop);

    return () => {
      window.removeEventListener("dragenter", onDragEnter);
      window.removeEventListener("dragleave", onDragLeave);
      window.removeEventListener("dragover", onDragOver);
      window.removeEventListener("drop", onDrop);
    };
  }, []);

  return (
    // поменять драгинг, пока что базовый, через псевдокласс афтер
    <div className={`uploadWorkMediaInput ${isDragging ? 'uploadWorkMediaInput--dragging' : ''}`}>
       {/* eslint-disable-next-line */}
      <div className="uploadWorkMediaInput_container" onClick={() => inputRef.current?.click()}>
        <div className="uploadWorkMediaInput_explain">
          Drag and drop your file here or
        </div>
        <div className="uploadWorkMediaInput_decorativeButton">
          <div className="uploadWorkMediaInput_decorativeButton_container">
            <span>Upload</span>
            <img src={upload} alt="Upload" />
          </div>
        </div>
      </div>
      <input type="file" ref={inputRef} onChange={handleChange} hidden />
      <Alert />
    </div>
  );
};

export default UploadWorkMediaInput;
