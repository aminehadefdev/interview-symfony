import { useState, useEffect } from "react";

export default function SearchBar({ beneficiaries, setFilteredBeneficiaries, globalSearch }) {
    const [search, setSearch] = useState('');

    const fetchBeneficiariesByName = async (search) => {
        const beneficiariesCopy = [...beneficiaries]
        const response = await fetch("https://localhost:8000/api/beneficiaries/name/" + search, {
            method: 'GET',
            headers: { "Content-Type": "application/ld+json" },
            credentials: "include",
        })
        if (!response.ok){
            setFilteredBeneficiaries(beneficiaries);
            return
        }
        const data = await response.json();
        if (search === '') {
            setFilteredBeneficiaries(beneficiariesCopy)
        }      
        setFilteredBeneficiaries(data)
    }

    useEffect(() => {
        if (search === '') {
            setFilteredBeneficiaries(beneficiaries); // tout afficher si input vide
        } else {
            if (!globalSearch) {
                const filtered = beneficiaries.filter(b =>
                    b.name.toLowerCase().includes(search.toLowerCase())
                );
                setFilteredBeneficiaries(filtered);
            } else {
                fetchBeneficiariesByName(search)
            }
        }
    }, [search, beneficiaries, setFilteredBeneficiaries, globalSearch]);

    return (
        <div>
            <label className="block mb-2.5 text-sm font-medium text-heading">Local search</label>
            <input
                type="text"
                placeholder="Rechercher un nom..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            />
        </div>
    );
}
