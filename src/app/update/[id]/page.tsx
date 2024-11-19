'use client';


import Footer from "components/Footer";
import Navbar from "components/navbar";
import EditarMaterial from "../components/EditarMaterial";
import EditarProducto from "../components/EditarProducto";


export default function Dashboard() {
    const producto = "material";
    return (
      <div className="w-full min-h-screen flex flex-col bg-slate-50"> 
      <Navbar/> 
        <main className="bg-slate-50 flex-grow justify-center items-center mt-[4.3%] h-full">
          <div className='flex justify-center items-center'>
              {producto == null ? (""): (
                producto == "material" ? (<EditarMaterial />): (<EditarProducto/>)
              ) } 
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  