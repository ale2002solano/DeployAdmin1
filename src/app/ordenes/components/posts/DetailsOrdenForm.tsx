"use cliente";
import { IoPrintOutline } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import { FaCcPaypal } from "react-icons/fa";
export default function DetailsOrdenForm(){
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
                <h1 className="flex items-center font-rubik font-semibold text-xl text-gray-700">Orden ID: # <div className="ml-2 border-solid border-2 p-2 rounded-md bg-yellow-500 font-opensans font-light text-sm">Pendiente</div></h1>
                <div className="flex flex-row flex-nowrap justify-between items-stretch content-stretch">
                    <h1 className="flex items-center"><IoCalendarOutline className="mr-2 text-xl" /><div>15/05/2023</div></h1>
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
            <div className="flex flex-row flex-nowrap justify-between items-stretch content-stretch mt-3">
                <div className="rounded-md boder-solid border-2 p-5">
                    <header className="flex justify-center">Cliente</header>
                    <h2>Nombre:</h2>
                    <h2>Email:</h2>
                    <h2>Celular:</h2>
                </div>
                <div className="rounded-md boder-solid border-2 p-5">
                    <header className="flex justify-center">Info de pago</header>
                    <h2 className="flex items-center">Forma de pago: <FaCcPaypal className="text-4xl ml-2 text-blue-600"/></h2>
                    <h2>ID orden PayPal:</h2>
                    <h2>Estado transaccion:</h2>
                    <h2>Fecha transaccion:</h2>
                </div>
                <div className="rounded-md boder-solid border-2 p-5">
                    <header className="flex justify-center">Entrega en</header>
                    <h2>Departamento:</h2>
                    <h2>Ciudad:</h2>
                    <h2>Direccion:</h2>
                </div>
            </div>
        </div>
  </div>

  <div className="w-full bg-white rounded-md p-5 flex flex-col h-auto overflow-auto text-gray-950 mt-3">
    <header className="flex justify-center">Productos</header>
    <table>
        <thead>
            <tr>
                <th className="border-solid border-2 p-3">Nombre producto</th>
                <th className="border-solid border-2 p-3">Orden ID</th>
                <th className="border-solid border-2 p-3">Precio</th>
                <th className="border-solid border-2 p-3">Subtotal</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td className="border-solid border-2 p-3">Producto 1</td>
                <td className="border-solid border-2 p-3">1</td>
                <td className="border-solid border-2 p-3">$100</td>
                <td className="border-solid border-2 p-3">$100</td>
            </tr>
            <tr>
                <td className="border-solid border-2 p-3">Producto 2</td>
                <td className="border-solid border-2 p-3">2</td>
                <td className="border-solid border-2 p-3">$200</td>
                <td className="border-solid border-2 p-3">$400</td>
            </tr>
        </tbody>
    </table>
  </div>
</div>
    );
}