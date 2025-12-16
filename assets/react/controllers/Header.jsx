import React from "react"


export default function Header({ user }) {
    const form = {
        "name": "mehdi"
    }
    const handleClick = () => {
        f()
    }
    const f = async () => {
        const res = fetch("https://localhost:8000/api/beneficiaries", {
            method: "POST",
            headers: { "Content-Type": "application/ld+json" },
            credentials: "include",
            body: JSON.stringify(form),
        })
        console.log((await res).json);
        
    }
    return (
        <header className="flex">
            <p className="text-white">{user.email}</p>

            <button onClick={handleClick} type="button" className="inline-flex items-center justify-center  text-white bg-brand hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs rounded-base w-10 h-10 focus:outline-none">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="#ffffffff" width="800px" height="800px" viewBox="-3 0 19 19" class="cf-icon-svg"><path d="M12.711 9.182a1.03 1.03 0 0 1-1.03 1.03H7.53v4.152a1.03 1.03 0 0 1-2.058 0v-4.152H1.318a1.03 1.03 0 1 1 0-2.059h4.153V4.001a1.03 1.03 0 0 1 2.058 0v4.152h4.153a1.03 1.03 0 0 1 1.029 1.03z" /></svg>
            </button>

        </header>
    )
}