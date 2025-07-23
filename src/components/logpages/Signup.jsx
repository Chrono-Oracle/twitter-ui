"use client";
import React from "react";

import { SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import { Facebook, CircleG } from "lucide-react";
import { FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { redirect, useRouter } from "next/navigation";

import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";


const Signup = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [Name , setName] = React.useState("");
  const [Phone , setPhone] = React.useState("");
  const [Email , setEmail] = React.useState("");
  const [Password , setPassword] = React.useState("");
  const [ConfirmPassword , setConfirmPassword] = React.useState("");
   const validation =()=>{
        if(!Name || !Email || !Password || !ConfirmPassword){
         setIsLoading(false);
         toast.error("Please fill all fields");
         return;
        }
        if(Password !== ConfirmPassword){
          setIsLoading(false);
         toast.error("Please fill all fields");
         return;
        }
   }
     const Payload = {
        Name,
        Email,
        Password,
        ConfirmPassword,
        Phone
     }

    const handleSignup = async () => {
      console.log("Sign Up", Payload);
      setIsLoading(true);
      validation();

      await axios.post(`http://localhost:3000/api/users`, Payload).then( result => {
        toast.success("User Created Successfully");
        console.log(result.data);

        setIsLoading(false);
        router.push("/")
      }).catch ( error => {
        setIsLoading(false);
        toast.error("Registration Failed. Try again.");
        console.log(error);
      })
      
    }

  return (
 <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row w-full max-w-5xl">
        {/* Left Side Image */}
        <div className="md:w-1/2 h-64 md:h-auto">
          <img
            src="/sign.jpg"
            alt="Contact"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side Form */}
        <form className="md:w-1/2 p-6 sm:p-8 w-full">
           <ToastContainer position="top-center" />
          <div className="flex flex-col items-center w-full">
            <FaTwitter color={"#03A2C2"} size={40} />
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign Up</h2>
          </div>
          <div className="flex gap-4 mb-6 cursor-pointer">
            <SignUpButton mode="redirect" redirect_url="/">
              <button
                type="button"
                className="flex items-center justify-center gap-2 flex-1 font-bold bg-[#000] text-white py-2 rounded-md  transition"
              >
                <FcGoogle />
                Google
              </button>
            </SignUpButton>

            <SignUpButton mode="redirect" redirect_url="/">
              <button
                type="button"
                className="flex items-center justify-center gap-2 flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                <Facebook size={18} />
                Facebook
              </button>
            </SignUpButton>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                name="name"
                value={Name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700">Phone</label>
              <input
                type="text"
                placeholder="Your Phone"
                name="Phone"
                value={Phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={Email}
                onChange={(e)=> setEmail(e.target.value)}
                placeholder="Your Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="text"
                placeholder="Password"
                name="password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type="text"
                placeholder="Confirm Password"
                name="password"
                value={ConfirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="button"
              onClick={() => handleSignup()}
              className="w-full bg-[#03A2C2] text-white py-2 rounded-md hover:bg-[#4d8691f5] transition"
            >
             {isLoading ? "Registering.....": "Sign Up"} 
            </button>
            <h4 className="text-center">
              Already have an account?{" "}
              <Link href="/" className="text-[#03A2C2] font-bold">
                {" "}
                SignIn
              </Link>
            </h4>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;