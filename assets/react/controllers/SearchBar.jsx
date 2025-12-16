import { useState, useEffect } from "react";

export default function SearchBar({ beneficiaries, setFilteredBeneficiaries }) {
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (search === '') {
            setFilteredBeneficiaries(beneficiaries); // tout afficher si input vide
        } else {
            const filtered = beneficiaries.filter(b =>
                b.name.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredBeneficiaries(filtered);
        }
    }, [search, beneficiaries, setFilteredBeneficiaries]);

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
