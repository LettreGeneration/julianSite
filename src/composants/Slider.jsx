import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import { useNavigate } from 'react-router-dom';
import { useCallback, useMemo, useRef, useState } from "react";

import '@splidejs/splide/dist/css/themes/splide-default.min.css';


export default function MySlider({ imagesUrls, categorie }) {

    const [transition, setTransition] = useState(false);
    const navigate = useNavigate();
    async function makeTransition(path) {
        setTransition(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        navigate(path);
    }

    async function makeTransition(path) {
        setTransition(true);
        localStorage.setItem('hasVisited', 'false');
        await new Promise(resolve => setTimeout(resolve, 500));
        navigate(path);
    }
    return (
        <div className='w-full lg:h-96 '>
            <Splide
                options={{
                    type: 'loop',
                    drag: 'free',
                    arrows: false,
                    pagination: false,
                    padding: '0%',
                    margin: '0%',
                    autoScroll: {
                        speed: 0.6,
                    }, // change slides every 2 seconds
                }}
                extensions={{ AutoScroll }}>
                <SplideSlide>
                    <div className='flex flex-row gap-2 items-center justify-center '>
                        {imagesUrls.map((url, index) => {
                            if (index == 0) {
                                return <div key={index} className='relative w-full h-full ml-2 justify-center flex items-end lg:text-[35px] md:text-[25px] text-[12px]  hover:text-opacity-100 text-opacity-0 text-white font-bold font-forma custom-cursor' onClick={() => { navigate(`/projets/${categorie}/${url.slug}`) }}>
                                    <img className='object-cover absolute custom-cursor' src={url.image_background} alt={url.nom} />
                                    <div className='h-full w-9/12 relative flex flex-col custom-cursor justify-center items-start lg:py-20 md:py-10 py-4'>
                                        <h1 className='relative custom-cursor font-helvetica leading-[1]'>{url.nom.toUpperCase()}</h1>
                                        <h1 className='relative custom-cursor lg:text-[25px] md:text-[16px] text-[9px] font-light leading-[1.2]'>{url.type_travail_complet}</h1>
                                    </div>
                                </div>
                            }
                            return <div key={index} className='relative w-full h-full flex justify-center items-end lg:text-[35px] md:text-[25px] text-[12px] hover:text-opacity-100 text-opacity-0 text-white font-bold font-forma custom-cursor' onClick={() => { navigate(`/projets/${categorie}/${url.slug}`) }}>
                                <img className='object-contain absolute custom-cursor' src={url.image_background} alt={url.nom} />
                                <div className='h-full w-9/12 relative flex flex-col custom-cursor justify-center lg:items-start lg:py-20 md:py-10 py-4'>
                                    <h1 className='relative custom-cursor font-helvetica leading-[1]'>{url.nom.toUpperCase()}</h1>
                                    <h1 className='relative custom-cursor lg:text-[25px] md:text-[16px]  text-[9px] font-light leading-[1.2]'>{url.type_travail_complet}</h1>
                                </div>
                            </div>
                        })}
                    </div>
                </SplideSlide>
                {/* Add as many SplideSlide components as you need */}
            </Splide>
        </div>
    );
}
