import React, { useEffect } from 'react';
import personLists from './personLists.json';

const StartPage = () => {

    const [personList, setPersonList] = React.useState(["Celebrities"]); //TODO: Set Default Person List
    const [players, setPlayers] = React.useState(2);
    const [numPersons, setNumPersons] = React.useState(24);
    const [questions, setQuestions] = React.useState(10);
    const [suspectList, setSuspectList] = React.useState([]); 

    useEffect(() => {
        const personList = JSON.parse(localStorage.getItem('personList'));
        const suspectListX = [];

        console.log('personList', personList);

        for (let i = 0; i < personList.length; i++) {
            console.log(i, personList[i], personLists[personList[i]]);
            for (let j = 0; j < personLists[personList[i]].length; j++) {
                console.log(personLists[personList[i]][j]);
                suspectListX.push(personLists[personList[i]][j]);
            }
        }

        console.log('suspectList', suspectListX);

        // randomly rearrange the suspect list
        for (let i = 0; i < suspectListX.length; i++) {
            let randomIndex = Math.floor(Math.random() * suspectListX.length);
            let temp = suspectListX[i];
            suspectListX[i] = suspectListX[randomIndex];
            suspectListX[randomIndex] = temp;
        }

        console.log('suspectList', suspectListX.slice(0, numPersons));

        setSuspectList(suspectListX.slice(0, numPersons));

        console.log('suspectList', suspectList);
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