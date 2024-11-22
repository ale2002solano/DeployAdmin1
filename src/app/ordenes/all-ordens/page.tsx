"use client";

import Sidebar from "../../../components/sidebar";
import Headerbar from "../../../components/HeaderAdmin";
import OrdenForm from "../components/posts/OrdenForm";

export default function Dash() {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar con un ancho fijo para mayor control */}
      <aside className="w-[250px] md:w-[300px] h-full bg-black fixed z-10">
        <Sidebar />
      </aside>

      <main className="flex h-screen w-full bg-gray-200 ml-[250px] md:ml-[300px]">
        <div className="flex flex-col flex-1 h-full">
          <header className="h-[10%] bg-gray-100 relative z-0">
            <Headerbar />
          </header>

          <section className="flex-1 overflow-y-auto">
            <OrdenForm />
          </section>
        </div>
      </main>
    </div>
  );
}
