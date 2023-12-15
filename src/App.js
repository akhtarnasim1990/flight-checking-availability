import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import BookingPage from "./pages/BookingPage/BookingPage";
import FlightList from "./pages/FlightList/FlightList";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/search-flight" element={<BookingPage />} />
        <Route path="/flight/list" element={<FlightList />} />
      </Routes>
    </div>
  );
}

export default App;
