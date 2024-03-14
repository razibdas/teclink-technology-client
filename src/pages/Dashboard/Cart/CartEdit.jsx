/* eslint-disable react/prop-types */
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const CartEdit = ({ refetch, isOpen, setIsOpen, selectedCart }) => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit } = useForm();

    const { _id, image, name, price } = selectedCart || {};

    console.log(selectedCart);
    function closeModal() {
        setIsOpen(false);
    }

    const onSubmit = async (data) => {
        try {
            const cartItem = {
                image: data.image,
                name: data.name,
                price: data.price,
                description: data.description,
            };

            const menuRes = await axiosPublic.patch(`/carts/${_id}`, cartItem);

            if (menuRes && menuRes.data && menuRes.data.modifiedCount > 0) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Coupon Updated',
                    showConfirmButton: false,
                    timer: 1500
                });
                setIsOpen(false);
                refetch();
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
                                                    <label>Name</label>
                                                    <input
                                                        {...register('name')}
                                                        type="text"
                                                        defaultValue={name}
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label>Price</label>
                                                    <input
                                                        {...register('price')}
                                                        type="number"
                                                        defaultValue={price}
                                                        required
                                                    />
                                                </div>
                                                
                                                <div>
                                                    <label>Image</label>
                                                    <input
                                                        {...register('image')}
                                                        type="file"
                                                        accept="image/*"
                                                        required
                                                    />
                                                </div>
                                                
                                                
                                                <button className="btn" type="submit">
                                                    Update Cart Item
                                                </button>
                                            </div>
                                        </form>
                                        <button onClick={closeModal}>Close Modal</button>
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

export default CartEdit;
