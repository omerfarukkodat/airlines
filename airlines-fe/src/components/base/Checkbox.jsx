const Checkbox = ({label, checked, onChange, style}) => {
    return (
        <div className="checkbox-container">
            <input type="checkbox"
                   checked={checked}
                   onChange={onChange}
                    style={style}
            />
            {label && <label>{label}</label>}
        </div>
    );
};


export default Checkbox;