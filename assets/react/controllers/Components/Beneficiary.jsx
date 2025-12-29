
export default function Beneficiary({ beneficiary, setBeneficiaries }) {
    const handleClick = async (id) => {
        try {
            const response = await fetch(
                "https://localhost:8000/api/beneficiaries/" + id,
                {
                    method: "DELETE",
                    headers: { "Content-Type": "application/ld+json" },
                    credentials: "include",
                }
            )

            if (!response.ok) {
                console.error("Erreur DELETE")
                return
            }

            setBeneficiaries(prev =>
                prev.filter(b => b.id !== id)
            )

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="w-48 max-w-sm rounded overflow-hidden shadow-lg flex flex-col items-center text-center">
            <button onClick={() => { handleClick(beneficiary.id) }} type="button" className="text-white bg-danger box-border border border-transparent hover:bg-danger-strong focus:ring-4 focus:ring-danger-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                </svg>
            </button>
            <img className="w-full" src={beneficiary.avatarUrl} alt="Sunset in the mountains" />
            <div className="px-6 py-4">
                <a href={"https://localhost:8000/api/beneficiaries/" + beneficiary.id} ><p className="text-white-700 text-base">{beneficiary.name}</p></a>
            </div>
        </div>
    )
}