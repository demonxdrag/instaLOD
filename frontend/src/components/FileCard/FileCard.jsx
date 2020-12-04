import React, { useState, useEffect } from 'react';
import { api_url, deleteFile, getZIPStatus, updateFile } from '../../data';
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
        console.log(file);
        setDownloadMode(file.downloadable === undefined || file.downloadable === true);
        setDownloadZIPMode(file.zip);
        return () => {
            setFileName('');
            setFileType('');
            setFileSize('');
            setDownloadMode(false)
            setDownloadZIPMode(false)
        }
    }, [file])

    useEffect(() => {
        if (!file.zip && file.file_id) {
            try {
                setInterval(async () => {
                    getZIPStatus(file.file_id).then((response) => {
                        if (response.zip === true) {
                            setUserFiles((userFiles) => userFiles.map((it) => {
                                if (it.file_id === file.file_id) {
                                    return { ...it, zip: response.zip };
                                }
                                return it;
                            }));
                        }
                    }).catch((err) => {
                        throw new Error(err.message);
                    })
                }, 30000);
            } catch (e) {
                console.log(e);
            }
        }
    }, [file.zip, file.file_id, setUserFiles])

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
                {editMode ?
                    <div className="file-save" onClick={() => editHandler()}>
                        <span>Save</span>
                        <img src="/icons/check.svg" alt="check" className="icon" />
                    </div>
                    :
                    <div className="file-save" onClick={() => editHandler()}>
                        <span>Edit</span>
                        <img src="/icons/edit.svg" alt="edit" className="icon" />
                    </div>
                }
                <div className="file-delete" onClick={() => setDeleteMode(true)}>
                    <span>Delete</span>
                    <img src="/icons/delete.svg" alt="delete" className="icon" />
                </div>
                {downloadMode ?
                    <div className={`file-download`}><a href={`${api_url}uploads/${file.url}`} target="_blank" rel="noreferrer" download={`${file.name}`}>
                        <span>Download</span>
                        <img src="/icons/download.svg" alt="download" className="icon" /></a></div>
                    :
                    <div className={`file-loader disabled`}>
                        <span>Download</span>
                        <img src="/gif/loader.gif" alt="Loading..." className="icon" />
                    </div>
                }
                {downloadZIPMode ?
                    <div className={`file-download-compressed`}><a href={`${api_url}uploads/${file.url}.zip`} target="_blank" rel="noreferrer" download={`${file.name}`}>
                        <span>ZIP</span>
                        <img src="/icons/zip.svg" alt="zip" className="icon" /></a></div>
                    :
                    <div className={`file-loader disabled`}>
                        <span>ZIP</span>
                        <img src="/gif/loader.gif" alt="Loading..." className="icon" />
                    </div>
                }
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