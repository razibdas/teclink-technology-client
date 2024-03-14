/* eslint-disable react/prop-types */

// import { Fragment, useState } from 'react'
// import { Dialog, Transition } from '@headlessui/react'
// import useAxiosPublic from '../../Hooks/useAxiosPublic'
// import Swal from 'sweetalert2'

// import { toast } from 'react-toastify'


// const EditeCoupon = ({_id, isOpen, setIsOpen,  selectedCoupon }) => {


//     const axiosPublic = useAxiosPublic();
 


//     const {  couponCode, couponDescription,expiryDate, discountAmount } = selectedCoupon || {}

//     function closeModal() {
//         setIsOpen(false)
//     }

//     const onSubmit = async (data) => {
        
//             // now send the menu item data to teh server with the image usl
//             const couponItem = {
//                 couponCode: data.couponCode,
//                 expiryDate: data.expiryDate,
//                 couponDescription: data.couponDescription,
//                 discountAmount: data.discountAmount,
//             }
//             // 

//             const menuRes = await axiosPublic.patch(`/menu/${_id}`, couponItem);
//             console.log(menuRes);
//             if(menuRes.data.modifiedCount > 0) {
//                 //show success popup
              
//                 Swal.fire({
//                     position: "center",
//                     icon: "success",
//                     title: `${data.name} is updated the menuItem`,
//                     showConfirmButton: false,
//                     timer: 1500
//                   });
//             }

  
//     }
    
    
//     return (
//         <>


//             <Transition appear show={isOpen} as={Fragment}>
//                 <Dialog as="div" className="relative z-10" onClose={closeModal}>
//                     <Transition.Child
//                         as={Fragment}
//                         enter="ease-out duration-300"
//                         enterFrom="opacity-0"
//                         enterTo="opacity-100"
//                         leave="ease-in duration-200"
//                         leaveFrom="opacity-100"
//                         leaveTo="opacity-0"
//                     >
//                         <div className="fixed inset-0 bg-black/25" />
//                     </Transition.Child>

//                     <div className="fixed inset-0 overflow-y-auto">
//                         <div className="flex min-h-full items-center justify-center p-4 text-center">
//                             <Transition.Child
//                                 as={Fragment}
//                                 enter="ease-out duration-300"
//                                 enterFrom="opacity-0 scale-95"
//                                 enterTo="opacity-100 scale-100"
//                                 leave="ease-in duration-200"
//                                 leaveFrom="opacity-100 scale-100"
//                                 leaveTo="opacity-0 scale-95"
//                             >
//                                 <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">

//                                     <div>
//                                         <form onSubmit={onSubmit} className="" >
//                                             <div className='space-y-4'>
//                                                 <div>
//                                                     <label>Coupon Code</label>

//                                                     <input  type="text" defaultValue={couponCode} required />
//                                                 </div>
//                                                 <div>
//                                                     <label>Expiry Date</label>
//                                                     <input  type="date" defaultValue={expiryDate} required />
//                                                 </div>
//                                                 <div>
//                                                     <label>Coupon Description</label>
//                                                     <input  type="text" defaultValue={couponDescription} required />
//                                                 </div>
//                                                 <div>
//                                                     <label>Discount Amount</label>
//                                                     <input  type="number" defaultValue={discountAmount} step="0.01" required />
//                                                 </div>
//                                                 <button  className='btn' type="submit">Update Coupon</button>
//                                             </div>
//                                         </form>
//                                         {/* Add your form elements here */}
//                                         <button onClick={closeModal}>Close Modal</button>
//                                     </div>
//                                 </Dialog.Panel>
//                             </Transition.Child>
//                         </div>
//                     </div>
//                 </Dialog>
//             </Transition>
//         </>
//     )
// }

// export default EditeCoupon;


import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';

const EditeCoupon = ({refetch,  isOpen, setIsOpen, selectedCoupon }) => {
    const axiosPublic = useAxiosPublic();
   

    const { register, handleSubmit, reset } = useForm();

    const {_id, couponCode, couponDescription, expiryDate, discountAmount } = selectedCoupon || {};

    function closeModal() {
        setIsOpen(false);
    }

    const onSubmit = async (data) => {
        try {
            console.log('Submitting form data:', data);
  
            const couponItem = {
                couponCode: data.couponCode,
                expiryDate: data.expiryDate,
                couponDescription: data.couponDescription,
                discountAmount: data.discountAmount,
            };
    
            const menuRes = await axiosPublic.patch(`/coupon/${_id}`, couponItem);
    
            if (menuRes && menuRes.data && menuRes.data.modifiedCount > 0) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Coupon Updated',
                    showConfirmButton: false,
                    timer: 1500
                });
                setIsOpen(false);
                refetch()
            } else {
               
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to update coupon!',
                });
                
            }
        } catch (error) {
            
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'An error occurred while updating the coupon!',
            });
        }
    };

    
    

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <div>
                                        <form onSubmit={handleSubmit(onSubmit)} className="">
                                            <div className="space-y-4">
                                                <div>
                                                    <label>Coupon Code: </label>
                                                    <input className='ml-2 border-slate-950'
                                                        {...register('couponCode')}
                                                        type="text"
                                                        defaultValue={couponCode}
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label>Expiry Date:</label>
                                                    <input className='ml-2'
                                                        {...register('expiryDate')}
                                                        type="date"
                                                        defaultValue={expiryDate}
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label>Coupon Description:</label>
                                                    <input className='ml-2'
                                                        {...register('couponDescription')}
                                                        type="text"
                                                        defaultValue={couponDescription}
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label>Discount Amount:</label>
                                                    <input className='ml-2'
                                                        {...register('discountAmount')}
                                                        type="number"
                                                        defaultValue={discountAmount}
                                                        step="0.01"
                                                        required
                                                    />
                                                </div>
                                                <button className="btn" type="submit">
                                                    Update Coupon
                                                </button>
                                            </div>
                                        </form>
                                        
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default EditeCoupon;
