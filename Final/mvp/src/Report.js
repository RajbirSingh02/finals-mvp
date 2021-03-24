import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'
import { format } from 'date-fns'
import { BsTrash } from "react-icons/bs";


// Firebase
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

if (firebase.apps.length === 0) {
    firebase.initializeApp({
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        databaseUrl: process.env.REACT_APP_DATABASE_URL,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_APP_ID
    })
}
const firestore = firebase.firestore()
const auth = firebase.auth()

//const data = require('./sampleData.json')

export default function Report() {
    const [records, setRecords] = useState([])

    const reportRef = firestore.collection('report');
    const query = reportRef.orderBy('createdAt', 'asc').limitToLast(100);
    const [data] = useCollectionData(query, { idField: 'id' });


    console.log("REACT_APP_PROJECT_ID", process.env.REACT_APP_PROJECT_ID)
    useEffect(() => {
        if (data) { // Guard condition
            let r = data.map((d, i) => {
                // console.log('useEffect', format(d.createdAt.toDate(), "yyyy-MM-dd"))
                return (
                    <ReportRow
                        data={d}
                        i={i}
                        onDeleteClick={handleDeleteClick}
                    />
                )
            })

            setRecords(r)
        }
    },
        [data])

    const handleDeleteClick = (id) => {
        console.log('handleDeleteClick in Journal', id)
        if (window.confirm("Are you sure to delete this record?"))
            reportRef.doc(id).delete()
    }

    return (
        <Container>
            <Row>
                <h1>Report</h1>
            </Row>

            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Arrival Time</th>
                        <th>Departure Time</th>
                        <th>Reason</th>
                        <th>Date</th>
                        <th>delete</th>
                    </tr>
                </thead>
                <tbody>
                    {records}
                </tbody>
            </Table>
        </Container>
    )
}

function ReportRow(props) {
    let d = props.data
    let i = props.i
    // console.log("JournalRow", d)
    return (
        <tr>
            <td>{d.name}</td>
            <td>{d.phonenumber}</td>
            <td>{d.arrival}</td>
            <td>{d.departure}</td>
            <td>{d.reason}</td>
            <td>{format(d.createdAt.toDate(), "yyyy-MM-dd")}</td>
            <td><BsTrash onClick={() => props.onDeleteClick(d.id)} /></td>
        </tr>
    )
}