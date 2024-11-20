'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

export default function Password () {



    return(
        <div className="shadow-lg flex gap-2 items-center bg-white p-2 hover:shadow-xl hover:border-2 border-gray-300 group delay-200 rounded-xl">
            <div>
                <FontAwesomeIcon icon={ faLock } className="text-gray-400 text-2xl"/>
            </div>
            <input
                type="password"
                name="text"
                className="flex-1 focus:outline-none focus:border-none border-none text-black focus:ring-0"
                placeholder="Contraseña"
            />
        </div>

        
    )
}