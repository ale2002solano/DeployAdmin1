'use client'

export default function Boton () {
    return (
        <div className="w-full h-full flex">
            <button className="w-[50%] font-lekton mr-2 size-8 py-1 px-3 bg-[#C68EFE] hover:bg-[#b067f8] rounded-md shadow-lg text-white font-semibold transition duration-200 text-base"
                    type="submit">
                    <p className="">+ Producto</p>
            </button>

            <button className="w-[50%] font-lekton size-8 py-1 px-3 bg-[#C68EFE] hover:bg-[#b067f8] rounded-md shadow-lg text-white font-semibold transition duration-200 text-base"
                    type="submit">
                    <p className="">+ Material</p>
            </button>
        </div>
        
    )
}