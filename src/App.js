import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import SettingsPage from './Settings.js';
import StartPage from './Start.js';
import KFMPage from './KFM.js';

const DEFAULT_PLAYERS = 1;
const DEFAULT_NUM_PERSONS = 24;
const DEFAULT_QUESTIONS = 10;

function GuessWho() {
  const [page, setPage] = useState('landing');

  return (
    <div>
      {page === 'landing' && <Landing setPage={setPage} />}
      {page === 'settings' && <SettingsPage setPage={setPage} />}
      {page === 'start' && <StartPage setPage={setPage} />}
      {page === 'kfm' && <KFMPage setPage={setPage} />}
    </div>
  );
}

function Landing({ setPage }) {
  const [players, setPlayers] = useState(DEFAULT_PLAYERS);
  const [numPersons, setNumPersons] = useState(DEFAULT_NUM_PERSONS);
  const [questions, setQuestions] = useState(DEFAULT_QUESTIONS);
  const [personList, setPersonList] = useState([]); //TODO: Set Default Person List

  useEffect(() => {
    const players = localStorage.getItem('players');
    const numPersons = localStorage.getItem('numPersons');
    const questions = localStorage.getItem('questions');
    const personList = localStorage.getItem('personList');

    if (players) {
      setPlayers(parseInt(players));
    }

    if (numPersons) {
      setQuestions(parseInt(numPersons));
    }

    if (questions) {
      setQuestions(parseInt(questions));
    }

    if (personList) {
      setPersonList(JSON.parse(personList));
    }

    console.log('players', players);


  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Click Below to Start Guess Who!!!!!!!
        </p>
        <a className="App-button" onClick = {() => setPage('settings')}>
          Start
        </a>
      </header>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/guess-who" element={<GuessWho />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
