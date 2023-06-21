import React, { useState, useEffect } from 'react';
import logo from '../images/aiji.png';



const Transition = () => {
    const colors = [
        'bg-black',
        'bg-[#FFD0A8]',
        'bg-[#FFB575]',
        'bg-[#FF9942]',
        'bg-[#59B1C2]',
        'bg-[#E3FAFF]',
    ]; //


    const [index, setIndex] = useState(0);
    
    // Cycle through images
    useEffect(() => {
        if (colors.length === 0) return; // Don't start the loop if the images haven't loaded yet

        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % colors.length);
        }, 300); // Change image every 3 seconds
        
        // Cleanup function to clear the interval when the component is unmounted
        return () => clearInterval(interval);
    }, [colors.length]);



    return (
        <div className={`w-screen h-screen relative flex justify-center items-center ${colors[index]}`}>
            <div className='h-40 w-60 relative'>
                <img src={logo} className=" object-cover" />
            </div>
        </div>
    );
};

export default Transition;
