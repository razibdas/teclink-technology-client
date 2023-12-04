import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imag_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const UpdateProduct = () => {
    const { register, handleSubmit, reset } = useForm()
    const {name, description, price, image, _id} = useLoaderData();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();


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
                image: res.data.data.display_url,
                name: data.name,
                price: parseFloat(data.price),
                description: data.description,

            }
            const menuRes = await axiosPublic.patch(`/carts/${_id}`, menItem);
            console.log(menuRes.data);
            if (menuRes.data.modifiedCount > 0) {
                reset();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${data.name} is updated the product`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        console.log('with image url', res.data);
   
    }

    return (
        <div>
            <div className="pt-24">
                <h2 className="text-2xl text-center">Update Product</h2>
                <div className="w-1/2 justify-center p-8 mx-auto bg-orange-300 mt-6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex">
                            <div className="form-control w-full my-6">
                                <label className="label">
                                    <span className="label-text"> Name*</span>
                                </label>
                                <input type="text" defaultValue={name} placeholder="Name"
                                    {...register('name', { required: true })} className="input input-bordered w-full" />
                            </div>
                            <div className="form-control w-full my-6 ml-6">
                                <label className="label">
                                    <span className="label-text">Price*</span>
                                </label>
                                <input type="number" defaultValue={price} placeholder="Price"
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

                        <button className="btn mt-4">
                            Update Product
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProduct;