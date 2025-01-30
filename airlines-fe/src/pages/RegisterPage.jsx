import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import authService from "../services/authService";
import Button from "../components/base/Button";
import Input from "../components/base/Input";
import './style/RegisterPage.css'


const RegisterPage = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        locatedCity: "",
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            await authService.register(formData);
            alert("Register Successfully");
            navigate("/login");
        } catch (err) {
            setError(err)
        }
    };

    return (

        <div className="register-container">
            <h2>Kayıt Ol</h2>
            {error && <p className="error">{error}</p>}
            <form className="register-form" onSubmit={handleSubmit}>
                <Input label="Ad" name="firstName" value={formData.firstName} onChange={handleChange}/>
                <Input label="Soyad" name="lastName" value={formData.lastName} onChange={handleChange}/>
                <Input label="Kullanıcı Adı" name="username" value={formData.username} onChange={handleChange}/>
                <Input label="Şifre" type="password" name="password" value={formData.password} onChange={handleChange}/>
                <Input label="Şehir" name="locatedCity" value={formData.locatedCity} onChange={handleChange}/>
                <Button type="submit">Kayıt Ol</Button>
                <div className="login-link" style={{display: "flex", justifyContent: "right"}}>
                    <Link to="/login">
                        Giriş Yap
                    </Link>
                </div>
            </form>

        </div>
    );
};


export default RegisterPage;