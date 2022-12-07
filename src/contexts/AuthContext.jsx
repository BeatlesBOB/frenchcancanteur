import { createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,sendPasswordResetEmail,updateEmail,updatePassword,onAuthStateChanged } from "firebase/auth";
import { doc, getDoc,setDoc } from "firebase/firestore";

import { createContext, useEffect, useState } from "react";
import useFirebase from "../hooks/useFirebase";
export const AuthContext = createContext();

export function UserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const {auth,db} = useFirebase()


    function register(email, password) {
        return createUserWithEmailAndPassword(auth, e.currentTarget.email.value, e.currentTarget.password.value)
        .then(async (userCredential) => {
            await setDoc(doc(db,"client",userCredential.user.uid),user);
        })
        .catch((error) => {
            setError(error.message)
        });
    }
    
    function login(email, password) {
        return signInWithEmailAndPassword(auth, email,password)
        .then(async (userCredential) => {
            const docRef = doc(db, "client", userCredential.user.uid);  
            const user = await (await getDoc(docRef)).data()  
            setCurrentUser(user)    
        })
        .catch((error) => {
            setError(error.message)
        });
    }
    
    function logout() {
        return signOut()
    }
    
    function resetPassword(email) {
        return sendPasswordResetEmail(email)
    }
    
    function updateUserEmail(email) {
        return updateEmail(email)
    }
    
    function updateUserPassword(password) {
        return updatePassword(password)
    }

    
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(user => {
        console.log(user)
        //setCurrentUser(user)
    })
    return () => {
        unsubscribe();
    };
  }, [])

    return (
        <AuthContext.Provider value={{login,register,logout,resetPassword,updateUserEmail,updateUserPassword}}>
            {children}
        </AuthContext.Provider>
    );
}
