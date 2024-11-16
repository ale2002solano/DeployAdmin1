'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect, useRef } from 'react';

export default function Categorias () {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={menuRef} className="relative">
            <div onClick={() => setIsOpen(!isOpen)} className="hover:text-gray-800 cursor-pointer z-2 font-lekton font-semibold text-gray-700 flex justify-center items-center mt-3">
            <div>
                Tipos
            </div>
            <div>
                <FontAwesomeIcon icon={ faChevronDown } className='text-sm'/>
            </div>

            {isOpen && (
                <div className="mt-[48%] ml-[5%] w-48 bg-white rounded-md shadow-lg z-10 font-lekton text-base">
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 ">
                    Productos
                </a>
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                    Materiales
                </a>
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                    Kits
                </a>
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                    Tutoriales
                </a>
                </div>
            )}
            </div>
        </div>
    )
}