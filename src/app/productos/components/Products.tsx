'use client'

import DetalleProducto1 from "./infoProducto/DetalleProducto1"
import DetalleProducto2 from "./infoProducto/DetalleProducto2"

export default function Products () {
    return (
        <div className="bg-white h-[64%] w-[30%] m-4 rounded-xl shadow-xl p-3 border border-gray-200">
            <div className="w-full h-[50%]">
                <DetalleProducto1/>
            </div>
            <div className="w-full h-[50%]">
                <DetalleProducto2/>
            </div>
        </div>
    )
}