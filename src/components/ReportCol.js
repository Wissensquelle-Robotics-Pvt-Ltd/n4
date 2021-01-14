import React, {useState,useEffect} from 'react'
import "firebase/firestore";
import Firebase from "../firebase";
const db = Firebase.firestore();
function ReportCol(props) {
    const [length, setLength] = useState(0);
      const [mobile, setMobile] = useState([]);
  const [amount, setAmount] = useState([]);
  const [status,setStatus] = useState([])
  const [date,setDate] = useState([])
  const [time,setTime] = useState([])
     useEffect(() => {
        // alert(props.from)
         db.collection("database")
          .where('date', '>=', (props.from))
          .where('date','<=',props.to)
 
                        

  .get()
    .then(function(querySnapshot) {
          setLength(querySnapshot.size);
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
         setMobile((mobile) => [...mobile, doc.get("mobile")]);
          setAmount((amount) => [...amount, doc.get("amount")]);
           setStatus((status) => [...status, doc.get("status")]);
            setDate((date) => [...date, doc.get("date")]);
             setTime((time) => [...time, doc.get("time")]);
        });
    })
    .catch(function(error) {
     alert(error)
    });
     },[props.from,props.to])
    return [...Array(length)].map((elementInArray, index) => (
        <>
       <tr>
      <td>{index + 1}</td>
      <td>{mobile[index]}</td>
      <td>{date[index]}</td>
      <td>{time[index]}</td>
      <td>{amount[index]}</td>
      <td>{status[index]}</td>
    </tr>
     
                                </>
    ));
}

export default ReportCol
