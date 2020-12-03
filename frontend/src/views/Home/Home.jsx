import React, { useState, useEffect } from 'react';
import FileCard from '../../components/FileCard/FileCard';
import FileUpload from '../../components/FileUpload/FileUpload'
import { getUserFiles } from '../../data';
import './Home.scss';

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
            <div className="home-container">
                <h1>Hello {username}!</h1>
                {/* User card? */}
                {/* List of uploads */}
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