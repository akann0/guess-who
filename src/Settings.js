import React from 'react';
import personLists from './personLists.json';

const SettingsPage = () => {
    const [players, setPlayers] = React.useState(2);
    const [numPersons, setNumPersons] = React.useState(24);
    const [questions, setQuestions] = React.useState(10);
    const [personList, setPersonList] = React.useState(["Celebrities"]); //TODO: Set Default Person List

    const addtoPersonList = (listName) => {
        if (personLists[listName]) {  
            setPersonList([...personList, listName]);
        } else {
            alert("List not found");
        }
    }

    const handlePlayersChange = (event) => {
        setPlayers(event.target.value);
    };
    const handleNumPersonsChange = (event) => {
        setNumPersons(event.target.value);
    }
    const handleQuestionsChange = (event) => {
        setQuestions(event.target.value);
    }
    const handlePersonListChange = (event) => {
        setPersonList(event.target.value);
    }
    const SaveSettingsLocally = () => {
        localStorage.setItem('players', players);
        localStorage.setItem('numPersons', numPersons);
        localStorage.setItem('questions', questions);
        localStorage.setItem('personList', JSON.stringify(personList));
    }

    return (
        <div>
            <h1>Settings</h1>
            <div>
                <label>Number of Players: </label>
                <input 
                    type="number" 
                    value={players} 
                    onChange={handlePlayersChange} 
                    min="1" 
                    max="4" 
                />
            </div>
            <div>
                <label>Number of Persons: </label>
                <input 
                    type="number" 
                    value={numPersons} 
                    onChange={handleNumPersonsChange} 
                    min="2" 
                    max="100" 
                />
            </div>
            <div>
                <label>Number of Questions Allowed: </label>
                <input 
                    type="number" 
                    value={questions} 
                    onChange={handleQuestionsChange} 
                    min="0" 
                    max="100" 
                />
                <p>Note: That one is most useful in Solo Play</p>
            </div>

            <div>
                <label>Person List: </label>
                <input 
                    type="text" 
                    placeholder="Enter list name" 
                    onBlur={(event) => {
                        const listName = event.target.value;
                        addtoPersonList(listName);
                    }}
                />
                <ul>
                    {personList.map((listName, index) => (
                        <li key={index}>{listName}</li>
                    ))}
                </ul> 
                {/* TODO: allow user to remove lists from this */}
            </div>
            <a onClick={SaveSettingsLocally} href="/">Go Back</a>
        </div>
    );
};

export default SettingsPage;