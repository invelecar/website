import { Navbar } from "../components/Navbar.jsx";
import { useState, useEffect } from 'react';
import { Loader } from "../components/Loader.jsx";


export const Informes = () => {

    const [loader, setLoader] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDriveFiles = async () => {
            setLoader(true);
            try {
                const response = await fetch('https://invelecar-backend.onrender.com/api/get-drive-files');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setFileList(data);
                setLoader(false);
            } catch (e) {
                setLoader(false);
                setError(e.message);
                setLoading(false);
            }
        };

        fetchDriveFiles();
    }, []);

    return (
        <div>
            <Loader visible={loader} />
            <Navbar />
            <div className="d-flex flex-column justify-content-center align-items-center">
                <h2 className="mt-3">Reportes semanales</h2>
                {fileList.length > 0 ? (
                    <div className="file-grid">
                        {fileList.map(file => (
                            <div key={file.id} className="file-item">
                                <a href={file.webViewLink} target="_blank" rel="noopener noreferrer">
                                    <p className="file-name">{file.name}</p>
                                </a>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No files found in the specified Google Drive folder.</p>
                )}
            </div>
        </div>
    );
}