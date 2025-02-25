import React, { useEffect } from 'react';
import personLists from './personLists.json';

const KFM = () => {
    const [currentPerson, setCurrentPerson] = React.useState(null);
    const [order, setOrder] = React.useState([]);
    const [choices, setChoices] = React.useState({ kill: null, fuck: null, marry: null });
    const [personList, setPersonList] = React.useState(null);

    const randomOrder = () => { 
        const suspectListX = [];

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
        while  (suspectListX.length > 0) {
            let randomIndex = Math.floor(Math.random() * suspectListX.length);
            if (!unique.get(suspectListX[randomIndex])) {
                newSuspectList.push(suspectListX[randomIndex]);
                unique.set(suspectListX[randomIndex], true);
            }
            suspectListX.splice(randomIndex, 1);
        }


        setOrder(newSuspectList);
    };

    useEffect(() => {
        const pL = JSON.parse(localStorage.getItem('personList'));
        if (pL) {
            setPersonList(pL);
        } else {
            setPersonList(["Atlantis"])
        }
    }, []);

    useEffect(() => {
        if (personList) {
            randomOrder();
        }
    }, [personList]);

    useEffect(() => {
        setCurrentPerson(order.pop())
    }, [order])

    

    const handleChoice = (choice) => {
        setChoices((prevChoices) => ({ ...prevChoices, [choice]: currentPerson }));
        setCurrentPerson(order.pop());
    };

    return (
        <div>
            <h1>Kill, Fuck, Marry</h1>
            {currentPerson && (
                <div>
                    <p>{currentPerson}</p>
                </div>
            )}
            <div>
                <h2>Choices</h2>
            </div>
            {currentPerson && (
                <div>
                    <div className="choice-button" style={{ marginRight: '10px', display:"flex" }}>
                        <button onClick={() => handleChoice('kill')}>Kill:</button>
                        <p>{choices.kill ? choices.kill : ""}</p>
                    </div>
                    <div className="choice-button" style={{ marginRight: '10px', display:"flex" }}>
                        <button onClick={() => handleChoice('fuck')}>Fuck:</button>
                        <p>{choices.fuck ? choices.fuck : ''}</p>
                    </div>
                    <div className="choice-button" style={{ marginRight: '10px', display:"flex" }}>
                        <button onClick={() => handleChoice('marry')}>Marry:</button>
                        <p>{choices.marry ? choices.marry : ''}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default KFM;