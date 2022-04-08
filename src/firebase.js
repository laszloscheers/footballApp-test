// Import methods from Firebase
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';


// Configuration for Firebase app
const firebaseConfig = {
    apiKey: "AIzaSyDQzL6sTuxE2DtjUFYYazi1vQOcfNjI6EU",
    authDomain: "acsdfinalproject.firebaseapp.com",
    projectId: "acsdfinalproject",
    storageBucket: "acsdfinalproject.appspot.com",
    messagingSenderId: "553696870170",
    appId: "1:553696870170:web:6701df2970a50a5a9676a3"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();



// Method for registering User using firebase method - needs email and password
export const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};


// Method for logging in User using firebase method - needs email and password
export const logInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};


// Method for logging out using firebase method
export const logOutUser = () => {
    return signOut(auth);
}


// Custom hook to check for changes in logged in status
export const useAuth = () => {
    const [currentUser, setCurrentUser] = useState();

    // Check User logged in status and save user to state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => setCurrentUser(user));
        return unsubscribe;
    }, []);

    return currentUser;
};
