import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import authService from "../services/authService";
import Button from "../components/base/Button";
import Input from "../components/base/Input";
import './style/LoginPage.css'


const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
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
            await authService.login(formData);
            alert("Login Successfully");

            const isAdmin = await authService.checkAdmin();
            if (isAdmin) {
                navigate("/admin");
            } else {
                navigate("/home");
            }
        } catch (err) {
            setError(err.response?.data || "Giriş işlemi sırasında bir hata oluştu.");
        }
    };

    return (

        <div className="login-container">
            <h2>Giriş Yap</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <Input label="Kullanıcı Adı" name="username" value={formData.username} onChange={handleChange}/>
                <Input label="Şifre" type="password" name="password" value={formData.password} onChange={handleChange}/>
                <Button type="submit" style={{
                    justifyContent: "center",
                    alignItems: "center",

                }}
                >Giriş Yap</Button>

                <div className="register-link" style={{display: "flex", justifyContent: "right"}}>
                    <Link to="/register">
                        Kayıt Ol
                    </Link>
                </div>
            </form>


        </div>
    );
};


export default LoginPage;