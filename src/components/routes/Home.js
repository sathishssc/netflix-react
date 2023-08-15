
// src/components/routes/Home.js

import { Link } from "react-router-dom";
// import godzilla from "../images/godzilla.jpg"
import "./Home.css"
import { useEffect, useRef, useState } from "react";
import VideoPlay from "./VideoPlay";
import Loading from "./loading/Loading";
// import Searchbar from "./Search_Video/Searchbar";
// import VideoPlayer from "./Search_Video/VideoPlayer";

export default function Home(){
    let [flag, setFlag] = useState(false);
    let [publicVides, setPublicVideos] = useState([]);
    let [searchData ,setSearchData] = useState('');
    // let [userData, setUserData] = useState('');
    const [selectedVideoIndex, setSelectedVideoIndex] = useState(-1);
    const [viewMoreFlag, setViewMoreFlag] = useState(true)
    let [numVideosToShow, setNumVideosToShow] = useState(4);
    let [loadingFlag, setLoadingFlag] = useState(true);

    const handleViewMore = () => {
      setViewMoreFlag(false)
      setNumVideosToShow(publicVides.length);
    };
  
    const handleViewLess = () => {
      setViewMoreFlag(true)
      setNumVideosToShow(4);
    };
    const handleImageClick = (index) => {
        setSelectedVideoIndex(index);
    };
    const handleVideoCancel = (index) => {
      setSelectedVideoIndex(-1);
  };


    const jwtToken = localStorage.getItem("jwtToken");
    const timeoutRef = useRef();
    useEffect(() => {
        
      
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      
        timeoutRef.current = setTimeout(() => {
          const fetchOptions = {
            method: "GET",
          };
      
          const fetchUrl = flag && searchData.trim() !== ""
            ? `https://netflix-clone-backend-4v3y.onrender.com/getPublicVideosSearch/${searchData}`
            : "https://netflix-clone-backend-4v3y.onrender.com/getPublicVideos";
      
          fetch(fetchUrl, fetchOptions)
            .then(response => response.json())
            .then(data => {
              setPublicVideos(data.data);
              setLoadingFlag(false)
            })
            .catch(error => {
              console.error("Error fetching data:", error);
              setLoadingFlag(false)
            });
        }, 1000);
      
        return () => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
        };
      }, [flag, searchData]);


      // useEffect(() =>{
      //   const jwtToken = localStorage.getItem("jwtToken");
      //   fetch("http://localhost:4000/getUserData", {
      //     method: "GET",
      //     headers: {
      //       Authorization: `Bearer ${jwtToken}`,
      //       "Content-Type": "application/json"
      //     },
      //   }).then(response => response.json())
      //   .then(data => setUserData(data.data))
      //   .catch(err => console.log(err))
      // },[]);


      function handleSignOut() {
        localStorage.removeItem("jwtToken")
        window.location.href = "/login";
      }


      function handleSearchChange(e){
        
        e.preventDefault();
        setSearchData(e.target.value);
      }
      const imagePath = publicVides.length > 0 ? publicVides[0].thumbnailPath : '';
      const imageName = publicVides.length > 0 ? publicVides[0].name : '';
      const userName = publicVides.length > 0 ? publicVides[0].userName : ''
      const viewCount = publicVides.length > 0 ? publicVides[0].viewCount : ''

    return (

      <div>{loadingFlag ?(<Loading></Loading>):( <div>

        <header id="Home_Header">
        <h3 id="tuner">Tuner</h3>
        
        <section id="search">
            <input type="text" id="search" value={searchData} onChange={handleSearchChange} onClick={() => setFlag(true)} placeholder="search" name="search" ></input>
            {/* <Searchbar/> */}
        </section>
        {jwtToken ?(<nav id="nav">
             <div id="nav_div">
             <Link id="nav_myvideos" to="/Myvideos" t>Myvideos</Link>
             {/* <Link id="nav_login" onClick={handleUploadClick}>Upload</Link> */}
             <Link id='nav_register' onClick={handleSignOut}>Sign Out</Link>
             </div>
         </nav>):(<nav id="nav">
        <div id="nav_div">
        <Link id="nav_login" to="/login">Login</Link> 
        <Link id="nav_register" to="/register">Register</Link>
        </div> </nav>) }
  
        </header>
         

        
        <main id="imageMainDiv">
        <img id="godzilla" src={`https://netflix-clone-backend-4v3y.onrender.com/uploads/${imagePath}`} alt="not available"></img>
        <h1 id="imageName">{imageName}</h1>
        {<div id="viewCountImage">{viewCount} views</div>}
        <h3 id="userNameImage"><div id="imageStructore"></div>{userName}</h3>
        {/* <h3>{userData ? userData[0].name : ''}</h3> */}
       
        {/* <button>view more</button> */}
        </main>
        {<div id="buttonsOfMoreAndLessDiv">{viewMoreFlag ? <button id="viewMoreButton" onClick={handleViewMore}>View More</button> : <button id="viewMoreButton" onClick={handleViewLess}>View Less</button>}</div>}
        
        
        <footer>
        <section id="myvideos_section">
      {/* {publicVides} */}
       <div id="publicVideoDiv">
      
       {publicVides.length > 0 ? (
        publicVides.slice(0, numVideosToShow).map((post, index) => (
          <div  id="imageDivHome" key={index}>
                        <img
                            id="imageHome"
                            src={`https://netflix-clone-backend-4v3y.onrender.com/uploads/${post.thumbnailPath}`}
                            alt="not available"
                            onClick={() => handleImageClick(index)}
                        />
                        {<div id="videoName">{post.name}</div>}
                        {<div id="videoUserName" >{post.userName}</div>}
                        {<div id="videoCount" style={{color:'red'}}>{post.viewCount} views</div>}
                        {selectedVideoIndex === index && (
                            <VideoPlay videoPath={post.filePath} id={post._id} onCancel={handleVideoCancel}/>
                        )}
                    </div>
          // <video id="publicVideos" key={index} controls>
          //   <source src={`http://localhost:4000/uploads/${post.filePath}`} />
          //   Your browser does not support the video tag.
          // </video>
  
        ))
      ) : (
        <div style={{color:'red'}}>no videos available</div>
      )}
        
        </div> 
      
    </section>
        </footer>
        

       </div>)}</div>
       

    )
 
}