import React from 'react';
import { Route , Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode'

function ProtectedRoutes(props) {

    let token = localStorage.getItem("token");
    
    try{
        jwt_decode(token);
    } catch (error) {
        localStorage.clear();
        return <Redirect to="/Login" />
    }



    if(token){
        return <Route path={props.path} component={props.component} />
    }


}

export default ProtectedRoutes
