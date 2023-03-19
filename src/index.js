import React, { useState, useEffect } from "react";
import { createRoot } from 'react-dom/client';
import axios from "axios";

const ReportList = () => {
    const [reports, setReports] = useState([]);

    useEffect( () => {
        const getReports = async() => {
            const response = await axios.get('/api/reports');
            setReports(response.data.reports);
        }
        getReports();
    }, []);
    return (
        <>
        <h1>Phenomena</h1>
            {
            reports.map((report, i) => {
                return (
                <div key={i}>
                <h2>{report.title}</h2>
                <p>{report.location}</p>
                <p>{report.description}</p>
                </div>

                )
            })
        }
        </>
    );
}

const NewPost = () => {
    const [title, setTitle]= useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        if (e.target.name === "title"){
            setTitle(e.target.value);
        } else if(e.target.name === "location") {
            setLocation(e.target.value);
        } else if(e.target.name === "description") {
            setDescription(e.target.value);
        } else {
            setPassword(e.target.value);
        }
    }

    const createReport = async () => {
        if(!title || !location || !description || !password){
            setMessage("All fields must be complete to submit a report.");
        } else{
            const newReport = {
                title: title,
                location: location,
                description: description,
                password: password
            };
            const result = await axios.post('/api/reports', newReport);
            setMessage("Report submitted!");
        }
    }

    return (
        <> 
        <h2>New Post</h2>
        <label>Title:<input name="title" onChange={handleChange}></input></label>
        <label>Location:<input name="location" onChange={handleChange}></input></label>
        <label>Description:<textarea name="description" onChange={handleChange}></textarea></label>
        <label>Password:<input name="password" onChange={handleChange}></input></label>
        <button onClick={createReport}>Submit</button>
        <p>{message}</p>
        </>
    )
}

const App = () => {
    return (
        <>
        <ReportList />
        <NewPost />
        </>
    )
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
