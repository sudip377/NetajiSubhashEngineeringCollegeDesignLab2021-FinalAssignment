import React, { useState } from 'react'
const Update=()=>{
   /* const [upemail, setupemail] = useState("");
    const [updatemobile, setmob] = useState(0);
    const [updatpass, setpass] = useState("");
    const [img,setImg]= useState("");
    const [isImgUploaded, setisImgUploaded] = useState(false);
    const [imgUrl,setImgUrl] = useState("");*/
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
        let {email,mobile,password} = user;

        let res = await fetch("http://localhost:3001/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,mobile,password
                        })
        });
        let newdata = await res.status;
        let p=await res.json();
        console.log(newdata)
        console.log(p)
        if (newdata === 423 ) {
            window.alert("error");
        }  if(newdata===500) { 
            //res.send(p.email)
           
            window.alert("update Sucessful");
        }
       
   
    }

    return (
        <>
            <span>Password : 
        <input type="text"  name="password" value={user.password}  /><br /><br /></span>
            <span>Mobile:
            <input type="number" 
            value={user.mobile}
            onChange={handleInput}/></span>
            <button onClick ={userData}>Update</button>
            <br />
            
            
            </>

    )
}
export default Update;