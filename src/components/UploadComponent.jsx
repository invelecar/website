import { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { gapi } from 'gapi-script';

export const UploadComponent = () => {
    const [file, setFile] = useState(null);
    const [accessToken, setAccessToken] = useState(null);

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

        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', file.name);
        formData.append('parents', ['1YJFrAlzYQiLj7rmt27Ww6YbhH2k4YXht']); // Optional: Specify a folder ID

        try {
            const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: formData,
            });

            const data = await response.json();
            console.log('File uploaded successfully:', data);
            alert('File uploaded successfully! File ID: ' + data.id);
            // Optionally, store the file ID in your database to share with clients
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file.');
        }
    };

    return (
        <div>
            <button onClick={googleLogin}>Log in with Google</button>
            {accessToken && (
                <div>
                    <input type="file" onChange={handleFileChange} />
                    <button onClick={handleUpload} disabled={!file}>Upload File</button>
                </div>
            )}
        </div>
    );
};

export default UploadComponent;