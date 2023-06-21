import React, { useState, useEffect } from 'react';
import Transition from '../composants/transition';
import { useNavigate } from 'react-router-dom';
import logo from '../images/aiji2.png';
import bg from '../images/fond.jpg';

import { collection, addDoc, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from '../tools/firebase';



const projetsTitre = ["Artiste", "Football", "Banque", "Lifestyle", "Event"];
const Projet = () => {
    const navigate = useNavigate();
    const [transition, setTransition] = useState(false);
    const [projets, setProjets] = useState([]);
    const [newTransition, setNewTransition] = useState(true);

    useEffect(() => {
        fetchArtist();
    }, [])


    useEffect(() => {
        // Simulate a network request to fetch your content
        // Replace this with your actual loading logic
        const timer = setTimeout(() => {
            setNewTransition(false);
        }, 600); // 3 seconds

        // Clean up the timer on unmount
        return () => clearTimeout(timer);
    }, []);// 


    const fetchArtist = async () => {
        await getDocs(collection(db, "categorie"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setProjets(newData);
            })
    }




    async function makeTransition(path) {
        setTransition(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        navigate(path);
    }

    if (projets.length === 0 || newTransition) return <Transition />
    if (transition) return <Transition />
    return (
        <div style={{ background: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url("${bg}")`, backgroundRepeat: "repeat" }} className='relative w-screen h-screen flex flex-col justify-between ' >
            <div className='h-32 w-full relative md:px-20 px-4 flex  items-start z-10 md:pt-10 pt-5'>
                <div className='w-full items-center flex justify-between'>
                    <div className='md:w-40 w-20  relative' onClick={() => { navigate("/") }}>
                        <img src={logo} className=" object-cover custom-cursor" />
                    </div>
                    <div className='relative flex md:gap-10 gap-5'>
                        <h1 className='text-black md:text-[30px] text-[20px] font-helvetica font-semibold select-none'>WORKS</h1>
                        <h1 className='text-black md:text-[30px] text-[20px] font-bold select-none font-helvetica custom-cursor' onClick={() => { navigate("/aboutMe") }}>ABOUT ME</h1>
                    </div>
                </div>
            </div>
            <div className='absolute w-screen h-screen  flex flex-col justify-center items-center'>
                <div className='flex justify-center items-center'>
                    <div className='md:w-[600px] md:h-[600px] w-[300px] h-[300px]  flex justify-between items-center  text-black'>
                        <div className='flex flex-col justify-start items-start '>
                            {projets.map((projet, index) => {
                                return <div key={index} className='flex flex-row justify-center items-center gap-2 ' onClick={() => { navigate(projet.redirection) }}>
                                    <p className='text-bold font-helvetica md:text-[15px] text-[9px] custom-cursor'>
                                        0{index + 1}
                                    </p>
                                    <h1 className='relative italic text-center items-start  md:text-[64px] text-[40px] font-black h-fit select-none custom-cursor' style={{
                                        color: 'transparent',
                                        WebkitTextFillColor: 'transparent',
                                        WebkitTextStrokeWidth: '1px',
                                        WebkitTextStrokeColor: 'black',
                                    }}>{projet.nom}</h1>
                                </div>
                            })}
                        </div>
                        <div className='flex flex-col justify-end items-end'>
                            <p className='md:text-[20px] text-[16px] font-helvetica'>WORKS</p>
                            <p className='md:text-[16px] text-[12px]'>BY AIJI</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='relative w-full md:px-20 md:pb-10 pb-5 px-4'>
                <div className='flex flex-row justify-between font-avenir lg:text-2xl md:text-[20px] text-[11px]'>
                    <div className='text-black font-extralight'>
                        <h2 className='select-none'>
                            AIJI © 2023. Site web
                        </h2>
                    </div>
                    <div className='text-black font-extralight flex flex-row gap-2'>
                        <a className='custom-cursor' href="https://www.instagram.com/julian.aglr/">IG.</a>
                        <a className='custom-cursor' href="https://www.linkedin.com/in/julianaglr/">LIN.</a>
                        <a className='custom-cursor' href="tel:+41764422516">TEL.</a>
                        <a className='custom-cursor' href="mailto:julian.aglr.alrc@gmail.com">MAIL.</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Projet;
