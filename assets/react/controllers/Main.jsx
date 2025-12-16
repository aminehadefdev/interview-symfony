import { useEffect, useState } from "react"
import Beneficiary from "./Beneficiary";



export default function Main() {
    const [beneficiary, setBeneficiary] = useState()
    const [loading, setLoading] = useState(true); // 🔹 nouvel état

    useEffect(() => {
        //https://localhost:8000/api/beneficiaries?page=1
        const fetchBeneficiary = async () => {
            try {
                const response = await fetch("https://localhost:8000/api/beneficiaries/random?limt=12", {
                    method: 'GET',
                    headers: { "Content-Type": "application/json" },
                    credentials: "include", // ⭐ cookie HttpOnly
                })
                if (!response.ok) {
                    setBeneficiary(null); // pas connecté
                    return;
                }
                const data = await response.json();
                setBeneficiary(data); // met à jour l'état
            } catch (err) {
                console.error(err);
                setBeneficiary(null);
            } finally {
                setLoading(false); // 🔹 on a fini de charger
            }
        }
        fetchBeneficiary()
    }, [])
    if (loading) {
        // 🔹 affichage pendant que la requête est en cours
        return <div className="color-white"><h1>Loading...</h1></div>;
    }

    // 🔹 rendu après la fin du chargement
    return (
        <div className="color-white grid grid-cols-5 gap-6 grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
            {beneficiary.member.map(beneficiary=><Beneficiary beneficiary={beneficiary}></Beneficiary>)}
        </div>
    );
}