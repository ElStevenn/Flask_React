
import './styles/styles.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';


function Title_input(){
    return(
        <>
        <div className='title_container'>
            <label for='title_input"'>Title</label>
            <input type='text' id="title_input" />
        </div>
        </>
    );
}

function Textarea_input() {

    function updateCounting() {
        const textarea = document.getElementById('text_area_');
        const counting = document.getElementById('conting');
        const lenght_ = textarea.value.length;
        if (lenght_ <= 3000){
            counting.textContent = `${lenght_}/3000`;
        }else{
            counting.textContent = '3000/3000';
        }
        
    }

    document.addEventListener('input', function(e) {
        if (e.target.tagName.toLowerCase() === 'textarea') {
            autoresize(e.target);
        }
    });
    
    function autoresize(textarea) {
        // Reset  height to 'auto' and set scrollHeiht + 2
        textarea.style.height = 'auto';
        textarea.style.height = (textarea.scrollHeight + 2) + 'px';

    }

    return (
        <>
        <div className='text_input_div'>
            <label for='text_area_'>Text</label>
            <div className='textarea-wrapper'>
                <textarea autocapitalize="off" autoComplete="off" placeholder spellcheck="false" className='text_area' rows="5" cols="50" id="text_area_" onInput={updateCounting}></textarea>
                <span id="conting" className='char-count'>0/300</span>
            </div>
            

        </div>
        </>
    );
}

function Additional_inputs() {
    return(
        <>
        <div className='div_additional_inf'>
            <label for="add_option_1">Deadline</label>
            <input type='datetime-local' id='add_option_1'/>

            <label for="add_option_2">Start day</label>
            <input type='date' id='add_option_2'/>
        </div>
        </>
    );
}


function PartInput() {
    return(
        <>
        <div className='input_div'>
            <Title_input />
            <Textarea_input />
            <Additional_inputs />
            <a href="#" className='sendButton'>SEND</a>
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