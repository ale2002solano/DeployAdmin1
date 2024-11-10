'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar () {
    return (
        <div className="size-8 w-[95%] shadow-lg focus:border-purple-400 flex items-center bg-white p-2 hover:shadow-xl hover:border-2 border-purple-400 group delay-200 rounded-xl">
            <input 
                type="text"
                placeholder="Search.."
                className="size-6 w-[95%] focus:ring-0 text-black placeholder-gray-600 border-transparent focus:outline-none border-none"
            />
            <div className="cursor-pointer">
                <FontAwesomeIcon icon={faMagnifyingGlass} className=" text-gray-600 holder:text-purple-700 text-base "/>
            </div>
            
        </div>
    )
}