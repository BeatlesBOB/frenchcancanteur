import { useQuery } from "@tanstack/react-query";
import { getLocalisation } from "../../../services/GeolocalisationService";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { geohashForLocation } from "geofire-common";
import Form from "../../03 - Organisms/Form/Form";
import Form__Actions from "../../02 - Molecules/Form__Actions/Form__Actions";
import Form__Control from "../../02 - Molecules/Form__Control/Form__Control";
import Button from "../../01 - Atoms/Button/Button";
import Link from "../../01 - Atoms/Link/Link";
import Label from "../../01 - Atoms/Label/Label";
import Input from "../../01 - Atoms/Input/Input";
import Error from "../../01 - Atoms/Error/Error";
import Suggestion from "../../02 - Molecules/Suggestion/Suggestion";

export default function Register() {
    const [selectedAddress,setSelectedAddress] = useState(undefined)
    const [address,setAddress] = useState("")
    const [error,setError] = useState(null)
    const navigate = useNavigate()

    const {data:autocompletedAddress,refetch:getAddresse} = useQuery(['adresse',address],()=>getLocalisation(address),{
        enabled: (address && address.length > 3)?true:false
    })
    
    const handleSubmit = async (e) => {
        e.preventDefault();  
        if(selectedAddress){
            const hash = geohashForLocation(selectedAddress.geometry.coordinates);
            const user = {
                firstname: e.currentTarget.firstname.value,
                lastname: e.currentTarget.lastname.value,
                address: {...selectedAddress,geometry:{...selectedAddress.geometry,hash}},
                email:e.currentTarget.email.value,
                password:e.currentTarget.password.value
            } 
            //register
        } else{
            setError("Veuillez selectionner une addresse valide")
        }
    }

    const handleAddress = (e) => {
        setAddress(e.currentTarget.value)
    }

    const handleSelectedAddress = (suggestion) => {
        setAddress(suggestion.properties.label)
        setSelectedAddress(suggestion)
    }

   
    return (
        <Form handleSubmit={handleSubmit} className="login">
        {
            error && <Error>{error}</Error>
        }
        <Form__Control>
            <Label htmlFor="email">Nom</Label>
            <Input type="text" name="lastname" placeholder="Nom..." required={true} autoComplete="family-name" />
        </Form__Control>
        <Form__Control>
            <Label htmlFor="email">Prénom</Label>
            <Input type="text" name="firstname" placeholder="Nom..." required={true} autoComplete="given-name" />
        </Form__Control>
        <Form__Control>
            <Label htmlFor="email">Email</Label>
            <Input type="email" name="email" placeholder="Email..." required={true} autoComplete="email" />
        </Form__Control>
        <Form__Control>
            <Label htmlFor="password">Mot de passe</Label>
            <Input type="password" name="password" placeholder="Mot de passe..." required={true} autoComplete="current-password" />
        </Form__Control>
        <Form__Control>
            <Label htmlFor="email">Email</Label>
            <Input type="email" name="email" placeholder="Email..." required={true} autoComplete="email" />
        </Form__Control>
        <Form__Control>
            <Label htmlFor="email">Addresse</Label>
            <Suggestion />
        </Form__Control>
        <Form__Actions>
            <Link href="/login">Déjà un compte ?</Link>
            <Button style="primary">Se crée un compte</Button>
       </Form__Actions>
    </Form>
    )
}
