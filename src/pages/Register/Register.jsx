import { useLocationByaddress, useLocationByLatLng } from "../../services/GeolocalisationService";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { geohashForLocation } from "geofire-common";
import Form from "../../components/03 - Organisms/Form/Form";
import Form__Actions from "../../components/02 - Molecules/Form__Actions/Form__Actions";
import Form__Control from "../../components/02 - Molecules/Form__Control/Form__Control";
import Button from "../../components/01 - Atoms/Button/Button";
import Link from "../../components/01 - Atoms/Link/Link";
import Label from "../../components/01 - Atoms/Label/Label";
import Input from "../../components/01 - Atoms/Input/Input";
import Error from "../../components/01 - Atoms/Error/Error";
import Suggestion from "../../components/02 - Molecules/Suggestion/Suggestion";
import Checkbox from "../../components/01 - Atoms/CheckBox/Checkbox";
import { useEffect } from "react";

export default function Register() {
    const [selectedAddress, setSelectedAddress] = useState(undefined)
    const [address, setAddress] = useState("")
    const [latLng, setLatLng] = useState({lat:null,lng:null})
    const [useLocation, setUseLocation] = useState(false)
    const navigate = useNavigate()
    const { register, error } = useContext(AuthContext)
    const { data: autocompletedAddress } = useLocationByaddress(address)
    const { data: geolocalisedAddress } = useLocationByLatLng(latLng)

    useEffect(()=>{
        setSelectedAddress(geolocalisedAddress?.data?.features[0])
    },[geolocalisedAddress])


    const handleSubmit = async (e) => {
        e.preventDefault();
        if(selectedAddress){
            console.log(selectedAddress)
            const hash = geohashForLocation(selectedAddress.geometry.coordinates);
            const user = {
                firstname: e.currentTarget.firstname.value,
                lastname: e.currentTarget.lastname.value,
                email: e.currentTarget.email.value,
                password: e.currentTarget.password.value,
                address: { ...selectedAddress, geometry: { ...selectedAddress.geometry, hash } },
            }
            await register(user)
            if (!error) {
                navigate('/home')
            }
        }
    }

    const handleGeolocation = (nUse) => {
        setUseLocation(nUse);
        if (nUse && !selectedAddress) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                setLatLng({lat:position.coords.latitude,lng:position.coords.longitude})
            });
        }
    }


    return (
        <Form handleSubmit={handleSubmit} className="login">
            {
                error && <Error>{error}</Error>
            }
            <Form__Control>
                <Label htmlFor="lastname">Nom</Label>
                <Input type="text" name="lastname" placeholder="Nom..." required={true} autoComplete="family-name" />
            </Form__Control>
            <Form__Control>
                <Label htmlFor="firstname">Prénom</Label>
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
                <Label htmlFor="addresse">Addresse</Label>
                <Checkbox name="geoloc" handleSelect={() => { handleGeolocation(!useLocation) }} checked={useLocation} label="Utilisez votre position actuel" />
                {
                    !useLocation &&
                    <>
                        <Suggestion data={autocompletedAddress} handleSelection={(address) => setSelectedAddress(address)} handleChange={(address) => setAddress(address)} />
                    </>
                }
            </Form__Control>
            <Form__Actions>
                <Link href="/">Déjà un compte ?</Link>
                <Button type="submit" style="primary">Se crée un compte</Button>
            </Form__Actions>
        </Form>
    )
}
