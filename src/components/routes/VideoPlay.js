import React, { useEffect } from 'react';

const VideoPlay = ({ videoPath,id,onCancel }) => {

    useEffect(() => {
        incrementViewCount();
    }, []);

    const incrementViewCount = () => {
        fetch(`https://netflix-clone-backend-4v3y.onrender.com/incrementViewCount/${id}`, {
            method: 'PUT',
        })
        .catch(error => {
            console.error('Error incrementing view count:', error);
        });

    }
// console.log(id)
    return (
        <div id='videoPlayDiv'>
            <button id='cancelButton' onClick={onCancel}>cancel</button>
            <video  id='videoPlay' controls>
                <source src={`https://netflix-clone-backend-4v3y.onrender.com/uploads/${videoPath}`} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            
        </div>
    );
};

export default VideoPlay;