import { Link } from "react-router-dom";
import { useDeleteACarMutation, useGetAllCarQuery } from "../../../../Redux/features/Car/carApi";
import { TCar } from "../../../../type/Types";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';



const ManageBookings = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  const { data, isLoading } = useGetAllCarQuery(undefined);
  const car = data?.data?.cars;
  const [deleteCar] = useDeleteACarMutation();

  if (isLoading) {
    return <div className="text-center font-semibold text-xl my-5">Loading...</div>
  }

const handleDelete = async (carId: string | undefined) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then( async (result) => {
      if (result.isConfirmed) {
        const res = await deleteCar({ carId }).unwrap();
       
         if (res?.success) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
         } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text:  "An Error occured"
          });
         }
       
      }
    });
} 


    return (
   <>   <div className="text-2xl text-center font-semibold mb-4 text-[#70AABD] md:mb-8">Car Management</div>
   <div className="flex justify-center">
   <div className="flex mt-5 gap-5 md:gap-8 ">
     {/* create product button  */}
     <div data-aos="fade-up"
     data-aos-duration="2000" className="md:mt-10 ">
     <Link
     to="/dashboard/create_car">
     <button className="px-6 py-2 min-w-[120px] text-center text-white bg-[#FC7E01] hover:bg-amber-600 border border-[#FC7E01] rounded"
   >
     Create Product
     </button>
   </Link>
     </div>
       {/* all added products  */}
       <div >
       <table className="min-w-full divide-y divide-gray-200">
<thead data-aos="fade-right"
     data-aos-duration="2000">
<tr>
 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
   Index
 </th>
 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
   Car Image
 </th>
 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
 Car Name
 </th>
 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
 Car Price
 </th>
 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
 Car Color
 </th>
 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
 Car Status
 </th>
 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
 Car Type
 </th>
 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
   Edit
 </th>
 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
   Delete
 </th>
</tr>
</thead>
<tbody data-aos="fade-left"
     data-aos-duration="2000" className="bg-white dark:bg-gray-700 text-black dark:text-white divide-y divide-gray-200">
 {
car?.length && car?.map((product: TCar, index: number) => (
<tr key={product._id}>
     <td className="px-6 py-4 ">
       {index + 1}
     </td>
     <td className="px-6 py-4 whitespace-nowrap">
       <img src={product?.image} alt="image"  className="w-8 h-8 md:w-12 md:h-12 bg-gray-800 rounded-full"/>
     </td>
   <td className="px-6 py-4 whitespace-nowrap">{product?.name}</td>
   <td className="px-6 py-4 whitespace-nowrap">{product?.pricePerHour}</td>
   <td className="px-6 py-4 whitespace-nowrap">{product?.color}</td>
   <td className="px-6 py-4 whitespace-nowrap">{product?.status}</td>
   <td className="px-6 py-4 whitespace-nowrap">{product?.type}</td>
   <td className="px-6 py-4 whitespace-nowrap">
   <Link to={`update_car/${product?._id}`}>
   <button className="px-2.5 py-2.5 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out">
   <FaEdit className="w-5 h-5"/>
     </button>
   </Link>
     </td>
   <td className="px-3 py-4 whitespace-nowrap">
   <button onClick={() => handleDelete(product._id)} className="ml-2 px-2 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out">
      <MdDelete className="w-6 h-6"/>
     </button>
     </td>
</tr>
  ))
 }
</tbody>
</table>
       </div>
   </div>
    <div>
 </div>
   </div></>
    );
};

export default ManageBookings;
