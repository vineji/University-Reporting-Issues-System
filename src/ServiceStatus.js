import React, { useState, useEffect } from 'react';
import { doc, getDoc, getFirestore } from "firebase/firestore"; 
import  './fireBaseConfig';
import "./ServiceStatus.css";

const ServiceStatus = () => {

  const Refresh = () => {
    window.location.reload();
  };

  const db = getFirestore();

  const [status, setStatus] = useState({
    "ITL Printer": '',
    "Temp Building Printer": '',
    "Library Printer": '',
    "Library WIFI": '',
    "ITL WIFI": '',
    "Temp Building WIFI": '',
    "Library Computers": '',
    QMplus: '',
    MySIS: '',
    "Microsoft Outlook": '',
    "IT Help Desk": '',
    TurnItIn: ''
  });

  const serviceDocs = {
    "ITL Printer": doc(db, "Services", "printingITL"),
    "Temp Building Printer": doc(db, "Services", "Temp Building Printer"),
    "Library Printer": doc(db, "Services", "Library Printer"),
    "Library WIFI": doc(db, "Services", "Library WIFI"),
    "ITL WIFI": doc(db, "Services", "ITL WIFI"),
    "Temp Building WIFI": doc(db, "Services", "Temp Building WIFI"),
    "Library Computers": doc(db, "Services", "Library Computers"),
    QMplus: doc(db, "Services", "qmplus"),
    MySIS: doc(db, "Services", "MySIS"),
    "Microsoft Outlook": doc(db, "Services", "Email"),
    "IT Help Desk": doc(db, "Services", "itServiceDesk"),
    TurnItIn: doc(db, "Services", "TurnItIn")
  };

  const fetchStatus = async () => {
    for (const service in serviceDocs) {
      const docSnap = await getDoc(serviceDocs[service]);

      if (docSnap.exists()) {
        setStatus(prevStatus => ({ ...prevStatus, [service]: docSnap.data().status }));
      } else {
        console.log(`No document for ${service}!`);
      }
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <div>
        <nav className='nav21'> 
            <ul className='nav2'>
            <li >Queen Mary Issues Portal</li>
            <ul className='nav22'>
                <li className='blue'>_________</li>
                <li><a className='navA' onClick={Refresh}>Refresh</a></li>
                <li><a className='navA' href='/'>Login</a></li>
            </ul>
            </ul>
        </nav>
        <div className="service-status">
          <div className='service-container'>
            {Object.keys(status).map(service => {
              if(status[service] == "Good"){
                return(
                  <div key={service} className="service">
                    <p>{service}</p>
                    <p className='great'>Great Service</p>
                  </div>
                )
              }
              else if(status[service] == "Partial"){
                return(
                  <div key={service} className="service">
                    <p>{service}</p>
                    <p className='partial'>Partial Service</p>
                  </div>
                )
              }
              else if(status[service] == "No"){
                return(
                  <div key={service} className="service">
                    <p>{service}</p>
                    <p className='no'>No Service</p>
                  </div>
                )
              }
          })}
          </div>
        </div> 

    </div>
  );
};

export default ServiceStatus;