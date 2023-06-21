
import React, { useState, useEffect, useRef } from 'react';
import Transition from '../composants/transition';
import { useNavigate } from 'react-router-dom';
import logo from '../images/aiji2.png';
import bg from '../images/fond.jpg';
import MySlider from '../composants/Slider';
import { useParams } from 'react-router-dom';
import { db } from '../tools/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';




function Julian() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const imageRefs = useRef([]);
  const [artistes, setArtistes] = useState([]);
  const [document, setDocument] = useState();
  const navigate = useNavigate();
  const [transition, setTransition] = useState(false);
  const [newTransition, setNewTransition] = useState(true); // Replace these with your image URLs


  useEffect(() => {
    // Simulate a network request to fetch your content
    // Replace this with your actual loading logic
    const timer = setTimeout(() => {
      setNewTransition(false);
    }, 600); // 3 seconds

    // Clean up the timer on unmount
    return () => clearTimeout(timer);
  }, []);//


  async function makeTransition(path) {
    setTransition(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    navigate(path);
  }

  if (newTransition) return <Transition />
  return (
    <div className="w-screen md:min-h-screen bg-cover" style={{ backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/website-julian.appspot.com/o/aboutme%2FCapture%20d%E2%80%99e%CC%81cran%202023-06-20%20a%CC%80%2017.59.13.jpeg?alt=media&token=a7106126-7934-4681-b5e4-205499e6b7a9")` }}>

      <div className='h-32 w-full relative md:px-20 px-4 flex  items-start z-10 md:pt-10 pt-5'>
        <div className='w-full items-center flex justify-between'>
          <div className='md:w-40 w-20  relative' onClick={() => { navigate("/") }}>
            <img src={logo} className=" object-cover custom-cursor" />
          </div>
          <div className='relative flex md:gap-10 gap-5 '>
            <h1 className='text-black md:text-[30px] text-[20px] font-helvetica font-semibold custom-cursor select-none' onClick={() => { navigate("/projets") }}>WORKS</h1>
            <h1 className='text-black md:text-[30px] text-[20px] font-bold select-none font-helvetica'>ABOUT ME</h1>
          </div>
        </div>
      </div>

      <div className='flex h-max w-full justify-center mt-12'>
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-end lg:flex-row flex-col">
            <div className="lg:w-1/2 text-black px-10 2xl:text-xl md:text-sm  text-base relative font-avenir text-justify">
              <p><span className="font-bold text-xl">Crayon, </span><br /> <br />
                En tant qu’écrivain, on considère le crayon comme l’unique fidèle. Cet outil, nous suit partout où qu’on aille, dans tous les moments, dans chaque étape de vie, chaque ligne. Le temps passe et la trace qu’il laisse est plus qu’un simple trait, c’est l’histoire. Un crayon a une histoire, une vie et on peut tout aussi bien la liée à la nôtre. Ces quelques lignes vont justement aborder ce lien et ce parallèle. Un parallèle commençant dans celui qui en fait mauvais usage. Le crayon neuf, tout récent, fraîchement née, peut être détruit. On peut le casser à de multiples occasions, on peut le forcer à écrire et à l’user jusqu’à appuyer pour qu’il se rétrécisse sous l’impuissance de notre force. Le mal est dans toutes les mains qui ne savent pas faire usage du crayon. Chaque crayon à son écrivain, celui-ci est l’unique à pouvoir faire ressortir le meilleur de ce crayon. Malheureusement, avant que l’écriture et l’écrivain ne se rencontrent, il faut du temps, laissant le crayon entre de mauvaise mains. C’est entre ses mains qu’il se raccourcit, se casse et devient de moins en moins accessible aux mains d’autrui. Jusqu’au moment où il tombe de les mains de celui qui va en faire l’usage de la plus belle des manières. L’histoire du crayon est un parallèle à celui de nos cœurs, de nos vies. On a beau passer par le pire, un jour, on rencontrera ceux qui nous ferons vivre le meilleur et qui nous ferons sentir ce que l’on est vraiment. Un texte en symbiose entre un crayon et un écrivain. Un parallèle à cette créativité que j’ai découvert et où ma plume ne cesse de s’aiguiser.
                <br /> <br />En y croyant et en osant, on ne peut pas garantir la réussite. Mais en arrêtant d’y croire, on peut garantir que ça échouera alors pourquoi ne pas essayer ?</p><br />
              <p className='text-end font-bold italic'>AIJI</p>
            </div>
            <div className="lg:w-1/2 text-black lg:text-white px-10 lg:pl-40 md:text-lg text-base lg:py-0 pt-10 pb-20 relative font-avenir text-justify flex items-end">
              <p className='leading-[1.3]'><span className='md:text-2xl text-lg font-bold font-helvetica md:pb-0'>JULIAN AGUILAR</span><br />16.11.1998<br />SUISSE - ESPAGNOL<br />FROM GENEVA</p>
            </div>
          </div>
        </div>
      </div>
      <div class="md:absolute md:bottom-0 md:left-0 md:right-0 md:pb-10 pb-5">
        <div className='w-full md:px-20 px-4'>
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
    </div>
  );
}

export default Julian;
