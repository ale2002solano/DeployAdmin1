'use client'

import { faEllipsisH } from "@fortawesome/free-solid-svg-icons/faEllipsisH"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function botonEllipDesplegable () {
    return (
        <div>
            <div>
                    <FontAwesomeIcon icon= {faEllipsisH} className="text-xl  text-[#b266ff] text-center hover:text-purple-600" />
            </div>
        </div>
    )
}