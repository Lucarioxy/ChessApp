import Img from '../images/ChessIMG.jpg';
import Img2 from '../images/knight-logo.jpg';
import Overlay from './Overlay';

function HomePage(){
    const [isOpen, setIsOpen] = useState(false);

    const toggleOverlay = () => {
      setIsOpen(!isOpen);
    };
    return(
    <div className= "bg-black flex relative">
        <img src={Img} alt="" className = "object-cover h-130 w-240 py-32" />
        <div className = "flex flex-col static">
        <h1 className = "text-orange-500 my-4 mx-7 text-8xl">Knight's Quest</h1>
        <img src= {Img2} class = "size-20 absolute right-8 top-8 " alt=""/>
        <div className = "mx-48 my-24 absolute right-32 top-24">
            <div className = "text-white flex flex-col space-y-5 bg-zinc-800 h-96 w-64 justify-center rounded-md">
                <h1 className = "text-white relative left-12 top-0 text-4xl">Play Chess!</h1>
                <button className = "bg-black rounded-md h-12 w-64">Play Online</button>
                <button className = "bg-black rounded-md h-12 w-64">Computer</button>
                <button className = "bg-black rounded-md h-12 w-64">Chess Variants</button>
                <button onClick={toggleOverlay} className = "bg-black rounded-md h-12 w-64">Create Custom Game</button>
                <Overlay isOpen={isOpen} onClose={toggleOverlay}/>
            </div>
        </div>
    </div>
    </div>
    )
}
export default HomePage;