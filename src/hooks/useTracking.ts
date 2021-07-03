import React, { useEffect } from "react";
import firebase from "firebase";
import moment from "moment";

export interface ITracking {
  [key: string]: string;
}
export function useTracking() {
  // initialize our default state
  const defaultList: ITracking = {};
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true)
  const [trackData, setTrackData] = React.useState(defaultList)
  useEffect(
    () => {
      try {
        const now = moment().utc().startOf("day").format("YYYYMMDD")
        const ref = firebase.database().ref('/' + now);
        ref.on("value", (snapshot) => {
          setLoading(false);
          setTrackData(snapshot.val());
        });
        return () => {
          ref.off("value")
        }
      }
      catch (err) {
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
