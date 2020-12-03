import React, { useState, useEffect } from 'react';
import { uploadFile } from '../../data';
import './FileUpload.scss';

const FileUpload = ({ key, setUserFiles }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const uploadHandler = async () => {
        try {
            let fileToUpload = new FormData();
            fileToUpload.append(selectedFile.name, selectedFile)
            let response = await uploadFile(fileToUpload);
            setUserFiles((userFiles) => [...userFiles, response[0]])
            setSelectedFile(null);
        } catch (err) {
            setErrorMsg(err.message);
        }
    }

    return (
        <div className="FileUpload">
            <label htmlFor="fileUpload">
                <div className="upload-container">
                    <img className="upload-image" src="/icons/upload.svg" alt="upload" />
                    <div className="upload-title">{!selectedFile ? 'Select a file to upload' : selectedFile.name}</div>
                    {!!selectedFile &&
                        <button className="btn btn-primary" onClick={() => uploadHandler()}>Upload File</button>
                    }
                    <div className="error-message">{errorMsg}</div>
                </div>
            </label>
            <input type="file" className="file" id="fileUpload" onChange={e => setSelectedFile(e.target.files[0])} />
        </div>
    )
}
export default FileUpload;