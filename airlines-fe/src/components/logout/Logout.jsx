import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../base/Button";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    return (
        <Button style={{backgroundColor:"black"}} onClick={handleLogout}>
            Çıkış Yap
        </Button>
    );
};

export default LogoutButton;
