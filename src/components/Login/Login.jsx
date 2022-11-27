import { Link } from "react-router-dom";
import {signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import { FirebaseContext } from "../../contexts/FirebaseContext";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

export default function Login() {
    const {auth,db} = useContext(FirebaseContext)
    const {setUser} = useContext(UserContext)
    const navigate = useNavigate();
    const [error,setError] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault();
        const email =  e.currentTarget.email.value
        const password = e.currentTarget.password.value

        signInWithEmailAndPassword(auth, email,password)
        .then(async (userCredential) => {
            const docRef = doc(db, "client", userCredential.user.uid);
            const {firstname,lastname,address} = await (await getDoc(docRef)).data();
            setUser({...e.currentTarget.email.value,id:userCredential.user.uid,firstname,lastname,address})
            navigate('/home')
        })
        .catch((error) => {
            setError(error.message)
        });
    }

    return (
        <>
            {
               error && <p className="error">{error}</p>
            }
            <form onSubmit={handleSubmit} className="form form__login">
                <div className="form__control">
                    <label htmlFor="email" className="form__label">Email</label>
                    <input className="form__input" type="email" name="email" id="email" placeholder="Email" required autoComplete="email"/>
                </div>
                <div className="form__control">
                    <label htmlFor="password" className="form__label">Mot de passe</label>
                    <input className="form__input" type="password" name="password" id="password" placeholder="Password" required autoComplete="current-password"/>
                </div>
                <div className="form__actions">
                    <Link className="btn btn--link" to="/register">Besoin d'un compte ?</Link>
                    <button className="btn btn--primary form__submit">Se connecter</button>
                </div>
            </form>
        </>
        
    )
}
