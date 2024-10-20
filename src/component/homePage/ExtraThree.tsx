import { Link } from "react-router-dom";


const ExtraThree = () => {
    return (
        <div className="bg-white pb-10 dark:bg-gray-700">
        <div className="h-[80vh] bg-fixed bg-center bg-cover" style={{ backgroundImage: 'url("/parallax4.webp")' }}>
                <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
                   <div  data-aos="zoom-out-right"
        data-aos-duration="2000">
                   <h1 className="text-white text-3xl font-bold">YOUR NEXT TRAVEL WITH US?</h1>
                    <p className="text-white text-center">Use our online tool to calculate
                    the total cost of your ride</p>
                   <div className="flex justify-center mt-5">
                   <Link to="/cars">
                   <button className="px-6 py-2 min-w-[120px] text-center text-white bg-[#FC7E01] rounded active:text-amber-600 hover:bg-amber-500 ">
                        Book Now
                    </button>
                   </Link>
                   </div>
                   </div>
                </div>
            </div>

        </div>
    );
};

export default ExtraThree;