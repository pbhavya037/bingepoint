const CustomPage = (prop) => {
    const page = prop.page;
    const setPage = prop.setPage;
    const totalpages = prop.totalpages;

    return ( 
        <div className="flex justify-center mb-10 ">
            <button onClick={() => {
                if(page!=1){
                    setPage(page-1);
                }
            }} className =" bg-blue-700 text-slate-50 px-2 py-1 rounded-lg  border-white hover:border-slate-900 border-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z"></path></svg>
                </button>
            <p className="px-3 " >{page}</p>
            <button onClick={() => {
                if(page != totalpages){
                    setPage(page+1);
                }
            }} className=" bg-blue-700 text-slate-50  border-white hover:border-slate-900 border-2 shadow-sm px-2 py-1 rounded-lg" >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z"></path></svg>
            </button>

        </div>
     );
}
 
export default CustomPage;