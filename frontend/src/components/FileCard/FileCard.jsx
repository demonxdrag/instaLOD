import React, { useState, useEffect } from 'react';
import { uploadFile } from '../../data';
import './FileCard.scss';

const FileCard = ({ file, setUserFiles }) => {
    const [editMode, setEditMode] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);

    const humanFileSize = (size) => {
        var i = Math.floor( Math.log(size) / Math.log(1024) );
        return ( size / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
    };

    const editHandler = () => {
        if (editMode) {
            // SAVE
        }
        setEditMode(!editMode);
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
                <div className="file-name"><input type="text" value={file.name} disabled={!editMode} /></div>
                <div className="file-type">Type: <input type="text" value={file.filetype} disabled={!editMode} /></div>
                <div className="file-size">Size: <input type="text" value={editMode ? file.size : humanFileSize(file.size)} disabled={!editMode} /></div>
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