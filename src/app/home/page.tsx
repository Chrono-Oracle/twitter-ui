/* import Image from "next/image"; */
import Aside from "@/components/Aside";
import Posts from "@/components/Posts";

import { auth } from "@clerk/nextjs/server";
import { redirect } from 'next/navigation'

export default async function Home() {

  const { userId }  = await auth();
    if (!userId) {
      redirect('/home');
    }

  return (

    

    <>
      <section id="main">
        <div className=""><Posts/></div>
        <div className=""><Aside/></div>
      </section>
    </>
  );
}
