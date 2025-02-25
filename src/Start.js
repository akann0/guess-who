import React, { useEffect } from 'react';
import personLists from './personLists.json';
import './Start.css';

const StartPage = () => {

    const [personList, setPersonList] = React.useState([]); //TODO: Set Default Person List
    const [players, setPlayers] = React.useState(1);
    const [numPersons, setNumPersons] = React.useState(24);
    const [questions, setQuestions] = React.useState(10);
    const [suspectList, setSuspectList] = React.useState(new Map()); 
    const [clickedStates, setClickedStates] = React.useState(
        Object.fromEntries(personLists["Celebrities"].map(person => [person, false]))
      );

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
        while (newSuspectList.length < (numPersons * players) && suspectListX.length > 0) {
            let randomIndex = Math.floor(Math.random() * suspectListX.length);
            if (!unique.get(suspectListX[randomIndex])) {
                newSuspectList.push(suspectListX[randomIndex]);
                unique.set(suspectListX[randomIndex], true);
            }
            suspectListX.splice(randomIndex, 1);
        }

        let teams = new Map();
        for (let i = 0; i < players; i++) {
            teams.set(i, []);
        }
        for (let i = 0; i < newSuspectList.length; i++) {
            teams.get(i % players).push(newSuspectList[i]);
        }

        console.log('teams', teams);
        console.log('newSuspectList', newSuspectList);

        setSuspectList(teams);

        for (let i = 0; i < players; i++) {
            console.log(i, teams, teams.get(i))
            setClickedStates(
                Object.fromEntries(teams.get(i).map(person => [person, false]))
            );
        }
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
    }, []);

    useEffect(() => {
        getRandomSuspects();
    }, [personList, players, numPersons]);


    return (
        <div>
            <h1>Welcome to Guess Who!</h1>
            <div id="game">
                <h2>Click on a Person to Eliminate Them from the Suspect List</h2>
                <div id="suspectList">
                    {Array.from(suspectList.entries()).map(([teamNumber, team]) => (
                        <div className="team" key={teamNumber} style={{ maxWidth: 100 / players + '%' }}>
                            <h3>Team {teamNumber + 1}</h3>
                            {team.map(person => (
                                <PersonButton 
                                    key={person} 
                                    person={person} 
                                    clickedStates={clickedStates} 
                                    setClickedStates={setClickedStates} 
                                />
                            ))}
                        </div>
                    ))}
                </div>
                <button onClick={getRandomSuspects}>Reshuffle</button>
                <a href="/guess-who" onClick={() => localStorage.clear()}>Clear Settings</a>
            </div>
        </div>
    );
};

const PersonButton = ({person, clickedStates, setClickedStates}) => {

    const handleClick = () => {
        console.log('clicked', person);
        setClickedStates({
            ...clickedStates,
            [person]: true
          });
    }

    return (
        <button class="person" onClick={handleClick} style={{ display: clickedStates[person] ? 'none' : 'inline' }}>
            {person}
        </button>
    );
};

export default StartPage;