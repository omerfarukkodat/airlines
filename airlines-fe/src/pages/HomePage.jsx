import React, { useEffect, useState } from "react";
import flightService from "../services/flightService";
import FlightTable from "../components/flight/FlightTable";
import Button from "../components/base/Button";
import {useNavigate} from "react-router-dom";
import authService from "../services/authService";

const HomePage = () => {
    const [flights, setFlights] = useState([]);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate("/search");
    }

    useEffect(() => {

        checkUser();
    }, []);

    const checkUser = async () => {

        const isUser = await authService.checkUser();
        if (!isUser) navigate("/admin");
        else fetchFlights();
    }




    const fetchFlights = async () => {
        try {
            const data = await flightService.getFlightsByCity(token);
            setFlights(data);
        } catch (error) {
            console.error("Uçuşları çekerken hata:", error);
        }
    };

    const formatDateTime = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleString("tr-TR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100px",
                width: "100%",
                marginBottom: "20px",
            }}>
                <Button style={{
                    backgroundColor: "black"
                }} onClick={handleSearch}>
                    Uçuş Ara
                </Button>
            </div>
            <div style={{justifyContent: "space-between", marginTop: "120px"}}>
                <h2>Tüm Uçuşlar</h2>
                <FlightTable flights={flights} formatDateTime={formatDateTime}/>
            </div>

        </div>


    );
};

export default HomePage;
