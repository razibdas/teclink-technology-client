import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const CouponFunction = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();

    const onSubmit = async (data) => {
        try {
            const res = await axiosPublic.post('/coupon', data);

            if (res.data.insertedId) {
                reset();
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Coupon added successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
            }
        } catch (error) {
            console.error('Error adding coupon:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        }
    };

    return (
        <div className='bg-slate-400'>
            <div className=' flex justify-center  mx-auto p-8'>
                <form className="border p-8" onSubmit={handleSubmit(onSubmit)}>
                    <div className='space-y-4'>
                        <div>
                            <label>Coupon Code</label>
                            <input {...register('couponCode')} type="text" required />
                        </div>
                        <div>
                            <label>Expiry Date</label>
                            <input {...register('expiryDate')} type="date" required />
                        </div>
                        <div>
                            <label>Coupon Description</label>
                            <input {...register('couponDescription')} type="text" required />
                        </div>
                        <div>
                            <label>Discount Amount</label>
                            <input {...register('discountAmount')} type="number" step="0.01" required />
                        </div>
                        <button type="submit">Add Coupon</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CouponFunction;
