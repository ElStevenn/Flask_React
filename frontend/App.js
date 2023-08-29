
import './styles/styles.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import three_points from './images/list.png';
import cross from './images/cross.png';


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
                <label for='text_area_'>Text</label>
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

function Edit_task_opt ({task_id, Name, Text, Deadline, Start_Day, close_edit_task}) {
    // Interface of edit task (imporve this description)

    // By the way, end this Pau please!
    if (task_id) {
        return(
            <>
                <div className='Edit_task_div'>
                    <div className='cross_and_title'>
                        <h3>EDIT TASK</h3>
                        <button onClick={() => close_edit_task()}>X</button>
                    </div>
                    <div className='Edit_name'>
                        <label for="Edit_name_">Name</label>
                        <input type="text" id='Edit_name_' value={Name || "Nothing here"}/>
                    </div>
                    <div className='Edit_Text'>
                        <label for >Text</label>
                        <textarea
                            autoCapitalize="off" 
                            autoComplete="off"  
                            autoCorrect='off' 
                            className='text_area'
                            if='edt_text_area'
                        ></textarea>
                    </div>
                    <div className='Edit_aditional_input'>
                        <label for="edit_deadline">Deadline</label>
                        <input id="edit_deadline" type='datetime-local'></input>

                        <label for="edit_startDay">Start Day</label>
                        <input id="edit_startDay" type='date'></input>
                    </div>
                </div>
            </>
        );
    }else{
        return;
    }
}

async function get_task_from_id({ ID }) {
    // GET task from its ID
    let apiKey = "12345";

    try {
        const response = await fetch(`http://localhost:5000/return_single_task/${apiKey}/${ID}`);

        if (!response.ok) {
            throw new Error(`Server responded with a status of ${response.status}`);
        }

        const data = await response.json();
        console.log("Full response data:", data);
        return data['Result'];

    } catch (err) {
        console.log("Error:", err);
        return false; // Note: lowercase 'f' in 'false'
    }
}


function Conf_task({ ID, task_conf_func, conf_widget }) {
    // configuration single task
    return (
        <>
            <button onClick={() => task_conf_func(ID)}>
                <img src={three_points} alt='three points button'></img>
            </button>
            {conf_widget}
        </>
    );
}

function SingleTask({ Title, Text, DeadLine, Start_Day, ID, editValues, setEditValues}) {
    // *add description here*
    const [conf_widget, setConf_widget] = useState(null);
    const [optVisible, setOptVisible] = useState(false);
    
    let apiKey = "12345";

    
    async function Remove_tak_func(ID) {
        // Send to backend a request to remove the task
    
        try {
            const response = await fetch(`http://localhost:5000/remove_single_task/${apiKey}/${ID}`, {
                method: 'DELETE', // specify the request method
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${yourToken}` // if needed
                },
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            console.log(`Task ${ID} removed successfully!`);
        } catch (err) {
            console.error("Error:", err);
        }
    }
    

    async function Edit_Task_fuinc(ID) {
        try {
            setConf_widget(null);
            let result = await get_task_from_id({ ID: ID });
            if (!result) {
                console.error("No result from get_task_from_id");
                return;
            }
            console.log("The result -----> ", result);
            setEditValues(prevValues => ({
                ...prevValues,
                ID: result.ID,
                Name: result.Name,
                Text: result.Text,
                Deadline: result.Deadline,
                Start_Day: result.Start_Day,
            }));
        } catch (err) {
            console.error("Error in Edit_Task_fuinc:", err);
        }
    };





    

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

function ListsOfTasks({tasks, editValues, setEditValues}) {
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
                        editValues={editValues}
                        setEditValues={setEditValues}
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
    const [editValues, setEditValues] = useState({
        ID: '',
        Name: '',
        Text: '',
        Deadline: '',
        Start_Day: ''
    });
    // Output part, witch means geting data from API
    let APIKey = "12345";
    const [taks, setTaks] = useState([]);

    // GET tasks from API to post all the time in the interface
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

    function close_edit_task() {
        setEditValues({
            ID: '',
            Name: '',
            Text: '',
            Deadline: '',
            Start_Day: ''
        });
    }


    return(
        <>
        <Edit_task_opt task_id={editValues.ID} Name={editValues.Name} Text={editValues.Text} Deadline={editValues.Deadline} Start_Day={editValues.Start_Day} close_edit_task={close_edit_task}/>
        <div className='output_div'>
            <h2>TASK VIEW</h2>
            <ListsOfTasks tasks={taks} editValues={editValues} setEditValues={setEditValues}/>
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




