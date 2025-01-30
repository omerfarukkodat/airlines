import React, { useEffect, useState } from "react";
import flightService from "../services/flightService";
import FlightTable from "../components/flight/FlightTable";
import AddFlightForm from "../components/flight/AddFlightForm";
import authService from "../services/authService";
import {useNavigate} from "react-router-dom";
import LogoutButton from "../components/logout/Logout";
import DeleteFlight from "../components/flight/DeleteFlight";

const AdminPage = () => {
    const [flights, setFlights] = useState([]);
    const token = localStorage.getItem("token");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        checkAdmin();
    }, []);


    const checkAdmin = async () => {

        const isAdmin = await authService.checkAdmin();
        if (!isAdmin) navigate("/home");
        else fetchFlights();
    }



    const fetchFlights = async () => {
        try {
            const data = await flightService.getAllFlights(token);
            setFlights(data);
        } catch (error) {
            console.error("Uçuşları çekerken hata:", error);
        } finally {
            setLoading(false);
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

    if (loading) return <p>Loading...</p>

    return (
        <div>
            <div style={{display: "flex", justifyContent: "right", marginTop: "0px"}}>
                <LogoutButton/>
            </div>
            <h1>Admin Paneli - Uçuş Yönetimi</h1>
            <div style={{display: "flex",  justifyContent: "space-evenly"}}>
                <AddFlightForm onFlightAdded={fetchFlights}/>
                <DeleteFlight onFlightDeleted={fetchFlights}/>
            </div>

            <div style={{justifyContent: "space-between"}}>
                <h2 style={{textAlign: "center"}}>Tüm Uçuşlar</h2>
                <FlightTable flights={flights} formatDateTime={formatDateTime}/>
            </div>
        </div>
    );
};

export default AdminPage;