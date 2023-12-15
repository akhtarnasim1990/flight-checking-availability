import { useEffect } from "react";
import "./FlightList.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate, useLocation } from "react-router-dom";

const FlightList = () => {
  const location = useLocation();
  useEffect(() => {
    console.log(location.state);
  }, []);
  return (
    <div className="flight-list-container">
      <div className="flight-list-content">
        <div className="flight-list-header">
          <div className="header-left">
            <div className="map-icon-div">
              <FaMapMarkerAlt className="map-icon" />
            </div>
            <div className="from-station-details">
              <div className="from-station">From Station</div>
              <div className="station-name">{`${location.state.from.name}, (${location.state.from.iata}), ${location.state.from.country}`}</div>
              <div className="departure-date">Sun 27 Aug 2023</div>
            </div>
          </div>
          <div className="header-left-arrow">
            <FaArrowRightLong />
          </div>
          <div className="header-left header-right">
            <div className="map-icon-div">
              <FaMapMarkerAlt className="map-icon" />
            </div>
            <div className="from-station-details">
              <div className="from-station">To Station</div>
              <div className="station-name">{`${location.state.to.name}, (${location.state.to.iata}), ${location.state.to.country}`}</div>
              <div className="departure-date">Sun 27 Aug 2023</div>
            </div>
          </div>
        </div>
        <div className="flight-list-body">
          {location.state.info.data.map((item) => {
            return (
              <div key={item.flight_id} className="flight-list-header">
                <div className="flight-details">
                  <div className="flight-image">
                    <img src={`${item.flightitineraries[0].airline_logo}`} alt="" />
                  </div>
                  <div className="flight-name">{item.flightitineraries[0].airline_name}</div>
                  <div className="flight-company-name">{item.flightitineraries[0].segments[0].aircraft_name}</div>
                </div>
                <div className="header-left">
                  <div className="from-station-details">
                    <div className="station-name">
                      {item.oneway_departuredate}
                      <br />
                      {item.oneway_departuretime}
                    </div>
                    <div className="departure-date">
                      {item.flightitineraries[0].departure_airport}
                      <br />
                      Airport, {item.flightitineraries[0].departure_location}
                    </div>
                  </div>
                </div>
                <div className="header-left-arrow">
                  <FaArrowRightLong />
                </div>
                <div className="header-left header-right">
                  <div className="from-station-details">
                    <div className="station-name">
                      {item.oneway_arrivaldate}
                      <br />
                      {item.oneway_arrivaltime}
                    </div>
                    <div className="departure-date">
                      {item.flightitineraries[0].arrival_airport}
                      <br />
                      Airport, {item.flightitineraries[0].arrival_location}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FlightList;
