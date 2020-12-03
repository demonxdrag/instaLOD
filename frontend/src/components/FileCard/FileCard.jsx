import React, { useState, useEffect } from 'react';
import { updateFile, uploadFile } from '../../data';
import './FileCard.scss';

const FileCard = ({ file, setUserFiles }) => {
    const [editMode, setEditMode] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);

    const [fileName, setFileName] = useState('');
    const [fileType, setFileType] = useState('');
    const [fileSize, setFileSize] = useState('');

    useEffect(() => {
        setFileName(file.name);
        setFileType(file.filetype);
        setFileSize(file.size);
    }, [])

    const humanFileSize = (size) => {
        var i = Math.floor(Math.log(size) / Math.log(1024));
        return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
    };

    const editHandler = async () => {
        try {
            if (editMode) {
                let response = await updateFile({
                    name: fileName,
                    filetype: fileType,
                    size: fileSize
                }, file.file_id)

                // setFileName(file.name);
                // setFileType(file.filetype);
                // setFileSize(file.size);

                console.log(response);
            }
            setEditMode(!editMode);
        } catch (err) {
            console.error(err.message)
        }
    }

    const deleteHandler = () => {
        // DELETE
        setDeleteMode(false);
    }

    return (
        <div className="FileCard">
            <div className="file-icon">
                <img src={`/icons/filetype/${file.filetype}.svg`} alt={file.filetype} />
            </div>
            <div className="file-data">
                <div className="file-name"><input type="text" onChange={(e) => setFileName(e.target.value)} value={fileName} disabled={!editMode} /></div>
                <div className="file-type">Type: <input type="text" onChange={(e) => setFileType(e.target.value)} value={fileType} disabled={!editMode} /></div>
                <div className="file-size">Size: <input type="text" onChange={(e) => setFileSize(e.target.value)} value={editMode ? fileSize : humanFileSize(fileSize)} disabled={!editMode} /></div>
            </div>
            <div className="file-controls">
                <div className="file-save" onClick={() => editHandler()}>{editMode ? 'Save' : 'Edit'}</div>
                <div className="file-delete" onClick={() => setDeleteMode(true)}>Delete</div>
                <div className="file-download">Download</div>
                <div className="file-download-compressed">ZIP</div>
            </div>
            {deleteMode && <div className="delete-prompt">
                <p>Are you sure you want to delete this file?</p>
                <button className="btn btn-error" onClick={() => deleteHandler()}>Delete</button>
                <button className="btn btn-disabled" onClick={() => setDeleteMode(false)}>Cancel</button>
            </div>}
        </div>
    )
}
export default FileCard;