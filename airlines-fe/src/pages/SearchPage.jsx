import React, {useState} from "react";
import FlightTable from "../components/flight/FlightTable";
import flightService from "../services/flightService";
import Input from "../components/base/Input";
import Button from "../components/base/Button";
import {useNavigate} from "react-router-dom";
import LogoutButton from "../components/logout/Logout";


const SearchPage = () => {
    const [searchFlight, setSearchFlight] = useState({
        departureCity: "",
        arrivalCity: "",
        departureDate: "",
    });
    const [error, setError] = useState(null);
    const [flights, setFlights] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(null);

    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        return date.toLocaleString();
    };

    const handleHomeClick = () => {
        navigate("/home");
    }

    const handleInputChange = (e) => {
        setSearchFlight({...searchFlight, [e.target.name]: e.target.value});
    };

    const handleSearch = async () => {
        try {
            setLoading(false)
            const flightData = {
                departureCity: searchFlight.departureCity,
                arrivalCity: searchFlight.arrivalCity,
                departureDate: searchFlight.departureDate,
            };
            const response = await flightService.searchFlights(flightData.departureCity, flightData.arrivalCity, flightData.departureDate);
            setSearchFlight({
                departureCity: "",
                arrivalCity: "",
                departureDate: "",
            });
            setFlights(response);
            setError(null);
            setLoading(false)
        } catch (error) {
            console.error("Uçuş arama sırasında hata oluştu:", error);
            setError(error.response?.data?.message || "Uçuş aranırken bir hata oluştu.");
            alert(error.response?.data?.message || "Uçuş aranırken bir hata oluştu.");
            setLoading(true)
        }
    };

    if (loading) {
        return (
            <p>Loading...</p>
        )
    }

    return (

        <div style={{padding: "16px"}}>
            <div style={{display: "flex", justifyContent: "right", marginTop: "10px"}}>
                <LogoutButton/>
            </div>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Button onClick={handleHomeClick} style={{backgroundColor: "black", minWidth: "200px"}}>
                    Tüm Uçuşları Gör
                </Button>
            </div>
            <h1>Uçuş Arama</h1>
            <div style={{
                marginBottom: "16px",
                width: "100%",
                maxWidth: "400px",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Input
                    name="departureCity"
                    label="Kalkış Şehri"
                    onChange={handleInputChange}
                    value={searchFlight.departureCity}
                    style={{marginRight: "8px", padding: "8px"}}
                />
                <Input
                    name="arrivalCity"
                    label="Varış Şehri"
                    onChange={handleInputChange}
                    value={searchFlight.arrivalCity}
                    style={{marginRight: "8px", padding: "8px"}}
                />
                <Input
                    name="departureDate"
                    label="Uçuş Tarihi"
                    type="date"
                    value={searchFlight.departureDate}
                    onChange={handleInputChange}
                    style={{marginRight: "8px", padding: "8px", cursor: "pointer"}}
                />
                <button onClick={handleSearch} style={{padding: "8px 16px", backgroundColor: "black"}}>
                    Ara
                </button>
            </div>


            {error && <p style={{color: "red"}}>{error}</p>}

            {flights.length > 0 ? (
                <FlightTable flights={flights} formatDateTime={formatDateTime}/>
            ) : (
                <p>Hiç uçuş bulunamadı.</p>
            )}


        </div>
    );
};

export default SearchPage;