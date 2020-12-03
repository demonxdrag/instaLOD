import React, { useState, useEffect } from 'react';
import { uploadFile } from '../../data';
import './FileCard.scss';

const FileCard = ({ file, setUserFiles }) => {
    return (
        <div className="FileCard">
            <div className="file-icon">
                <img src={`/icons/filetype/${file.filetype}.svg`} alt={file.filetype} />
            </div>
            <div className="file-data">
                <div className="file-name">{file.name}</div>
                <div className="file-type">Type: {file.filetype}</div>
                <div className="file-size">Size: {file.size}</div>
            </div>
            <div className="file-controls">
                <div className="file-save">Save</div>
                <div className="file-delete">Delete</div>
                <div className="file-download">Download</div>
                <div className="file-download-compressed">ZIP</div>
            </div>
        </div>
    )
}
export default FileCard;