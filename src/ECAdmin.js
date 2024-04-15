import React, { useState, useEffect } from 'react';
import './fireBaseConfig'; 
import "./ECAdmin.css";
import { getFirestore, updateDoc, collection, getDocs, doc, query, orderBy} from "firebase/firestore"; 


function ECAdmin(){

    const [storedEC, setStoredEC] = useState([]);
    const [togReply, setTogReply] = useState(false);
    const [replyIndex, setReplyIndex] = useState();
    const [reply, setReply] = useState(null);
    const [state, setState ] = useState("Open");
    const [ticketECState, setTicketECState] = useState("Open");

    const Clear = () => {
        setReply('');
        setState("Open")
      }

    const handleState = (e) =>{
        setState(e.target.value);
      }

    const preventReply = () => {
        alert("Select a ticket to reply to");
    }

    const handleTicketECState = (e) =>{
        setTicketECState(e.target.value);
      }

    const toggleReply = (index) => {
        if (index != replyIndex & togReply == true){
            setReplyIndex(index);
        }
        else{
            setTogReply(!togReply);
            setReplyIndex(index)
        }

    }

    const db = getFirestore();



    useEffect(() => {
        fetchECFromInventory();
      });

    const fetchECFromInventory = async () => {
      const querySnapshot = await getDocs (
        query(
          collection(db, "EC Ticket Inventory"),
          orderBy("Date", "desc")
        )
      );
  
      const temporaryArr = [];
      querySnapshot.forEach((doc) =>{
        temporaryArr.push(doc.data());
      });
      setStoredEC(temporaryArr);
  
    };

     
    const sendReply = async (uid, count) => {

        if(!reply){
            alert("Enter reply")
        }
        else{
            const updateReplyStudent = doc(db, `Student/${uid}/Tickets/${uid+count}`);

            const updateReplyInventory = doc(db, `EC Ticket Inventory/${uid+count}`);

            await updateDoc(updateReplyStudent,  {
                Reply: reply,
                State: state,
            });

            await updateDoc(updateReplyInventory,  {
                Reply: reply,
                State: state,
            });
            Clear();
        }

    };

    

    return(
        <div className='adminMain'>
            <nav className='nav21'> 
                <ul className='nav2'>
                <li >Queen Mary Issues Portal</li>
                <ul className='nav22'>
                    <li><a className='navA' href='/ServiceStatus'>Check Service Status</a></li>
                    <li><a className='navA' href='/'>Logout</a></li>
                </ul>
                </ul>
            </nav>
            <div className='ticketInventory'>
                <div className='inventoryHead'>
                    <h1 className='studentHeader'>EC Ticket Inventory</h1>
                    <div className='ECFilter'>
                        <select className='stateSelect' value={ticketECState} onChange={handleTicketECState} required>
                            <option value='Open'>Open</option>
                            <option value='In Progress'>In Progress</option>
                            <option value='Closed'>Closed</option>
                        </select>
                    </div>
                </div>
                <div className='inventoryC'>
                    {storedEC.map( (item, index) => {
                        if (ticketECState == item.State){
                            return(
                                <div key={index} className="adminTickets">
                                    <p><b>Name:</b> {item.Name}</p>
                                    <p><b>Title:</b> {item.Title} </p>
                                    <article><b>Description:</b> {item.Description}</article>
                                    <p><b>Reply:</b> {item.Reply}</p>
                                    <div className='lastRow'>
                                        <p className="stateData">{item.State}</p>
                                        <button onClick={ () =>toggleReply(index)}  className="replyButton">Reply</button>
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
            <div className='replyTicket'>
                <h1 className='studentHeader'> Send Reply</h1>
                {togReply &&(
                    <div className='sendReply'>
                        <div className='adminBorder'>
                            <div className="adminTicket1">
                                <div className='adminTicket1Head'>
                                    <p className="stateDataAdmin">  {storedEC[replyIndex].Name}</p>
                                    <p className="stateData">{storedEC[replyIndex].State}</p>
                                </div>
                                <p><b>Title:</b> {storedEC[replyIndex].Title} </p>
                                <article><b>Description:</b> {storedEC[replyIndex].Description}</article>
                                <p><b>Reply:</b> {storedEC[replyIndex].Reply}</p>
                            </div>
                        </div>
                        <div className='rowClear'>
                            <select value={state} onChange={handleState} className='adminSelect' >
                                <option value="Open">Open</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Closed"> Closed</option>
                            </select>
                            <div className='clearDiv'>
                                <button onClick={Clear} className="clearButtonRed">Clear</button>
                                <button className="clearButton" onClick={() => sendReply(storedEC[replyIndex].UserID,storedEC[replyIndex].Count)}>Send Reply</button>
                            </div>
                        </div>
                        <textarea className='replyText'
                        type="text"
                        value={reply}
                        placeholder="Description"
                        required
                        onChange={(e) => setReply(e.target.value)}
                        ></textarea>
                    </div>
                )}
                {!togReply &&(
                    <div className='sendReply'>
                        <div className="noTicketBorder">
                            <div className="noTicket">
                                <h1 className='noTicketH'>Choose Ticket</h1>
                            </div>
                        </div>
                        <div className='rowClear'>
                            <select value={state} onChange={handleState} className='adminSelect' >
                                <option value="Open">Open</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Closed"> Closed</option>
                            </select>
                            <div className='clearDiv'>
                                <button onClick={Clear} className="clearButtonRed">Clear</button>
                                <button className="clearButton" onClick={preventReply}>Send Reply</button>
                            </div>
                        </div>
                        <textarea className='replyText'
                        type="text"
                        value={reply}
                        placeholder="Description"
                        required
                        onChange={(e) => setReply(e.target.value)}
                        ></textarea>
                    </div>
                )
            }
            </div>
        </div>
    )}


export default ECAdmin;