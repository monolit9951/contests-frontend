import { FC, useCallback,useState } from 'react'
import Cropper, { Area } from 'react-easy-crop'
import { Button } from 'shared/ui/button'

import getCroppedImg from '../model/cropImage'

import './imageCropper.scss'

interface ImageCropperInterface {
  imageSrc: string | null
  aspect?: number // Например, 4/3, 1/1
  onCropComplete: (croppedImage: Blob) => void
}

const ImageCropper: FC <ImageCropperInterface> = ({ imageSrc, onCropComplete, aspect}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

  const onCropCompleteHandler = useCallback((_: any, croppedAreaPixels2: any) => {
    setCroppedAreaPixels(croppedAreaPixels2)
  }, [])

  const handleDone = async () => {
    if(imageSrc !== null && croppedAreaPixels !== null){
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels)
      onCropComplete(croppedImage)
    }
  }

  return (
    <div className="crop_container">
      {imageSrc !== null &&<Cropper
        image={imageSrc}
        crop={crop}
        zoom={zoom}
        aspect={aspect}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropCompleteHandler}
      />}
      <div className="crop_container_button">
        <Button onClick={handleDone} type='button' variant='secondary'>Countinue</Button>
        {/* <button onClick={handleDone} type='button' >Submit</button> */}
      </div>
    </div>
  )
}

export default ImageCropper
