"use client";
import Sidebar from "../../../components/Sidebar";
import Headerbar from "../../../components/HeaderAdmin";
import DetailsOrdenForm from "../components/posts/DetailsOrdenForm";

export default function Details() {
    return (
        <main className="flex h-screen w-full bg-gray-200 overflow-hidden">
          
          <aside className="w-[250px] md:w-[300px] h-full fixed top-0 left-0 z-20">
            <Sidebar />
          </aside>
    
          <div className="flex flex-col flex-1 h-full relative">
    
            <header className="h-[10%] bg-gray-100 relative z-0">
              <Headerbar />
            </header>
    
            <section className="flex-1 overflow-y-auto mt-[0%] ml-[16.4%]">
              <DetailsOrdenForm />
            </section>
          </div>
        </main>
      );
    }
    
