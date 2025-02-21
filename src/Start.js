import React, { useEffect } from 'react';
import personLists from './personLists.json';

const StartPage = () => {

    const [personList, setPersonList] = React.useState(["Celebrities"]); //TODO: Set Default Person List
    const [players, setPlayers] = React.useState(2);
    const [numPersons, setNumPersons] = React.useState(24);
    const [questions, setQuestions] = React.useState(10);
    const [suspectList, setSuspectList] = React.useState([]); 

    const getRandomSuspects = () => { 
        const suspectListX = [];

        // console.log('personList', personList);

        // Catch Duplicates Here (far more effecient)
        let unique = new Map();
        for (let i = 0; i < personList.length; i++) {
            console.log(i, personList[i], personLists[personList[i]]);
            for (let j = 0; j < personLists[personList[i]].length; j++) {
                if (!unique.has(personLists[personList[i]][j])) {
                    unique.set(personLists[personList[i]][j], false);
                }
                suspectListX.push(personLists[personList[i]][j]);
            }
        }

        let newSuspectList = [];
        // randomly rearrange the suspect list
        while (newSuspectList.length < numPersons && suspectListX.length > 0) {
            let randomIndex = Math.floor(Math.random() * suspectListX.length);
            if (!unique.get(suspectListX[randomIndex])) {
                newSuspectList.push(suspectListX[randomIndex]);
                unique.set(suspectListX[randomIndex], true);
            }
            suspectListX.splice(randomIndex, 1);
        }
        setSuspectList(newSuspectList);
    }

    useEffect(() => {
        const personList = JSON.parse(localStorage.getItem('personList'));
        const players = localStorage.getItem('players');
        const numPersons = localStorage.getItem('numPersons');
        const questions = localStorage.getItem('questions');

        if (personList) {
            setPersonList(personList);
        }
        if (players) {
            setPlayers(players);
        }
        if (numPersons) {
            setNumPersons(numPersons);
        }
        if (questions) {
            setQuestions(questions);
        }
        getRandomSuspects();
    }, []);


    return (
        <div>
            <h1>Welcome to Guess Who!</h1>
            <div id="game">
                <h2>Click on a Person to Elimate Them from the Suspect List</h2>
                <div id = "suspectList">
                    {suspectList.map((person) => (
                        <PersonButton key={person} person={person} />
                    ))}
                </div>

                <button onClick={getRandomSuspects}>Reshuffle</button>
                <a href="/guess-who" onClick={() => localStorage.clear()}>Clear Settings</a>
            </div>
        </div>
    );
};

const PersonButton = ({person}) => {
    const [isClicked, setIsClicked] = React.useState(false);

    const handleClick = () => {
        console.log('clicked', person);
        setIsClicked(true);
    }

    return (
        <button onClick={handleClick} style={{ display: isClicked ? 'none' : 'inline' }}>
            {person}
        </button>
    );
};

export default StartPage;