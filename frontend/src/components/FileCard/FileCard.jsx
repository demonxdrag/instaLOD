import React, { useState, useEffect } from 'react';
import { api_url, deleteFile, updateFile } from '../../data';
import './FileCard.scss';

/**
 * Component that interacts with an existing file
 * @param {Object} props
 * @property {Object} file File metadata
 * @property {Function} setUserFiles Function to update the total list of files
 */
const FileCard = ({ file, setUserFiles }) => {
    const [editMode, setEditMode] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);

    const [fileName, setFileName] = useState('');
    const [fileType, setFileType] = useState('');
    const [fileSize, setFileSize] = useState('');

    const [downloadMode, setDownloadMode] = useState(false);
    const [downloadZIPMode, setDownloadZIPMode] = useState(false);

    useEffect(() => {
        setFileName(file.name);
        setFileType(file.filetype);
        setFileSize(file.size);
        setDownloadMode(true)
        setDownloadZIPMode(file.zip)
        return () => {
            setFileName('');
            setFileType('');
            setFileSize('');
            setDownloadMode(false)
            setDownloadZIPMode(false)
        }
    }, [file])

    /**
     * Function that translate bytes into human readable strings
     * @param {Number} size size in bytes
     */
    const humanFileSize = (size) => {
        var i = Math.floor(Math.log(size) / Math.log(1024));
        return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
    };

    /**
     * Function that enables/disables editMode, if enabled, it updates the file
     */
    const editHandler = async () => {
        try {
            if (editMode) {
                await updateFile({
                    name: fileName,
                    filetype: fileType,
                    size: fileSize
                }, file.file_id)
            }
            setEditMode(!editMode);
        } catch (err) {
            console.error(err.message)
        }
    }

    /**
     * Function that deletes the file
     */
    const deleteHandler = async () => {
        try {
            await deleteFile(file.file_id);
            setUserFiles((userFiles) => userFiles.filter((f) => (f.file_id === file.file_id) ? false : true))
            setDeleteMode(false);
        } catch (err) {
            console.error(err.message);
        }
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
                <div className={`file-download ${!downloadMode && 'disabled'}`}><a href={`${api_url}uploads/${file.url}`} target="_blank" rel="noreferrer" download={`${file.name}`}>Download</a></div>
                <div className={`file-download-compressed ${!downloadZIPMode && 'disabled'}`}><a href={`${api_url}uploads/${file.url}.zip`} target="_blank" rel="noreferrer" download={`${file.name}`}>ZIP</a></div>
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