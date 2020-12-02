import React, { useState, useRef, useEffect } from 'react';
import './Home.scss';

const Home = () => {
    return (
        <div className="Home">
            {/* User card? */}
            {/* List of uploads */}
            <p>There are no uploaded files in your profile yet.</p>
            <div className="upload-container">
                <img src="/icons/upload.svg" alt="upload" />
                <div className="upload-title">Upload a file</div>
            </div>
        </div>
    )
}

export default Home;