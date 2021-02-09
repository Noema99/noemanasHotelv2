import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';

import firestore from '@react-native-firebase/firestore';
export const AuthContext = createContext();

export const AuthProviderAdmin = ({children}) => {
  const [admin, setAdmin] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        admin,
        setAdmin,
        getAdminInfoByUid: async (uid) => {
          let adminRef = firestore().collection('admin').doc(uid);

          const doc = await adminRef.get();
          if (!doc.exists) {
            console.log('No such document! (admin)');
            return null;
          }
          return doc.data();
        },
        getUserReservationByUid: async (uid) => {
          let reservationRef = firestore().collection('reservations').doc(uid);
          const docu = await reservationRef.get();
          if (!docu.exists) {
            console.log('No such document! (reservation)');
            return null;
          }
          return docu.data();  
        },
        loginAdmin : async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);           
          } catch (e) {
            console.log(e);
          }
        },
        logoutAdmin : async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        }
      }
      }>
      {children}
    </AuthContext.Provider>
  );
};
