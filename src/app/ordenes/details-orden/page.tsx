"use client";
import Sidebar from "../components/sidebar";
import Headerbar from "../components/header";
import DetailsOrdenForm from "../components/posts/DetailsOrdenForm";

export default function Details() {
    return (
        <main className="flex h-screen w-full bg-gray-200 overflow-hidden">
          
          <aside className="w-auto h-full bg-black relative z-10">
            <Sidebar />
          </aside>
    
          <div className="flex flex-col flex-1 h-full relative">
    
            <header className="h-[10%] bg-gray-100 relative z-0">
              <Headerbar />
            </header>
    
            <section className="flex-1 overflow-y-auto pt-[11%] pl-[20%]">
              <DetailsOrdenForm />
            </section>
          </div>
        </main>
      );
    }
    
