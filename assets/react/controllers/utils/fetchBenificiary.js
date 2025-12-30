import Constants from "./Constants";

export default async function fetchBeneficiary(option, successe, failure, error)
{
    try {        
        const response = await fetch(Constants.protocole + Constants.domaine + Constants.port + Constants.baseURIApi + "beneficiaries", option)
        if(!response.ok){
            failure()
            return
        }
        successe()

    } catch (err) {
        error(err)
    }
} 