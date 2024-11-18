'use client';

import Footer from "components/Footer";
import Navbar from "components/navbar";
import EditProduct from "./components/EditForm";



export default function Dashboard() {
    return (
      <div className="w-full min-h-screen flex flex-col bg-slate-50"> 
      <Navbar/> 
        <main className="bg-slate-50 flex-grow justify-center items-center mt-[4.3%] h-full">
          <div className='flex justify-center items-center'>
            <EditProduct/>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  