// src/components/routes/Validation.js

import React from 'react'

function Validation(name,email,phone,profession,password,confirm) {
    const Error = {};

    if(name.length<2){
        Error.name = "name is required"
    }
    if (!email) {
        Error.email = "Email is required";
      }
       else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) 
      {
        console.log('error');
        Error.email = "Invalid email address (example:-example007@Xmail.com)";
      }
      if (!phone) {
        Error.phone = "Phone number is required";
      } else if (!/^[0-9]{10}$/.test(phone)) {
        Error.phone = "Invalid phone number";
      }
      if(!profession){
        Error.profession = "Profession is required"
      }
      if (!password) {
        Error.password = "Password is required";
      }  else if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(password)) {
        Error.password = "Please enter a password with at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character";
      }
      if(confirm!== password){
        Error.confirm = "password are not matching"
      }
  return Error;
}

export default Validation

