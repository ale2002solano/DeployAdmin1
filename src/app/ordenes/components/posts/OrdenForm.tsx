"use cliente";
import React, { useEffect, useState } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import { GrStatusGoodSmall } from "react-icons/gr";
// Interfaz para las órdenes
interface Orden {
    id_factura: number;
    codigo_fact: string;
    fecha_fact: string;
    nombre: string;
    estado_fact: string;
    color: string;
  }
export default function Dashboard() {
   // Estado para almacenar las órdenes
   const [ordenes, setOrdenes] = useState<Orden[]>([]);
   const [fechaInicio, setFechaInicio] = useState<string>("");
   const [fechaFin, setFechaFin] = useState<string>("");
 
   // Función para obtener las órdenes con método POST
   const fetchOrdenes = async () => {
     try {
       const response = await fetch(
         "https://deploybackenddiancrochet.onrender.com/admin/ordenes",
         {
           method: "POST", // Cambiamos el método a POST
           headers: {
             "Content-Type": "application/json",
           },
         }
       );
 
       if (!response.ok) {
         throw new Error(`Error: ${response.status} ${response.statusText}`);
       }
 
       const data = await response.json();
       setOrdenes(data.ordenes); // Asegúrate de que la respuesta contenga un arreglo de órdenes
 
       // Actualizamos el rango de fechas
       if (data.ordenes.length > 0) {
         obtenerRangoDeFechas(data.ordenes);
       }
     } catch (error) {
       console.error("Error al obtener las órdenes:", error);
     }
   };
 
  // Función para obtener el rango de fechas
const obtenerRangoDeFechas = (ordenes: Orden[]) => {
    const fechas = ordenes.map((orden) => {
      const fechaPartes = orden.fecha_fact.split(/[-/]/); // Dividir la fecha por '-' o '/'
      
      // Revisamos si el formato es DD/MM/YYYY o YYYY-MM-DD
      let dateObj;
      if (fechaPartes[0].length === 4) {
        // Si el primer elemento tiene 4 dígitos, es YYYY-MM-DD
        dateObj = new Date(
          Number(fechaPartes[0]), // Año
          Number(fechaPartes[1]) - 1, // Mes (0-indexed)
          Number(fechaPartes[2]) // Día
        );
      } else {
        // Si no, asumimos que es DD/MM/YYYY
        dateObj = new Date(
          Number(fechaPartes[2]), // Año
          Number(fechaPartes[1]) - 1, // Mes (0-indexed)
          Number(fechaPartes[0]) // Día
        );
      }
  
      return dateObj.getTime(); // Convertir a timestamp
    });
  
    const fechaMin = new Date(Math.min(...fechas));
    const fechaMax = new Date(Math.max(...fechas));
  
    // Formatear las fechas a "MMM DD, YYYY"
    const opciones = { year: "numeric", month: "short", day: "numeric" } as const;
    setFechaInicio(fechaMin.toLocaleDateString("en-US", opciones));
    setFechaFin(fechaMax.toLocaleDateString("en-US", opciones));
  };
  
 

   // Obtener órdenes al cargar el componente
   useEffect(() => {
    fetchOrdenes();

    console.log("Órdenes obtenidas:", ordenes);

  }, []);
    return(
        <>
        <div id="Primary" className="flex flex-col flex-nowrap justify-start items-start content-stretch w-full pr-10 h-full" >

            <div id="header" className="text-gray-950 flex flex-col flex-nowrap justify-between items-stretch content-stretch mb-5 w-full">
                <div>
                    <h1 className="font-rubik text-3xl font-semibold mb-3">Dashboard</h1>
                </div>

                <div className="text-gray-700 flex flex-row flex-nowrap justify-between items-stretch content-stretch font-opensansm">
                    <h1 className="text-lg">Home &gt; Dashboard</h1>
                    <h5 className="flex items-center text-lg"><IoCalendarOutline className="mr-2 text-xl"/> {fechaInicio} - {fechaFin}</h5>
                </div>
            </div>

            <div id="cont" className="text-gray-950 flex flex-col flex-nowrap justify-start items-start content-stretch w-full h-[65%] bg-white rounded-md p-5">
                <div id="encab1" className="text-gray-950 flex flex-row flex-nowrap justify-between items-stretch content-stretch w-full pr-2 font-rubik"> 
                    <h1 className="font-rubik font-black text-lg">Ordenes</h1>
                    <h1 className="font-light flex items-center">Ordenar por fecha:
                        <select className=" border-none text-sm w-auto text-left rounded-md">
                            <option value=""> </option>
                            <option value="fecha">Ascendente</option>
                            <option value="cliente">Descendente</option>
                        </select>
                    </h1>
                </div>

                <div id="table" className="overflow-y-auto w-full">
                    <table className="w-full table-auto text-sm">
                        <thead className="text-gray-400 border-b-2 font-rubik font-semibold sticky top-0 bg-white z-10">
                            <tr>
                                <th className="text-left p-4">Orden ID</th>
                                <th className="text-left p-4">Fecha</th>
                                <th className="text-left p-4">Nombre Cliente</th>
                                <th className="text-left p-4">Estado</th>
                                <th className="text-left p-4">Total</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-950 font-opensansm">
                            {ordenes.length > 0 ? (
                            ordenes.map((orden) => (
                                <tr key={orden.id_factura} className="border-b">
                                <td className="p-4">#{orden.codigo_fact}</td>
                                <td className="p-4">{orden.fecha_fact}</td>
                                <td className="p-4">{orden.nombre}</td>
                                <td className="p-4 flex items-center">
                                    <GrStatusGoodSmall 
                                        className="mr-1 text-xs" 
                                        style={{ color: orden.color }} // Aquí solo cambia el color del ícono
                                    />
                                    <span className="text-gray-950">{orden.estado_fact}</span> {/* El texto se mantiene en negro */}
                                </td>
                                <td className="p-4">L.200</td>
                                </tr>
                            ))
                            ) : (
                            <tr>
                                <td className="p-4 text-center" colSpan={5}>
                                No hay órdenes disponibles
                                </td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
            </div>

        </div>
        </>
    );
}