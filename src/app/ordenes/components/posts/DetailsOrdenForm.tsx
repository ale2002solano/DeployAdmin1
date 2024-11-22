import React, { useEffect, useState, useCallback } from "react";
import { IoPrintOutline } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import { FaCcPaypal } from "react-icons/fa";

// Definición de la interfaz para los datos de la orden
interface DetalleOrdenCliente {
    nombre: string;
    correo: string;
    telefono: string;
    estado_fact: string;
    ciudad: string | null;
    departamento: string | null;
    direccion_factura: string;
    id_orden_paypal: string;
    estado_transaccion: string;
    fecha_transaccion: string;
    color: string;
}

export default function DetailsOrdenForm() {
    // Estado para manejar los detalles de la orden
    const [detalleOrden, setDetalleOrden] = useState<DetalleOrdenCliente | null>(null);

    // Estado para manejar el ID de la orden
    const [ordenId, setOrdenId] = useState<string | null>(null);

    // Obtener el ID de la orden desde localStorage
    useEffect(() => {
        const idOrden = localStorage.getItem("ordenSeleccionada");
        if (idOrden) {
            setOrdenId(idOrden);  // Guardar el ID de la orden en el estado
        } else {
            console.error("No se encontró el ID de la orden");
        }
    }, []);

    // Función para obtener los detalles de la orden
    const fetchDetalleOrden = useCallback(async () => {
        if (!ordenId) {
            console.error("No se encontró el ID de la orden");
            return;
        }

        try {
            const response = await fetch(`https://deploybackenddiancrochet.onrender.com/admin/detalle/cliente/orden/${ordenId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            // Suponemos que el dato de la orden viene en el campo 'DetalleOrdenCliente'
            setDetalleOrden(data.DetalleOrdenCliente[0]);  // Toma el primer objeto de la lista
        } catch (error) {
            console.error("Error al obtener los detalles de la orden:", error);
        }
    }, [ordenId]);  // Añadir ordenId como dependencia

    // Llamar a la función fetchDetalleOrden cuando el componente se monta
    useEffect(() => {
        if (ordenId) {
            fetchDetalleOrden();
            const ordenId = localStorage.getItem("ordenSeleccionada");
console.log("ID de la orden recuperado:", ordenId);

        }
    }, [ordenId, fetchDetalleOrden]); // Incluir fetchDetalleOrden en las dependencias

    // Verificar si se obtuvieron los datos
    if (!detalleOrden || !ordenId) {
        return <div>Cargando...</div>;
    }
    

    return (
        <div id="Primary" className="flex flex-col justify-start items-start w-full h-full overflow-auto p-5">
  {/* Encabezado */}
  <div id="header" className="text-gray-950 mb-5 w-full">
    <h1 className="font-rubik text-3xl font-semibold mb-3">Detalles orden</h1>
    <div className="text-gray-700 flex justify-between items-center">
      <h1 className="text-lg">Home &gt; Lista ordenes &gt; Detalles de la orden</h1>
    </div>
  </div>

  {/* Contenedor de órdenes */}
  <div className="w-full bg-white rounded-md p-5 flex flex-col h-auto overflow-auto text-gray-950">
        <div>
            <header>
                <h1 className="flex items-center font-rubik font-semibold text-xl text-gray-700">Orden ID: #{ordenId} <div className="ml-2 border-solid border-2 p-2 rounded-md font-opensans font-light text-sm" style={{ backgroundColor: detalleOrden.color }}>{detalleOrden.estado_fact}</div></h1>
                <div className="flex flex-row flex-nowrap justify-between items-stretch content-stretch">
                    <h1 className="flex items-center"><IoCalendarOutline className="mr-2 text-xl" /><div>{detalleOrden.fecha_transaccion}</div></h1>
                    <div className="flex items-center">
                        <select name="status" id="" className="rounded-md border-none bg-gray-100">
                            <option value="">cambiar estado</option>
                            <option value="pendiente">Enviado</option>
                            <option value="cancelado">Cancelado</option>
                            <option value="pagado">Pagado</option>
                            <option value="finalizada">Finalizada</option>
                        </select>
                        <button className="border-splid border-2 py-3 px-10 ml-5 text-xl border-none bg-gray-100 rounded-md"><IoPrintOutline /></button>
                    </div>
                </div>
            </header>
            <div className="flex flex-row flex-nowrap justify-between items-stretch content-stretch mt-3 gap-2">
                <div className="rounded-md border-solid border-2 p-5 flex-1">
                    <header className="flex justify-center">Cliente</header>
                    <h2>Nombre: {detalleOrden.nombre}</h2>
                    <h2>Email: {detalleOrden.correo}</h2>
                    <h2>Celular: {detalleOrden.telefono}</h2>
                </div>
                <div className="rounded-md border-solid border-2 p-5 flex-1">
                    <header className="flex justify-center">Info de pago</header>
                    <h2 className="flex items-center">Forma de pago: <FaCcPaypal className="text-4xl ml-2 text-blue-600" /></h2>
                    <h2>ID orden PayPal: {detalleOrden.id_orden_paypal}</h2>
                    <h2>Estado transacción: {detalleOrden.estado_transaccion}</h2>
                    <h2>Fecha transacción: {detalleOrden.fecha_transaccion}</h2>
                </div>
                <div className="rounded-md border-solid border-2 p-5 flex-1">
                    <header className="flex justify-center">Entrega en</header>
                    <h2>Departamento: {detalleOrden.departamento || ""}</h2>
                    <h2>Ciudad: {detalleOrden.ciudad || ""}</h2>
                    <h2>Dirección: {detalleOrden.direccion_factura}</h2>
                </div>
            </div>

        </div>
  </div>

  <div className="w-full bg-white rounded-md p-5 flex flex-col h-auto overflow-auto text-gray-950 mt-3">
    <header className="flex justify-center border-b">Productos</header>
    <table>
        <thead>
            <tr>
                <th className="border-b p-3">Nombre producto</th>
                <th className="border-b p-3">Orden ID</th>
                <th className="border-b p-3">Cantidad</th>
                <th className="border-b p-3">Total</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
  </div>
</div>
    );
}