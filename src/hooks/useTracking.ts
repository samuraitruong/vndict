import React, { useEffect } from "react";
import * as firebase from "firebase";
export interface ITracking{
  [key : string]: string;
}
export function useTracking() {
    // initialize our default state
    const defaultList: ITracking = {};
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(true) 
    const [trackData, setTrackData] = React.useState(defaultList)
    useEffect(
      () => {
        try{
        const ref = firebase.database().ref('/');
        console.log("ref");
        ref.on("value", (snapshot) => { 
            setLoading(false);
            setTrackData(snapshot.val());
            console.log(snapshot.val())
        });
        return () => {
          ref.off("value")
        }
      }
      catch(err) {
        setError(true);
      }
        
      }, []
    )
  
    return {
      error,
      loading,
      trackData,
    }
  }