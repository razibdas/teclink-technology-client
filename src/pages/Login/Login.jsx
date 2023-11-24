

import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useContext, useState } from 'react';


import Swal from 'sweetalert2'
import { AuthContext } from '../../provider/AuthProvider';



const Login = () => {

  
    const { signIn, googleSignIn } = useContext(AuthContext);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();
    console.log(location);

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signIn(email, password)
            .then((user) => {
                Swal.fire({
                    title: 'Login successfully.!',
                    icon: 'success',

                })
                console.log(user);
                navigate(location?.state ? location?.state : '/')

            })
            .catch((error) => {
                console.error(error);
                setError("Email or password is incorrect. Please try again.");
            });
    }

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((user) => {
                console.log(user);
            })
            .catch((error) => {
                console.error(error);
            });

    }
    return (
        <div>
            <div>
                <div className="hero min-h-screen bg-base-200">
                    <div className="hero-content flex-col lg:flex-row">
                        <div className=" w-1/2 mr-12 ">
                            <img className='lg:w-[500px] lg:h-[400px]' src="https://i.ibb.co/2sbzdhc/20602936-6333040.jpg" alt="" />
                        </div>
                        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                            <div className="card-body">
                                <h1 className="text-5xl font-bold text-center">Login now!</h1>
                                {error && (
                                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                        {error}
                                    </div>
                                )}
                                <form onSubmit={handleLogin}>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Password</span>
                                        </label>
                                        <input type="password" placeholder="password" name="password" className="input input-bordered" required />
                                        <label className="label">
                                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                        </label>
                                    </div>
                                    <div className="form-control mt-6">
                                        <input className='btn btn-secondary text-white' type="submit" value="Login" />
                                    </div>
                                    <div className="text-center mt-2">
                                        <button onClick={handleGoogleSignIn} className="btn btn-secondary text-white">Google Login</button>
                                    </div>
                                </form>
                                <p className="text-center">Do not  have an account? <Link className="text-blue-600 font-bold" to="/signup">Sign Up</Link></p>
                                {success && <p className='text-green-500'>{success}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;