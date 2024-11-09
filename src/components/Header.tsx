"use client";
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa';
import Image from "next/legacy/image";
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [correo, setCorreo] = useState<string>(''); // Estado para almacenar el correo
  const [mensajeAdvertencia, setMensajeAdvertencia] = useState<string | null>(null); // Mensaje de advertencia
  const profileRef = useRef<HTMLDivElement>(null);  // Definir tipo para la referencia
  const router = useRouter();

  const toggleProfileMenu = () => {
    setProfileOpen(!isProfileOpen);
  };

  // useEffect para manejar el clic fuera del menú
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {  // Especificar el tipo del evento
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);  // Cierra el menú si se hace clic fuera de él
      }
    };

    // Agregar event listener cuando el menú está abierto
    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Limpiar event listener cuando se desmonte el componente
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileOpen]);

  // Recuperar el correo del localStorage cuando el componente se monte
  useEffect(() => {
    const storedResponse = localStorage.getItem('loginResponse');
    if (storedResponse) {
      const parsedResponse = JSON.parse(storedResponse);
      setCorreo(parsedResponse?.query_result?.CORREO || '');  // Establecer el correo si existe
    }
  }, []);

  const handleCarritoClick = () => {
    if (!correo) {
      setMensajeAdvertencia('Inicia Sesion para acceder');
      setTimeout(() => setMensajeAdvertencia(null), 3000); // Limpiar el mensaje después de 3 segundos
    } else {
      router.push('/checkout/shop-cart'); // Redirigir al carrito si está logueado
    }
  };

  return (
    <header className="bg-white shadow-md font-koulen">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Link href="http://dian-crochet-8ii.vercel.app/">
            <Image src="/img/logo.svg" alt="Logo" width={40} height={40} />
          </Link>
          <nav className="hidden md:flex space-x-8">
            <a onClick={() => router.push('/products')} href="#" className="text-gray-700 hover:text-purple-500">PRODUCTOS</a>
            <a href="#" className="text-gray-700 hover:text-purple-500">KITS</a>
            <a href="#" className="text-gray-700 hover:text-purple-500">TUTORIALES</a>
          </nav>
        </div>

        {/* Iconos */}
        <div className="flex items-center space-x-6 relative">
          {/* Perfil */}
          <div className="relative flex items-center" ref={profileRef}>
            <button onClick={toggleProfileMenu} className="focus:outline-none" title="Perfil">
              <FaUserCircle className="text-gray-700 text-2xl" />
            </button>

            {/* Menú de perfil */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-20">
                {/* Aquí puedes agregar enlaces adicionales como "Mi Perfil" o "Iniciar Sesión" */}
              </div>
            )}
          </div>

          {/* Carrito */}
          <button onClick={handleCarritoClick} title="Carrito">
            <FaShoppingCart className="text-gray-700 text-2xl" />
          </button>

          {/* Mostrar mensaje de advertencia si no está logueado */}
          {mensajeAdvertencia && (
             <div className="text-lg items-center w-1/4 flex justify-center font-koulen fixed bottom-5 right-5 bg-gray-200 opacity-90 text-purple-600 px-4 py-2 rounded-lg z-50">
            {mensajeAdvertencia}
            <svg className={"ml-6 size-6 text-blue-500"} xmlns="http://www.w3.org/2000/svg" strokeWidth={2} width="2em" height="1em" viewBox="0 0 32 32">
              <path fill="currentColor" d="m15.875 4l-.094.031l-8 1.875L7 6.094v20.25l.813.125l8 1.5l.093.031H18V4zM20 6v2h3v16h-3v2h5V6zm-4 .031V26l-7-1.313V7.657zM14.344 15c-.367 0-.688.45-.688 1s.32 1 .688 1s.656-.45.656-1s-.29-1-.656-1"></path>
            </svg>
           </div>
          )}
        </div>
      </div>
    </header>
  );
}
