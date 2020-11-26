import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAVUa9KIk7OFqzDW65peoAqFCbD-LbWsh0",
    authDomain: "crwn-db-f6e1b.firebaseapp.com",
    databaseURL: "https://crwn-db-f6e1b.firebaseio.com",
    projectId: "crwn-db-f6e1b",
    storageBucket: "crwn-db-f6e1b.appspot.com",
    messagingSenderId: "944445028203",
    appId: "1:944445028203:web:d7ca44976397b6c75fbe2e",
    measurementId: "G-PH4XSQ1FQF"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapshot = await userRef.get();

    if (!snapshot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;