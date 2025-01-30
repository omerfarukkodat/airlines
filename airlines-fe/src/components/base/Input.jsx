

const Input = ({ label , name , type = "text" , value , onChange , style}) => {

    return (
        <div className="input-container">
            {label && <label>{label}</label>}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required
                style={style}
            />
        </div>
    );
};


export default Input;