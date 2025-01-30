import React from "react";

const Select = ({ name, label, options, value, onChange }) => {
    return (
        <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>{label}</label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                style={{
                    width: "100%",
                    minWidth: "376px",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    fontSize: "16px",
                }}
            >
                <option value="">Seçiniz</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;