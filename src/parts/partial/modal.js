import { useEffect, useState } from "react";
import { img_500 } from "../../config/config";
import { unavailableLandscape } from "../../config/config";
import { img_300 } from "../../config/config";
import { noPicture } from "../../config/config";

const Modal = (prop) => {
    const setModal = prop.setModal;
    const type = prop.type;
    const mid = prop.mid;
    const [data, setData] = useState({});
    const [link, setLink] = useState(``);
    const [credits, setCredits] = useState([]);
    const [crew, setCrew] = useState([]);


    const handleClick = () => {
        setModal(false);
    }
    const dataReq = async () => {
        const url = `https://api.themoviedb.org/3/${type}/${mid}?api_key=baa2f39af2ebd5604c32fe6a7b3162e5&language=en-US`;
        const res = await fetch(url);
        const resJson = await res.json();
        if (resJson) {
            setData(resJson);
        }
    }


    const videoReq = async () => {
        const url = `https://api.themoviedb.org/3/${type}/${mid}/videos?api_key=baa2f39af2ebd5604c32fe6a7b3162e5&language=en-US`;

        const res = await fetch(url);
        const resJson = await res.json();
        if (resJson.results) {
            setLink(resJson.results[0].key);
        }
    }

    const fetchCredits = async () => {
        const url = `https://api.themoviedb.org/3/${type}/${mid}/credits?api_key=baa2f39af2ebd5604c32fe6a7b3162e5&language=en-US`;
        const res = await fetch(url);
        const resJson = await res.json();
        if (resJson) {
            // console.log(resJson.cast);
            setCredits(resJson.cast);
            setCrew(resJson.crew);

        }
    }

    useEffect(() => {
        videoReq();
        dataReq();
        fetchCredits();
    }, [])
    const poster = data.backdrop_path;
    const title = data.title || data.name;
    const overview = data.overview

    return (
        <>
            <div className="bg-zinc-100 opacity-80  fixed inset-0 z-40"></div>
            <div className="flex h-screen justify-center items-center fixed inset-0 z-50">
                <div className="md:grid md:grid-cols-4 rounded-lg bg-white p-2  ">
                    <div className="w-full md:col-span-2 flex justify-center ">
                        <img src={poster ? `${img_500}/${poster}` : unavailableLandscape} alt={title} className=" rounded-lg  flex-col object-cover sm:w-3/4 w-full md:w-full md:h-full " /> 
                        
                    </div>
                    <div className=" md:col-span-2 ml-2">

                            <h1 className="font-bold">{title}</h1>
                            <span className="text-gray-700 italic">{data.tagline}</span>
                            <p className="text-justify text-sm mb-2 ">{overview}</p>
                        
                        <div className="grid grid-cols-3 gap-2 md:gap-3 lg:gap-2 md:grid-cols-3 lg:grid-cols-4  overflow-y-scroll h-40 md:h-52 shadow-inner border-black border-2 p-0 overflow-auto rounded-md">
                            {credits && credits.map((c) => (
                                <div className = " w-2full border-2 rounded-md shadow-sm m-2" >
                                    <img
                                        src={c.profile_path? `${img_300}/${c.profile_path}` : noPicture}
                                        alt="Image"
                                        className = "w-full rounded-t-md"
                                        style={{height: '80%'}}
                                    />
                                    <p style={{height: '20%'}} className="text-xs p-2 bg-black text-white w-full rounded-b-md">{c.name}</p>
                                </div>
                            ))}
                        </div> 

                        <div className="flex justify-between mt-2">
                            {link && <a className=" bg-black text-white  hover:bg-zinc-500 duration-200 ease-in-out hover:text-white px-2 p-1 pb-2 rounded-lg " href={`https://www.youtube.com/watch?v=${link}`} target="_blank" rel="noreferrer">Trailer<svg className="w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg></a>}
                            <button onClick={handleClick} className="rounded-lg hover:bg-red-600 duration-200 ease-in-out bg-blue-700 text-white px-2 py-1"><svg className="w-6 h-6 inline-block" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Modal;