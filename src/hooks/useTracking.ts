import React, { useEffect } from "react";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";

import moment from "moment";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC0Afu4UrdUxEXpZSNtTX5dqB7Kiz9h-58",
  authDomain: "vndict-http.firebaseapp.com",
  databaseURL: "https://vndict-http.firebaseio.com",
  projectId: "vndict-http",
  storageBucket: "vndict-http.appspot.com",
  messagingSenderId: "395495785689",
  appId: "1:395495785689:web:becd3318f899758373aac8",
  measurementId: "G-27K3H2BHSN",
};
// Initialize Firebase

export interface ITracking {
  [key: string]: string;
}
export function useTracking() {
  // initialize our default state
  const defaultList: ITracking = {};
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [trackData, setTrackData] = React.useState(defaultList);
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  useEffect(() => {
    const now = moment().utc().startOf("day").format("YYYYMMDD");
    const docRef = doc(db, "seach_db", "/" + now);

    const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        console.log("Current data: ", data);
        setTrackData(docSnapshot.data());
        setLoading(false);
      } else {
        setError(true);
        console.log("Document does not exist");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [setLoading, setError, db]);

  return {
    error,
    loading,
    trackData,
  };
}
