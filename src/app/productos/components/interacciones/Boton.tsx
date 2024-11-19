'use client';

import { useRouter } from 'next/navigation';

export default function Boton() {
    const router = useRouter();

    return (
        <div className="w-full h-full flex">
            <button
                className="w-[50%] font-lekton mr-2 size-8 py-1 px-3 bg-[#C68EFE] hover:bg-[#b067f8] rounded-md shadow-lg text-white font-semibold transition duration-200 text-base"
                type="button"
                onClick={() => router.push('/createProduct')}
            >
                <p className="">+ Producto</p>
            </button>

            <button
                className="w-[50%] font-lekton size-8 py-1 px-3 bg-[#C68EFE] hover:bg-[#b067f8] rounded-md shadow-lg text-white font-semibold transition duration-200 text-base"
                type="button"
                onClick={() => router.push('/createMaterial')}
            >
                <p className="">+ Material</p>
            </button>
        </div>
    );
}
