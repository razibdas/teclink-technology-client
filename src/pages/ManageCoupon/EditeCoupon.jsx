/* eslint-disable react/prop-types */
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'


const EditeCoupon = ({ isOpen, setIsOpen,  selectedCoupon }) => {


    const {couponCode, couponDescription,expiryDate, discountAmount } = selectedCoupon || {}

    function closeModal() {
        setIsOpen(false)
    }


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
                                        
                                        <form className="" >
                                            <div className='space-y-4'>
                                                <div>
                                                    <label>Coupon Code</label>

                                                    <input  type="text" defaultValue={couponCode} required />
                                                </div>
                                                <div>
                                                    <label>Expiry Date</label>
                                                    <input  type="date" defaultValue={expiryDate} required />
                                                </div>
                                                <div>
                                                    <label>Coupon Description</label>
                                                    <input  type="text" defaultValue={couponDescription} required />
                                                </div>
                                                <div>
                                                    <label>Discount Amount</label>
                                                    <input  type="number" defaultValue={discountAmount} step="0.01" required />
                                                </div>
                                                <button className='btn' type="submit">Update Coupon</button>
                                            </div>
                                        </form>
                                        {/* Add your form elements here */}
                                        <button onClick={closeModal}>Close Modal</button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default EditeCoupon;