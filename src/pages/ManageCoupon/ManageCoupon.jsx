import { useContext, useState } from 'react';

import Swal from 'sweetalert2';

import { AuthContext } from '../../provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { Link } from 'react-router-dom';
import { Transition } from '@headlessui/react';
import EditeCoupon from './EditeCoupon';

const ManageCoupon = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const [selectedCoupon, setSelectedCoupon] = useState([]);

    let [isOpen, setIsOpen] = useState(false)


    const { refetch, data: coupons = [] } = useQuery({
        queryKey: ['coupons', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/coupon');
            return res.data;
        }
    });

    function openModal (){
        setIsOpen(true)
    }

    const handleEditCoupon = (id) => {
        const coupon = coupons.find((coupon) => coupon._id === id);
        setSelectedCoupon(coupon);
        openModal()
    };





    const handleDeleteCoupon = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosPublic.delete(`/coupon/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {

                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch()
                        }
                        // console.log(res);
                    })
            }
        });

    };



    return (
        <div>
            <EditeCoupon coupon={selectedCoupon} refetch={refetch} isOpen={isOpen} setIsOpen={setIsOpen}  selectedCoupon={selectedCoupon}></EditeCoupon>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Coupon Code</th>
                            <th>Expiry Date</th>
                            <th>Description</th>
                            <th>Discount Amount</th>
                            <th>Actions</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coupons.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.couponCode}</td>
                                <td>{item.expiryDate}</td>
                                <td>{item.couponDescription}</td>
                                <td>{item.discountAmount}</td>
                                <td>
                                    <button onClick={() => handleDeleteCoupon(item._id)}>
                                        Delete
                                    </button>
                                </td>
                                <td className='cursor-pointer' onClick={()=> handleEditCoupon(item._id)}>Edit</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageCoupon;

// import Swal from 'sweetalert2';
// import { AuthContext } from '../../provider/AuthProvider';
// import { useQuery } from '@tanstack/react-query';
// import useAxiosPublic from '../../Hooks/useAxiosPublic';
// import useAxiosSecure from '../../Hooks/useAxiosSecure';
// import { Link } from 'react-router-dom';
// import { Transition } from '@headlessui/react';
// import { useForm } from 'react-hook-form';

// const ManageCoupon = () => {
//     const axiosPublic = useAxiosPublic();
//     const axiosSecure = useAxiosSecure();
//     const { user } = useContext(AuthContext);
//     const [isShow, setIsShow] = useState(false);
//     const [selectedCoupon, setSelectedCoupon] = useState(null);
//     const { register, handleSubmit, reset } = useForm();

//     const { refetch, data: coupons = [] } = useQuery({
//         queryKey: ['coupons', user?.email],
//         queryFn: async () => {
//             const res = await axiosSecure.get('/coupon');
//             return res.data;
//         }
//     });

//     const handleDeleteCoupon = id => {
//         Swal.fire({
//             title: "Are you sure?",
//             text: "You won't be able to revert this!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Yes, delete it!"
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 axiosPublic.delete(`/coupon/${id}`)
//                     .then(res => {
//                         if (res.data.deletedCount > 0) {
//                             Swal.fire({
//                                 title: "Deleted!",
//                                 text: "Your file has been deleted.",
//                                 icon: "success"
//                             });
//                             refetch();
//                         }
//                     });
//             }
//         });
//     };

//     const handleEditCoupon = (id) => {
//         const coupon = coupons.find((coupon) => coupon._id === id);
//         setSelectedCoupon(coupon);
//         setIsShow(true);
//     };

//     const closeModal = () => {
//         setSelectedCoupon(null);
//         setIsShow(false);
//     };

//     return (
//         <div className="overflow-x-auto">
//             <table className="table">
//                 <thead>
//                     <tr>
//                         <th></th>
//                         <th>Coupon Code</th>
//                         <th>Expiry Date</th>
//                         <th>Description</th>
//                         <th>Discount Amount</th>
//                         <th>Actions</th>
//                         <th>Edit</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {coupons.map((item, index) => (
//                         <tr key={item._id}>
//                             <td>{index + 1}</td>
//                             <td>{item.couponCode}</td>
//                             <td>{item.expiryDate}</td>
//                             <td>{item.couponDescription}</td>
//                             <td>{item.discountAmount}</td>
//                             <td>
//                                 <button onClick={() => handleDeleteCoupon(item._id)}>Delete</button>
//                             </td>
//                             <td>
//                             <button onClick={() => handleEditCoupon(item._id)}>Edit</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             <Transition
//                 show={isShow}
//                 enter="transition ease-out duration-100"
//                 enterFrom="transform opacity-0 scale-96"
//                 enterTo="transform opacity-100 scale-100"
//                 leave="transition ease-in duration-75"
//                 leaveFrom="transform opacity-100 scale-100"
//                 leaveTo="transform opacity-0 scale-95"
//             >
//                 <div className="fixed inset-0 z-50 overflow-y-auto">
//                     <div className="flex items-center justify-center min-h-screen">
//                         <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

//                         <div className="relative bg-white w-1/2 mx-auto rounded-lg shadow-lg">
//                             <div className="flex justify-between p-5 border-b border-gray-200">
//                                 <h3 className="text-lg font-medium text-gray-900">Edit Coupon</h3>
//                                 <button onClick={closeModal}></button>
//                             </div>
//                             <div className="p-5">
//                                 {selectedCoupon && (
//                                     <div>
//                                         <form className="" >
//                                             <div className='space-y-4'>
//                                                 <div>
//                                                     <label>Coupon Code</label>

//                                                     <input {...register('couponCode')} type="text" defaultValue={selectedCoupon.couponCode}  required />
//                                                 </div>
//                                                 <div>
//                                                     <label>Expiry Date</label>
//                                                     <input {...register('expiryDate')} type="date" defaultValue={selectedCoupon.expiryDate} required />
//                                                 </div>
//                                                 <div>
//                                                     <label>Coupon Description</label>
//                                                     <input {...register('couponDescription')} type="text" defaultValue={selectedCoupon.couponDescription} required />
//                                                 </div>
//                                                 <div>
//                                                     <label>Discount Amount</label>
//                                                     <input {...register('discountAmount')} type="number" defaultValue={selectedCoupon.discountAmount} step="0.01" required />
//                                                 </div>
//                                                 <button className='btn' type="submit">Update Coupon</button>
//                                             </div>
//                                         </form>
//                                         {/* Add your form elements here */}
//                                         <button onClick={closeModal}>Close Modal</button>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </Transition>
//         </div>
//     );
// };

// export default ManageCoupon;

