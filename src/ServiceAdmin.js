import React, { useState, useEffect } from 'react';
import { doc, setDoc, getDoc, getFirestore } from "firebase/firestore"; 
import './fireBaseConfig';
import "./ServiceAdmin.css";

const db = getFirestore();


const ServiceAdmin = () => {
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

  const updateStatus = async (service, newStatus) => {
    await setDoc(serviceDocs[service], {
      status: newStatus
    });

    fetchStatus();
  };
 
  return (
    <div className="service-admin">
      <nav className='nav21'> 
        <ul className='nav2'>
        <li >Queen Mary Issues Portal</li>
        <ul className='nav22'>
            <li><a className='navA' href='/ServiceStatus'>Check Service Status</a></li>
            <li><a className='navA' href='/'>Logout</a></li>
        </ul>
        </ul>
      </nav>
      <div className='serviceAdminC'>
        {Object.keys(status).map(service => (
          <div key={service} className="serviceAdmin">
            <p>{service}</p>
            <p>Status: {status[service]}</p>
            <div className='serviceButtons'>
              <button className='goodService' onClick={() => updateStatus(service, 'Good')}>Good </button>
              <button className='partialService' onClick={() => updateStatus(service, 'Partial')}>Partial </button>
              <button className='noService' onClick={() => updateStatus(service, 'No')}>No </button>
              <button className='sButton'>Service</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceAdmin;