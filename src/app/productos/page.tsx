'use client'


import Navbar from 'components/navbar'
import SideBar from 'components/Sidebar'
import Titulo from './components/Titulo'
import Interactions from './components/Interactions'

export default function productos () {
    return (
        <div className="flex h-screen w-full flex-col bg-slate-50 overflow-hidden ">
            <div className="h-[12%] w-full">
                <Navbar/>
            </div>
            
            <div className='flex h-[88%] w-full'>
                <div  className="w-[22%] h-full" >
                    <SideBar/>
                </div>
                
                <div className="h-full z-2 w-full bg-[#COCOCO]">
                    <div className="h-[8%] w-full">
                        <Titulo/></div>
                    <div className="h-[85%] w-full">
                        <Interactions/></div>
                    </div>
            </div>
        </div>
    )
}