import React from "react";

const FlightTable = ({ flights, formatDateTime }) => {
    return (
        <table style={tableStyle}>
            <thead>
            <tr style={{ backgroundColor: "#f2f2f2", textAlign: "left", width: "100%" }}>
                <th style={tableHeaderStyle}>Uçuş No</th>
                <th style={tableHeaderStyle}>Kalkış Şehri</th>
                <th style={tableHeaderStyle}>Varış Şehri</th>
                <th style={tableHeaderStyle}>Kalkış Saati</th>
                <th style={tableHeaderStyle}>Varış Saati</th>
            </tr>
            </thead>
            <tbody>
            {flights.map((flight) => (
                <tr key={flight.id} style={{ borderBottom: "1px solid #ddd" }}>
                    <td style={tableCellStyle}>{flight.id}</td>
                    <td style={tableCellStyle}>{flight.departureCity}</td>
                    <td style={tableCellStyle}>{flight.arrivalCity}</td>
                    <td style={tableCellStyle}>{formatDateTime(flight.departureTime)}</td>
                    <td style={tableCellStyle}>{formatDateTime(flight.arrivalTime)}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "16px",
    tableLayout: "fixed",
};

const tableHeaderStyle = {
    padding: "16px",
    borderBottom: "2px solid #ddd",
    fontWeight: "bold",
    textAlign: "left",
    width: "20%",
};

const tableCellStyle = {
    padding: "16px",
    borderBottom: "1px solid #ddd",
    width: "20%",
};

export default FlightTable;
