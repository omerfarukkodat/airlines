import React, { useState } from "react";
import Input from "../base/Input";
import Button from "../base/Button";
import Datepicker from "../base/Datepicker";
import Select from "../base/Select";
import flightService from "../../services/flightService";

const AddFlightForm = ({ onFlightAdded }) => {
    const [newFlight, setNewFlight] = useState({
        departureCity: "",
        arrivalCity: "",
        departureDate: "",
        departureTime: "",
        arrivalDate: "",
        arrivalTime: "",
    });
    const [isOpen, setIsOpen] = useState(false);

    const timeOptions = Array.from({ length: 48 }, (_, i) => {
        const hours = Math.floor(i / 2);
        const minutes = i % 2 === 0 ? "00" : "30";
        return `${String(hours).padStart(2, "0")}:${minutes}`;
    });

    const combineDateTime = (date, time) => {
        if (!date || !time) return "";
        return `${date}T${time}:00`;
    };

    const handleInputChange = (e) => {
        setNewFlight({ ...newFlight, [e.target.name]: e.target.value });
    };

    const handleDateChange = (name, date) => {
        setNewFlight({ ...newFlight, [name]: date });
    };

    const handleAddFlight = async () => {
        try {
            const departureDateTime = combineDateTime(newFlight.departureDate, newFlight.departureTime);
            const arrivalDateTime = combineDateTime(newFlight.arrivalDate, newFlight.arrivalTime);

            const flightData = {
                departureCity: newFlight.departureCity,
                arrivalCity: newFlight.arrivalCity,
                departureTime: departureDateTime,
                arrivalTime: arrivalDateTime,
            };

            await flightService.addFlight(flightData);
            setNewFlight({
                departureCity: "",
                arrivalCity: "",
                departureDate: "",
                departureTime: "",
                arrivalDate: "",
                arrivalTime: "",
            });
            onFlightAdded();
            setIsOpen(false);
        } catch (error) {
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.error
                alert(errorMessage);
            } else {
                alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
            }
        }
    };

    return (
        <div style={{ textAlign: "center" }}>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100px",
                width: "100%",
                marginBottom: "20px",
            }}>
                <Button style={{ minWidth: "200px" , backgroundColor: "black" }}
                        text="Yeni Uçuş Ekle" onClick={() => setIsOpen(!isOpen)}>
                    Yeni Uçuş Ekle
                </Button>
            </div>

            {isOpen && (
                <div style={formContainerStyle}>
                    <h3 style={{ textAlign: "center" }}>Yeni Uçuş Ekle</h3>
                    <div style={formStyle}>
                        <Input
                            name="departureCity"
                            label="Kalkış Şehri"
                            onChange={handleInputChange}
                            value={newFlight.departureCity}
                        />
                        <Input
                            name="arrivalCity"
                            label="Varış Şehri"
                            onChange={handleInputChange}
                            value={newFlight.arrivalCity}
                        />

                        <Datepicker
                            label="Kalkış Günü"
                            value={newFlight.departureDate}
                            onChange={(date) => handleDateChange("departureDate", date)}
                        />

                        <Select
                            name="departureTime"
                            label="Kalkış Saati"
                            options={timeOptions}
                            onChange={handleInputChange}
                            value={newFlight.departureTime}
                        />

                        <Datepicker
                            label="Varış Günü"
                            value={newFlight.arrivalDate}
                            onChange={(date) => handleDateChange("arrivalDate", date)}
                        />

                        <Select
                            name="arrivalTime"
                            label="Varış Saati"
                            options={timeOptions}
                            onChange={handleInputChange}
                            value={newFlight.arrivalTime}
                        />
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Button
                                text="Ekle"
                                style={{ width: "100px", backgroundColor: "black" }}
                                onClick={handleAddFlight}
                            >
                                Ekle
                            </Button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

const formContainerStyle = {
    maxWidth: "400px",
    width: "100%",
    margin: "20px auto",
    padding: "16px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
};

const formStyle = {
    maxWidth: "350px",
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
};

export default AddFlightForm;