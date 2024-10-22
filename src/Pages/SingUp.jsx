import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = ({ setIsAuthenticated }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("http://localhost:3000/sign_up", data); // Changed to POST for sign up
            console.log("Sign up success:", response.data);
            setIsAuthenticated(true);
            navigate("/"); // Redirect to homepage after signup
        } catch (error) {
            console.log("Error during sign up:", error);
        }
    };

    return (
        <div className="bg-gray-400 min-h-screen flex flex-col items-center justify-center">
            {/* Account Dropdown */}
            <div className="absolute top-4 right-4">
                <div className="relative">
                    {/* <button className="bg-gray-800 text-white py-2 px-4 rounded">
                        Account
                    </button> */}
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                        <Link to="/login">
                            {/* <button className="block px-4 py-2 text-left text-gray-800 hover:bg-gray-100 w-full">
                                Login
                            </button> */}
                        </Link>
                        <Link to="/signup">
                            {/* <button className="block px-4 py-2 text-left text-gray-800 hover:bg-gray-100 w-full">
                                Signup
                            </button> */}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Signup Form */}
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Username</label>
                        <input
                            {...register('username', { required: true })}
                            type="text"
                            className={`w-full px-4 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring focus:ring-blue-300`}
                        />
                        {errors.username && <span className="text-red-500 text-sm">Username is required</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            {...register("email", { required: true })}
                            type="email"
                            className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring focus:ring-blue-300`}
                        />
                        {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            {...register("password", { required: true })}
                            type="password"
                            className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring focus:ring-blue-300`}
                        />
                        {errors.password && <span className="text-red-500 text-sm">Password is required</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Confirm Password</label>
                        <input
                            {...register("cpassword", { required: true })}
                            type="password"
                            className={`w-full px-4 py-2 border ${errors.cpassword ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring focus:ring-blue-300`}
                        />
                        {errors.cpassword && <span className="text-red-500 text-sm">Confirm password is required</span>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Login Link */}
                <div className="mt-4 text-center">
                    <p>Already have an account? 
                        <Link to="/login" className="text-blue-500 hover:underline ml-2">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
