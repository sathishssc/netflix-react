// src/components/routes/UploadsComponents/Uploads.js

import React, { useState } from 'react';
import "./Uploads.css"
import cancel from "../../images/icons8-cancel-50.png"
import cloud from "../../images/—Pngtree—cloud upload_4450752.png"

const Uploads = ({ isOpen, onClose }) => {


  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'comedy',
    visibility: 'private',
    other: 'other',
    file: null
  });
  const [uploading, setUploading] = useState(false);
  const handleFormChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      file: file
    }));
  };

  const formDataToSend = new FormData();
  formDataToSend.append('name', formData.name);
  formDataToSend.append('description', formData.description);
  formDataToSend.append('category', formData.category);
  formDataToSend.append('visibility', formData.visibility);
  formDataToSend.append('other', formData.other);
  formDataToSend.append('file', formData.file);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jwtToken = localStorage.getItem("jwtToken");
  
    try {
      setUploading(true);
      const response = await fetch("https://netflix-clone-backend-4v3y.onrender.com/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        body: formDataToSend
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("post created ", data);
  
        window.location.href = "/Myvideos";
        
      } else {
        console.log("Error:", response.statusText);
      }
    } catch (error) {
      console.log("Error:", error);
    }finally {
      setUploading(false);
    }
  }
  

  if (!isOpen) return null;

  return (
    
      <div className="upload_main1">
        <div id='uploads'>
        <section id='cancel_image' onClick={onClose}><img src={cancel} alt='not available'></img></section>
        <h4 id='uploads_heading1'>upload new video</h4>
        
         <form onSubmit={handleSubmit} encType="multipart/form-data" >
          <div id='form_div'>
          <div id='upload_form'>
          <input id='file' type='file' onChange={handleFileChange} ></input>
          <label id="label" htmlFor='file'>
            <img id="cloud_image" src={cloud} alt='not available'></img>
            <h4 id='uploads_heading2'>Drag and drop to upload</h4>
            <h6 id='uploads_heading3'>or browse to choose a file</h6>
          </label>
          </div>
          </div>

          <label id='namelabel' htmlFor='name'>Name</label>
          <input type='text' id='name' value={formData.name} onChange={handleFormChange}></input>

          <label id="descriptionlabel" htmlFor='description' >description</label>
          <input type='text' id='description' value={formData.description} onChange={handleFormChange}></input>
          
         
          <section id='labelsection'>
            <label id='categorylabel' htmlFor='category'>category</label>
            <select id='category' value={formData.category} onChange={handleFormChange}>
              <option>comedy</option>
              <option>action</option>
            </select>
              
            <label id='visibilitylabel' htmlFor='visibility'>visibility</label>
            <select id='visibility' value={formData.visibility} onChange={handleFormChange}>
              <option>private</option>
              <option>public</option>
            </select>

              <label id='otherlabel' htmlFor='other'>other</label>
              <select id='other' value={formData.other} onChange={handleFormChange}>
              <option >other</option>
              </select>
             
          </section>

        <div id='buttondiv'><button id='buttonsubmit' type='submit' disabled={uploading}>
              {uploading ? "Uploading..." : "Save"}
            </button></div>
        
           
        </form>
         
        

        </div>
      </div>
  );
};

export default Uploads;