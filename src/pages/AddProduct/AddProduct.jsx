
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imag_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddProduct = () => {
    const { register, handleSubmit, reset } = useForm()
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const onSubmit = async (data) => {
        console.log(data);
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(imag_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            const menItem = {
                email: user?.email,
                image: res.data.data.display_url,
                name: data.name,
                price: parseFloat(data.price),
                description: data.description,

            }
            const menuRes = await axiosPublic.post('/carts', menItem);
            console.log(menuRes.data);
            if (menuRes.data.insertedId) {
                reset();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${data.name} is added the product`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        console.log('with image url', res.data);
    }

    return (
        <div className="pt-24 ">


            <div className="">


                <h2 className="text-3xl mx-auto flex justify-center">Add An Product</h2>

                <div className="flex justify-center   mx-auto p-8">

                    <form onSubmit={handleSubmit(onSubmit)} className="border p-8 bg-zinc-300">
                        <div className="">
                            <div className=" ">
                                <div className=" ">
                                    {user && (
                                        <div className="">
                                            <label tabIndex={0} className="">
                                                <div className="rounded-full ">
                                                    <img
                                                        className="w-20 -mb-20 h-20 rounded-full"
                                                        src={user?.photoURL}
                                                        alt="User Profile"

                                                    />

                                                </div>

                                            </label>
                                            <div className="ml-24">
                                                {user?.displayName}
                                                <br />
                                                {user?.email}
                                            </div>
                                            <ul tabIndex={0} className="menu dropdown-content z-[1] p-4 backdrop-brightness-5 rounded-box w-40 mt-4">
                                                {/* Add other menu items or actions */}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex mt-4 ">
                                <div className="form-control ">
                                    <label className="label">
                                        <span className="label-text"> Name*</span>
                                    </label>
                                    <input type="text" placeholder="Name"
                                        {...register('name', { required: true })} className="input input-bordered w-full" />

                                    <div className="form-control mt-2">
                                        <label className="label">
                                            <span className="label-text ">Price*</span>
                                        </label>
                                        <input type="number" placeholder="Price"
                                            {...register('price', { required: true })} className="input input-bordered w-full" />
                                    </div>
                                </div>

                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="">Description</span>
                                </label>
                                <textarea {...register('description')} className="textarea border-slate-950 w-[320px]" placeholder="Description"></textarea>
                            </div>
                            <div className="form-control mt-4">
                                <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                            </div>
                            <div className="mt-4">
                                For More: <a href="https://themeforest.net/search/educational">http://themeforest.com</a>

                            </div>
                            <button className="btn mt-4">
                                Add Product
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;