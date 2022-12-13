import { collection, query, getDocs, orderBy, startAt, endAt } from "firebase/firestore";
import { useState,useContext } from "react";
import {AuthContext} from "../../../contexts/AuthContext"
import useFirebase from "../../../hooks/useFirebase";
import { geohashQueryBounds,distanceBetween } from "geofire-common";
import { useEffect } from "react";
import "./Brocantist.scss"
import Brocantist__Item from "../../02 - Molecules/Brocantist__Item/Brocantist__item";

export default function Brocantist({distance}) {
  const [brocantists,setBrocantists] = useState([]);
  const {currentUser} = useContext(AuthContext)
  const {db} = useFirebase()
  
  useEffect(()=>{
    const center = currentUser.address.geometry.coordinates;
    const radiusInM = distance * 1000;
    const bounds = geohashQueryBounds(center, radiusInM);
    const promises = [];
    for (const b of bounds) {
      const q = query(collection(db, "customers"), orderBy('address.geometry.hash'),startAt(b[0]),endAt(b[1]));
      promises.push(getDocs(q));
    }
    
    Promise.all(promises).then((snapshots) => {
      for (const snap of snapshots) {
        for (const doc of snap.docs) {
          const lat = doc.get("address.geometry.coordinates")[0];
          const lng = doc.get("address.geometry.coordinates")[1];
    
          const distanceInKm = distanceBetween([lat, lng], center);
          const distanceInM = distanceInKm * 1000;
          if (distanceInM <= radiusInM) {
            setBrocantists([...brocantists,{...doc.data(),distance:distanceInM}])
          }
        }
      }
    })
    
  },[])

  return (
    <div className="brocantist">
      <div className="brocantist__list">
        {
          brocantists.map((brocantist)=>{
            return <Brocantist__Item key={brocantist.id} firstname={brocantist.firstname} lastname={brocantist.lastname} email={brocantist.email} distance={brocantist.distance} id={brocantist.id}/>
          })
        }
      </div>
    </div>
  )
}
