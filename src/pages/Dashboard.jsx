import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadComponent } from "../components/UploadComponent";
import { GoogleOAuthProvider } from '@react-oauth/google';

export const Dashboard = () => {
    const navigate = useNavigate();
    if (localStorage.getItem("user_type") != 1) {
        navigate("/login");
    }
    
    
    return (
        <div className=" d-flex vh-100 flex-column justify-content-center align-items-center">
            <h1 className="text-center">Subir Archivo</h1>
            <GoogleOAuthProvider clientId="838054793704-vqm02e87l82u9suusmg7hvcashqn6ddp.apps.googleusercontent.com">
                <UploadComponent />
            </GoogleOAuthProvider>
        </div>
    )
}