import { createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,sendPasswordResetEmail,updateEmail,updatePassword,onAuthStateChanged } from "firebase/auth";
import { doc, getDoc,setDoc } from "firebase/firestore";

import { createContext, useEffect, useState } from "react";
import Loading from "../components/01 - Atoms/Loading/Loading";
import { Navigate, useNavigate } from "react-router-dom";
import useFirebase from "../hooks/useFirebase";
export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [isLoading,setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const {auth,db} = useFirebase()
    const navigate = useNavigate()

    const register = ({email, password, firstname, lastname, address}) => {
        console.log(email,password)
        return createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            await setDoc(doc(db,"customers",userCredential.user.uid),{email,firstname,lastname,address,id:userCredential.user.uid});
        })
        .catch((error) => {
            setError(error.message)
        });
    }
    
    const login = ({email, password})=> {
        return signInWithEmailAndPassword(auth, email,password)
        .catch((error) => {
            setError(error.message)
        });
    }
    
    const logout = () => {
        return signOut(auth)
    }
    
    const resetPassword = (email) => {
        return sendPasswordResetEmail(email)
    }
    
    const updateUserEmail = (email) => {
        return updateEmail(email)
    }
    
    const updateUserPassword = (password) => {
        return updatePassword(password)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,async (user) => {
            if(user === null){
                 navigate("/")   
            } else {
                const docRef = doc(db, "customers", user.uid);  
                const userDoc = await (await getDoc(docRef)).data()
                setCurrentUser(userDoc)
            }
            
            setIsLoading(false)
        })
        return unsubscribe
      }, [])

    return (
        <>
        {
            !isLoading ?
            <AuthContext.Provider value={{login,register,logout,resetPassword,updateUserEmail,updateUserPassword,currentUser,error}}>
                {children}
            </AuthContext.Provider> : <Loading />
        }
        </>
        
        
    );
}
