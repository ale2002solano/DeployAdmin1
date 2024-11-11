'use client'

import BotonDespl from './BotonDespl'

export default function DetalleProducto1 () {
    return (
        <div className="rounded-xl w-full h-full flex ">
            <div className="w-[30%] h-full rounded-xl p-1 ">
                <div className="bg-[url('/img/CrochetPumpkin.jpeg')] bg-cover w-full h-full rounded-xl border  border-gray-100" ></div>
            </div>

            <div className="w-[60%] h-full rounded-xl flex flex-col">
                <div className="w-full h-[30%]">
                    <p className="font-extrabold text-base text-gray-800 font-lekton m-1">Decorador de mesa</p>
                </div>

                <div className="w-full h-[20%]">
                    <p className="text-xs text-gray-800 font-crimson ml-1">Naranja</p>
                </div>

                <div className="w-full h-[50%] flex items-end justify-end">
                    <p className="font-bold text-end text-gray-800 font-lekton">L.200.59</p>
                </div>
            </div>

            <div className=" w-[10%] h-[16%]">
                <BotonDespl />
            </div>

        </div>
    )
}