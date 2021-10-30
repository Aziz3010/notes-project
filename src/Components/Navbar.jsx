import React from 'react'
import { Link , NavLink , useLocation } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

function Navbar() {

    let token = localStorage.getItem("token");
    if(token){
        var decoded = jwt_decode(token)
    }    

    let location = useLocation();

    function logIn(){
        localStorage.clear();
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/Home">Notes</Link>
                    
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    
                    <div className="collapse navbar-collapse" id="navbarNav">
                        {
                        location.pathname==='/Home'
                        ?
                        <ul className="navbar-nav ml-auto">
                            
                            <li className="nav-item">
                                <a className="nav-link">Welcome {decoded.first_name} ||</a>
                            </li>

                            <li className="nav-item">
                                <NavLink onClick={logIn} className="nav-link" to="/Login">Logout</NavLink>
                            </li>
                        </ul>
                        :
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/Register">Register</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/Login">Login</NavLink>
                            </li>
                        </ul>
                        }
                    </div>

                </div>
            </nav>
        </>
    )
}

export default Navbar
