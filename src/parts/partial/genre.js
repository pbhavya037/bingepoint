import { useEffect } from "react";

const Genre = (prop) => {
    const type = prop.type;
    const selgen = prop.selgen;
    const setSelgen = prop.setSelgen;
    const gen = prop.gen;
    const setGen = prop.setGen;

    const fetchGen = async () => {

        const url = `https://api.themoviedb.org/3/genre/${type}/list?api_key=baa2f39af2ebd5604c32fe6a7b3162e5&language=en-US`;

        const res = await fetch(url);
        const resJson = await res.json()
        setGen(resJson.genres);
    }

    const handleADD = (cur) => {
        setSelgen([...selgen,cur]);
        setGen(gen.filter((gn) => gn.id !== cur.id));
    }

    const handleDel = (cur) => {
        setSelgen(selgen.filter((gn) => gn.id !== cur.id));
        setGen([...gen,cur]);

    }

    useEffect(() => {
        fetchGen();
    }, [])
 
    return (
        <>
            <div className=" m-2 flex flex-wrap justify-between " >
                    {selgen && selgen.map((g) => (
                         <button key = {g.id} className="m-2 border-2 border-white hover:border-slate-900 px-3 rounded-full bg-blue-600 text-white "  onClick={() => {
                            handleDel(g)}} >
                         {g.name}
                         </button>
                    ) )}
                    {gen && gen.map((g) => (
                        <button key = {g.id} className="m-2 border-2 border-white hover:border-slate-900 px-3 rounded-full bg-blue-200 ${ } " onClick={()=> handleADD(g)} >
                        {g.name}
                        </button>
                    ))}
            
            </div>

        </>
    );
}

export default Genre;