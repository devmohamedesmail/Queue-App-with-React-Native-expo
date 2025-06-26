// context/InfoContext.js
import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';

// Create InfoContext using the Context API
const InfoContext = createContext();

// InfoContext provider component
const InfoProvider = ({ children }) => {
    const [info, setInfo] = useState(null); // Initialize state with null or default value
    const [loading, setLoading] = useState(true); // Add a loading state
    const [error, setError] = useState(null); // Add an error state

    useEffect(() => {
        fetchInfo(); 
    }, []); 

    const fetchInfo = async () => {
        try {
            // Make the API call using Axios
            const response = await axios.get("https://queue-app-express-js.onrender.com/api/v1/settings");
            setInfo(response.data.data);  
            
        } catch (err) {
            setError('Failed to fetch info');
            
            console.log("Error"); // Log the error for debugging
        }
    }

    return (
        <InfoContext.Provider value={{ info, loading, error }}>
            {children}
        </InfoContext.Provider>
    );
};

export { InfoProvider, InfoContext };
