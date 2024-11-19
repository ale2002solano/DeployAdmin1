        "use client";
import Sidebar from "../components/sidebar";
import Headerbar from "../components/header";
import OrdenForm from "../components/posts/OrdenForm";

export default function Dash() {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
        <aside className="w-auto h-full bg-black relative z-10">
        <Sidebar />
      </aside>
    <main className="flex h-screen w-full bg-gray-200 overflow-hidden">
      
      <div className="flex flex-col flex-1 h-full relative">

        <header className="h-[10%] bg-gray-100 relative z-0">
          <Headerbar />
        </header>

        <section className="flex-1 overflow-y-auto mt-[0%] ml-[16.4%]">
          <OrdenForm />
        </section>
      </div>
    </main>
    </div>
  );
}
