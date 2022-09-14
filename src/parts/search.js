import { useEffect, useState } from "react";
import Trendlist from "./partial/trendlist";
import CustomPage from "./partial/custompage";
import Modal from './partial/modal';

const Search = () => {



    const [itype, setItype] = useState('movie');
    const [search, setSearch] = useState('Naruto');
    const [page, setPage] = useState(1);
    const [totalpages, setTotalpages] = useState(1);
    const [mlist, setMlist] = useState([]);
    const [modal,setModal] = useState(false);
    const [type,setType] = useState('');
    const [mid,setMID] = useState();





    const handleSubmit = async (e) => {

        const ob = { itype, search }

        const url = `https://api.themoviedb.org/3/search/${itype}?api_key=baa2f39af2ebd5604c32fe6a7b3162e5&language=en-US&query=${ob.search}&page=${page}&include_adult=false`;

        const res = await fetch(url);
        const resJson = await res.json()
        if (resJson.results) {
            setMlist(resJson.results)
            setTotalpages(resJson.total_pages)
        }

    }
    useEffect(() => {
        window.scroll(0, 0);
        handleSubmit();
    }, [page])



    return (
        <>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
            }} className=" mt-10">
                <div className="lg:mx-72 md:mx-52 sm:mx-32 mx-16 flex flex-col">
                    <select value={itype} onChange={(e) => setItype(e.target.value)} className=" border-2 bg-green-50 border-green-500 rounded-lg p-2 mb-1" >
                        <option className=" overflow-hidden" value="movie">Movies</option>
                        <option className=" overflow-hidden" value="tv">TV-Series</option>
                    </select>

                    <div className=" w-full grid grid-cols-5 border-2 rounded-lg overflow-hidden border-green-500">
                        <input type="search" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} className=" col-span-4 p-2 bg-green-50" alt="search" />
                        <button className=" bg-green-500 text-cyan-50"><svg className="w-5 h-5 md:w-6 md:h-6 inline-block" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg></button>
                    </div>
                </div>
            </form>

            <div className=' gap-14 justify-around grid mt-0 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-14 lg:p-20 md:p-12 '>
                {
                    mlist && mlist.map((m) => <Trendlist
                        key={m.id}
                        id={m.id}
                        poster={m.poster_path}
                        title={m.title || m.name}
                        date={m.release_date || m.first_air_date}
                        media_type={itype}
                        vote={m.vote_average}
                        setModal = {setModal}
                        setType={setType}
                        setMID = {setMID}
                    />)
                }
                { !totalpages&&
                   (itype=='movie'?<p>No movie found</p>:<p> No series found</p>)
                }
            </div>
            {totalpages > 1 &&
                <CustomPage page={page} setPage={setPage} totalpages={totalpages} />
            }
            {modal && <Modal setModal = {setModal} type={type} mid = {mid} />}
        </>
    );
}

export default Search; <>
</>