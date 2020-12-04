import React, { useState } from 'react';
import { uploadFile } from '../../data';
import './FileUpload.scss';

/**
 * Component that uploads a file
 * @param {Object} props
 * @property {Function} setUserFiles Function to update the total list of files
 */
const FileUpload = ({ setUserFiles }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    /**
     * Function that uploads the file 
     */
    const uploadHandler = async () => {
        try {
            let composableName = selectedFile.name.split('.')
            let composedFile = {
                filetype: composableName.pop(),
                name: composableName.join('.'),
                size: selectedFile.size,
                downloadable: false,
                zip: false,
            }
            let fileToUpload = new FormData();
            fileToUpload.append(selectedFile.name, selectedFile)
            setUserFiles((userFiles) => [...userFiles, composedFile])
            uploadFile(fileToUpload).then((response) => {
                console.log({response})
                setUserFiles((userFiles) => [...userFiles.map((it) => {
                    if (it.name === response.name) {
                        return { ...response, downloadable: true };
                    }
                    return it;
                })]);
            }).catch((err) => {
                throw new Error(err.message);
            })
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