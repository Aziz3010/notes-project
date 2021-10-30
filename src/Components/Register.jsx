import React,{useState} from 'react';
import axios from "axios";

function Register(props) {
    
    const [error,setError] = useState("");
    const [waiting,setWaiting] = useState(false);
    
    const [user,setUser] = useState({
        first_name:"",
        last_name:"",
        email:"",
        password:""
    });


    function getInpValues({target}){
        setUser({...user,[target.name]:target.value})
    }

    console.log(user);

    async function sendData(e){
        e.preventDefault();
        setWaiting(true);
        let {data} = await axios.post("https://route-egypt-api.herokuapp.com/signup",user);
        if(data.message === "success"){
            props.history.replace("/Login");
            setWaiting(false);
        } else {
            setError("email already registered");
            setWaiting(false);
        }
    }
    
    return (
        <>
            <div className="container my-5 py-5">
                <div className="col-md-5 m-auto text-center">
                    <form onSubmit={sendData} >
                        <div className="form-group">
                            <input onChange={getInpValues} placeholder="Enter your name" name="first_name" type="text" className=" form-control" />
                        </div>
                        <div className="form-group">
                            <input onChange={getInpValues} placeholder="Enter your name" name="last_name" type="text" className=" form-control" />
                        </div>
                        <div className="form-group">
                            <input onChange={getInpValues} placeholder="Enter email" type="email" name="email" className="form-control" />
                        </div>
                        <div className="form-group">
                            <input onChange={getInpValues} placeholder="Enter you password" type="password" name="password" className="form-control" />
                        </div>
                        {error && <p className="alert alert-danger py-0">{error}</p> }
                        <button type="submit" className="btn btn-info w-100">{waiting?'Waiting...':'SignUp'}</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register
