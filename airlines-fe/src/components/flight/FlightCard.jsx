
import React from "react";

const FlightCard = ({ flight }) => {
    return (
        <div style={styles.card}>
            <div style={styles.header}>
                <h3>{flight.departureCity} - {flight.arrivalCity}</h3>
                <span style={styles.date}>{flight.date}</span>
            </div>
            <p><strong>Kalkış:</strong> {flight.departureTime}</p>
            <p><strong>Varış:</strong> {flight.arrivalTime}</p>
            <p><strong>Uçuş Numarası:</strong> {flight.id}</p>

            <button
                style={styles.button}
                onClick={() => alert(`Rezervasyon yapılacak uçuş: ${flight.id}`)}
            >
                Detaylar
            </button>
        </div>
    );
};

const styles = {
    card: {
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "16px",
        boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        maxWidth: "400px",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "8px",
    },
    date: {
        color: "#666",
        fontSize: "14px",
    },
    button: {
        marginTop: "16px",
        padding: "8px 16px",
        border: "none",
        borderRadius: "4px",
        backgroundColor: "#007bff",
        color: "#fff",
        cursor: "pointer",
    }
};

export default FlightCard;
