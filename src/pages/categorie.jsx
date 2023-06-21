import React, { useState, useEffect, useRef } from 'react';
import Transition from '../composants/transition';
import { useNavigate } from 'react-router-dom';
import logo from '../images/aiji2.png';
import bg from '../images/fond.jpg';
import MySlider from '../composants/Slider';
import { useParams } from 'react-router-dom';
import { db } from '../tools/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';


const projetsTitre = ["Artiste", "Football", "Banque", "Lifestyle", "Event"];


const Categorie = () => {

    const { categoryName } = useParams();
    const [activeIndex, setActiveIndex] = useState(0);
    const [completed, setCompleted] = useState(false);
    const imageRefs = useRef([]);
    const [artistes, setArtistes] = useState([]);
    const [document, setDocument] = useState();
    const [newTransition, setNewTransition] = useState(true);


    useEffect(() => {
        fetchData();
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


    const fetchArtists = async () => {
        await getDocs(collection(db, categoryName.toLowerCase()))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setArtistes(newData);
            })
    }


    const fetchData = async () => {
        const q = query(collection(db, "categorie"), where("nom", "==", categoryName));

        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs.map(doc => doc.data());
        setDocument(docs[0]);
    };
    const src = "https://images.unsplash.com/photo-1516981442399-a91139e20ff8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEzfHxyYXB8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60";
    const navigate = useNavigate();
    const [transition, setTransition] = useState(false); // Replace these with your image URLs



    async function makeTransition(path) {
        setTransition(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        navigate(path);
    }
    if (!projetsTitre.includes(categoryName)) {
        return <h1>Category not found</h1>;
    }

    if (transition) return <Transition />
    if (document == null || newTransition) return <Transition />
    return (
        <div style={{ background: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url("${bg}")`, backgroundRepeat: "repeat" }}  className='relative w-screen h-screen flex flex-col justify-between md:pb-10 pb-5' >

            <div className='absolute w-screen h-screen  flex flex-col justify-center items-center text-black py-10'>
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='relative italic text-center items-start lg:text-[80px] md:text-[60px] text-[40px] font-black h-fit select-none mb-10 ' style={{
                        color: 'transparent',
                        WebkitTextFillColor: 'transparent',
                        WebkitTextStrokeWidth: '1px',
                        WebkitTextStrokeColor: 'black',
                    }}>{document.nom}</h1>
                    <div className='w-4/5 mb-10 md:text-[20px] text-[12px] font-avenirNext font-light  text-justify'>
                        <p>{document.description}</p>
                    </div>
                    <div className='w-screen'>
                        <MySlider imagesUrls={document.items} categorie={document.nom} />
                    </div>
                </div>

            </div>
            <div className='h-32 w-full relative md:px-20 px-4 flex  items-start z-10 md:pt-10 pt-5'>
                <div className='w-full items-center flex justify-between'>
                    <div className='md:w-40 w-20  relative' onClick={() => { navigate("/") }}>
                        <img src={logo} className=" object-cover custom-cursor" />
                    </div>
                    <div className='relative flex md:gap-10 gap-5'>
                        <h1 className='text-black md:text-[30px] text-[20px] font-helvetica font-semibold custom-cursor select-none' onClick={() => { navigate("/projets") }}>WORKS</h1>
                        <h1 className='text-black md:text-[30px] text-[20px] font-bold select-none font-helvetica custom-cursor' onClick={() => { navigate("/aboutMe") }}>ABOUT ME</h1>
                    </div>
                </div>
            </div>

            <div className='relative w-full md:px-20 px-4'>
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

export default Categorie;
