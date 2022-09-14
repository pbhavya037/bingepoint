import { img_300 } from "../../config/config";
import { unavailable } from "../../config/config";

const Movielist = (prop) => {
    const id = prop.id;
    const poster = prop.poster;
    const title = prop.title;
    const date = prop.date;
    const vote = prop.vote;
    const setModal = prop.setModal;
    const setType = prop.setType;
    const setMID = prop.setMID;

    // console.log(poster);

    const handleClick = () => {
        setModal(true);
        setMID(id);
        setType('movie');
    }
    return (
        <>
        <div className=" bg-blue-200 shadow-lg xs:w-24  hover:shadow-md hover:scale-90 duration-300 ease-in-out overflow:hidden rounded-lg cursor-pointer relative" onClick={handleClick}>
            <img src={poster ? `${img_300}/${poster}` : unavailable} alt={title} className="w-full m-0 rounded-t-lg " />
            <div className="p-2">
                <p>{title}</p>
                <span className="flex justify-between">
                    <p>Movie</p>
                    <p>{date}</p>
                </span>
            </div>
            <span className=" absolute bg-blue-800 text-blue-50 rounded-full m-2 px-2 top-0">{parseFloat(vote).toFixed(1)}</span>
        </div>
        </>
    );
}

export default Movielist;