import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext";


const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({title:"", description:"", tag:""})
    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title:"", description:"", tag:""})
        props.showAlert("Added successfully","success");
    }
    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div className="container my-3">
        <h2>Add a note</h2>
        <form>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" aria-describedby="emailHelp"  value={note.title} name="title" onChange={onChange}/>
                <div id="emailHelp" className ="form-text"></div>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" className="form-control" id="description" value={note.description} name="description" onChange={onChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input type="text" className="form-control" id="tag" value={note.tag} name="tag" onChange={onChange}/>
            </div>
            <button type="submit" className="btn btn-primary" disabled={note.title.length<5 || note.description.length<5}  onClick={handleClick}>Add Note</button>
        </form>
    </div>
    )
}

export default AddNote
