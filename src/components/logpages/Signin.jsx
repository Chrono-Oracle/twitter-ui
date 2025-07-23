'use client'

import React from 'react'
import { useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';

import { FaGoogle, FaFacebookF, FaTiktok } from "react-icons/fa";

import { SignUpButton } from '@clerk/nextjs'
import axios from 'axios';

const SignIn = () => {

    const [ isLoading, setIsLoading ] = useState(false);
    const [ Email, setEmail ] = useState("");
    const [ Password, setPassword ] = useState("");
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const validation = () => {
        if(!Email || !Password){
            setIsLoading(false);
            toast.error("Please fill all fields");
            return;
        }
    }

    const Payload = {
        Email,
        Password
    }

    const handleSignIn = async () => {
        console.log("Sign In", Payload);
        setIsLoading(true);
        validation();

        await axios.post("http://localhost:3000/api/users/authentication", Payload).then(result =>{
            toast.success("Welcome Back!")
            localStorage.setItem("user", JSON.stringify(result.data));
            console.log(result.data);

            setIsLoading(false);
            router.push("/home")
        }).catch ( error => {
            setIsLoading(false);
            toast.error("Login Failed. Try again.");
            console.log(error);
        })
    }

  return (
    <main id='signin' className=' grid grid-cols-2 gap-x-[1rem]'>
        <section id='left-side' className="h-screen rounded-3xl"></section>
        <section id='right-side' className="h-screen w-[35rem]">
            <div className="grid items-center justify-center h-screen bg-white/10 backdrop-blur-lg shadow-xl p-10 border border-white/10">
                <form className="space-y-5 w-[20rem] ">
                    <div className="text-white">
                        <h2 className="text-3xl font-bold mb-6">Sign in</h2>
                        <p className="">Don't have an account? <Link href="/signup">Create now</Link></p>
                    </div>

                    <ToastContainer position='top-center'/>

                    <div className='text-white'>
                        <label className="block mb-1 text-sm ">Email</label>
                        <input
                        name='email'
                        value={Email}
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="user@email.com"
                        className="w-full px-4 py-2 rounded-3xl bg-white/30 placeholder-gray-600 border  focus:outline-none focus:ring-2 focus:ring-[#1DA1F2]"
                        />
                    </div>

                    <div className='text-white'>
                        <label className="block mb-1 text-sm ">Password</label>
                        <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 rounded-3xl bg-white/30  placeholder-gray-600 border border-white focus:outline-none focus:ring-2 focus:ring-[#1DA1F2]"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-3 flex items-center text-sm text-white"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                        </div>
                    </div>

                    

                    <button
                        type="button"
                        onClick={() => handleSignIn()}
                        className="w-full bg-[#1DA1F2] hover:bg-purple-600 transition text-white py-2 rounded-3xl font-medium"
                    >
                        {isLoading ? "Signing In..." : "Sign In"}
                    </button>

                    <div className=" grid justify-center gap-y-[1rem]">
                        <span className="text-white">or sign in with</span>
                        
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

                </form>

            </div>
        </section>
    </main>
  )
}

export default SignIn