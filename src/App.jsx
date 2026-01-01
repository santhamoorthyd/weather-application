import { useState, useEffect } from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Display from './componant/Display';
import UserContext from './Context/UserContext';

const App = () => {
  //forecast data
  const [days, setDays] = useState()
  //store the today weather
  const [res, setRes] = useState()
  //store city data
  const [results, setResults] = useState([]);
  const [val, setVal] = useState("");
  const [city, setCity] = useState()
  // api key
  let ApiKey = '9e97e0e70e95489fb76143008241709';

  // using featch the city and state data
  const handleSearch = async (e) => {
    setVal(e)
    if (val.length >= 3) {
      const res = await axios.get(`http://api.weatherapi.com/v1/search.json?key=${ApiKey}&q=${val}`);
      const resdata = res.data;
      setResults(resdata);
      // console.log(results)

    }
  };


  // handele select and data fecth in all weather condition
  const handleSelectCity = async (city, region) => {
    const res = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${ApiKey}&q=${city}`)
    const resdata = res.data;
    setRes(resdata.current);
    // fetch 5 days weather
    const datas5days = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${ApiKey}&q=${city}&days=3`)
    const res5 = datas5days.data.forecast.forecastday;
    setDays(res5)
    // end of the 5 days
    setCity(city)
    const a = city + ',' + region;
    setVal(a)
  }
  // console.log(days)



  return (
    <div className="container mt-5"
    style={{
      // backgroundColor:'#bfc0c8ff'
    }}
    >
      <div className="row justify-content-center">
        <div className="col-md-6">

          {/* Search Bar */}
          <div className="input-group mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search City"
              value={val}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          {/* Search Results */}
          {city ? '' :
            <div>
              {results.length > 0 ? (
                <ul className="list-group">
                  {results.map((item, index) => (
                    <li className="list-group-item " key={index}>
                      <div style={{ cursor: "pointer" }} onClick={() => handleSelectCity(item.name, item.region)}> {item.name},{item.region}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted"></p>
              )}
            </div>
          }

        </div>
        {/* pass the datas in context */}
      </div>
      {city ?
        <UserContext.Provider value={{ res, days ,city}}>
          <Display />
        </UserContext.Provider>
        : ''}
    </div>
  )
}

export default App;
