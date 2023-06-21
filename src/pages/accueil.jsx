import '../styles/whiteAnimation.css'; // adjust path as necessary
import { createContext, useContext, useEffect, useState, useRef } from 'react';
import logo from '../images/aiji2.png';
import { useNavigate } from 'react-router-dom';
import Transition from '../composants/transition';
import FirstTransition from '../composants/firstTransition';
import { firstLoginContext, setFirstLoginContext } from '../App';
import bg from '../images/fond.jpg';


export default function Home() {

    const firstLogin = useContext(firstLoginContext);
    const setFirstLogin = useContext(setFirstLoginContext);
    const imageUrls = ['https://firebasestorage.googleapis.com/v0/b/website-julian.appspot.com/o/photos_transitions%2Fcarre1.jpeg?alt=media&token=db3ceabb-ef2b-471a-80f6-ce5dee9a85c9',
        'https://firebasestorage.googleapis.com/v0/b/website-julian.appspot.com/o/photos_transitions%2Fcarre2.jpeg?alt=media&token=04ccd3c2-aaff-4f47-8153-2ba0df614590',
        'https://firebasestorage.googleapis.com/v0/b/website-julian.appspot.com/o/photos_transitions%2Fcarre3.jpeg?alt=media&token=ad900f3f-4502-475b-87a5-3dbc0e03f2ad',
        'https://firebasestorage.googleapis.com/v0/b/website-julian.appspot.com/o/photos_transitions%2Fcarre4.jpeg?alt=media&token=bcd0682e-e91f-4c2f-9dba-e62e6577e0d0',
        'https://firebasestorage.googleapis.com/v0/b/website-julian.appspot.com/o/photos_transitions%2Fcarre5.jpeg?alt=media&token=753f5de0-47c8-443a-a939-e0a42dac1bfb',
        'https://firebasestorage.googleapis.com/v0/b/website-julian.appspot.com/o/photos_transitions%2Fcarr6.jpeg?alt=media&token=3e7b00f7-3741-43b4-abe0-f0cf772bd720'
    ];
    const [images, setImages] = useState([]);
    const [index, setIndex] = useState(0);
    const [transition, setTransition] = useState(false);
    const navigate = useNavigate();
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [touchStartY, setTouchStartY] = useState(null);
    const [firstTransition, setFirstTransition] = useState(true);
    const [newTransition, setNewTransition] = useState(true);
    const [whiteAnimation, setFirstWhiteAnimation] = useState(false);
    const [loading, setLoading] = useState(true);
    const counter = useRef(0);

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



    useEffect(() => {
        // Simulate a network request to fetch your content
        // Replace this with your actual loading logic
        if (firstLogin) {
            setNewTransition(false);
            setFirstLogin(false);
            setFirstWhiteAnimation(true);
        }
        else {
            const timer = setTimeout(() => {
                setNewTransition(false);
            }, 500); // 3 seconds
            // Clean up the timer on unmount
            return () => clearTimeout(timer);
        }
    }, []);



    // Cycle through images
    useEffect(() => {
        if (images.length === 0) return; // Don't start the loop if the images haven't loaded yet

        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 150); // Change image every 3 seconds

        // Cleanup function to clear the interval when the component is unmounted
        return () => clearInterval(interval);
    }, [images.length]);



    const handleTouchStart = (e) => {
        // For touch events
        if (e.touches) setTouchStartY(e.touches[0].clientY);
        // For mouse events
        else setTouchStartY(e.clientY);
    }

    const handleTouchEnd = (e) => {
        let touchEndY;
        // For touch events
        if (e.changedTouches) touchEndY = e.changedTouches[0].clientY;
        // For mouse events
        else touchEndY = e.clientY;

        if (touchEndY < touchStartY) {
            makeTransition("/projets");
        }
    }

    async function makeTransition(path) {
        setTransition(true);
        localStorage.setItem('hasVisited', 'false');
        await new Promise(resolve => setTimeout(resolve, 500));
        navigate(path);
    }



    if (newTransition) return <Transition />
    return <div style={{ background: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url("${bg}")`, backgroundRepeat: "repeat" }} className={`relative w-screen h-screen ${whiteAnimation ? 'fadeOut' : 'bg-white'}`}>
        <div className='w-screen h-screen absolute z-0 object-contain opacity-80 flex justify-center items-center'>
            {images.length > 0 && <img className="2xl:w-[600px] 2xl:h-[600px] md:h-[400px]  md:w-[400px] h-[300px] w-[300px] object-cover" src={images[index]} alt="looping through images" />}
        </div>

        <div className=' relative w-screen h-screen flex flex-col items-center justify-between md:py-10 py-5'>

            <div className='h-32 w-full relative md:px-20 px-4 flex  items-start z-10'>
                <div className='w-full items-center flex justify-between'>
                    <div className='md:w-40 w-20  relative'>
                        <img src={logo} className=" object-cover" />
                    </div>
                    <div className='relative flex md:gap-10 gap-5'>
                        <h1 className='text-black md:text-[30px] text-[20px] font-helvetica font-semibold custom-cursor select-none' onClick={() => { navigate("/projets") }}>WORKS</h1>
                        <h1 className='text-black md:text-[30px] text-[20px] font-bold select-none font-helvetica custom-cursor' onClick={() => { navigate("/aboutMe") }}>ABOUT ME</h1>
                    </div>
                </div>
            </div>
            <div className='lg:h-[250px] md:h-[350px] h-[150px] flex flex-col items-start  justify-start '>
                <h1 className='leading-[0.9] md:tracking-[-3px] relative italic text-center items-start lg:text-[90px] md:text-[90px] text-[30px] font-black h-fit select-none ' style={{
                    color: 'transparent',
                    WebkitTextFillColor: 'transparent',
                    WebkitTextStrokeWidth: '1px',
                    WebkitTextStrokeColor: 'black',
                }}>HELLO. IT'S AIJI <br /> A YOUNG ART DIRECTOR</h1>
            </div>
            <div className='w-full md:px-20 px-4'>
                <div className='flex flex-row justify-between font-avenir lg:text-2xl md:text-[20px] text-[11px] text-black'>
                    <div className=' font-extralight '>
                        <a href="mailto:julian.aglr.alrc@gmail.com"><h1 className='custom-cursor select-none'>julian.aglr.alrc@gmail.com</h1></a>
                        <a href="https://www.linkedin.com/in/julianaglr/"><h1 className='custom-cursor select-none'>https://www.linkedin.com/in/julianaglr/</h1></a>
                    </div>
                    <div className=' font-extralight flex flex-col items-end'>
                        <h2 className='select-none'>
                            © Site web
                        </h2>
                        <h2 className='select-none'>
                            Julian Aguilar 2023
                        </h2>
                    </div>
                </div>

            </div>
        </div>
    </div>
}




