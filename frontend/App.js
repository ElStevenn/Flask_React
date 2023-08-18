
import './styles/styles.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';


function Title_input(){
    return(
        <>
        <label for='title_input"'>Title:</label>
        <input type='text' id="title_input"/>
        </>
    );
}

function Text_input() {
    return (
        <>
        <div className='text_input_div'>
            <p>*configurations here*</p>
            <label for='text_input'>Text</label>
            <input type='text' id='text_input'/>
        </div>
        </>
    );
}

function Additional_inputs() {
    return(
        <>
            <label for="add_option_1">Deadline:</label>
            <input type='datetime-local' id='add_option_1'/>

            <label for="add_option_2">Deadline:</label>
            <input type='date' id='add_option_2'/>
        </>
    );
}


function PartInput() {
    return(
        <>
        <div className='input_div'>
            <h2>Output Part</h2>
            <p>*Something here*</p>
            <p>*Something here*</p>
            <p>*Something here*</p>
            <p>*Something here*</p>
            <button>SEND</button>
        </div>
        </>
    )
}



function PartOutput() {
    return;
}


export default function Main(){
    return(
        <div className='general_div'>
            <PartInput />
            <PartOutput />
        </div>
    );
}
















/*
function ButonSend() {

    const sendData = () => {
        const nameValue = document.getElementById("input_name").value;
        const emailValue = document.getElementById("input_email").value;

        const dataToSend = { name: nameValue, email: emailValue};
        console.log(dataToSend);

        axios.post('http://localhost:5000/receive', dataToSend)
            .then(response => {
                console.log("Response:", response.data);
            })
            .catch(error => {
                console.error("Error sending data:", error);
            });
    }
    
    function testSend() {
        useEffect(() => {
            fetch
        })
    }


    return(
        <>
        <div className='inputs_'>
            <input type='text' className='input' id="input_name" placeholder='name...'/>
            <input type='text' className='input' id="input_email" placeholder='email...'/>
            <button onClick={sendData}>Send Data</button>
            <button onClick={testSend}>Test_send</button>
        </div>
   
        </>
    );

}

const [myData, setMyData] = useState({
    name: null
})

useEffect(() => {
    fetch("/test").then((res) =>
    res.json().then((data) => {
        setMyData({
            name: data.Name
        });
    }));
});

*/