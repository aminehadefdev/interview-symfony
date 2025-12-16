import { useEffect, useState } from "react";
import Beneficiary from "./Beneficiary";
import SearchBar from "./SearchBar";

export default function Main() {
    const [beneficiaries, setBeneficiaries] = useState([]); // liste originale
    const [filteredBeneficiaries, setFilteredBeneficiaries] = useState([]); // liste filtrée
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBeneficiaries = async () => {
            try {
                const response = await fetch("https://localhost:8000/api/beneficiaries/random/limit/15", {
                    method: 'GET',
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                });
                if (!response.ok) {
                    setBeneficiaries([]);
                    setFilteredBeneficiaries([]);
                    return;
                }
                const data = await response.json();
                setBeneficiaries(data);
                setFilteredBeneficiaries(data); // initialement, tout est affiché
            } catch (err) {
                console.error(err);
                setBeneficiaries([]);
                setFilteredBeneficiaries([]);
            } finally {
                setLoading(false);
            }
        }
        fetchBeneficiaries();
    }, []);

    if (loading) {
        return <div className="color-white"><h1>Loading...</h1></div>;
    }

    return (
        <div>
            <SearchBar 
                beneficiaries={beneficiaries} 
                setFilteredBeneficiaries={setFilteredBeneficiaries} 
            />
            <div className="color-white grid grid-cols-5 gap-6 grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
                {filteredBeneficiaries.map(b => (
                    <Beneficiary key={b.id} beneficiary={b} />
                ))}
            </div>
        </div>
    );
}
