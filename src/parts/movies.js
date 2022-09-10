import React, { useEffect, useState } from 'react';
import Movielist from './partial/movielist';
import CustomPage from './partial/custompage';
import Genre from './partial/genre';
import useGen from './partial/useGen';
import Modal from './partial/modal';



const Movies = () => {

    const [mlist, setMlist] = useState([]);
    const [totalpages, setTotalpages] = useState(1);
    const [page, setPage] = useState(1);
    const [selgen,setSelgen] = useState([]);
    const [gen,setGen] = useState([]);
    const [modal,setModal] = useState(false);
    const [type,setType] = useState('');
    const [mid,setMID] = useState();
    const geturl = useGen(selgen);
    
    const movieReq = async () => {
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=baa2f39af2ebd5604c32fe6a7b3162e5&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${geturl}&with_watch_monetization_types=flatrate`;

        const res = await fetch(url);
        const resJson = await res.json()
        if (resJson.results) {
            setMlist(resJson.results)
            setTotalpages(resJson.total_pages)
        }
        window.scroll(0, 0);
    }


    useEffect(() => {
        movieReq();
    }, [page, geturl ])


    return (
        <>
            <div className='flex justify-center w-screen'>
            <h1 className="font-bold text-2xl p-4 ">Movies 🎥</h1>
            </div>
            <Genre type="movie" gen={gen} setGen= {setGen} selgen={selgen} setSelgen = {setSelgen}/>;
            <div className=' gap-8 justify-around grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-14 lg:p-20 md:p-12 '>
                {
                    mlist && mlist.map((m) => <Movielist
                        key={m.id}
                        id={m.id}
                        poster={m.poster_path}
                        title={m.title || m.name}
                        date={m.release_date || m.first_air_date}
                        vote={m.vote_average}
                        setModal = {setModal}
                        setType={setType}
                        setMID = {setMID}
                    />)
                }
            </div>
            {totalpages>1 && 
            <CustomPage page={page} setPage={setPage} totalpages={totalpages} />
            }
             {modal && <Modal setModal = {setModal} type={type} mid = {mid} />}
        </>
    );
}

export default Movies;