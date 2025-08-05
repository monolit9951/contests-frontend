import { FC, useCallback,useState } from 'react'
import Cropper from 'react-easy-crop'
import { Button } from 'shared/ui/button'

import getCroppedImg from '../model/cropImage'

import './imageCropper.scss'

interface ImageCropperInterface {
  imageSrc: String | null
  aspect?: number // Например, 4/3, 1/1
  onCropComplete: (croppedImage: Blob) => void
}

const ImageCropper: FC <ImageCropperInterface> = ({ imageSrc, onCropComplete, aspect}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const onCropCompleteHandler = useCallback((_: any, croppedAreaPixels2: any) => {
    setCroppedAreaPixels(croppedAreaPixels2)
  }, [])

  const handleDone = async () => {
    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels)
    onCropComplete(croppedImage)
  }

  return (
    <div className="crop_container">
      <Cropper
        image={imageSrc}
        crop={crop}
        zoom={zoom}
        aspect={aspect}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropCompleteHandler}
      />
      <div className="crop_container_button">
        <Button onClick={handleDone} type='button' variant='secondary'>Countinue</Button>
        {/* <button onClick={handleDone} type='button' >Submit</button> */}
      </div>
    </div>
  )
}

export default ImageCropper
