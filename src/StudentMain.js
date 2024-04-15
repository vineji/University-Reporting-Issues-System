import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './fireBaseConfig'; 
import "./studentMain.css";
import { getFirestore, getDoc, collection, getDocs, doc, setDoc, Timestamp, query, orderBy, deleteDoc} from "firebase/firestore"; 

function StudentMain() {
  const{uid} = useParams();
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [location, setLocation] = useState('');
  const [EC, setEC] = useState(true);
  const [issues, setIssues] = useState(false);
  const [ticketState, setTicketState] = useState('All');
  let [storedTickets, setStoredTickets] = useState([]);
  let [userData, setUserData] = useState(null);

  const Clear = () => {
    setInputValue1('');
    setInputValue2('');
    setLocation('');
  }
  const handleLocation = (e) =>{
    setLocation(e.target.value);
  }
  const handleTicketState = (e) =>{
    setTicketState(e.target.value);
  }

  const toggleEC = () => {
    if (EC != true){
      setEC((value) => !value);
      setIssues((value) => !value);
      Clear();
    }
  }
  const toggleIssues = () => {
    if (issues != true){
      setEC((value) => !value);
      setIssues((value) => !value);
      Clear();
    }
  }

  
  const db = getFirestore();

  const handleDelete = async (uid, count) => {
    const docSnapshotIssues =  await getDoc(doc(db, `Issues Ticket Inventory/${uid+count}`));
    const docSnapshotEC = await getDoc(doc(db, `EC Ticket Inventory/${uid+count}`));
    if (docSnapshotEC.exists() == true){
      await deleteDoc(doc(db,`EC Ticket Inventory/${uid+count}`));
    }
    else if (docSnapshotIssues.exists() == true){
      await deleteDoc(doc(db,`Issues Ticket Inventory/${uid+count}`));    
    }
    await deleteDoc(doc(db,`Student/${uid}/Tickets/${uid+count}`));
  }



  const fetchTicketsFromFirestore = async () => {
    const querySnapshot = await getDocs (
      query(
        collection(db, `Student/${uid}/Tickets`),
        orderBy("Date", "desc")
      
      )
    );

    const temporaryArr = [];
    querySnapshot.forEach((doc) =>{
      temporaryArr.push(doc.data());
    });
    setStoredTickets(temporaryArr);

  };
  
  const fetchUserData = async () => {
    const docSnapshot = await getDoc(doc(db, `Student/${uid}`));
    setUserData(docSnapshot.data());
  }

  useEffect(() => {
    fetchUserData();
  },[uid,db]);

  useEffect(() => {
    fetchTicketsFromFirestore();
  });


  const saveDataToEC = async () => {
    if ( !inputValue1 || !inputValue2){
      alert("Missing input")

    }
    else{
      let count = userData.Count;
      const currentDate = Timestamp.fromDate(new Date());
      const docRef = await setDoc(doc(collection(db, `EC Ticket Inventory`), uid+count), {
        Title: inputValue1,
        Description: inputValue2,
        Reply: "No reply",
        State: "Open",
        UserID : uid,
        Count : count,
        Date : currentDate,
        Name : userData.Fullname,
      });
      const docRefq = await setDoc(doc(collection(db, `Student/${uid}/Tickets`), uid+count), {
        Title: inputValue1,
        Description: inputValue2,
        Reply: "No reply",
        State: "Open",
        UserID : uid,
        Count : count,
        Date : currentDate,
        Name : userData.Fullname,
      });
      const docRefq1 = await setDoc(doc(collection(db, 'Student'), `${uid}`), {
        Count: count +1,
      }, {merge: true});
      fetchUserData();

      Clear();
    }
  };

  const saveDataToIssues = async () => {
    if (!location || !inputValue1 || !inputValue2){
      alert("Missing input")

    }
    else{
      let count = userData.Count;
      const currentDate = Timestamp.fromDate(new Date());
      const docRefIssue = await setDoc(doc(collection(db, `Issues Ticket Inventory`), uid+count), {
        Title: inputValue1,
        Description: inputValue2,
        Location: location,
        Reply: "No reply",
        State: "Open",
        UserID : uid,
        Count : count,
        Date : currentDate,
        Name : userData.Fullname,
      });
      const docRef = await setDoc(doc(collection(db, `Student/${uid}/Tickets`), uid+count), {
        Title: inputValue1,
        Description: inputValue2,
        Location: location,
        Reply: "No reply",
        State: "Open",
        UserID : uid,
        Count : count,
        Date : currentDate,
        Name : userData.Fullname,
      });
      const docRefCount = await setDoc(doc(collection(db, 'Student'), `${uid}`), {
        Count: count +1,
      }, {merge: true});
      fetchUserData();

      Clear();
    }
  };

  return (
    <div className='StudentM' >
      <nav className='nav21'> 
        <ul className='nav2'>
          <li >Queen Mary Issues Portal</li>
          <ul className='nav22'>
            <li><a className='navA' href='/ServiceStatus'>Check Service Status</a></li>
            <li><a className='navA' href='/'>Logout</a></li>
          </ul>
        </ul>
      </nav>
      <div>
        <div className='main'>
          <div className='ticketCard'>
            {userData ? (
              <h1 className='studentHeader'>Hi, {userData.Fullname}</h1>

            ) :(
              <h1> Cant find user</h1>
            )}
            <div className='ticketButton'>
              <button onClick={toggleEC} className='Tbutton'>Create EC Ticket</button>
              <button onClick={toggleIssues} className='Tbutton'>Create Issues Ticket</button>
            </div>
            {EC && (
              <div className='ticketInputDiv'>
                <input className='ticketInput'
                  type="text"
                  value={inputValue1}
                  placeholder="Title"
                  maxLength="40"
                  onChange={(e) => setInputValue1(e.target.value)}
                  required
                />
                <textarea className='ticketInputECDescription'
                  type="text"
                  value={inputValue2}
                  placeholder="Description"
                  required
                  onChange={(e) => setInputValue2(e.target.value)
                  }
                />
                <div className='ticketButtonSend'>
                  <button className='TbuttonSend' onClick={saveDataToEC}>Send</button>
                  <button  className='TbuttonSendRed' onClick={Clear}>Clear</button>
                  <button  className='TbuttonSend1' >EC Ticket</button>
                </div>
              </div>)
            }
            {issues && (
              <div className='ticketInputDiv'>
                <input className='ticketInput'
                  type="text"
                  value={inputValue1}
                  placeholder="Title"
                  maxLength="40"
                  onChange={(e) => setInputValue1(e.target.value)}
                  required
                />
                <select className='ticketSelect' value={location} onChange={handleLocation} required>
                  <option value=''>Location</option>
                  <option value='ITL Lab'>ITL Lab</option>
                  <option value='EE Lab'>EE Lab</option>
                  <option value='Online'>Online</option>
                  <option value='Other'>Other</option>
                </select>
                <textarea className='ticketInputIssuesDescription'
                  type="text"
                  value={inputValue2}
                  placeholder="Description"
                  required
                  onChange={(e) => setInputValue2(e.target.value)}
                />
                <div className='ticketButtonSend'>
                  <button className='TbuttonSend' onClick={saveDataToIssues}>Send</button>
                  <button  className='TbuttonSendRed' onClick={Clear}>Clear</button>
                  <button  className='TbuttonSend1' >Issues Ticket</button>
                </div>
              </div>)
            }
          </div>
          <div className='ticketData'>
            <h1 className='studentHeader'>Your Tickets</h1>
            <div className='Filter'>
              <select className='stateSelect' value={ticketState} onChange={handleTicketState} required>
                <option value='All'>All</option>
                <option value='Open'>Open</option>
                <option value='In Progress'>In Progress</option>
                <option value='Closed'>Closed</option>
              </select>
            </div>
            <div className='dataContainer'>
              {storedTickets.map( (item, index) => {
                if (ticketState == 'All'){
                  return(
                    <div key={index} className="studentTickets" >
                      <p><b>Title:</b> {item.Title} </p>
                      {item.Location ?(
                        <p><b>Location:</b> {item.Location}</p>
                      ):(
                        null
                      )}
                      <article><b>Description:</b> {item.Description}</article>
                      <p><b>Reply:</b> {item.Reply}</p>
                      <div className='lastRow'>
                        <p className='stateData'>{item.State}</p>
                        <button className="deleteButton" onClick={ () =>handleDelete(item.UserID, item.Count)}>Delete</button>
                      </div>                    
                    </div>

                  )
                }
                else if (item.State == ticketState){
                  return(
                    <div key={index} className="studentTickets" >
                      <p><b>Title:</b> {item.Title}</p>
                      {item.Location ?(
                        <p><b>Location:</b> {item.Location}</p>
                      ):(
                        null
                      )}
                      <article><b>Description:</b> {item.Description}</article>
                      <p><b>Reply:</b> {item.Reply}</p>
                      <div className='lastRow'>
                        <p className='stateData'>{item.State}</p>
                        <button className="deleteButton" onClick={ () =>handleDelete(item.UserID, item.Count)}>Delete</button>
                      </div>
                    </div>
                  )
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentMain;
