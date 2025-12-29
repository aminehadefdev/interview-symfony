import React from "react"

export default function Beneficiary({ beneficiary }) {
    return (
        <div className="w-48 max-w-sm rounded overflow-hidden shadow-lg flex flex-col items-center text-center">
            <img className="w-full" src={beneficiary.avatarUrl} alt="Sunset in the mountains" />
            <div className="px-6 py-4">
                <a href={"https://localhost:8000/api/beneficiaries/" + beneficiary.id} ><p className="text-white-700 text-base">{beneficiary.name}</p></a>
            </div>
        </div>
    )
}