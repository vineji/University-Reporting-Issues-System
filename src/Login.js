
import React, {useState} from "react";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import { getDoc, getFirestore, doc } from "firebase/firestore";
import "./login.css";


function Login() {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ error, setError] = useState("");

  const redirectToStudentMain = (uid) => {
    window.location.href = `/StudentMain/${uid}`;
  };
  const redirectToServiceAdmin = () => {
    window.location.href = `/ServiceAdmin`;
  };
  const redirectToServiceStatus = () => {
    window.location.href = `/ServiceStatus`;
  };
  const redirectToECAdmin = () => {
    window.location.href = `/ECAdmin`;
  };
  const redirectToIssuesAdmin = () => {
    window.location.href = `/IssuesAdmin`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const db = getFirestore();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const uid = user.uid;
      const docSnapshotStudent = await getDoc(doc(db, `Student/${uid}`));
      const docSnapshotServiceAdmin = await getDoc(doc(db, `ServiceAdmin/${uid}`));
      const docSnapshotECAdmin = await getDoc(doc(db, `ECAdmin/${uid}`));
      const docSnapshotIssuesAdmin = await getDoc(doc(db, `IssuesAdmin/${uid}`));

      if (docSnapshotStudent.exists() == true){
        redirectToStudentMain(uid);
      }
      else if (docSnapshotServiceAdmin.exists() == true){
        redirectToServiceAdmin();
      }
      else if (docSnapshotECAdmin.exists() == true){
        redirectToECAdmin();
      }
      else if (docSnapshotIssuesAdmin.exists() == true){
        redirectToIssuesAdmin();
      }
      else{
        alert("Invalid username or password");
      }

    }
    catch (error){
      setError(error.message);
    }
  };
  return (
    <div >
      <form onSubmit={handleSubmit} className="login_container">
        <h1 className="loginHeader">Login</h1>
        <div className="loginDiv">
          <input className="inputLogin"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="username"
            required
          />
          <input className="inputLogin"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            required
          />
          <div className="divButton">
            <button type="submit"  className="Lbutton">Login</button>
            <button onClick={redirectToServiceStatus} className="Lbutton">Check Service Status</button>
          </div>
          {error && <p>{error}</p>}
        </div>
      </form>
    </div>
  )
}

export default Login;












