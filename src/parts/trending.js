import React, { useEffect, useState } from 'react';
import Trendlist from './partial/trendlist';
import CustomPage from "./partial/custompage";
import Modal from './partial/modal';



const Trend = () => {
    const [mlist, setMlist] = useState([]);
    const [totalpages, setTotalpages] = useState(1);
    const [page, setPage] = useState(1);
    const [modal,setModal] = useState(false);
    const [type,setType] = useState('');
    const [mid,setMID] = useState();
    const trendReq = async () => {
        const url = `https://api.themoviedb.org/3/trending/all/week?api_key=baa2f39af2ebd5604c32fe6a7b3162e5&page=${page}`;
        const res = await fetch(url);
        const resJson = await res.json()
        if (resJson.results) {
            setMlist(resJson.results)
            setTotalpages(resJson.total_pages)
        }
        window.scroll(0, 0);
    }


    useEffect(() => {
        trendReq();
    }, [page])


    return (
        <>
            <div className='flex justify-center w-screen'>
            <h1 className=' font-bold text-2xl p-4'>Trending 🔥</h1>
            </div>
            <div className=' gap-8 justify-around grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-14 lg:p-20 md:p-12 '>
                {
                    mlist && mlist.map((m) => (
                    <Trendlist
                        key={m.id}
                        id={m.id}
                        poster={m.poster_path}
                        title={m.title || m.name}
                        date={m.release_date || m.first_air_date}
                        media_type={m.media_type}
                        vote={m.vote_average}
                        setModal = {setModal}
                        setType={setType}
                        setMID = {setMID}
                    />
                    
                    ))
                }
            </div>
            {totalpages > 1 &&
                <CustomPage page={page} setPage={setPage} totalpages={totalpages} />
            }
            {modal && <Modal setModal = {setModal} type={type} mid = {mid} />}
            
        </>
    );
}

export default Trend;