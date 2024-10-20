
import { useAppDispatch } from "../../../../Redux/app/hook";
import { useGetAllBookQuery, useIsApprovedMutation, useIsCanceledMutation } from "../../../../Redux/features/Book/bookApi";
import { FcApproval } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";
import { returnACar } from "../../../../Redux/features/Book/BookSlice";
import Swal from "sweetalert2";
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useReturnCarMutation } from "../../../../Redux/features/Car/carApi";


const ManageCar = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  const dispatch = useAppDispatch();
  const { data } = useGetAllBookQuery(undefined);
  const book = data?.data;
  const [ returnCar ] = useReturnCarMutation();


  if (book) {
    dispatch(returnACar(book));
  }

  const [isCanceled] = useIsCanceledMutation();
  const [isBookApproved] = useIsApprovedMutation();

  const  handleApproved = async (bookingId: string) => {
  
    const res = await isBookApproved({ bookingId }).unwrap();
  
    if (res?.success){
      Swal.fire({
        icon: "success",
        title: res?.message,
        showConfirmButton: false,
        timer: 1500
      })
     } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: res?.error?.message || "An Error occured"
      });
     }
  }

  const  handleCanceled = async (bookingId: string) => {
    const data = {
      bookingId: bookingId,
      endTime: new Date(),
};
 await returnCar({ data });

    const res = await isCanceled({ bookingId }).unwrap();
    
    if (res?.success){
      Swal.fire({
        icon: "success",
        title: res?.message,
        showConfirmButton: false,
        timer: 1500
      })
     } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: res?.error?.message || "An Error occured"
      });
     }
  };

  

    return (
        <>
                 <div data-aos="zoom-in"
     data-aos-duration="2000" className="text-2xl text-center font-semibold mb-4 text-[#70AABD] md:mb-8">Booking Management</div>
                 <div className="flex justify-center">
        <div className="flex mt-5 gap-5 md:gap-8 ">
            {/* all added products  */}
            <div>
            <table className="min-w-full divide-y divide-gray-200">
  <thead data-aos="fade-right"
     data-aos-duration="2000">
    <tr>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
        Index
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
        Car Image
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
      Car Name
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
      Start Time
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
      End Time
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
      Total Cost
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
      Approval
      </th>
    </tr>
  </thead>
  <tbody data-aos="fade-up"
     data-aos-duration="2000" className="bg-white dark:bg-gray-700 text-black dark:text-gray-200 divide-y divide-gray-200">
      {
    book ? ( book?.length && book?.map((product: any, index: number) => (
      <tr key={product._id}>
              <td className="px-6 py-4 ">
                {index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <img src={product?.carId?.image} alt="image"  className="w-8 h-8 md:w-12 md:h-12 bg-gray-800 rounded-full"/>
              </td>
            <td className="px-6 py-4 whitespace-nowrap">{product?.carId?.name} </td>
            <td className="px-6 py-4 whitespace-nowrap">{product?.payment?.startTime} </td>
            <td className="px-6 py-4 whitespace-nowrap">{product?.payment?.exprirationDate}</td>
            <td className="px-6 py-4 whitespace-nowrap">{product?.carId?.pricePerHour}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              {product?.isBooked === "confirmed" ? (
                <p className="font-semibold text-green-600">Approved</p>
              ) : (
           product?.isBooked === "canceled" ? (
            <p className="text-semibold text-red-600">Canceled</p>
           ) : (     <div className="flex gap-2">
            <div><button onClick={() => handleApproved(product?._id)} className="border border-blue-600 rounded p-2 hover:bg-gray-300"><FcApproval className="w-6 h-6"/></button></div>
            <div><button onClick={() => handleCanceled(product?._id)} className="border border-red-600 rounded p-2 hover:bg-gray-300"><FcCancel className="w-6 h-6"/></button></div>
          </div>)
              )
            }

            </td>
      </tr>
           ))) : ( <tr><td> No Booking Found</td></tr>)
      }
  </tbody>
</table>
            </div>
        </div>
         <div>
      </div>
        </div>
        </>
    );
};

export default ManageCar;