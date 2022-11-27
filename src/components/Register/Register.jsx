import { useQuery } from "@tanstack/react-query";
import { getLocalisation } from "../../services/GeolocalisationService";
import {createUserWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import { FirebaseContext } from "../../contexts/FirebaseContext";
import { UserContext } from "../../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { collection, setDoc,doc } from "firebase/firestore"; 
import { geohashForLocation } from "geofire-common";

export default function Register() {
    const {auth,db} = useContext(FirebaseContext)
    const {setUser} = useContext(UserContext)
    const [selectedAddress,setSelectedAddress] = useState(undefined)
    const [address,setAddress] = useState("")
    const [error,setError] = useState(null)
    const navigate = useNavigate()

    const {data:autocompletedAddress,refetch:getAddresse} = useQuery(['adresse',address],()=>getLocalisation(address),{
        enabled: (address && address.length > 3)?true:false
    })
    
    const handleSubmit = async (e) => {
        e.preventDefault();  
        const hash = geohashForLocation(selectedAddress.geometry.coordinates);
        const user = {
            firstname: e.currentTarget.firstname.value,
            lastname: e.currentTarget.lastname.value,
            address: {...selectedAddress,geometry:{...selectedAddress.geometry,hash}}
        } 
        if(selectedAddress){
            createUserWithEmailAndPassword(auth, e.currentTarget.email.value, e.currentTarget.password.value)
            .then(async (userCredential) => {
                setUser({...e.currentTarget.email.value,id:userCredential.user.uid,firstname:user.firstname,lastname:user.lastname,address:user.address})

                await setDoc(doc(db,"client",userCredential.user.uid),user);
                navigate("/home")
            })
            .catch((error) => {
                setError(error.message)
            });
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
        <>
            {
               error && <p className="error">{error}</p>
            }
            <form onSubmit={handleSubmit} className="form form__login">
                <div className="form__control">
                    <label htmlFor="nom" className="form__label">Nom</label>
                    <input className="form__input" type="text" name="lastname" id="lastname" placeholder="Nom" required autoComplete="family-name"/>
                </div>
                <div className="form__control">
                    <label htmlFor="prenom" className="form__label">Prénom</label>
                    <input className="form__input" type="text" name="firstname" id="firstname" placeholder="Prénom" required autoComplete="given-name"/>
                </div>
                <div className="form__control">
                    <label htmlFor="email" className="form__label">Email</label>
                    <input className="form__input" type="email" name="email" id="email" placeholder="Email" required autoComplete="email"/>
                </div>
                <div className="form__control">
                    <label htmlFor="password" className="form__label">Mot de passe</label>
                    <input className="form__input" type="password" name="password" id="password" placeholder="Password" required autoComplete="current-password"/>
                </div>
                <div className="form__control">
                    <label htmlFor="street" className="form__label">Addresse</label>
                    <input className="form__input" type="search" name="address" onChange={handleAddress} value={address}/>
                    <div className="suggestion suggestion__container">
                        { autocompletedAddress?.data &&
                            <ul className="suggestion__list">
                            {
                                autocompletedAddress?.data.features.map((suggestion)=>{
                                    return (
                                        <li className="suggestion__item" key={suggestion.properties.id}>
                                            <button className="suggestion__btn" type="button" onClick={()=>handleSelectedAddress(suggestion)}>
                                                {suggestion.properties?.label}
                                            </button>
                                        </li>
                                    )
                                })
                            }
                            </ul>
                        }
                    </div>
                </div>
                <div className="form__actions">
                    <Link className="btn btn--link" to="/" >Déja un compte ?</Link>
                    <button className="btn btn--primary form__submit">Se crée un compte</button>
                </div>
            </form>
        </>
    )
}
