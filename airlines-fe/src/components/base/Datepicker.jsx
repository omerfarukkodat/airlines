import React from "react";

const Datepicker = ({ label, value, onChange , style }) => {
    const handleChange = (e) => {
        const dateValue = e.target.value;
        onChange(dateValue);
    };

    return (
        <div className="datepicker-container">
            {label && <label>{label}</label>}
            <input
                type="date"
                value={value}
                onChange={handleChange}
                style={style}
            />
        </div>
    );
};

export default Datepicker;