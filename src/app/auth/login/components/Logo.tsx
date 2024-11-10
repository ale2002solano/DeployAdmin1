'use client'

export default function Logo () {
    return(
        <div className="w-[15%] flex justify-end items-center absolute top-[10px] right-[20px]">
            <img src="/img/logo.svg" alt="logo" className="rounded-full shadow-lg w-[20%] h-auto" />
            <div className="w-[40%]">
                <p className="text-gray-700 font-crimson text-xs font-semibold">--DianCrochet</p>
            </div>
        </div>
    )
}