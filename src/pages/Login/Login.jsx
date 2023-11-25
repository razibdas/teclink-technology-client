
import { useContext, useState } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2'

import { AuthContext } from '../../provider/AuthProvider';

const Login = () => {

    const [disabled, setDisabled] = useState(true);

    const { signIn, googleSignIn  } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";


    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Login success",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from, { replace: true })
            })


    }

    const handleGoogleSignIn = () => {
        // Assuming googleSignIn is defined elsewhere
        googleSignIn()
            .then((user) => {
                console.log(user);
            })
            .catch((error) => {
                console.error(error);
            });
    };

        return (
            <>
                <div className="hero min-h-screen bg-base-200">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className=" w-1/2 mr-12 ">
                            <img className='lg:w-[500px] lg:h-[400px]' src="https://i.ibb.co/2sbzdhc/20602936-6333040.jpg" alt="" />
                        </div>
                        <div className="card  md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                            <form onSubmit={handleLogin} className="card-body">
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
                                    <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <input className="btn btn-primary" type="submit" value="Login" />
                                </div>
                                <div className="text-center mt-2">
                                    <button onClick={handleGoogleSignIn} className="btn btn-secondary text-white">Google Login</button>
                                </div>
                            </form>
                            <p className="text-center">Do not  have an account? <Link className="text-blue-600 font-bold" to="/signup">Sign Up</Link></p>
                        </div>

                    </div>
                </div>
            </>
        );
    };

    export default Login;



