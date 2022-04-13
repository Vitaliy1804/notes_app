import { useEffect, useState } from "react";
import { nanoid } from 'nanoid';
import NotesList from "./components/NotesList";
import Search from "./components/Search";
import Header from './components/Header';

const App = () => {

  // let text = " "
  // let speech = new SpeechSynthesisUtterance()

  // function TextToSpeech() {
  //   speech.text = text
  //   speech.rate =0.5
  //   speech.volume =1
  //   speech.pitch =3
  //   speech.lang="ru-UA"
  //   window.speechSynthesis.speak(speech)
  // }
  // TextToSpeech()

  const [notes, setNotes] = useState([
    {
    id: nanoid(),
    text: "This is my first note!",
    date: "04/04/2022"
  },
  {
    id: nanoid(),
    text: "This is my second note!",
    date: "04/04/2022"
  },
  {
    id: nanoid(),
    text: "This is my third note!",
    date: "04/04/2022"
  },
  {
  id: nanoid(),
    text: "This is my fourth note!",
    date: "04/05/2022"
  },
])

const [searchText, setSearchText] = useState('')

const [darkMode, setDarkMode] = useState(false)

useEffect(() => {
  const savedNotes = JSON.parse(
    localStorage.getItem('react-notes-app-data'))
     
    if (savedNotes) {
      setNotes(savedNotes)
    }
}, [])

useEffect(() => {
  localStorage.setItem(
    'react-notes-app-data',
    JSON.stringify(notes)
  )
}, [notes])
 
const addNote = (text) => {
  const date = new Date();
  const newNote = {
    id: nanoid(),
    text: text,
    date: date.toLocaleString()
  }
  const newNotes = [...notes, newNote]
  setNotes(newNotes)
}

const deleteNote = (id) => {
  const newNotes = notes.filter((note)=> note.id !== id)
  setNotes(newNotes)
}

  return (
    <div className={`${darkMode && 'dark-mode'}`}>
      <div className="container">
    <Header handleToggleDarkMode={setDarkMode} />
    <Search handleSearchNote={setSearchText} />
    <NotesList 
        notes={notes.filter((note) => 
          note.text.toLowerCase().includes(searchText)
        )} 
        handleAddNote={addNote}
        handleDeleteNote={deleteNote}
    />
  </div>
    </div>
  )
}

export default App;