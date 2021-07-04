import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Form } from 'react-bootstrap';
//import './component.css';

let Signup=()=>{


    let [user, setUser] = useState({
        email:"", mobile: "", password: ""
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
        let {email,mobile,password} = user;

        let res = await fetch("http://localhost:3001/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,mobile,password
            })
        });
 
        let newdata = await res.status;
        console.log(newdata)
        if (newdata=== 201) {
            window.alert("Registration sucessful");
        }
        if(newdata===421 ){  
             
            window.alert("Email already exist");
        }
        else{
            window.alert("Registration UnSucessful");
        }
   }
    return (
        <div className="col-md-6">
            <h1>Register Here</h1><br></br><br></br>
            <div>
                <form method="POST">

                    Email<br /><input type="text" placeholder="Enter email" name="email" value={user.email} onChange={handleInput} /><br /><br />
                    Mobile<br /><input type="text" placeholder="Enter Mobile" name="mobile" value={user.mobile} onChange={handleInput} /><br /><br />
                    Password<br /><input type="password" placeholder="Enter Password" name="password" value={user.password} onChange={handleInput} />

                    <br /><br />

                    <Button variant="primary" type="submit" onClick={userData}>
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    )
}


export default Signup;