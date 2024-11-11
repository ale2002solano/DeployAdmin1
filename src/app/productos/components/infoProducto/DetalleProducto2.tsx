'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faTruckFast } from '@fortawesome/free-solid-svg-icons'

export default function DetalleProducto2 () {
    return (
        <div className="rounded-xl w-full h-full border border-gray-300">
            <div className="w-full h-[48%] rounded-xl flex items-center p-3">
                <div className="h-full w-[75%] flex items-center">
                    <div><p  className="text-base font-semibold font-lekton text-gray-800">Vendidos</p></div>
                </div>

                <div className="h-full w-[10%] flex items-center justify-center">
                    <FontAwesomeIcon icon={ faArrowUp } className="text-lg font-bold text-[#C68EFE]"/>
                </div>

                <div className="h-full w-[15%] flex items-center justify-center">
                    <div><p  className="text-base font-semibold font-lekton text-gray-800">250</p></div>
                </div>
            </div>

            <div className="bg-gray-300 ml-3 w-[85%] h-[2%] rounded-xl flex items-center">
            </div>

            <div className="w-full h-[48%] rounded-xl flex items-center p-3">
                <div className="h-full w-[75%] flex items-center">
                    <div><p className="text-base font-semibold font-lekton text-gray-800">Stock</p></div>
                </div>

                <div className="h-full w-[10%] flex items-center justify-center">
                    <FontAwesomeIcon icon={ faTruckFast } className="text-lg font-bold text-[#C68EFE]"/>
                </div>

                <div className="h-full w-[15%] flex items-center justify-center">
                    <div><p  className="text-base font-semibold font-lekton text-gray-800">150</p></div>
                </div>
            </div>

        </div>
    )
}