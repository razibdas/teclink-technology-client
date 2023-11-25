// import { createContext, useEffect, useState } from "react";
// import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
// import { app } from "../firebase/firebas.config";



// export const AuthContext = createContext();
// const auth = getAuth(app);

// const providerGoogle = new GoogleAuthProvider();

// const AuthProvider = ({children}) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);

//     const createUser = (email, password) => {
//         setLoading(true)
//         return createUserWithEmailAndPassword(auth, email, password);
//     }

//     const googleSignIn = () => {
//         return signInWithPopup(auth, providerGoogle);
//       };

//     const signIn = (email, password) => {
//         setLoading(true)
//         return signInWithEmailAndPassword(auth, email, password)
//     }

//     const logOut = () => {
//         setLoading(true)
//         return signOut(auth)
//     }

//     useEffect( () => {
//         const unsubscribe = onAuthStateChanged(auth, currentUser => {

//             setUser(currentUser);
//             console.log('current user', currentUser);
//             setLoading(false)

//         })
//         return () => {
//             return unsubscribe();
//         }
//     }, [])

//     const authInfo = {
//         user,
//         loading,
//         createUser,
//         signIn,
//         logOut,
//         googleSignIn
//     }

//     return (
//         <AuthContext.Provider value= {authInfo}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthProvider;




import { createContext,  useEffect,  useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebas.config";
// import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    // const axiosPublic = useAxiosPublic();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    useEffect( () => {
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            console.log('curernt user', currentUser);
            setLoading(false)
        });
        return () => {
            return unsubscribe
        }
    })

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        googleSignIn,
        updateUserProfile
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;