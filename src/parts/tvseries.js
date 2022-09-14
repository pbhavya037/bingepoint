import React, { useEffect, useState } from 'react';
import Serieslist from './partial/serieslist';
import CustomPage from './partial/custompage';
import Genre from './partial/genre';
import useGen from './partial/useGen';
import Modal from './partial/modal';


const Series = () => {
    const [slist, setSlist] = useState([]);
    const [totalpages, setTotalpages] = useState(1);
    const [page, setPage] = useState(1);
    const [modal,setModal] = useState(false);
    const [type,setType] = useState('');
    const [mid,setMID] = useState();
    const [selgen,setSelgen] = useState([]);
    const [gen,setGen] = useState([]);
    const geturl = useGen(selgen);

    const seriesReq = async () => {
        const url = ` https://api.themoviedb.org/3/discover/tv?api_key=baa2f39af2ebd5604c32fe6a7b3162e5&language=en-US&sort_by=popularity.desc&page=${page}&timezone=America%2FNew_York&with_genres=${geturl}&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`;


        const res = await fetch(url);
        const resJson = await res.json()
        if (resJson.results) {
            setSlist(resJson.results)
            setTotalpages(resJson.total_pages)
        }
        window.scroll(0, 0);
    }

    useEffect(() => {
        seriesReq();
    }, [page,geturl])

    return (
        <>
            <div className='flex justify-center w-screen'>
            <h1 className="font-bold text-2xl p-4 ">TV Series 📺</h1>
            </div>

            <Genre type="tv" gen={gen} setGen= {setGen} selgen={selgen} setSelgen = {setSelgen}/>

            <div className=' gap-11 justify-around grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-14 lg:p-20 md:p-12 '>
                {
                    slist && slist.map((m) => <Serieslist
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

export default Series;