'use client';

import Email from "../components/inputs/Email"
import Password from "../components/inputs/Password"

export default function LoginForm () {
    return(
        <div className="flex flex-col h-full w-full">
            <div className="h-[30%] flex flex-col justify-items-start"> 
                <p className="font-bold text-black text-2xl font-crimson">Login</p>
                <p className="text-gray-700 font-light text-base font-crimson">Bienvenido administrador</p>
            </div>
            <div className="h-[45%] flex flex-col justify-between">
                    <Email />
                    <Password />
            </div>

            <div className=" h-[25%] flex flex-col-reverse items-center">
                <div className="w-[30%]">
                    <button className="w-full py-2 px-4 bg-purple-500 hover:bg-purple-700 rounded-md shadow-lg text-white font-semibold transition duration-200"
                    type="submit">
                    Iniciar sesión
                    </button>
                </div>
            </div>
            
        </div>
    )
}