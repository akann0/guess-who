import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import SettingsPage from './Settings.js';
import StartPage from './Start.js';

const DEFAULT_PLAYERS = 1;
const DEFAULT_NUM_PERSONS = 24;
const DEFAULT_QUESTIONS = 10;

function Landing() {
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
      setPlayers(parseInt(players, 2));
    }

    if (numPersons) {
      setQuestions(parseInt(numPersons, 24));
    }

    if (questions) {
      setQuestions(parseInt(questions, 10));
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
        <a className="App-button" href="/guess-who/settings">
          Settings
        </a>
        <a className="App-button" href="/guess-who/start">
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
        <Route path="/guess-who" element={<Landing />} />
        <Route path="/guess-who/settings" element={<SettingsPage />} />
        <Route path="/guess-who/start" element={<StartPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
