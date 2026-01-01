import { useContext } from 'react';
import UserContext from '../Context/UserContext';
import axios from 'axios';
const Display = () => {
    //retrive the data in usecontext and Destructuring
    const { res, days, city } = useContext(UserContext);
    console.log(res)
    return (
        <div className="container-fluid d-flex justify-content-center align-items-start mt-5 min-vh-100  ">
            <div
                className="card text-white shadow-lg p-4"
                style={{
                    width: "100%",
                    borderRadius: "20px",
                    background: "linear-gradient(180deg, #7fb3ff, #5a9bff)",
                    border: "none",
                }}
            >
                {/* City */}
                <h4 className="text-center fw-semibold">{city}</h4>

                {/* Temperature */}
                <div className=" text-center">
                    <img
                        src={res.condition.icon}
                        alt="weather icon"
                    />
                </div>
                {/* <h4 className="text-center fw-semibold">{res.condition.text}</h4> */}
                <h1 className="text-center fw-bold my-3">{res.temp_f}°F</h1>

                {/* Weather Info */}
                <div className="row text-center my-4">
                    <div className="col">
                        <small className="opacity-75">Humidity</small>
                        <div className="fw-bold">{res.humidity}%</div>
                    </div>
                    <div className="col">
                        <small className="opacity-75">Wind Speed</small>
                        <div className="fw-bold">{res.wind_kph} kph</div>
                    </div>
                    <div className="col">
                        <small className="opacity-75">Air Pressure</small>
                        <div className="fw-bold">{res.pressure_in}%</div>
                    </div>
                     <div className="col">
                        <small className="opacity-75">Cloud</small>
                        <div className="fw-bold">{res.cloud} %</div>
                    </div>
                </div>

                <hr className="border-light opacity-50" />

                {/* Forecast */}
                <h6 className="text-center fw-semibold mb-3">3-Days Forecast</h6>

                <div className="row text-center">
                    {days.map((item, i) => (
                        <div className="col" key={i}>
                            <small className="fw-semibold">{i + 1} Day</small>
                            <div className="fs-5 my-1"><img
                                src={item.day.condition.icon}
                                alt="weather icon" /></div>
                            <small>{item.day.avgtemp_f}°F</small>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Display;
