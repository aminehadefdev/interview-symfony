import { useState, useEffect } from "react";
import { Field, Input, Label } from '@headlessui/react'
import clsx from 'clsx'


export default function SearchBar({ beneficiaries, setFilteredBeneficiaries, globalSearch }) {
    const [search, setSearch] = useState('');

    const fetchBeneficiariesByName = async (search) => {
        const beneficiariesCopy = [...beneficiaries]
        const response = await fetch("https://localhost:8000/api/beneficiaries/name/" + search, {
            method: 'GET',
            headers: { "Content-Type": "application/ld+json" },
            credentials: "include",
        })
        if (!response.ok) {
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
            <Field>
                <Label className="text-sm/6 font-medium text-white">email</Label>
                <Input
                    type='text'
                    placeholder="Rechercher un nom..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={clsx(
                        'mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white',
                        'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
                    )}
                />
            </Field>
        </div>
    );
}
