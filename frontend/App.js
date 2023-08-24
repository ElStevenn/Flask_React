
import './styles/styles.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import three_points from './images/list.png';



function Title_input({titleWord, setTitleWord}){
    // Title imput, where I write the title of the task
    return(
        <>
        <div className='title_container'>
            <label for='title_input"'>Title</label>
            <input type='text' id="title_input" onChange={(e) => setTitleWord(e.target.value)} value={titleWord}/>
        </div>
        </>
    );
}

function Textarea_input({textWord, setTextWord}) {
    // *Add description here*
    const [actualWord, setActualWord] = useState("");

    function updateCounting() {
        const textarea = document.getElementById('text_area_');
        const counting = document.getElementById('conting');
        const lenght_ = textarea.value.length;

        if (lenght_ <= 250){
            counting.textContent = `${lenght_}/300`;
            setActualWord(textarea.value);
            counting.style.color = "#888";
        }else if (lenght_ <= 280){
            counting.textContent = `${lenght_}/300`;
            setActualWord(textarea.value);
            counting.style.color = "#bf7c00";
        }else if (lenght_ <= 300) {
            counting.textContent = `${lenght_}/300`;
            setActualWord(textarea.value);
            counting.style.color = "red";
        }else{
            counting.textContent = '300/300';
            console.log(actualWord);
            textarea.value = actualWord;
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
                <label htmlFor='text_area_'>Text</label>
                <div className='textarea-wrapper'>
                    <textarea 
                        autoCapitalize="off" 
                        autoComplete="off"  
                        autoCorrect='off' 
                        className='text_area' 
                        rows="5" 
                        cols="50" 
                        id="text_area_" 
                        onInput={updateCounting} 
                        onChange={(e) => setTextWord(e.target.value)} 
                        value={textWord}
                    ></textarea>
                    <span id="conting" className='char-count'>0/300</span>
                </div>
            </div>
        </>
    );
}

function Additional_inputs({deadlineWord, setdeadlineWord, startdayWord, setStartdayWord}) {
    // Additional imputs such as Deadline and Start Day
    return(
        <>
        <div className='div_additional_inf'>
            <label for="add_option_1">Deadline</label>
            <input type='datetime-local' id='add_option_1' onChange={(e) => setdeadlineWord(e.target.value)} value={deadlineWord}/>

            <label for="add_option_2">Start day</label>
            <input type='date' id='add_option_2' onChange={(e) => setStartdayWord(e.target.value)} value={startdayWord}/>
        </div>
        </>
    );
}

function PartInput() {
    // All input part, witch means all related whith introduce data into the database.
    const [titleWord, setTitleWord] = useState("");
    const [textWord, setTextWord] = useState("");
    const initialDateTime = '';
    const [deadlineWord, setdeadlineWord] = useState(initialDateTime);
    const [startdayWord, setStartdayWord] = useState(initialDateTime);
    
    function add_new_task() {
        let Title = document.getElementById('title_input').value;
        let Text_ = document.getElementById('text_area_').value;
        let deadline = document.getElementById('add_option_1').value;
        let start_day = document.getElementById('add_option_2').value;

        const actualTask = {
            'title': Title,
            'text': Text_,
            'deadline': deadline,
            'start_day': start_day || null
        };
    

        console.log(actualTask);
        if (!Title){
            // Title not found
            console.error("Title is required.");
            alert("You haven't written the Title!");
        } else if(!Text_) {
            // Text not found
            console.error("Text is required.");
            alert("You haven't written the Text!");
        } else if (!deadline) {
            // Deadline field not found
            console.error("Deadline is required.");
            alert("You haven't written the Deadline!");
        } else {
            setTitleWord("");
            setTextWord("");
            setdeadlineWord(initialDateTime);
            setStartdayWord(initialDateTime);

            // Send the data to API and then insert into DataBase
            axios.post('http://localhost:5000/get_task_and_ddbb', actualTask)
            .then(response => {
                console.log("Response:", response.data);
            })
            .catch(error => {
                // in case the API doesn't work
                alert("An error has occured!");
            });
        }   
    }

    return(
        <>
        <div className='input_div'>
            <Title_input titleWord={titleWord} setTitleWord={setTitleWord}/>
            <Textarea_input textWord={textWord} setTextWord={setTextWord}/>
            <Additional_inputs deadlineWord={deadlineWord} setdeadlineWord={setdeadlineWord} startdayWord={startdayWord} setStartdayWord={setStartdayWord}/>
            <a href="#" className='sendButton' onClick={add_new_task}>SEND</a>
        </div>
        </>
    )
}

function Conf_task({ ID, task_conf_func, conf_widget }) {
    return (
        <>
            <button onClick={() => task_conf_func(ID)}>
                <img src={three_points} alt='three points button'></img>
            </button>
            {conf_widget}
        </>
    );
}

function SingleTask({ Title, Text, DeadLine, Start_Day, ID }) {
    // *add description here*
    const [conf_widget, setConf_widget] = useState(null);
    const [optVisible, setOptVisible] = useState(false);
    let apiKey = "12345";

    async function Remove_tak_func(ID) {
        // Send to backend a request ro remove the task

        try {
            const response = await fetch(`http://localhost:5000/remove_single_task/${apiKey}/${ID}`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            console.log("task removed successfully!");
        } catch (err) {
            console.error("Error:", err);
        }
    }

    function Edit_Task_fuinc(ID) {
        console.log("*Editing this task -> *" + ID);
    }

    function task_conf_func() {
        if (optVisible) {
            setConf_widget(null);
        } else {
            setConf_widget(
                <div className='task_conf_div'>
                    <a href='#' onClick={(e) => { e.preventDefault(); Remove_tak_func(ID); }}>Remove</a>
                    <a href='#' onClick={(e) => { e.preventDefault(); Edit_Task_fuinc(ID); }}>Edit</a>
                </div>
            );
        }
        setOptVisible(!optVisible); // This should be outside the if-else block.
    }

    return (
        <div className='Sigle_Tak'>
            <div className='top_part_task'>
                <h3>{Title}</h3>
                <Conf_task ID={ID} task_conf_func={task_conf_func} conf_widget={conf_widget} />
            </div>

            <p>{Text}</p>
            <div className='botton_info'>
                <h5>{Start_Day ? `SD: ${Start_Day}` : ""}</h5>
                <h5>DL: {DeadLine[0]} at {DeadLine[1]}</h5>
            </div>
        </div>
    );
}

function ListsOfTasks({ tasks }) {
    if (tasks){
        return (
            <div className='ListOfTasks'>
                {tasks.map((fields, b) => (
                    <SingleTask
                        key={b}
                        Title={fields.Title}
                        Text={fields.Text}
                        DeadLine={fields.DeadLine}
                        Start_Day={fields.Start_Day}
                        ID={fields.ID}
                    />
                ))}
            </div>
        );
    } else {
        return (
            <div className='ErrorMesage'>
                <h3>Module not found :(</h3>
            </div>
        );
    }
}


function PartOutput() {
    // Output part, witch means geting data from API
    let APIKey = "12345";
    const [taks, setTaks] = useState([]);

    // GET tasks from API
    useEffect(() =>{
        fetch(`/get_all_taks/${APIKey}`).then((res) => 
            res.json().then((data) => {
                setTaks(
                    data.Response
                )
            }))
        .catch(() => {
            setTaks(null);
        })
    })


    return(
        <>
        <div className='output_div'>
            <h2>TASK VIEW</h2>
            <ListsOfTasks tasks={taks}/>
        </div>
        </>
    );
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