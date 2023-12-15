import { useState, useEffect } from "react";
import "./BookingPage.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaDiamondTurnRight } from "react-icons/fa6";
import { GoArrowSwitch } from "react-icons/go";
import { BsFillBuildingsFill } from "react-icons/bs";
import { PiClockCountdownFill } from "react-icons/pi";
import Modal from "../../components/modal/Modal";
import SelectionComp from "../../components/selection/SelectionComp";
import InputButton from "../../components/inputButton/InputButton";
import { useNavigate, useLocation } from "react-router-dom";
import CryptoJS from "crypto-js";
import axios from "axios";
import * as yup from "yup";
import useThrottle from "../../components/throttle/UseThrottle";

const BookingPage = () => {
  const navigate = useNavigate();
  const [fromCity, setFromCity] = useState("");
  const [fromAirport, setFromAirport] = useState({
    name: "",
    iata: "",
    city: "",
    country: "",
  });
  const [toAirport, setToAirport] = useState({
    name: "",
    iata: "",
  });
  const [toCity, setToCity] = useState("");
  const [fromCitiesList, setFromCitiesList] = useState([]);
  const [toCitiesList, setToCitiesList] = useState([]);
  const [departure, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [adult, setAdult] = useState(1);
  const [child, setChild] = useState(0);
  const [infant, setInfant] = useState(0);
  const [classType, setClassType] = useState("ECONOMY");
  const [travelType, setTravelType] = useState("oneway");
  const [flightList, setFlightList] = useState([]);

  let schema1 = yup.object().shape({
    fromCity: yup.string().required(),
    createdOn: yup.date().default(function () {
      return new Date();
    }),
  });
  let schema2 = yup.object().shape({
    toCity: yup.string().required(),
    createdOn: yup.date().default(function () {
      return new Date();
    }),
  });

  useEffect(() => {
    console.log("booking page rendering....");
  }, []);

  const handleInputChange = useThrottle((value, setList) => {
    // Your logic here (e.g., API call, state update)
    console.log("Throttled value:", value);
    const city = JSON.stringify({
      search_key: value,
    });

    const ciphertext = CryptoJS.AES.encrypt(city, process.env.REACT_APP_ENCRYPTED_KEY).toString();

    const config = {
      headers: {
        apikey: process.env.REACT_APP_API_KEY,
        currency: process.env.REACT_APP_CURRENCY,
      },
    };

    const data = { request_data: ciphertext };
    axios.post(process.env.REACT_APP_BASE_URL + "flight/search-flight-airport", data, config).then((response) => {
      console.log(response);
      if (response.status === 200 || response.statusText === "OK") {
        setList(response.data.main_data.data);
      }
    });
  }, 1000); // 1000ms (1 second) delay

  const fromCitySearchHandler = (city) => {
    setFromCity(city);
    schema1
      .isValid({
        fromCity: fromCity,
      })
      .then(function (valid) {
        console.log("validation: ", valid); // => true
        if (valid) {
          handleInputChange(fromCity, setFromCitiesList);
        }
      });
  };

  const toCitySearchHandler = (city) => {
    setToCity(city);
    schema2
      .isValid({
        toCity: toCity,
      })
      .then(function (valid) {
        console.log("validation: ", valid); // => true
        if (valid) {
          handleInputChange(toCity, setToCitiesList);
        }
      });
  };

  const searchCity = (searchKey) => {
    console.log("searching city...", searchKey);
    handleInputChange(fromCity.name);
    const city = JSON.stringify({
      from_airport: "CCU",
      to_airport: "DEL",
      departure_date: "2023-12-29",
      return_date: "2024-01-29",
      adults: "1",
      childs: "0",
      infants: "0",
      class_type: "ECONOMY",
      travel_type: "oneway",
      max_result: 100,
      user_id: 0,
    });
    // console.log(city);
    // setFromCity(searchKey);
  };

  // const searchFlightHander = (searchKey) => {
  //   const res = schema1
  //     .isValid({
  //       fromCity: fromCity,
  //       toCity: toCity,
  //     })
  //     .then(function (valid) {
  //       console.log("validation: ", valid); // => true
  //       if (valid) {
  //         const credntial = JSON.stringify({
  //           fromCity,
  //           toCity,
  //         });

  //         console.log(process.env.REACT_APP_ENCRYPTED_KEY);

  //         const ciphertext = CryptoJS.AES.encrypt(credntial, process.env.REACT_APP_ENCRYPTED_KEY).toString();
  //         console.log("ciphertext: ", ciphertext);
  //         const config = {
  //           headers: {
  //             apikey: process.env.REACT_APP_API_KEY,
  //             currency: process.env.REACT_APP_CURRENCY,
  //           },
  //         };
  //         const data = { request_data: ciphertext };
  //         console.log(process.env.REACT_APP_BASE_URL + "auth/login");
  //         axios.post(process.env.REACT_APP_BASE_URL + "auth/login", data, config).then((response) => {
  //           console.log(response);
  //           if (response.status === 200 || response.statusText === "OK") {
  //             navigate("/search-flight");
  //           }
  //         });
  //       }
  //     });
  // };

  const selectCity = (city, _city_cat) => {
    console.log(city, _city_cat);
    if (_city_cat === "from_city") {
      setFromCity(city.airport_name);
      setFromAirport({
        name: city.airport_name,
        iata: city.iata,
        city: city.city,
        country: city.country,
      });
      setFromCitiesList([]);
    } else if (_city_cat === "to_city") {
      setToCity(city.airport_name);
      setToAirport({
        name: city.airport_name,
        iata: city.iata,
        city: city.city,
        country: city.country,
      });
      setToCitiesList([]);
    }
  };

  const submitHandler = () => {
    const bookingData = JSON.stringify({
      from_airport: fromAirport.iata,
      to_airport: toAirport.iata,
      departure_date: departure,
      return_date: returnDate,
      adults: adult,
      childs: child,
      infants: infant,
      class_type: classType,
      travel_type: travelType,
      max_result: 100,
      user_id: 0,

      // from_airport: "CCU",
      // to_airport: "DEL",
      // departure_date: "2023-12-29",
      // return_date: "2024-01-29",
      // adults: "1",
      // childs: "0",
      // infants: "0",
      // class_type: "ECONOMY",
      // travel_type: "oneway",
      // max_result: 100,
      // user_id: 0,
    });

    const ciphertext = CryptoJS.AES.encrypt(bookingData, process.env.REACT_APP_ENCRYPTED_KEY).toString();
    const config = {
      headers: {
        apikey: process.env.REACT_APP_API_KEY,
        currency: process.env.REACT_APP_CURRENCY,
      },
    };

    const data = { request_data: ciphertext };
    axios.post(process.env.REACT_APP_BASE_URL + "flight/flight-search-list", data, config).then((response) => {
      console.log(response);
      if (response.status === 200 || response.statusText === "OK") {
        // setFlightList(response.data.main_data.data);
        const dataMain = response.data.main_data;
        navigate("/flight/list", { state: { from: fromAirport, to: toAirport, date: departure, info: dataMain } });
      }
    });
  };

  return (
    <div className="booking-page">
      <div className="badges">
        <div className="sigle-badge">
          <div className="badge-icon-div">
            <FaDiamondTurnRight className="badge-icon active" />
          </div>
          <div className="badge">One way</div>
        </div>
        <div className="sigle-badge">
          <div className="badge-icon-div">
            <PiClockCountdownFill className="badge-icon" />
          </div>
          <div className="badge">Round trip</div>
        </div>
        <div className="sigle-badge">
          <div className="badge-icon-div">
            <BsFillBuildingsFill className="badge-icon" />
          </div>
          <div className="badge">Multi-City</div>
        </div>
      </div>
      <div className="booking-container">
        <div className="first-row">
          <div className="input-comp">
            <InputButton
              type="text"
              label="Flying From"
              value={fromCity}
              Icon={<FaMapMarkerAlt className="eye-logo" />}
              placeHolder="Flying From..."
              inputValueHandler={(e) => fromCitySearchHandler(e)}
            />
            <div className="cities-list">
              {fromCitiesList.length > 0 ? (
                <div className="searched-cities">
                  {fromCitiesList.map((city, index) => (
                    <div key={index} className="searched-city-name" onClick={() => selectCity(city, "from_city")}>
                      {city.airport_name}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
          <GoArrowSwitch className="go-icon" />
          <div className="input-comp">
            <InputButton
              type="text"
              label="Flying To"
              value={toCity}
              Icon={<FaMapMarkerAlt className="eye-logo" />}
              placeHolder="Flying To..."
              inputValueHandler={(e) => toCitySearchHandler(e)}
            />
            <div className="cities-list">
              {toCitiesList.length > 0 ? (
                <div className="searched-cities">
                  {toCitiesList.map((city, index) => (
                    <div key={index} className="searched-city-name" onClick={() => selectCity(city, "to_city")}>
                      {city.airport_name}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
          <div className="input-comp">
            <InputButton
              type="date"
              label="Departure Date"
              placeHolder="Departure Date..."
              value={departure}
              inputValueHandler={(e) => setDepartureDate(e)}
            />
          </div>
        </div>
        <div className="first-row">
          <div className="input-comp">
            <Modal adultHandler={setAdult} childHandler={setChild} infantHandler={setInfant} adult={adult} child={child} infant={infant} />
            {/* <InputButton type="text" label="Traveller(s)" Icon={<FaAngleDown className="eye-logo" />} /> */}
          </div>
          <div className="input-comp">
            {/* <InputButton type="text" label="Preferred Class" Icon={<FaAngleDown className="eye-logo" />} placeHolder="Economy" /> */}
            <SelectionComp />
          </div>
        </div>
        <div className="first-row second-row">
          <div className="submit-btn mt-3" onClick={submitHandler}>
            <input className="btn btn-primary " type="submit" value="Submit"></input>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
