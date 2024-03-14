import { useContext, useState } from 'react';

import Swal from 'sweetalert2';

import { AuthContext } from '../../provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
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


