import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import SearchPage from "./pages/SearchPage";
import MainPage from "./pages/MainPage";

function App() {
  return (
   <Router>
     <Routes>
         <Route path="/" element={<MainPage />} />
       <Route path="/register" element={<RegisterPage />} />
         <Route path="/login" element={<LoginPage />} />
         <Route path="/home" element={<HomePage />} />
         <Route path="/admin" element={<AdminPage />} />
         <Route path="/search" element={<SearchPage />} />
     </Routes>
   </Router>
  );
}

export default App;
