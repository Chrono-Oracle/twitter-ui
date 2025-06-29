'use client'

import React from 'react'
import Link from 'next/link'
import { useState } from 'react';
import { FaGoogle, FaFacebookF, FaTiktok } from "react-icons/fa";

import { SignUpButton } from '@clerk/nextjs'

const SignUp = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const validate = () => {
        const newErrors = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        };


    if (/\d/.test(name)) {
    newErrors.name = "Name must not contain numbers.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    newErrors.email = "Invalid email format.";
    }

    const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    if (!passwordRegex.test(password)) {
    newErrors.password =
        "Password must include uppercase, lowercase, number, and symbol.";
    }

    if (password !== confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === "");



    };

    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);
        setErrors((prev) => ({
        ...prev,
        name: /\d/.test(value) ? "Name must not contain numbers." : "",
        }));
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setErrors((prev) => ({
        ...prev,
        email: /^[^\s@]+@[^\s@]+.[^\s@]+$/.test(value)
            ? ""
            : "Invalid email format.",
        }));
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        const passwordRegex =
        /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[\W_]).{6,}$/;
        setErrors((prev) => ({
        ...prev,
        password: passwordRegex.test(value)
            ? ""
            : "Password must include uppercase, lowercase, number, and symbol.",
        }));
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        setErrors((prev) => ({
        ...prev,
        confirmPassword:
            value === password ? "" : "Passwords do not match.",
        }));
    };

const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("creating your account dont close this screen!");
      // Submit form logic here
    }
  };

  return (
    <main id='signup' className=' grid grid-cols-2 gap-x-[1rem]'>
        <section id='left-side' className="h-screen rounded-3xl"></section>
        <section id='right-side' className="h-screen w-[35rem]">
            <div className="grid items-center justify-center h-screen bg-white/10 backdrop-blur-lg shadow-xl p-10 border border-white/10">
                <form  className="space-y-5 w-[20rem] onSubmit={handleSubmit}>">
                    <div className="text-white">
                        <h2 className="text-3xl font-bold mb-6">Create an account</h2>
                        <p className="">Already have an account? <Link href="/log-pages">Sign in</Link></p>
                    </div>

                    <div className='text-white'>
                        <label className="block mb-1 text-sm ">Full Name</label>
                        <input
                        type="text"
                        onChange={handleNameChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-2 rounded-3xl bg-white/30 placeholder-gray-600 border  focus:outline-none focus:ring-2 focus:ring-[#1DA1F2]"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    {/* <div className='text-white'>
                        <label className="block mb-1 text-sm ">Username</label>
                        <input
                        type="text"
                        placeholder="mafiagangster"
                        className="w-full px-4 py-2 rounded-3xl bg-white/30 placeholder-gray-600 border  focus:outline-none focus:ring-2 focus:ring-[#1DA1F2]"
                        />
                    </div> */}

                    <div className='text-white'>
                        <label className="block mb-1 text-sm ">Email</label>
                        <input
                        type="email"
                        onChange={handleEmailChange}
                        placeholder="user@email.com"
                        className="w-full px-4 py-2 rounded-3xl bg-white/30 placeholder-gray-600 border  focus:outline-none focus:ring-2 focus:ring-[#1DA1F2]"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    <div className='text-white'>
                        <label className="block mb-1 text-sm ">Password</label>
                        <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="w-full px-4 py-2 rounded-3xl bg-white/30  placeholder-gray-600 border border-white focus:outline-none focus:ring-2 focus:ring-[#1DA1F2]"
                            onChange={handlePasswordChange}
                        />
                        
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 flex items-center text-sm text-white"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                        {errors.password && (<p className="text-red-500 text-sm">{errors.password}</p>)}
                    </div>

                    <div className='text-white'>
                        <label className="block mb-1 text-sm ">Confirm Password</label>
                        <div className="relative">
                        <input
                            type={showConfirm ? "text" : "password"}
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            className="w-full px-4 py-2 rounded-3xl bg-white/30 text-white placeholder-gray-600 border border-white focus:outline-none focus:ring-2 focus:ring-[#1DA1F2]"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute inset-y-0 right-3 flex items-center text-sm text-white"
                        >
                            {showConfirm ? "Hide" : "Show"}
                        </button>
                        </div>
                        {errors.confirmPassword && (<p className="text-red-500 text-sm">{errors.confirmPassword}</p>)}
                    </div>


                </form>

                <button
                        type="submit"
                        className="w-full bg-[#1DA1F2] hover:bg-purple-600 transition text-white py-2 rounded-3xl font-medium"
                    >
                        Sign Up
                    </button>

                    <div className=" grid justify-center gap-y-[1rem]">
                        <span className="text-white">or sign up with</span>
                        
                        <div className="flex justify-center gap-x-[2rem]">
                            <SignUpButton mode='redirect' redirect_url='/home'>
                                <FaGoogle color='white' />
                            </SignUpButton>
                            <SignUpButton mode='redirect' redirect_url='/home'>
                                <FaFacebookF color='white' />
                            </SignUpButton>
                            <SignUpButton mode='redirect' redirect_url='/home'>
                                <FaTiktok color='white' />
                            </SignUpButton>
                        </div>
                    </div>

            </div>
        </section>
    </main>
  )
}

export default SignUp