"use cliente";
import React, { useEffect } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import { GrStatusGoodSmall } from "react-icons/gr";

export default function Dashboard() {
    return(
        <>
        <div id="Primary" className="flex flex-col flex-nowrap justify-start items-start content-stretch w-full pr-10 h-full" >

            <div id="header" className="text-gray-950 flex flex-col flex-nowrap justify-between items-stretch content-stretch mb-5 w-full">
                <div>
                    <h1 className="font-rubik text-3xl font-semibold mb-3">Dashboard</h1>
                </div>

                <div className="text-gray-700 flex flex-row flex-nowrap justify-between items-stretch content-stretch font-opensansm">
                    <h1 className="text-lg">Home &gt; Dashboard</h1>
                    <h5 className="flex items-center"><IoCalendarOutline className="mr-2 text-xl"/> Oct 11,2023 - Nov 11,2022</h5>
                </div>
            </div>

            <div id="cont" className="text-gray-950 flex flex-col flex-nowrap justify-start items-start content-stretch w-full h-[65%] bg-white rounded-md p-5">
                <div id="encab1" className="text-gray-950 flex flex-row flex-nowrap justify-between items-stretch content-stretch w-full pr-2 font-rubik"> 
                    <h1 className="font-rubik font-black text-lg">Ordenes</h1>
                    <h1 className="font-light flex items-center">Ordenar por:
                        <select className=" border-none text-sm w-auto text-left rounded-md">
                            <option value=""> </option>
                            <option value="fecha">Fecha</option>
                            <option value="cliente">Cliente</option>
                            <option value="estado">Estado</option>
                        </select>
                    </h1>
                </div>

                <div id="table" className="overflow-y-auto w-full">
                    <table className="w-full table-auto text-sm">
                        <thead className="text-gray-400 border-b-2 font-rubik font-semibold">
                            <tr>
                                <th className="text-left p-4">Orden ID</th>
                                <th className="text-left p-4">Fecha</th>
                                <th className="text-left p-4">Nombre Cliente</th>
                                <th className="text-left p-4">Estado</th>
                                <th className="text-left p-4">Total</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-950 border-b-2 font-opensansm">
                            <tr>
                                <td className="p-4">#25426</td>
                                <td className="p-4">Nov 8th,2023</td>
                                <td className="p-4">Kavin</td>
                                <td className="p-4 flex items-center"><GrStatusGoodSmall className="mr-1 text-xs text-green-400" />Enviado</td>
                                <td className="p-4">L.200</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
            </div>

        </div>
        </>
    );
}