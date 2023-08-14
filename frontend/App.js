
import './styles/styles.css';
import React, { useState, useEffect } from "react";

export default function Main(){
   
    const [data, setData] = useState({
        Age:"",
        City:"",
        Contry:"",
        Name:"",
        Surname:""
    });

    useEffect(() => {
        fetch("/seedata").then((res) =>
        res.json().then((data) => {
            setData({
                Age: data.Age,
                City: data.City,
                Contry: data.Contry,
                Name: data.Name,
                Surname: data.Surname                
            });
        }));
    })


    return(
        <div>
            <h1>Showing data from flask!</h1>
            {/* Displaying the data */}
            <p>Name: {data.Name}</p>
            <p>Surname: {data.Surname}</p>
            <p>Country: {data.Contry}</p>
            <p>City: {data.City}</p>
            <p>Age: {data.Age}</p>
            <h3>This is just a test!</h3>
        </div>
    );
}
