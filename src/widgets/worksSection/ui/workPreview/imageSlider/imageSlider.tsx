import React, { useState } from 'react';

import './imageSlider.scss';

interface ImageSliderProps {
    images: string[];
}


export const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? images.length - 1 : prevSlide - 1));
    };

    const handleDotClick = (index: number) => {
        setCurrentSlide(index);
    };

    return (
        <div className="image-slider">
            <div className="slider-wrapper" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {images.map((image, index) => (
                    <div key={index} className="slide" style={{ backgroundImage: `url(${image})` }} />
                ))}
            </div>
            <div className="dots-slider">
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => handleDotClick(index)}
                    />
                ))}
            </div>
            <button className="prev-btn" onClick={prevSlide}>&#x25C0;</button>
            <button className="next-btn" onClick={nextSlide}>&#x25B6;</button>
        </div>
    );
};
