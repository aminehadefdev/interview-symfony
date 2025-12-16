import React from "react"

export default function Beneficiary({ beneficiary }) {
    return (
        <div class="w-48 max-w-sm rounded overflow-hidden shadow-lg flex flex-col items-center text-center">
            <img class="w-full" src={beneficiary.AvatarUrl} alt="Sunset in the mountains" />
            <div class="px-6 py-4">
                <a href={beneficiary['@id']} ><p className="text-gray-700 text-base text-white">{beneficiary.name}</p></a>
            </div>
        </div>
    )
}