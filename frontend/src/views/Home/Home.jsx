import React, { useState, useEffect } from 'react';
import FileCard from '../../components/FileCard/FileCard';
import FileUpload from '../../components/FileUpload/FileUpload'
import { getUserFiles, logout } from '../../data';
import './Home.scss';

/**
 * Main component that includes everything related to file management
 */
const Home = () => {
    const [userFiles, setUserFiles] = useState([]);
    const username = localStorage.getItem('username')

    useEffect(() => {
        getUserFiles().then((files) => {
            if (files && files.length > 0) {
                setUserFiles([...files]);
            }
        })
    }, [])

    return (
        <div className="Home">
            <div className="logo-container"><img src="/icons/logo.svg" alt="instaShare" /></div>
            <div className="user-container">
                <div className="username">{username}</div>
                <div className="logout"><button className="btn btn-secondary logout" onClick={() => logout()} >LogOut</button></div>
            </div>
            <div className="home-container">
                {userFiles.map((file, k) => (
                    <FileCard key={k} file={file} setUserFiles={setUserFiles} />
                ))}
                {!userFiles && <p>There are no uploaded files in your profile yet.</p>}
                <FileUpload setUserFiles={setUserFiles} />
            </div>
        </div>
    )
}

export default Home;