'use client'
import Image from 'next/image';
import { CiGrid42 } from "react-icons/ci";
import { TiArchive } from "react-icons/ti";
import React, { useState } from "react";
export default function SideBar() {

//Cambiar color de fondo de botones cuando se hace click        
    const [activeButton, setActiveButton] = useState<string | null>(null);
    const handleButtonClick = (button: string) => {
        setActiveButton(button);
    };

    return(
        <div className='h-screen w-2/10 fixed top-0 left-0 bg-white p-5 border-gray-300 border-solid border'>
            <div className='flex flex-row flex-nowrap justify-start items-center content-around mb-5'>
                <Image src="/img/logo.svg" alt="Logo" width={60} height={60} />
                <h1 className='text-gray-950 ml-5 font-koulen'>Dian Crochet</h1>    
            </div>
            <div className='flex flex-col flex-nowrap justify-start items-start content-stretch font-rubik'>
                <button type="button" title='orden' className={`text-gray-950 flex flex-row flex-nowrap justify-start items-center content-stretch mb-2 ${activeButton === 'orden' ? 'bg-purple-400 text-white' : ''} rounded-md p-3 w-full text-sm font-medium`} 
                    onClick={() => handleButtonClick('orden') }><CiGrid42 className='mr-2 text-lg font-semibold' /> ORDENES</button>
                <button type="button" title='product' className={`text-gray-950 flex flex-row flex-nowrap justify-start items-center content-stretch ${activeButton === 'product' ? 'bg-purple-400 text-white' : ''} rounded-md p-3 w-full text-sm font-medium`} 
                    onClick={() => handleButtonClick('product')}><TiArchive className='mr-2 text-lg' /> TODOS LOS PRODUCTOS</button>
            </div>
            
        </div>
    );
}