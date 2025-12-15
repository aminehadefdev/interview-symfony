import { useEffect, useState } from "react";
import Login from "./Login";

export default function Home() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // 🔹 nouvel état


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('https://localhost:8000/api/me', {
                    method: 'GET',
                    headers: { "Content-Type": "application/json" },
                    credentials: "include", // ⭐ cookie HttpOnly
                });

                if (!response.ok) {
                    setUser(null); // pas connecté
                    return;
                }

                const data = await response.json();
                setUser(data); // met à jour l'état
            } catch (err) {
                console.error(err);
                setUser(null);
            } finally {
                setLoading(false); // 🔹 on a fini de charger
            }
        };
        fetchUser();
    }, []);
    if (loading) {
        // 🔹 affichage pendant que la requête est en cours
        return <div className="color-white"><h1>Loading...</h1></div>;
    }

    // 🔹 rendu après la fin du chargement
    return (
        <div className="color-white">
            {!user ? <Login onLogin={setUser} /> : <h1>Hello {user.email}</h1>}
        </div>
    );
}
