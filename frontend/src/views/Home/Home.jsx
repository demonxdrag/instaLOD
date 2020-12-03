import React, { useState, useRef, useEffect } from 'react';
import FileCard from '../../components/FileCard/FileCard';
import FileUpload from '../../components/FileUpload/FileUpload'
import { getUserFiles } from '../../data';
import './Home.scss';

const Home = () => {
    const [userFiles, setUserFiles] = useState([]);

    useEffect(() => {
        getUserFiles().then((files) => { console.log(files); setUserFiles([...files]) })
    }, [])

    return (
        <div className="Home">
            {/* User card? */}
            {/* List of uploads */}
            {userFiles.map((file, k) => (
                <FileCard key={k} file={file} setUserFiles={setUserFiles}/>
            ))}
            <FileUpload setUserFiles={setUserFiles} />
        </div>
    )
}

export default Home;