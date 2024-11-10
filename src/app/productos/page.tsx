'use client'

import Footer from 'components/Footer'
import Navbar from 'components/navbar'
import Titulo from './components/Titulo'
import Interactions from './components/Interactions'
import Products from '../productos/components/Products'

export default function productos () {
    return (
        <div className="flex h-screen w-full flex-col bg-slate-50 overflow-hidden ">
            <div><Navbar/></div>
            
            <div className='flex pt-[5%] h-[80%] '>
                <div  className="w-[15%] h-full bg-[#ffffff] shadow-2xl " ></div>
                
                <div className=" z-2 w-full h-full bg-[#COCOCO]">
                    <div className="h-[8%]">
                        <Titulo/></div>
                    <div className="h-[14%]">
                        <Interactions/></div>
                    <div className="bg-purple-400 h-[78%]">
                        <Products/></div>
                </div>
            </div>
            
            <div><Footer /></div>
        </div>
    )
}

