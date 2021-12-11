import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

function Home() {



    let baseURL = "https://route-egypt-api.herokuapp.com/";

    let token = localStorage.getItem('token');
    var { _id } = jwt_decode(token)

    const [allNotes, setAllNotes] = useState([]);
    const [noNotes, setNoNotes] = useState("");


    useEffect(() => {
        getAllNotes();
    }, [])


    async function getAllNotes() {
        var { data } = await axios.get(baseURL + 'getUserNotes', {
            headers: {
                token,
                userID: _id
            }
        })

        if (data.message === 'no notes found') {
            setNoNotes("You Don't Have A Notes");
        } else {
            setAllNotes(data.Notes);
        }

    }

    // ////////////////

    const [note, setNote] = useState({
        title: "",
        desc: "",
        userID: `${_id}`,
        token: `${token}`
    })


    function getUserNote({ target }) {
        setNote({ ...note, [target.name]: target.value })
    }

    async function addNote(e) {
        e.preventDefault();
        let { data } = await axios.post(baseURL + "addNote", note);
        getAllNotes();
    }

    // /////////////

    return (
        <>
            {noNotes && <p className="alert alert-danger text-center py-1 w-50 m-auto">{noNotes}</p>}

            {/* btn */}
            <div className="container my-5">
                <div className="col-md-12 m-auto text-right">
                    <a className="add p-2 btn" data-toggle="modal" data-target="#exampleModal">
                        <i className="fas fa-plus-circle"></i> Add
                        New</a>
                </div>
            </div>

            {/* Modal */}
            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <form action="/addNote" method="POST">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <input onChange={getUserNote} placeholder="Type Title" name="title" className="form-control" type="text" />
                                <textarea onChange={getUserNote} className="form-control my-2" placeholder="Type your note" name="desc" id="" cols="30" rows="10"></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button onClick={addNote} type="submit" className="btn btn-info"><i className="fas fa-plus-circle"></i> Add Note</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            {/* Notes */}
            <div className="container">
                <div className="row">
                    {allNotes.map((value, index) => {
                        return (
                            <div key={index} className="col-md-4 my-4">

                                <div className="note p-4">
                                    <h3 className="float-left">{value.title}</h3>
                                    {/* <a href="/"><i className="fas fa-edit float-right edit"></i></a> */}
                                    {/* <a href="/"> <i className="fas fa-trash-alt float-right px-3 del"></i></a> */}
                                    <span className="clearfix"></span>
                                    <p>{value.desc}</p>
                                </div>

                            </div>
                        )
                    })}
                </div>
            </div>

        </>
    )
}

export default Home