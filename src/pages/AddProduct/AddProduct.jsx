
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
        <div className="pt-24">
            <h2 className="text-2xl text-center">Add An Product</h2>
            <div className="w-1/2 justify-center p-8 mx-auto bg-orange-300 mt-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex">
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text"> Name*</span>
                            </label>
                            <input type="text" placeholder="Name"
                                {...register('name', { required: true })} className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full my-6 ml-6">
                            <label className="label">
                                <span className="label-text">Price*</span>
                            </label>
                            <input type="number" placeholder="Price"
                                {...register('price', { required: true })} className="input input-bordered w-full" />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea {...register('description')} className="textarea textarea-bordered h-24" placeholder="Description"></textarea>
                    </div>
                    <div className="form-control w-full my-6">
                        <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                    </div>
                    <div>
                        For More: <a href="https://themeforest.net/search/educational">http://themeforest.com</a>

                    </div>
                    <button className="btn mt-4">
                        Add Product
                    </button>

                </form>
            </div>
        </div>
    );
};

export default AddProduct;