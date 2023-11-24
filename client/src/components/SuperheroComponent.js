// Import necessary libraries
import React, { useState, useEffect } from 'react';
import './SuperheroComponent.css';

// Create a new component
function SuperheroComponent() {
    const [backendData, setData] = useState([]);

    // Fetch data from the backend
    useEffect(() => {
        fetch('/info-db')
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    // Render the data
    return (
        <ul className="superhero-list">
            {backendData.map((item, index) => (
                <li key={index} className="superhero-item">
                    <strong>Name:</strong> {item.name} <br />
                    <strong>Gender:</strong> {item.Gender} <br />
                    <strong>Eye color:</strong> {item["Eye color"]} <br />
                    <strong>Race:</strong> {item.Race} <br />
                    <strong>Hair color:</strong> {item["Hair color"]} <br />
                    <strong>Height:</strong> {item.Height} cm <br />
                    <strong>Publisher:</strong> {item.Publisher} <br />
                    <strong>Skin color:</strong> {item["Skin color"]} <br />
                    <strong>Alignment:</strong> {item.Alignment} <br />
                    <strong>Weight:</strong> {item.Weight} kg
                </li>
            ))}
        </ul>
    );
}

export default SuperheroComponent;
