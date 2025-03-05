import React, { useEffect } from 'react';
import personLists from './personLists.json';
import KFMJSON from './KFM.json';
import './KFM.css';
const DEFAULT_ROLES = ["Kill", "Shaboink", "Marry"];
const NUM_ROLES = 10;

const KFM = () => {
    const [currentPerson, setCurrentPerson] = React.useState(null);
    const [showCurrentPerson, setShowCurrentPerson] = React.useState(true);    
    const [order, setOrder] = React.useState([]);
    const [choices, setChoices] = React.useState(new Map(
        DEFAULT_ROLES.map((role) => [role, null])
    ));
    const [personList, setPersonList] = React.useState(null);
    const [roles, setRoles] = React.useState(DEFAULT_ROLES)

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

    const randomRoles = () => {

        const rolesX = [];
        for (let i = 0; i < NUM_ROLES; i++) {
            let role = KFMJSON.roles[Math.floor(Math.random() * KFMJSON.roles.length)];
            while (rolesX.includes(role)) {
                role = KFMJSON.roles[Math.floor(Math.random() * KFMJSON.roles.length)];
            }
            rolesX.push(role);
        }
        setRoles(rolesX);
    }


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
            randomRoles();
        }
    }, [personList]);

    useEffect(() => {
        setCurrentPerson(order.pop())
    }, [order])

    const reset = () => {
        setChoices(new Map(
            DEFAULT_ROLES.map((role) => [role, null])
        ));
        randomOrder();
        randomRoles();
        setCurrentPerson(order.pop());
    };

    

    const handleChoice = (choice) => {
        setChoices(new Map(choices.set(choice, currentPerson)));
        setCurrentPerson(order.pop());

        let allChosen = true;
        for (let [role, person] of choices) {
            if (!person) {
                allChosen = false;
            }
        }
        console.log(allChosen);
        setShowCurrentPerson(!allChosen);
    };

    const Role_Button = ({label, handleChoice}) => (
        <div className="role-button-wrapper" style={{ marginRight: '10px', display: "flex" }}>
            <button className="role-text" onClick={() => handleChoice(label)}>{label}: </button>
        </div>
    );

    const Role_Text = ({label, personName}) => (
        <div className="role-text-wrapper" style={{ marginRight: '10px', display: "flex" }}>
            <p className="role-text">{label}: </p>
            <p>{personName}</p>
        </div>
    );

    return (
        <div>
            <h1>Kill, Shaboink, Marry</h1>
            {showCurrentPerson && (
                <div>
                    <p>{currentPerson}</p>
                </div>
            )}
            <div>
                <h2>Choices</h2>
            </div>
            <div>
                {roles.map((role) => (
                    choices.get(role) ? (
                        <Role_Text key={role} label={role} personName={choices.get(role)} />
                    ) : (
                        <Role_Button key={role} label={role} handleChoice={handleChoice} style={{height: '40px'}}/>
                    )
                ))}
            </div>
            <div id="reset-button" style={{marginTop: '100px'}}>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    );
};

export default KFM;