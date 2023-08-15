// src/components/routes/Register.js

import React, {useState } from "react";
import './Register.css';
import Validation from "./Validation";
import { useNavigate, Link  } from "react-router-dom";
import axios from "axios";

export default function Register() {
    
    const Navigate = useNavigate();
    const [imagesrc, setImagesrc] = useState(null);
    const [image, setImage] = useState(null);
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [profession,setProfession] = useState("");
    const [password,setPassword] = useState("");
    const [confirm,setConfirm] = useState("");
    const [error,SetError] = useState({});
    

    const handleSignIn = () => {
        Navigate("/Login")
    }
    const handleSubmit = (e) => {

        e.preventDefault();
        SetError(Validation(name, email, phone, profession, password, confirm))
        // console.log(error);
        const formdata = new FormData();
        formdata.append("image", image);
        formdata.append("name", name);
        formdata.append("email", email);
        formdata.append("phone", phone);
        formdata.append("profession", profession);
        formdata.append("password", password);
         console.log(formdata);
            // console.log(error);
           axios.post("https://netflix-clone-backend-4v3y.onrender.com/registering",formdata,
            {
                headers: { 'Content-Type': 'application/json'},
            }
            ).then(res=>{
                console.log(res)
                window.location.href = "/login";
            })
            .catch(error=>{
                console.log(error);
            })
       
    }


    return (
        <div id="Register_Container" >

            <section id="Register_left_Section">

                <h1>Tuner</h1>
                <h2>Enjoy Multiple videos <br></br>at one place</h2>
                {/* <h4>signIn</h4> */}
                {/* <div id="left_div">
                </div> */}
                <Link to="/login" className="signin-link">Sign In</Link>
            </section>

            <section id="Register_right_Section">
                <form id="form_container" onSubmit={handleSubmit} encType="multipart/form-data">

                    <h1 id="fs_lgr">Register</h1>
                    <h4>Register to continue access page</h4>

                    <label htmlFor="image" id="label_image">
                        <input type="file"
                            id="image"
                            accept="image/*"
                            name="image"
                            onChange={(e) => {
                                setImage(e.target.files[0]);
                                setImagesrc(URL.createObjectURL(e.target.files[0]))
                            }}
                            value={""} />
                        <img src={imagesrc} alt="" id="Image_box" />
                    </label>

                    <label htmlFor="name">
                    {error.name && <p style={{ color: "red",margin:"0px" }}>{error.name}</p>}
                        <input type="text" className="Register_input" id="name" name="name" placeholder="name" onChange={(e) => { setName(e.target.value) }} value={name} />
                    </label>

                    <label htmlFor="email">
                    {error.email && <p style={{ color: "red",margin:"0px" }}>{error.email}</p>}
                        <input type="text" className="Register_input" id="email" name="email" placeholder="email" onChange={(e) => { setEmail(e.target.value) }} value={email} />
                    </label>

                    <label htmlFor="phone">
                    {error.phone && <p style={{ color: "red",margin:"0px" }}>{error.phone}</p>}
                        <input type="text" className="Register_input" id="phone" name="phone" placeholder="phone" onChange={(e) => setPhone(e.target.value)} value={phone} />
                    </label>

                    <label htmlFor="profession">
                    {error.profession && <p style={{ color: "red",margin:"0px" }}>{error.profession}</p>}
                        <input type="text" className="Register_input" id="profession" name="profession" placeholder="profession" onChange={(e) => { setProfession(e.target.value) }} value={profession} />
                    </label>

                    <label htmlFor="password">
                    {error.password && <p style={{ color: "red",margin:"0px",fontSize:"14px" }}>{error.password}</p>}
                        <input type="password" className="Register_input" id="password" name="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} value={password} />

                    </label>

                    <label htmlFor="Confirm-password">
                    {error.confirm && <p style={{ color: "red",margin:"0px",fontSize:"16px" }}>{error.confirm}</p>}
                        <input type="password" className="Register_input" id="Confirm-password" name="password" placeholder="Confirm-password" onChange={(e) => { setConfirm(e.target.value) }} value={confirm} />
                    </label>

                    {(!error.confirm)?<button type="submit" >Register</button>:<button type="submit" >Register</button>}

                    
                </form>
            </section>

        </div>
    )

}