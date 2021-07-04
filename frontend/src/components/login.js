import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Form } from 'react-bootstrap';
//import './component.css';
import { Link } from 'react-router-dom'
//import userprofile from '/userprofile'
import Update from "./userprofile"
let Login=()=>{


    let [user, setUser] = useState({
        email:"",mobile:"", password: ""
    });

    let name, value;

    let handleInput = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value });
    }
   
    var userData = async (e) => {
        e.preventDefault();
        let {email,password} = user;

        let res = await fetch("http://localhost:3001/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,password
            })
        });
 
        let newdata = await res.status;
        let p=await res.json();
        console.log(newdata)
        console.log(p)
        if (newdata === 423 ) {
            window.alert("wrong password");
        }  if(newdata===500) { 
            //res.send(p.email)
           //<Update/>
            window.alert("Login Sucessful");
        }
        else{
            window.alert("user not found");
        }
   }
    return (
        <div className="col-md-6">
            <h1>Login Here</h1><br></br><br></br>
            <div>
                <form method="POST">

                    Email<br /><input type="text" placeholder="Enter email" name="email" value={user.email} onChange={handleInput} /><br /><br />


                    {/* Mobile<br /><input type="text" placeholder="Enter Mobile" name="mobile" value={user.mobile} onChange={handleInput} /><br /><br /> */}
                    Password<br /><input type="password" placeholder="Enter Password" name="password" value={user.password} onChange={handleInput} />

                    <br />
                    <br />
                    <br />
                    <Button variant="primary" type="submit" onClick={userData}>
                        Submit
                    </Button>
                    
                </form>
                
                
            </div>
        </div>
        
    )

   
}


export default Login;