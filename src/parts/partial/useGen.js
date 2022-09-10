
const useGen = (selgenre)=>{
    if(selgenre<1) return "";
    const GenID = selgenre.map((g)=>(g.id));
    return GenID.reduce((acc,curr) => acc+","+curr);
};

export default useGen;