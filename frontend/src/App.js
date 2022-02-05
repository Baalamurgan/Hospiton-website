import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Header from "./pages/Header";

function App() {
  const userId = localStorage.getItem("userId");
  return (
    <div className="App">
      <Header userId={userId} />
      <Routes>
        {/* <PrivateRoute exact path="/" element={<Home />} /> */}
        <Route
          path="/home"
          element={
            <PrivateRoute redirectTo="/login">
              <Home />
            </PrivateRoute>
          }
        />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
const PrivateRoute = ({ children, redirectTo }) => {
  const isLoggedIn = localStorage.getItem("userId");
  return isLoggedIn ? children : <Navigate to={redirectTo} />;
};

export default App;
