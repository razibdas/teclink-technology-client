import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";

const CouponShow = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const { refetch, data: coupons = [] } = useQuery({
        queryKey: ['coupons', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/coupon');
            return res.data;
        }

    });

    console.log('coupon', coupons);

    return (
        <div className="grid grid-cols-1 lg:mx-96 md:grid-cols-2 lg:grid-cols-2  gap-6  mt-12 ">
            {coupons.map(coupon => (
                <div  key={coupon.id} className="card  bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title bg-slate-400">CouponCode:{coupon.couponCode}</h2>
                        <p className="">ExpiryDate:{coupon.expiryDate}</p>
                        <p>Description:{coupon.couponDescription}</p>
                        <p>Discount:{coupon.discountAmount}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CouponShow;