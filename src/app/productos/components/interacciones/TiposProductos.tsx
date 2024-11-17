'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect, useRef } from 'react';
import { getProductosPorTipo } from '@services/product';
import { InfoProductos } from '@interfaces/product';

export default function TiposProductos () {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const [idTypeProduct, setIdTypeProduct] = useState(0);
    const [products, setProducts] = useState<InfoProductos[]>([]);

    const handleIdTypeProduct = (index: number) => {
        setIdTypeProduct(index);
        console.log(idTypeProduct);
    };

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
                <a onClick={() => handleIdTypeProduct(1)} href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 ">
                    Productos
                </a>
                <a onClick={() => handleIdTypeProduct(3)} href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                    Materiales
                </a>
                <a onClick={() => handleIdTypeProduct(2)} href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                    Kits
                </a>
                <a onClick={() => handleIdTypeProduct(4)} href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                    Tutoriales
                </a>
                </div>
            )}
            </div>
        </div>
    )
}