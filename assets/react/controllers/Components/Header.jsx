import fetchBeneficiary from "../utils/fetchBenificiary"
import Modal from "./Modal"


export default function Header({ user }) {
    // const form = {
    //     "name": "mehdi"
    // }
    // const handleClick = async () => {
    //     fetchBeneficiary({method: "POST", headers: { "Content-Type": "application/ld+json" }, body: JSON.stringify(form)})
    // }
    return (
        <header className="flex justify-between align-middle">
            <p className="text-white px-4 py-2">{user.email}</p>
            <Modal></Modal>
        </header>
    )
}