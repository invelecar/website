import { useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { gapi } from 'gapi-script';
import { Link } from 'react-router-dom';
import { Loader } from './Loader.jsx';

export const UploadComponent = () => {

    useEffect(() => {
        const initClient = () => {
            gapi.load('client', () => {
                gapi.client.init({
                    apiKey: 'AIzaSyCN71XpwVAhrzB73WMShLrEA7c2nHXchno', // Replace with your API key
                    clientId: '838054793704-vqm02e87l82u9suusmg7hvcashqn6ddp.apps.googleusercontent.com', // Replace with your client ID
                    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
                    scope: 'https://www.googleapis.com/auth/drive.file',
                });
            });
        };

        initClient();
    }, []);

    const [file, setFile] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [loader, setLoader] = useState(false);

    const googleLogin = useGoogleLogin({
        onSuccess: (tokenResponse) => setAccessToken(tokenResponse.access_token),
        scope: 'https://www.googleapis.com/auth/drive.file', // Request the necessary scope
    });

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file || !accessToken) {
            console.error('Please select a file and log in.');
            return;
        }

        const metadata = {
            name: file.name, // File name
            parents: ['1YJFrAlzYQiLj7rmt27Ww6YbhH2k4YXht'], // Upload to the app data folder
        };

        const boundary = '-------314159265358979323846'; // Unique boundary string
        const delimiter = `\r\n--${boundary}\r\n`;
        const closeDelimiter = `\r\n--${boundary}--`;

        // Convert file content to ArrayBuffer
        const fileContent = await file.arrayBuffer();

        // Construct the multipart body
        const multipartBody = [
            delimiter,
            'Content-Type: application/json; charset=UTF-8\r\n\r\n',
            JSON.stringify(metadata),
            delimiter,
            `Content-Type: ${file.type || 'application/octet-stream'}\r\n\r\n`,
            new Uint8Array(fileContent), // Add the binary file content
            closeDelimiter,
        ];

        // Combine all parts into a single Blob
        const requestBody = new Blob(multipartBody, { type: `multipart/related; boundary=${boundary}` });

        try {
            setLoader(true);
            const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': `multipart/related; boundary=${boundary}`,
                },
                body: requestBody,
            });

            if (!response.ok) {
                setLoader
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Archivo subido satisfactoriamente:', result);
            alert('Archivo subido satisfactoriamente:' + result.id);
            setLoader(false);
            setFile(null); // Clear the file input after upload
        } catch (error) {
            setLoader(false);
            console.error('Error uploading file:', error);
            alert('Error uploading file.');
        }
    };

    return (
        <div className=' d-flex flex-column justify-content-center align-items-center'>
            <Loader visible={loader} />
            <button style={{ display: `${accessToken != null ? "none" : ""}` }} className='btn btn-primary' onClick={googleLogin}>Iniciar en Google</button>
            {accessToken && (
                <div className='d-flex justify-content-center align-items-center mt-3'>
                    <input className='' type="file" placeholder='subir' onChange={handleFileChange} />
                    <button className='btn btn-primary' onClick={handleUpload} disabled={!file}>Confirmar archivo</button>
                </div>
            )}
            <div className='w-100'>
                <Link className='mt-3 btn btn-danger' to="/">Cerrar sesion</Link>
            </div>
        </div>
    );
};

export default UploadComponent;