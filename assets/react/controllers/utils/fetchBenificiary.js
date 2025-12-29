import Constants from "./Constants";

export default async function fetchBeneficiary(option) {
    const res = fetch(Constants.protocole + Constants.domaine + Constants.port + Constants.baseURIApi + "beneficiaries/", option)
    console.log((await res).json);
} 