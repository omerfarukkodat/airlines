import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/base/Button";

const MainPage = () => {
    const navigate = useNavigate();

    return (
        <div style={containerStyle}>
            <h2>Hoş Geldiniz</h2>
            <p>Lütfen giriş yapın veya kayıt olun.</p>
            <div style={buttonContainer}>
                <Button text="Giriş Yap" onClick={() => navigate("/login")}>Giriş Yap</Button>
                <Button text="Kayıt Ol" onClick={() => navigate("/register")}>Kayıt Ol</Button>
            </div>
        </div>
    );
};

const containerStyle = {
    textAlign: "center",
    marginTop: "50px",
};

const buttonContainer = {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "20px",
};

export default MainPage;
