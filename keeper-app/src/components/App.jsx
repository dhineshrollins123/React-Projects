import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Note from "./Note";
import CreateArea from "./CreateArea";
function App() {
   
    const [noteList,setNotesList] = useState([]);

    function addNotes(note){
        setNotesList((prevState) =>{
            return [
                ...prevState,
                note
            ]
        });

        console.log("add notes called....");
    }

    function deleteNote(id){
        setNotesList((prevState) =>{
            return prevState.filter((note,index)=>{
                return index !== id;
            });
        });
    }
	return (
		<div>
			<Header />
			<CreateArea onAdd={addNotes}/>
            {noteList.map((note,index) => (
                <Note key={index} id={index} onDelete={deleteNote} title={note.title} content={note.content} />
            
            ))}
			<Footer />
		</div>
	);
}

export default App;
