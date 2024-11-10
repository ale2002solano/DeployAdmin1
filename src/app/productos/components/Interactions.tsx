'use client'

import Categorias from './interacciones/Categorias'
import SearchBar from './interacciones/SearchBar'
import Boton from './interacciones/Boton'

export default function Interactions () {
    return (
        <div className="flex justify-between items-center w-full h-full ">
            <div className="w-[25%] px-3"><Categorias/></div>
            <div className="w-[50%] px-3"><SearchBar/></div>
            <div className="w-[25%] px-3"><Boton/></div>
        </div>
    )
}