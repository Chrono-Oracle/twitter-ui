/* import Image from "next/image"; */
'use client'

import Aside from "@/components/Aside";
import Posts from "@/components/Posts";
import React, { useEffect, useState } from 'react';
import {  useRouter } from "next/navigation";



export default  function Home() {

const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push('/auth/signin'); // Safe client-side redirect
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // const handleLogout = () => {
  //   localStorage.removeItem("user");
  //   router.push("/auth/signin");
  // };

  if (!user) return null; // Optional: show a loader here
  return (

    

    <>
      <section id="main">
        <div className=""><Posts/></div>
        <div className=""><Aside/></div>
      </section>
    </>
  );
}
