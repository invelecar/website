import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const Signup = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () => {
        const response = await fetch("https://invelecar-backend.onrender.com/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (response.status === 201) {
            console.log("Login successful");
            navigate("/login");
        }
        console.log(data);
    }
    
    
    return (
        <div className=" d-flex vh-100 flex-column justify-content-center align-items-center">
            <h1 className="text-center">Registrarme</h1>
            <form className="d-flex flex-column justify-content-center align-items-center">
                <input 
                    type="email" 
                    placeholder="Email" 
                    className="mb-2 form-control"
                    onChange={(e) => {setEmail(e.target.value)}}
                />
                <input 
                    type="password" 
                    placeholder="Clave" 
                    className="mb-2 form-control"
                    onChange={(e) => {setPassword(e.target.value)}}
                />
                <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={() => {handleSignup()}}
                >
                    Registrarme
                </button>
            </form>
        </div>
    )
}