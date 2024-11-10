'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";

export default function Email () {

    return(
        <div className="shadow-lg flex gap-2 items-center bg-white p-2 hover:shadow-xl hover:border-2 border-gray-300 group delay-200 rounded-xl">
            <div>
                <FontAwesomeIcon icon={faUserTie} className="text-gray-400 text-2xl"/>
            </div>
            <input
                type="email"
                name="text"
                className="flex-1 focus:outline-none border-none focus:ring-0 text-black"
                placeholder="Correo"
            />
        </div>

    )
}

