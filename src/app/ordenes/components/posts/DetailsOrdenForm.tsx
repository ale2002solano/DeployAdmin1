import React, { useEffect, useState, useCallback } from "react";
import { IoPrintOutline } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import { FaCcPaypal } from "react-icons/fa";
import jsPDF from "jspdf";

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

interface EstadoFactura {
    ID_ESTADO_FACT: number;
    ESTADO_FACT: string;
}
interface DetalleOrden {
    cliente: DetalleOrdenCliente;
    productos: Producto[];
}
export default function DetailsOrdenForm() {
    const [detalleOrden, setDetalleOrden] = useState<DetalleOrden | null>(null);
    const [ordenId, setOrdenId] = useState<string | null>(null);
    const [estados, setEstados] = useState<EstadoFactura[]>([]);
    const [selectedEstado, setSelectedEstado] = useState("");
    


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

   // Llamar a `fetchDetalleOrden` cuando `ordenId` cambie
   useEffect(() => {
    if (ordenId) {
        fetchDetalleOrden();
    }
}, [ordenId, fetchDetalleOrden]);

// Obtener los estados
useEffect(() => {
    const fetchEstados = async () => {
        try {
            const response = await fetch("https://deploybackenddiancrochet.onrender.com/admin/factura/estados");
            if (!response.ok) throw new Error("Error al obtener los estados");
            const data = await response.json();
            setEstados(data.Estados || []);
        } catch (error) {
            console.error("Error al obtener los estados:", error);
        }
    };

    fetchEstados();
}, []);

 // Manejar el cambio de estado
 const statusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nuevoEstado = e.target.value;
    setSelectedEstado(nuevoEstado);

    if (!ordenId) {
        console.error("ID de la orden no está disponible");
        return;
    }

    try {
        const estadoSeleccionado = estados.find((estado) => estado.ESTADO_FACT === nuevoEstado);
        if (!estadoSeleccionado) {
            console.error("No se encontró el estado seleccionado");
            return;
        }

        const response = await fetch(`https://deploybackenddiancrochet.onrender.com/admin/update/estado/${ordenId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ IdNuevoEstado: estadoSeleccionado.ID_ESTADO_FACT }),
        });

        if (!response.ok) {
            throw new Error("Error al actualizar el estado de la orden");
        }

        const data = await response.json();
        console.log("Respuesta del servidor:", data);

        // Actualizar la UI con los nuevos datos si el backend retorna algo útil
        if (data.UpdatedOrden) {
            setDetalleOrden((prevOrden) => {
                if (!prevOrden) return null;

                return {
                    ...prevOrden,
                    cliente: {
                        ...prevOrden.cliente,
                        estado_fact: data.UpdatedOrden.estado_factura,
                        color: data.UpdatedOrden.color,
                    },
                };
            });
        }
    } catch (error) {
        console.error("Error al actualizar el estado:", error);
    }
};


const generatePDF = () => {
    const doc = new jsPDF();

    // Verificar que `detalleOrden` y `detalleOrden.productos` están definidos
    if (!detalleOrden || !detalleOrden.productos || detalleOrden.productos.length === 0) {
        console.error("No hay productos disponibles para generar el PDF");
        return;
    }

    // Agregar detalles de cliente
    doc.setFontSize(12);
    doc.text(`Cliente: ${detalleOrden?.cliente.nombre}`, 10, 10);
    doc.text(`Correo: ${detalleOrden?.cliente.correo}`, 10, 15);
    doc.text(`Teléfono: ${detalleOrden?.cliente.telefono}`, 10, 20);
    doc.text(`Dirección: ${detalleOrden?.cliente.direccion_factura}`, 10, 25);
    doc.text(`Ciudad: ${detalleOrden?.cliente.ciudad || 'N/A'}`, 10, 30);
    doc.text(`Departamento: ${detalleOrden?.cliente.departamento || 'N/A'}`, 10, 35);
    doc.text(`Estado de la Factura: ${detalleOrden?.cliente.estado_fact}`, 10, 40);
    doc.text(`ID Orden PayPal: ${detalleOrden?.cliente.id_orden_paypal || 'N/A'}`, 10, 45);
    doc.text(`Estado de Transacción: ${detalleOrden?.cliente.estado_transaccion || 'N/A'}`, 10, 50);
    doc.text(`Fecha de Transacción: ${detalleOrden?.cliente.fecha_transaccion || 'N/A'}`, 10, 55);

    doc.addPage(); // Nueva página para los productos

    // Agregar título para los productos
    doc.setFontSize(14);
    doc.text("Productos", 10, 10);
    
    // Manualmente agregar tabla de productos
    let yOffset = 20;
    doc.setFontSize(12);
    doc.text("Nombre Producto", 10, yOffset);
    doc.text("Cantidad", 90, yOffset);
    doc.text("Precio", 140, yOffset);
    doc.text("Total", 190, yOffset);

    // Dibujar líneas
    yOffset += 10;
    for (let i = 0; i < detalleOrden.productos.length; i++) {
        const producto = detalleOrden.productos[i];
        doc.text(producto.nombre_prod, 10, yOffset);
        doc.text(`${producto.cantidad_productos}`, 90, yOffset);
        doc.text(`$${producto.precio_prod}`, 140, yOffset);
        doc.text(`$${producto.total_productos}`, 190, yOffset);
        yOffset += 10;
    }

    // Información de pago
    const total = detalleOrden.productos.reduce((acc, producto) => acc + producto.total_productos, 0) || 0;
    const impuestos = detalleOrden.productos.reduce((acc, producto) => acc + producto.impuesto, 0) || 0;
    const envio = detalleOrden.productos[0]?.precio_envio || 0;

    doc.text(`Subtotal: $${total}`, 10, yOffset + 10);
    doc.text(`Impuestos: $${impuestos}`, 10, yOffset + 15);
    doc.text(`Envío: $${envio}`, 10, yOffset + 20);
    doc.text(`Total: $${total + impuestos + envio}`, 10, yOffset + 25);

    // Guardar PDF
    doc.save("detalle_orden_completa.pdf");
};



if (!detalleOrden || !ordenId) {
    return <div>Cargando...</div>;
}

    
    return (
        <div id="Primary" className="flex flex-col justify-start items-start w-full h-full  p-5">
  {/* Encabezado */}
  <div id="header" className="text-gray-950 mb-5 w-full">
    <h1 className="font-rubik text-3xl font-semibold mb-3">Detalles orden</h1>
    <div className="text-gray-700 flex justify-between items-center">
      <h1 className="text-lg">Home &gt; Lista ordenes &gt; Detalles de la orden</h1>
    </div>
  </div>

  {/* Contenedor de órdenes */}
  <div className="w-full bg-white rounded-md p-5 flex flex-col h-full text-gray-950">
        <div>
            <header>
                <h1 className="flex items-center font-rubik font-semibold text-2xl text-gray-800">Orden ID: #{ordenId} <div className="ml-2 border-solid border-2 p-2 rounded-md font-opensans font-semibold text-white text-sm" style={{ backgroundColor: detalleOrden.cliente.color }}>{detalleOrden.cliente.estado_fact}</div></h1>
                <div className="flex flex-row flex-nowrap justify-between items-stretch content-stretch">
                    <h1 className="flex items-center font-opensansm font-semibold text-xl"><IoCalendarOutline className="mr-2 text-xl" /><div>{detalleOrden.cliente.fecha_transaccion}</div></h1>
                    <div className="flex items-center">
                    <select name="status" id="status" className="rounded-md border-none bg-gray-100 font-opensans" value={selectedEstado} onChange={statusChange}>
                        <option value="">Cambiar estado</option>
                        {estados.map((estado) => (
                            <option key={estado.ID_ESTADO_FACT} value={estado.ESTADO_FACT}>
                                {estado.ESTADO_FACT}
                            </option>
                        ))}
                    </select>
                        <button className="border-splid border-2 py-3 px-10 ml-5 text-xl border-none bg-gray-100 rounded-md" onClick={generatePDF}><IoPrintOutline /></button>
                    </div>
                </div>
            </header>
            <div className="flex flex-row flex-nowrap justify-between items-stretch content-stretch mt-3 gap-2">
                <div className="rounded-md border-solid border-2 p-5 flex-1 font-opensansm text-gray-700 text-lg">
                    <header className="flex justify-center font-rubik font-semibold text-xl text-gray-900">Cliente</header>
                    <h2>Nombre: {detalleOrden.cliente.nombre}</h2>
                    <h2>Email: {detalleOrden.cliente.correo}</h2>
                    <h2>Celular: {detalleOrden.cliente.telefono}</h2>
                </div>
                <div className="rounded-md border-solid border-2 p-5 flex-1 font-opensansm text-gray-700 text-lg">
                    <header className="flex justify-center font-rubik font-semibold text-xl text-gray-900">Info de pago</header>
                    <h2 className="flex items-center">Forma de pago: <FaCcPaypal className="text-4xl ml-2 text-blue-600" /></h2>
                    <h2>ID orden PayPal: {detalleOrden.cliente.id_orden_paypal}</h2>
                    <h2>Estado transacción: {detalleOrden.cliente.estado_transaccion}</h2>
                    <h2>Fecha transacción: {detalleOrden.cliente.fecha_transaccion}</h2>
                </div>
                <div className="rounded-md border-solid border-2 p-5 flex-1 font-opensansm text-gray-700 text-lg">
                    <header className="flex justify-center font-rubik font-semibold text-xl text-gray-900">Entrega en</header>
                    <h2>Departamento: {detalleOrden.cliente.departamento || ""}</h2>
                    <h2>Ciudad: {detalleOrden.cliente.ciudad || ""}</h2>
                    <h2>Dirección: {detalleOrden.cliente.direccion_factura}</h2>
                </div>
            </div>

        </div>
  </div>

  <div className="w-full bg-white rounded-md p-5 flex flex-col h-full text-gray-950 mt-3">
    <header className="flex justify-center border-b font-rubik font-semibold text-xl text-gray-900">Productos</header>
    <table>
        <thead className="text-left font-rubik text-lg text-gray-500">
            <tr>
                <th className="border-b p-3">Nombre producto</th>
                <th className="border-b p-3">Orden ID</th>
                <th className="border-b p-3">Cantidad</th>
                <th className="border-b p-3">Total</th>
            </tr>
        </thead>
        <tbody className="font-opensansm text-lg">
             {detalleOrden.productos.map((producto, index) => (
                 <tr key={index}>
                     <td className="border-b p-3">{producto.nombre_prod}</td>
                     <td className="border-b p-3">{detalleOrden.cliente.id_orden_paypal}</td>
                     <td className="border-b p-3">{producto.cantidad_productos}</td>
                     <td className="border-b p-3">L.{producto.total_productos}</td>
                 </tr>
             ))}
         </tbody>

    </table>
    
    <div className="flex justify-end mt-2">
    <table className="table-auto">
        <tbody>
            <tr>
                <td className="text-gray-700 font-opensans font-semibold w-3/4 text-left">Subtotal:</td>
                <td className="text-gray-900 font-opensans font-semibold text-right">L.{detalleOrden.productos.reduce((acc, producto) => acc + producto.subtotal, 0)}</td>
            </tr>
            <tr>
                <td className="text-gray-700 font-opensans font-semibold text-left">ISV (20%):</td>
                <td className="text-gray-900 font-opensans font-semibold text-right">L.{detalleOrden.productos.reduce((acc, producto) => acc + producto.impuesto, 0)}</td>
            </tr>
            <tr>
                <td className="text-gray-700 font-opensans font-semibold text-left">Descuento:</td>
                <td className="text-gray-900 font-opensans font-semibold text-right">L.0</td>
            </tr>
            <tr>
                <td className="text-gray-700 font-opensans font-semibold text-left">Envio:</td>
                <td className="text-gray-900 font-opensans font-semibold text-right">L.{detalleOrden.productos.reduce((acc, producto) => acc + producto.precio_envio, 0)}</td>
            </tr>
            <tr className="border-t">
                <td className="text-gray-700 font-semibold text-left text-lg pt-3">Total:</td>
                <td className="text-gray-900 text-lg font-black pt-3 text-right">L.{detalleOrden.productos.reduce((acc, producto) => acc + producto.total, 0)}</td>
            </tr>
        </tbody>
    </table>
</div>


  </div>
</div>
    );
}