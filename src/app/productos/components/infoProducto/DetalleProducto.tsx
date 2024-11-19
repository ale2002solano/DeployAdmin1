'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faTruckFast } from '@fortawesome/free-solid-svg-icons'
import BotonDespl from './BotonDespl'
import Image from "next/legacy/image";

export default function DetalleProducto({ id, nombre, precio, color, cantidad_vendida, cantidad_disp, imagen }: 
                            { id: number; nombre: string; precio: string; color: string; cantidad_vendida: number; cantidad_disp: number; imagen: string })
                            
                            {
                                
    return (
        <div className="bg-white h-full w-full m-4 rounded-xl shadow-xl p-3 border border-gray-200">
            <div className="rounded-xl w-full h-full flex flex-col">
            

            <div className="w-full h-[50%] mb-2">
                <div className="rounded-xl mb-1 w-full h-full flex ">
                    <div className="w-[30%] h-full relative rounded-xl p-1 pb-2 ">
                        <div className="w-full rounded-xl border  border-gray-100" >
                        <Image
                            src={imagen}
                            alt={nombre}
                            layout="fill" // Esto hace que la imagen ocupe todo el espacio disponible
                            className="object-cover rounded-md" // Ajusta la imagen al contenedor sin distorsionar
                            />
                        </div>
                    </div>

                    <div className="w-[60%] h-full rounded-xl flex flex-col">
                        <div className="w-full h-[30%]">
                            <p className="font-extrabold text-base text-gray-800 font-lekton m-1">{nombre}</p>
                        </div>

                        <div className="w-full h-[20%]">
                            <p className="text-xs text-gray-800 font-crimson ml-1">{color}</p>
                        </div>

                        <div className="w-full h-[50%] flex items-end justify-end">
                            <p className="font-bold text-end text-gray-800 font-lekton">{precio}</p>
                        </div>
                    </div>
                    <div className=" w-[10%] h-[16%] z-4">
                        <BotonDespl 
                            indexProduct = {id}
                        />
                    </div>
                </div>
            </div>


            <div className="w-full h-[50%]">
                <div className="rounded-xl w-full h-full border border-gray-300">
                    <div className="w-full h-[48%] rounded-xl flex items-center p-3">
                        <div className="h-full w-[75%] flex items-center">
                            <div><p  className="text-base font-semibold font-lekton text-gray-800">Vendidos</p></div>
                        </div>

                        <div className="h-full w-[10%] flex items-center justify-center">
                            <FontAwesomeIcon icon={ faArrowUp } className="text-lg font-bold text-[#C68EFE]"/>
                        </div>

                        <div className="h-full w-[15%] flex items-center justify-center">
                            <div><p  className="text-base font-semibold font-lekton text-gray-800">{cantidad_vendida}</p></div>
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
                            <div><p  className="text-base font-semibold font-lekton text-gray-800">{cantidad_disp}</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}