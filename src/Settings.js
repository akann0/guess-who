import React from 'react';
import personLists from './personLists.json';
import './Settings.css';



const SettingsPage = ({ setPage }) => {
    const [players, setPlayers] = React.useState(1);
    const [numPersons, setNumPersons] = React.useState(24);
    const [questions, setQuestions] = React.useState(10);
    const [personList, setPersonList] = React.useState(["Celebrities"]); //TODO: Set Default Person List
    const [GrapefruitToggle, setGrapefruitToggle] = React.useState(false);
    const [GRAPEFRUIT, setGRAPEFRUIT] = React.useState([]);

    React.useEffect(() => {
        const players = localStorage.getItem('players');
        const numPersons = localStorage.getItem('numPersons');
        const questions = localStorage.getItem('questions');
        const personList = localStorage.getItem('personList');
        const GRAPEFRUIT = [];
        for (const key in personLists) {
            GRAPEFRUIT.push(key);
        }
        setGRAPEFRUIT(GRAPEFRUIT);
    }, []);    

    const addtoPersonList = (listName) => {
        if (personLists[listName]) { 
            if (personList.length === 1 && personList.includes("Celebrities")) {
                setPersonList([listName]);
            } else {
            setPersonList([...personList, listName]);
            }
        } else if (listName === "Grapefruit") {
            setGrapefruitToggle(true);
        } else if (listName === "BlazeIt420") {
            setPersonList(GRAPEFRUIT);
        } else if (listName === "MCWP") {
            setPersonList(["Atlantis", "Past_MCWP", "Past_MCWP_Pulls", "Current_MCWP_A_Team", "Current_MCWP_B_Team"]);
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
    const SaveSettingsLocally = (page) => {
        localStorage.setItem('players', players);
        localStorage.setItem('numPersons', numPersons);
        localStorage.setItem('questions', questions);
        localStorage.setItem('personList', JSON.stringify(personList));
        setPage(page);
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
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            const listName = event.target.value;
                            addtoPersonList(listName);
                        }
                    }}
                />
                <ul>
                    {personList.map((listName, index) => (
                        <li key={index}>{listName}</li>
                    ))}
                </ul> 
                <ul id="Grapefruit" style={{display: GrapefruitToggle ? 'block' : 'none'}}>
                    <p>All Possible Categories:</p> 
                    {GRAPEFRUIT.map((listName, index) => (
                        <li key={index}>{listName}</li>
                    ))}
                </ul>
                {/* TODO: allow user to remove lists from this */}
            </div>
            <div id="buttons">
                <a onClick={() => SaveSettingsLocally("start")}>Go</a>
                <a onClick={() => SaveSettingsLocally("kfm")}>Try Something Fun</a>
            </div>
        </div>
    );
};

export default SettingsPage;