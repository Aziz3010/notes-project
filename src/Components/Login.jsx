import React,{useState} from 'react';
import axios from "axios";

function Login(props) {
    const [error,setError] = useState("");
    const [waiting,setWaiting] = useState(false);
    const [user,setUser] = useState({
        email:"",
        password:""
    });


    function getInpValues({target}){
        setUser({...user,[target.name]:target.value})
    }

    async function sendData(e){
        e.preventDefault();
        setWaiting(true);
        let {data} = await axios.post("https://route-egypt-api.herokuapp.com/signin",user);
        if(data.message === "success"){
            localStorage.setItem("token",data.token);
            props.history.replace("/Home");
            setWaiting(false);
        } else {
            setError(data.message);
            setWaiting(false);
        }
    }

    return (
        <>
    <div className="container my-5 py-5">
        <div className="col-md-5 m-auto text-center">
            <form onSubmit={sendData} action="/handleSignin" method="POST">
                <div className="form-group">
                    <input onChange={getInpValues} placeholder="Enter email" name="email" type="email" className="form-control" />
                </div>
                <div className="form-group">
                    <input onChange={getInpValues} placeholder="confirm Password" name="password" type="password" className="form-control" />
                </div>
                {error && <p className="alert alert-danger py-0">{error}</p> }
                <button type="submit" className="btn btn-info w-100">{waiting?'Waiting...':'SignIn'}</button>
            </form>
        </div>
    </div>
        </>
    )
}

export default Login
