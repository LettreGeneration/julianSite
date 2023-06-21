import logo from '../images/aiji2.png'
import { useCallback, useMemo, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { db } from '../tools/firebase';
import { and, collection, getDocs, query, where } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import bg from '../images/fond.jpg';
import ImageComponent from '../composants/imageSize';
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { async } from '@firebase/util';
import Transition from '../composants/transition';



function DetailProjet() {
    const { categoryName, detail } = useParams();
    const [lightboxVisible, setLightboxVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [document, setDocument] = useState();
    const navigate = useNavigate();
    const [transition, setTransition] = useState(false);
    const [imageUrls, setImageUrls] = useState([]);
    const [newTransition, setNewTransition] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        // Simulate a network request to fetch your content
        // Replace this with your actual loading logic
        const timer = setTimeout(() => {
            setNewTransition(false);
        }, 600); // 3 seconds

        // Clean up the timer on unmount
        return () => clearTimeout(timer);
    }, []);// 

    const fetchImages = async (monStorage) => {
        const storage = getStorage();
        const folderRef = ref(storage, monStorage); // change 'your-folder-name' to the name of your folder
        listAll(folderRef)
            .then((res) => {
                let urls = [];
                res.items.forEach((itemRef) => {
                    // And finally display them
                    getDownloadURL(itemRef).then((url) => {
                        urls.push(url);
                        setImageUrls((prevUrls) => [...prevUrls, url]);
                    });
                });
            },
            )
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    };

    const openLightbox = (image) => {
        setSelectedImage(image);
        setLightboxVisible(true);
    };

    const closeLightbox = () => {
        setLightboxVisible(false);
    };

    async function makeTransition(path) {
        setTransition(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        navigate(path);
    }
    const fetchData = async () => {
        const q = query(collection(db, categoryName.toLowerCase()), where("slug", "==", detail));
        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs.map(doc => doc.data());
        setDocument(docs[0]);
        await fetchImages(docs[0].storage);
    };

    function removeDuplicatesAndSort(arr) {
        let uniqueArr = [...new Set(arr)];
        let arraySansFiltres = [];
        let arrayOutput = [];
        uniqueArr.map((item, index) => {
            let dict = {}
            var element = item.split("%2F");
            var element2 = parseInt(element[1].split(".jpg")[0]);
            dict["position"] = element2;
            dict["item"] = item;
            arraySansFiltres.push(dict);
        })
        arraySansFiltres.sort((a, b) => (a.position > b.position) ? 1 : ((b.position > a.position) ? -1 : 0))
        arraySansFiltres.map((item) => {
            arrayOutput.push(item["item"])
        })
        return arrayOutput;
    }



    async function makeTransition(path) {
        setTransition(true);
        localStorage.setItem('hasVisited', 'false');
        await new Promise(resolve => setTimeout(resolve, 500));
        navigate(path);
    }
    const [projets, setProjets] = useState([]);

    function splitParagraph(description) {
        return description.split(" <br/> ");
    }

    function splitSepration(separation) {
        let maList = [];
        let maMap = {};
        let monMot = "";
        let symbole = ""
        for (var i = 0; i < separation.length; i++) {
            if (separation[i] != "-" && separation[i] != " ") {
                monMot += separation[i];
            }
            else if (separation[i] == "-") {
                maMap = { "type": symbole, "mot": monMot }
                maList.push(maMap);
                monMot = "";
                symbole = "-";
            }
            else {
                maMap = { "type": symbole, "mot": monMot }
                maList.push(maMap);
                monMot = "";
                symbole = " ";
            }
            if (i == separation.length - 1) {
                maMap = { "type": symbole, "mot": monMot }
                maList.push(maMap);
                monMot = "";
            }
        }
        return maList;
    }


    if ((document == null && imageUrls.length == 0) || newTransition) return <Transition />
    return (
        <>
            <div style={{ background: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url("${bg}")`, backgroundRepeat: "repeat" }} className=' w-screen flex flex-col justify-between' >
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
                <div className='flex justify-center items-center md:my-20 mt-10 mb-20'>
                    <div className='w-4/6'>
                        <div className='md:mt-10 md:my-20 gap-32 grid md:grid-cols-2 grid-cols-1 justify-items-center grid-flow-row'>
                            <div className='lg:w-[500px] lg:h-[500px] w-[300px] h-[300px] bg-[#D8D8D8] border bottom-2 border-black flex justify-center items-center'>
                                {document.slug == "RigoFive" ? <iframe
                                    className='custom-cursor max-w-[60%] max-h-[60%]'
                                    src={`https://www.youtube.com/embed/9_WOqVIW98c`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                                    allowFullScreen
                                    title="Embedded youtube"
                                /> :
                                    <img key={0}
                                        src={removeDuplicatesAndSort(imageUrls)[0]}
                                        alt="" className='custom-cursor max-w-[60%] max-h-[60%]'
                                        onClick={() => openLightbox(removeDuplicatesAndSort(imageUrls)[0])} />}
                            </div>
                            <div className='lg:w-[500px] lg:h-[500px] w-[300px] h-[300px]   bg-[#D8D8D8] border bottom-2 border-black flex justify-start items-end'>
                                <div className='flex flex-col justify-start items-start'>
                                    {splitSepration(document.separation).map((item, index) => {
                                        if (item["type"] == "" || item["type"] == " ") {
                                            return <h1 key={index} className="lg:leading-[0.722] leading-[0.75]  lg:pb-[5px] pb-[1px] pl-[4px] lg:pl-[9px] text-white font-black lg:text-[168px] text-[100px] italic  w-full  ">
                                                {item["mot"]}
                                            </h1>
                                        }
                                        return <h1 key={index} className="leading-[0.8]  text-white font-black lg:text-[150px] text-[77px] italic  w-full  ">
                                            - {item["mot"]}
                                        </h1>
                                    })}
                                </div>
                            </div>
                            <div className='lg:w-[500px] lg:h-[500px] w-[300px] h-[300px]  bg-[#D8D8D8] border bottom-2 border-black flex justify-center items-center lg:text-[25px] md:text-[18px] text-[12px] font-light font-avenir'>
                                <div>

                                    <div className="flex flex-col gap-1">
                                        <div className="flex gap-1">
                                            <h1>{document.type_travail.toUpperCase()} : </h1>
                                            <h1 className="font-semibold italic">AIJI</h1>
                                        </div>
                                        <div className="flex gap-1">
                                            <h1>{document.type_profil.toUpperCase()} : </h1>
                                            <h1 className="font-semibold italic">{document.nom.toUpperCase()}</h1>
                                        </div>

                                        {document.projet != null ?
                                            <div className="flex gap-1">
                                                <h1>PROJET : </h1>
                                                <h1 className="font-semibold italic">{document.projet.toUpperCase()}</h1>
                                            </div>
                                            : null
                                        }

                                        <div className="flex gap-1">
                                            <h1>DATE :  </h1>
                                            <h1 className="font-semibold italic">{document.annee}</h1>
                                        </div>
                                    </div>
                                    <div className="mt-10">
                                        <h1 className="">{document.type_travail_complet.toUpperCase()}</h1>
                                    </div>

                                </div>
                            </div>
                            <div className='lg:w-[500px] lg:h-[500px] w-[300px] h-[300px]   bg-[#D8D8D8] border bottom-2 border-black flex justify-center items-center'>
                                {document.slug == "RigoFive" ? <iframe
                                    className='custom-cursor max-w-[60%] max-h-[60%]'
                                    src={`https://www.youtube.com/embed/Ux18pCo6gsY`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                                    allowFullScreen
                                    title="Embedded youtube"
                                /> :
                                    <img key={1}
                                        src={removeDuplicatesAndSort(imageUrls)[1]}
                                        alt="" className='custom-cursor max-w-[60%] max-h-[60%]'
                                        onClick={() => openLightbox(removeDuplicatesAndSort(imageUrls)[1])} />}
                            </div>
                            <div className='lg:w-[500px] lg:h-[500px] w-[300px] h-[300px]   bg-[#D8D8D8] border bottom-2 border-black flex justify-center items-center'>
                                {document.slug == "RigoFive" ? <iframe
                                    className='custom-cursor max-w-[60%] max-h-[60%]'
                                    src={`https://www.youtube.com/embed/c5-BXhFjnhI`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                                    allowFullScreen
                                    title="Embedded youtube"
                                /> :
                                    <img key={2}
                                        src={removeDuplicatesAndSort(imageUrls)[2]}
                                        alt="" className='custom-cursor max-w-[60%] max-h-[60%]'
                                        onClick={() => openLightbox(removeDuplicatesAndSort(imageUrls)[2])} />}
                            </div>
                            <div className='lg:w-[500px] lg:h-[500px] w-[300px] h-[300px]   bg-[#D8D8D8] border bottom-2 border-black flex justify-center items-center lg:text-[16px] text-[9px] text-justify px-1 font-light font-avenir'>
                                <div className="px-10">
                                    {splitParagraph(document.description).map((item, index) => {
                                        if (index == 0) {
                                            return <p key={index} className="font-bold">{item}<br /><br /></p>;
                                        }
                                        return <p key={index} className="">{item}<br /><br /></p>;
                                    })}
                                </div>
                            </div>
                            {removeDuplicatesAndSort(imageUrls).map((image, index) => {
                                if (index > 2) {
                                    return <div className='lg:w-[500px] lg:h-[500px] w-[300px] h-[300px]   bg-[#D8D8D8] border bottom-2 border-black flex justify-center items-center'>
                                        <img key={index}
                                            src={image}
                                            alt="" className='custom-cursor max-w-[60%] max-h-[60%]'
                                            onClick={() => openLightbox(image)} />
                                    </div>
                                }
                            })}
                            {document.slug == "RigoFive" ?
                                <div className='lg:w-[500px] lg:h-[500px] w-[300px] h-[300px]   bg-[#D8D8D8] border bottom-2 border-black flex justify-center items-center'>
                                    <iframe
                                        className='custom-cursor max-w-[60%] max-h-[60%]'
                                        src={`https://www.youtube.com/embed/DOfCKMWums8`}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                                        allowFullScreen
                                        title="Embedded youtube"
                                    />
                                </div> : null}
                        </div>
                        {lightboxVisible && (
                            <div
                                style={{
                                    position: 'fixed',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    zIndex: 9999,
                                }}
                                onClick={closeLightbox}
                            >
                                <img src={selectedImage} alt="" style={{ maxHeight: '90%', maxWidth: '90%' }} />
                            </div>
                        )}

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
        </>
    )
}

export default DetailProjet;
