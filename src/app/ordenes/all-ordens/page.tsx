"use client";
import Sidebar from "../components/sidebar";
import Headerbar from "../components/header";
import OrdenForm from "../components/posts/OrdenForm";

export default function Dash() {
  return (
    <main className="flex h-screen w-full bg-gray-200 overflow-hidden">
      {/* Header */}
      <Headerbar />
      {/* Sidebar fijo a la izquierda */}
      <Sidebar />
      {/* Contenedor del contenido principal */}
      <div className="ml-[20%] mt-[6%] w-[80%] flex flex-col h-full">
        {/* Sección principal con el formulario */}
        <section className="flex-1 flex items-center justify-center overflow-auto p-5">
          <OrdenForm />
        </section>
      </div>
    </main>
  );
}
