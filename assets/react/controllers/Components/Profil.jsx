import React from "react"
import Header from "./Header"
import Main from "./Main"


export default function Profil({ user }) {
    return (
        <>
            <Header user={user} />
            <Main />
        </>
    )
}