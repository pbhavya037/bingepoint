import { img_300 } from "../../config/config";
import { unavailable } from "../../config/config";


const Trendlist = (prop) => {
    const id = prop.id;
    const poster = prop.poster;
    const title = prop.title;
    const date = prop.date;
    const media_type = prop.media_type;
    const vote = prop.vote;
    const setModal = prop.setModal;
    const setType = prop.setType;
    const setMID = prop.setMID;
    const handleClick = () => {
        setModal(true);
        setMID(id);
        setType(media_type);
    }

    return (
        <div className=" hover:shadow-md hover:scale-90 duration-300 ease-in-out bg-blue-200 shadow-lg xs:w-24 overflow:hidden cursor-pointer rounded-lg relative " onClick={handleClick} >
            <img src={poster ? `${img_300}/${poster}` : unavailable} alt={title} className="w-full m-0 rounded-t-lg " />

            <div className="p-2">
                <p>{title}</p>
                <span className="flex justify-between ">
                    <p>{media_type === 'tv' ? "TV Series" : "Movie"}</p>
                    <p>{date}</p>
                </span>
            </div>
            <span className=" absolute bg-blue-800  text-blue-50 rounded-full m-2 px-2 top-0">{parseFloat(vote).toFixed(1)}</span>
            <div className="flex justify-center">
    
            </div>
        </div>
    );
}

export default Trendlist
