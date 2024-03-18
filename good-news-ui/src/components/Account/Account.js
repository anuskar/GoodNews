import React, { useEffect, useState } from 'react';
import styles from './Account.css';

const INITIAL_USER_INPUT = {
    topic1: '',
    topic2: '',
    topic3: ''
}

function Account(props){
    const [userInput, setUserInput] = useState(INITIAL_USER_INPUT)

    function handleSubmit(e){
        e.preventDefault()
        // POST request to send userInput data to the backend on form submission
        fetch('/setUserTopics', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInput) // Send the userInput as request body
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (props.onTopicsUpdated) {
                props.onTopicsUpdated(); // Call the function passed via props
            }
        });
        setUserInput(INITIAL_USER_INPUT)
    }

    function handleChange(e){
        const { id, value } = e.target;
        setUserInput((prev) => {
            return {
                ...prev,
                [id]: value
            }
        })
    }

    return (
        <div className='account-container'>
            <h1>Top Interest Selection</h1>
            <h2>Your Preferences</h2>
            <p>Choose Your Top 3 Topics</p>
            <form className='topic-container' onSubmit={handleSubmit}>
                <label htmlFor='topic1' className='topic-label'>Topic 1</label>
                <input className='topic' onChange={handleChange} type="text" id="topic1" value={userInput.topic1}></input>
                <label htmlFor='topic2' className='topic-label'>Topic 2</label>
                <input className='topic' onChange={handleChange} type="text" id="topic2" value={userInput.topic2}></input>
                <label htmlFor='topic3' className='topic-label'>Topic 3</label>
                <input className='topic' onChange={handleChange} type="text" id="topic3" value={userInput.topic3}></input>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default Account;