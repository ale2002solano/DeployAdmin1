'use client'

import { faEllipsisH } from "@fortawesome/free-solid-svg-icons/faEllipsisH"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from 'react'

export default function BotonDespl ({indexProduct} : {indexProduct : number}) {
    const [isOpen, setIsOpen] = useState(false);
    const botonRef = useRef<HTMLDivElement>(null);
    const [edit, setEdit] = useState(0);
    const [newProduct, setNewProduct] = useState(0);

    console.log(indexProduct)

    const handleNewProduct = (index: number) => {
        setNewProduct(index);
        console.log(newProduct);
    };

    const handleEditProduct = (index: number) => {
        setEdit(index);
        console.log(edit);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (botonRef.current && !botonRef.current.contains(event.target as Node)) {
            setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
    <div ref={botonRef} className="relative">
        {!isOpen && (
            <div onClick={() => setIsOpen(true) } className="h-full w-full flex justify-center items-center rounded-md z-2  cursor-pointer">
                <div>
                    <FontAwesomeIcon icon= {faEllipsisH} className="text-xl  text-[#b266ff] text-center hover:text-purple-600" />
                </div>
            </div>
        )}

        {isOpen && (
            <div className="w-40 absolute bg-white rounded-md shadow-lg z-10 font-lekton text-base">
                <a onClick={() => {handleEditProduct(indexProduct)}} href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 ">
                    Editar
                </a>
                <a onClick={() => {handleNewProduct(indexProduct)}} href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                    Eliminar
                </a>
            </div>
        )}
    </div>
    )
}