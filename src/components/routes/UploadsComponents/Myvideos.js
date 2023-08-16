// src/components/routes/UploadsComponents/Myvideos.js
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import UploadModal from './Uploads';
import "./Myvideos.css";
import { useEffect } from 'react';

const Myvideos = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUploadClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

let [section1, setSection1] = useState([]);
let [section2, setSection2] = useState("");



useEffect(() => {
  const jwtToken = localStorage.getItem("jwtToken");
  const fetchOptions = {
    method: "GET",
    headers: jwtToken ? { 'Authorization': `Bearer ${jwtToken}` } : {}
  };
  fetch("https://netflix-clone-backend-4v3y.onrender.com/getVideos", fetchOptions)
    .then(response => response.json())
    .then(data => {
      setSection1(data.data);
      setSection2(data.data[0]);
       
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
}, []);



    
      function addSection2(posts){
      setSection2(posts)
      }


      async function handleDelete(id) {
        const confirmed = window.confirm("Are you sure you want to delete this video?");
      
        if (confirmed) {
          const jwtToken = localStorage.getItem("jwtToken");
          console.log(id + "sss");
          
          try {
            const response = await fetch("https://netflix-clone-backend-4v3y.onrender.com/deleteVideo", {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
              },
              body: JSON.stringify({ id })
            });
      
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
      
            const data = await response.json();
            console.log("post created ", data);
            window.location.href = "/Myvideos";
          } catch (error) {
            console.log("Error:", error);
          }
        }
      }

//sign out implimentation
  function handleSignOut() {
    localStorage.removeItem("jwtToken")
    window.location.href = "/login";
  }


  const handleFormUpdate = (event) => {
    const { id, value } = event.target;
    setSection2((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  async function handleUpdatesave(e) {
    e.preventDefault();
    const jwtToken = localStorage.getItem("jwtToken");
    
    try {
      const response = await fetch("https://netflix-clone-backend-4v3y.onrender.com/update", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(section2),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("post created ", data);
      window.location.href = "/Myvideos";
    } catch (error) {
      console.log("Error:", error);
    }
  }


  return (
    <div>


    <header id="Home_Header">
          <h3 id="tuner">Tuner</h3>

          <section id="search">
          <input type="text" id="search"  placeholder="search" name="search" ></input>
          </section>

         <nav id="nav">
             <div id="nav_div">
             <Link id="nav_myvideos" to="/Myvideos" t>Myvideos</Link>
             <Link id="nav_login" onClick={handleUploadClick}>Upload</Link>
             <Link id='nav_register' onClick={handleSignOut}>Sign Out</Link>
             </div>
         </nav>

    </header>


    <main id='myvideos_main'>
  <div id='myvideos_main_div'>
    {section1.length > 0 ? (
      <>
        <section id="myvideos_section1">
          <h4 id='myVideosHeading'>My Videos</h4>
          {section1.map((post, index) => (
            <video id='videossection1' key={index} onClick={() => addSection2(post)} controls>
              <source src={`https://netflix-clone-backend-4v3y.onrender.com/uploads/${post.filePath}`} />
              Your browser does not support the video tag.
            </video>
          ))}
        </section>

        <section id='myvideos_section2'>
          {section2 && (
            <>
              <img id='section2Image' src={`https://netflix-clone-backend-4v3y.onrender.com/uploads/${section2.thumbnailPath}`} alt='thumbnail not available'></img>
              
             <form onSubmit={handleUpdatesave}>
             <label id='namelabel' htmlFor='name'>Name</label>
             <input type='text' id='name' value={section2.name} onChange={handleFormUpdate}></input>

             <label id="descriptionlabel" htmlFor='description' >description</label>
             <input type='text' id='description' value={section2.description} onChange={handleFormUpdate}></input>
          
         
              <section id='labelsection'>
              <label id='categorylabel' htmlFor='category'>category</label>
              <select id='category' value={section2.category} onChange={handleFormUpdate}>
              <option>comedy</option>
              <option>action</option>
              </select>
              
              <label id='visibilitylabel' htmlFor='visibility'>visibility</label>
            <select id='visibility' value={section2.visibility} onChange={handleFormUpdate}>
              <option>private</option>
              <option>public</option>
            </select>

              <label id='otherlabel' htmlFor='other'>other</label>
              <select id='other' value={section2.other} onChange={handleFormUpdate}>
              <option >other</option>
              </select>
             
          </section>

            <div id='updateButtonDiv'> <button id='updateSave' type='submit'>Save</button> </div>
             </form>

              <button id='deleteVideoButton' onClick={() => handleDelete(section2._id)}>delete</button>
            </>
          )}
        </section>
      </>
    ) : (
      <div id='noVideosAvailable'>No videos available.</div>
    )}
    <UploadModal isOpen={isModalOpen} onClose={handleCloseModal} />
  </div>
</main>

      
    </div>
  );
};

export default Myvideos;