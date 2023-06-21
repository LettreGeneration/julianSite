import React, { useState, useEffect } from 'react';
import logo from '../images/aiji.png';

const Transition = () => {
    const imageUrls = ['https://i.pinimg.com/750x/79/59/77/795977cec85b44b196babf110d06a599.jpg',
        'https://i.pinimg.com/originals/a3/7b/1b/a37b1b35e4b215b1dde4d958a8189a51.png',
        'https://i.pinimg.com/originals/33/8b/cc/338bcc64daaf56c6f7ee164bb49733b6.png']; // Replace these with your image URLs
    const [images, setImages] = useState([]);
    const [index, setIndex] = useState(0);
    const imageUrls2 = [
        'https://i.pinimg.com/originals/be/70/10/be70107502bbae864069ec13c286154d.png',
        'https://i.pinimg.com/originals/fd/ea/56/fdea56bc608cab64524a74fb1f976ebc.png',
        'https://i.pinimg.com/originals/ec/86/e5/ec86e5b1fd6a2f1e4bef6154cd41a4e7.png',
        'https://i.pinimg.com/originals/1a/b6/55/1ab6556cfbbb06336f5211d6ea620c17.png'
    ]; // Replace these with your image URLs
    const [images2, setImages2] = useState([]);
    const [index2, setIndex2] = useState(0);

    // Preload images
    useEffect(() => {
        const loadImages = imageUrls.map((url) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = url;
                img.onload = () => resolve(img.src);
                img.onerror = reject;
            });
        });

        Promise.all(loadImages)
            .then((loadedImages) => {
                setImages(loadedImages);
            })
            .catch((error) => console.log('Failed to preload images', error));
    }, [imageUrls]);



    // Preload images
    useEffect(() => {
        const loadImages2 = imageUrls2.map((url) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = url;
                img.onload = () => resolve(img.src);
                img.onerror = reject;
            });
        });

        Promise.all(loadImages2)
            .then((loadedImages2) => {
                setImages2(loadedImages2);
            })
            .catch((error) => console.log('Failed to preload images', error));
    }, [imageUrls2]);


    // Cycle through images
    useEffect(() => {
        if (images.length === 0) return; // Don't start the loop if the images haven't loaded yet

        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 80); // Change image every 3 seconds

        // Cleanup function to clear the interval when the component is unmounted
        return () => clearInterval(interval);
    }, [images.length]);

    // Cycle through images
    useEffect(() => {
        if (images2.length === 0) return; // Don't start the loop if the images haven't loaded yet

        const interval = setInterval(() => {
            setIndex2((prevIndex) => (prevIndex + 1) % images2.length);
        }, 140); // Change image every 3 seconds

        // Cleanup function to clear the interval when the component is unmounted
        return () => clearInterval(interval);
    }, [images2.length]);

    return (
        <div className='w-screen h-screen relative flex justify-center items-center'>
            <div className='flex w-screen h-screen absolute'>
                <div className='w-full h-screen'>
                    {images.length > 0 && <img className='w-full h-full object-cover' src={images[index]} alt="looping through images" />}
                </div>
                <div className='w-full h-sceen'>
                    {images2.length > 0 && <img className='w-full h-full object-cover' src={images2[index2]} alt="looping through images" />}
                </div>
            </div>
            <div className='h-32 w-40 relative'>
                <img src={logo} className=" object-cover" />
            </div>
        </div>
    );
};

export default Transition;
