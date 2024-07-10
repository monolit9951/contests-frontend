import React, { useState } from 'react'
import clsx from 'clsx'
import { Media } from 'entities/media'

import './imageSlider.scss'

interface ImageSliderProps {
    images: Media[]
}

export const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [showButton, setShowButton] = useState(true)

    const nextSlide = () => {
        setShowButton(false)

        setCurrentSlide((_prev) =>
            _prev === images.length - 1 ? 0 : _prev + 1
        )
        setTimeout(() => {
            setShowButton(true)
        }, 550)
    }

    const prevSlide = () => {
        setShowButton(false)
        setCurrentSlide((_prev) =>
            _prev === 0 ? images.length - 1 : _prev - 1
        )
        setTimeout(() => {
            setShowButton(true)
        }, 550)
    }

    const handleDotClick = (index: number) => {
        setCurrentSlide(index)
    }

    return (
        <div className='image-slider'>
            <div
                className='slider-wrapper'
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {images.map(({ id, mediaLink }) => (
                    <div
                        key={id}
                        className='slide'
                        style={{ backgroundImage: `url(${mediaLink})` }}
                    />
                ))}
            </div>
            <div className='dots-slider'>
                {images.map((_, index) => (
                    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
                    <span
                        key={index}
                        className={clsx(
                            'dot',
                            index === currentSlide && 'active'
                        )}
                        onClick={() => handleDotClick(index)}
                    />
                ))}
            </div>
            {currentSlide !== 0 && showButton && (
                <button type='button' className='prev-btn' onClick={prevSlide}>
                    &#x25C0;
                </button>
            )}
            {currentSlide !== images.length - 1 && showButton && (
                <button type='button' className='next-btn' onClick={nextSlide}>
                    &#x25B6;
                </button>
            )}
        </div>
    )
}
