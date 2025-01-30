import React, { useState } from "react";
import Input from "../base/Input";
import Button from "../base/Button";
import flightService from "../../services/flightService";

const DeleteFlight = ({ onFlightDeleted }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleDeleteFlight = async (event) => {
        event.preventDefault();

        const flightId = event.target.flightId.value.trim();
        if (!flightId) {
            alert("Lütfen bir uçuş numarası girin.");
            return;
        }

        try {
            await flightService.deleteFlight(flightId);
            alert("Uçuş başarıyla silindi.");
            setIsOpen(false);

            onFlightDeleted();
        } catch (error) {
            alert(error.response?.data?.error || "Bir hata oluştu. Lütfen tekrar deneyin.");
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
                <Button
                    style={{ minWidth: "200px", backgroundColor: "black" }}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    Uçuş Sil
                </Button>
            </div>

            {isOpen && (
                <div style={formContainerStyle}>
                    <h3 style={{ textAlign: "center" }}>Uçuş Sil</h3>
                    <form style={formStyle} onSubmit={handleDeleteFlight}>
                        <Input name="flightId" label="Uçuş Numarası" />
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Button type="submit" style={{ width: "100px", backgroundColor: "black" }}>
                                Sil
                            </Button>
                        </div>
                    </form>
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
    display: "flex",
    flexDirection: "column",
    gap: "16px",
};

export default DeleteFlight;
