import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/Loader.jsx";


export const Login = () => {

    const navigate = useNavigate();

    const [loader, setLoader] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        setLoader(true);
        const response = await fetch("https://invelecar-backend.onrender.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (response.status === 201 && data.user_type == 1) {
            setLoader(false);
            localStorage.setItem("user_type", data.user_type);
            localStorage.setItem("token", data.token);
            console.log("Login successful");
            navigate("/dashboard");
        }
        setLoader(false);
        console.log(data);
    }


    return (
        <div className=" d-flex vh-100 flex-column justify-content-center align-items-center">
            <Loader visible={loader} />
            <h1 className="text-center">Iniciar Sesión</h1>
            <form className="d-flex flex-column justify-content-center align-items-center">
                <input
                    type="email"
                    placeholder="Username"
                    className="mb-2 form-control"
                    onChange={(e) => { setEmail(e.target.value) }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="mb-2 form-control"
                    onChange={(e) => { setPassword(e.target.value) }}
                />
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => { handleLogin() }}
                >
                    Iniciar Sesión
                </button>
            </form>
        </div>
    )
}