import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';

import firestore from '@react-native-firebase/firestore';
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        register: async (email, password) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
        getUserInfoByUid: async (uid) => {
          let usersRef = firestore().collection('users').doc(uid);

          const doc = await usersRef.get();
          if (!doc.exists) {
            console.log('No such document! (user)');
            return null;
          }
          return doc.data();
        },
        getUserReclamationByUid: async (uid) => {
          let reclamationRef = firestore().collection('reclamations').doc(uid);
          const docu = await reclamationRef.get();
          if (!docu.exists) {
            console.log('No such document! (reclamations)');
            return null;
          }
          return docu.data();
        },
        getUserReservationByUid: async (uid) => {
          let reservationRef = firestore().collection('reservations').doc(uid);
          const docu = await reservationRef.get();
          if (!docu.exists) {
            console.log('No such document! (reservation)');
            return null;
          }
          return docu.data();
        }
      }
      }>
      {children}
    </AuthContext.Provider>
  );
};
