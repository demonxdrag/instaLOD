import React, { useState, useRef, useEffect } from 'react';
import FileUpload from '../../components/FileUpload/FileUpload'
import './Home.scss';

const Home = () => {
    return (
        <div className="Home">
            {/* User card? */}
            {/* List of uploads */}
            <FileUpload/>
        </div>
    )
}

export default Home;