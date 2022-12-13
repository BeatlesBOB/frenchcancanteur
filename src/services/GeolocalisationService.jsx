import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const fetchLocalisationByAddress = (city) => {
    return axios.get(`https://api-adresse.data.gouv.fr/search/?q=${city}&type=housenumber`);
}

export const fetchLocationByLatLng = ({lat,lng}) => {
    return axios.get(`https://api-adresse.data.gouv.fr/reverse/?lat=${lat}&lon=${lng}`);
}

export const useLocationByaddress = city => {
    return useQuery(['address', city], ()=>fetchLocalisationByAddress(city), {
        enabled: (city && city.length > 3)?true:false
    })
}

export const useLocationByLatLng = ({lat,lng}) => {
    return useQuery(['address', {lat,lng}], ()=>fetchLocationByLatLng({lat,lng}),{
        enabled:lng !== null && lat !== null
    })
}