import axios from "axios";

export const getLocalisation = async (city) => {
    return await axios.get(`https://api-adresse.data.gouv.fr/search/?q=${city}&type=housenumber`);
}