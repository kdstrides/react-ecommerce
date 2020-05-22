import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAFuopQkJG7DtReDVSfzueRlSBBLI0j9bw",
  authDomain: "react-ecommerce-2547.firebaseapp.com",
  databaseURL: "https://react-ecommerce-2547.firebaseio.com",
  projectId: "react-ecommerce-2547",
  storageBucket: "react-ecommerce-2547.appspot.com",
  messagingSenderId: "945835214235",
  appId: "1:945835214235:web:7230932135357dfaa40d3e"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user.', error);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  promt: 'select_account',
});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const addCollectionAndDocument = async (key, object) => {
  const collectionRef = firestore.collection(key);

  const batch = firestore.batch();
  object.forEach(element => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, element);
  });

  const result = await batch.commit();
  return result;
}

export const convertCollectionsToMap = (collections) => {
  const transfomed = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transfomed.reduce((acc, coll) => {
    acc[coll.title.toLowerCase()] = coll;

    return acc;
  }, {});
}

export default firebase;