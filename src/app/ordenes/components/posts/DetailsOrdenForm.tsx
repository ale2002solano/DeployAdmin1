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
    id_orden_paypal: string | null;
    estado_transaccion: string | null;
    fecha_transaccion: string | null;
    color: string;
}

interface Producto {
    codigo_fact: string;
    fecha_fact: string;
    precio_envio: number;
    subtotal: number;
    impuesto: number;
    total: number;
    nombre_prod: string;
    precio_prod: number;
    cantidad_productos: number;
    total_productos: number;
    color: string;
}

interface DetalleOrden {
    cliente: DetalleOrdenCliente;
    productos: Producto[];
}
export default function DetailsOrdenForm() {
    const [detalleOrden, setDetalleOrden] = useState<DetalleOrden | null>(null);
    const [ordenId, setOrdenId] = useState<string | null>(null);

    

    useEffect(() => {
        const idOrden = localStorage.getItem("ordenSeleccionada");
        if (idOrden) {
            setOrdenId(idOrden);  // Guardar el ID de la orden en el estado
        } else {
            console.error("No se encontró el ID de la orden");
        }
    }, []);

    const fetchDetalleOrden = useCallback(async () => {
        if (!ordenId) {
            console.error("No se encontró el ID de la orden");
            return;
        }

        try {
            // Realizar dos solicitudes, una para el cliente y otra para los productos
            const clienteResponse = await fetch(`https://deploybackenddiancrochet.onrender.com/admin/detalle/cliente/orden/${ordenId}`);
            const clienteData = await clienteResponse.json();

            const productosResponse = await fetch(`https://deploybackenddiancrochet.onrender.com/admin/detalle/orden/${ordenId}`);
            const productosData = await productosResponse.json();

            if (clienteData.DetalleOrdenCliente && clienteData.DetalleOrdenCliente.length > 0) {
                const cliente = clienteData.DetalleOrdenCliente[0];

                // Combinamos los datos del cliente y los productos
                const detalleOrdenData: DetalleOrden = {
                    cliente: cliente,
                    productos: productosData.DetalleOrden || [],
                };

                setDetalleOrden(detalleOrdenData);
            } else {
                console.error("No se encontró la información del cliente");
            }
        } catch (error) {
            console.error("Error al obtener los detalles de la orden:", error);
        }
    }, [ordenId]);

    useEffect(() => {
        if (ordenId) {
            fetchDetalleOrden();  // Llamamos a la función fetchDetalleOrden
        }
    }, [ordenId, fetchDetalleOrden]);

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
                <h1 className="flex items-center font-rubik font-semibold text-xl text-gray-700">Orden ID: #{ordenId} <div className="ml-2 border-solid border-2 p-2 rounded-md font-opensans font-light text-sm" style={{ backgroundColor: detalleOrden.cliente.color }}>{detalleOrden.cliente.estado_fact}</div></h1>
                <div className="flex flex-row flex-nowrap justify-between items-stretch content-stretch">
                    <h1 className="flex items-center"><IoCalendarOutline className="mr-2 text-xl" /><div>{detalleOrden.cliente.fecha_transaccion}</div></h1>
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
                    <h2>Nombre: {detalleOrden.cliente.nombre}</h2>
                    <h2>Email: {detalleOrden.cliente.correo}</h2>
                    <h2>Celular: {detalleOrden.cliente.telefono}</h2>
                </div>
                <div className="rounded-md border-solid border-2 p-5 flex-1">
                    <header className="flex justify-center">Info de pago</header>
                    <h2 className="flex items-center">Forma de pago: <FaCcPaypal className="text-4xl ml-2 text-blue-600" /></h2>
                    <h2>ID orden PayPal: {detalleOrden.cliente.id_orden_paypal}</h2>
                    <h2>Estado transacción: {detalleOrden.cliente.estado_transaccion}</h2>
                    <h2>Fecha transacción: {detalleOrden.cliente.fecha_transaccion}</h2>
                </div>
                <div className="rounded-md border-solid border-2 p-5 flex-1">
                    <header className="flex justify-center">Entrega en</header>
                    <h2>Departamento: {detalleOrden.cliente.departamento || ""}</h2>
                    <h2>Ciudad: {detalleOrden.cliente.ciudad || ""}</h2>
                    <h2>Dirección: {detalleOrden.cliente.direccion_factura}</h2>
                </div>
            </div>

        </div>
  </div>

  <div className="w-full bg-white rounded-md p-5 flex flex-col h-auto overflow-auto text-gray-950 mt-3">
    <header className="flex justify-center border-b">Productos</header>
    <table>
        <thead className="text-left">
            <tr>
                <th className="border-b p-3">Nombre producto</th>
                <th className="border-b p-3">Orden ID</th>
                <th className="border-b p-3">Cantidad</th>
                <th className="border-b p-3">Total</th>
            </tr>
        </thead>
        <tbody>
             {detalleOrden.productos.map((producto, index) => (
                 <tr key={index}>
                     <td className="border-b p-3">{producto.nombre_prod}</td>
                     <td className="border-b p-3">{ordenId}</td>
                     <td className="border-b p-3">{producto.cantidad_productos}</td>
                     <td className="border-b p-3">L.{producto.total_productos}</td>
                 </tr>
             ))}
         </tbody>

    </table>
  </div>
</div>
    );
}