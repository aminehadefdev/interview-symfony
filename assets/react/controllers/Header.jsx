import React from "react"


export default function Header({user}) {
    return (
        <header><p className="text-white">{user.email}</p></header>
    )
}