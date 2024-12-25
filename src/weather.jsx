import Search from "./search";
import { useEffect, useState } from "react";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import { GiPressureCooker } from "react-icons/gi";
export default function Weather() {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);


    async function fetchWeatherData(param) {
        setLoading(true);
        setError(null); 
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${param}&units=metric&appid=da0908cb5d185e2778fa181372f1aa56`
            );
            const data = await response.json();
            
            if (response.ok) {
                setWeatherData(data);
            } else {
                setWeatherData(null);
                setError(data.message || "City not found. Please try another city.");
            }
        } catch (e) {
            setError("An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    }
    async function handleSearch() {
        if (search.trim() !== "") {
            await fetchWeatherData(search);
        } else {
            setError("Please enter a city name.");
        }
    }

    function getCurrentDate() {
        return new Date().toLocaleDateString("en-us", {
            weekday: "short",
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    }

    useEffect(() => {
        fetchWeatherData("delhi");
    }, []);

    return (
        <div>
            {error && <p className="error">{error}</p>}
            {loading ? (
                <p>Loading...</p>
            ) : (
                weatherData && (
                    <div className="weather-data">
                        <Search
                            search={search}
                            setSearch={setSearch}
                            handleSearch={handleSearch}
                        />
                        <div className="top">
                            <div className="city-name">
                                <h1>
                                    {weatherData.city.name}, <span>{weatherData.city.country}</span>
                                </h1>
                                <img src={`https://flagsapi.com/${weatherData.city.country}/flat/64.png`} alt="Country Flag" className="clouds" />
                            </div>
                            <div className="date">
                                <span>{getCurrentDate()}</span>
                            </div>
                        </div>
                        <div className="temperature">
                            <img src={`https://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}@4x.png`} alt="Clouds" />
                            <p>{weatherData.list[0].main.temp}°C</p>
                            <p className="description">{weatherData.list[0].weather[0].description}</p>
                        </div>
                        <div className="temprature-info">
                            <div className="temp">
                                <p>Feels like</p>
                                <p>{weatherData.list[0].main.feels_like}°C</p>
                            </div>
                            <div className="temp">
                                <p>Low</p>
                                <p>{weatherData.list[0].main.temp_min}°C</p>
                            </div>
                            <div className="temp">
                                <p>High</p>
                                <p>{weatherData.list[0].main.temp_max}°C</p>
                            </div>
                        </div>

                        <div className="weather-info">
                            <div className="weather">
                                <p>Wind Speed</p>
                                <p className="wind">{weatherData.list[0].wind.speed} m/s</p>
                                <FaWind />
                            </div>
                            <div className="weather">
                                <p>Humidity</p>
                                <p className="humidity">{weatherData.list[0].main.humidity}%</p>
                                <WiHumidity />
                            </div>
                            <div className="weather">
                                <p>Pressure</p>
                                <p className="pressure">{weatherData.list[0].main.pressure} mBar</p>
                                <GiPressureCooker />
                            </div>
                        </div>
                        <div className="forecast">
                            <div className="forecast-day">
                                <p>5 Days Weahter Forecast</p>
                            </div>
                            <div className="forecast-info">
                                <p>{weatherData.list[0].dt_txt.slice(0, 10)}</p>
                                <img src={`https://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}@4x.png`} width={"70px"} alt="Clouds" />
                                <p>{weatherData.list[0].main.temp_min}/{weatherData.list[0].main.temp_max}</p>
                            </div>
                            <div className="forecast-info">
                                <p>{weatherData.list[8].dt_txt.slice(0, 10)}</p>
                                <img src={`https://openweathermap.org/img/wn/${weatherData.list[8].weather[0].icon}@4x.png`} width={"70px"} alt="Clouds" />
                                <p>{weatherData.list[8].main.temp_min}/{weatherData.list[8].main.temp_max}</p>
                            </div>
                            <div className="forecast-info">
                                <p>{weatherData.list[16].dt_txt.slice(0, 10)}</p>
                                <img src={`https://openweathermap.org/img/wn/${weatherData.list[16].weather[0].icon}@4x.png`} width={"70px"} alt="Clouds" />
                                <p>{weatherData.list[16].main.temp_min}/{weatherData.list[16].main.temp_max}</p>
                            </div>
                            <div className="forecast-info">
                                <p>{weatherData.list[24].dt_txt.slice(0, 10)}</p>
                                <img src={`https://openweathermap.org/img/wn/${weatherData.list[24].weather[0].icon}@4x.png`} width={"70px"} alt="Clouds" />
                                <p>{weatherData.list[24].main.temp_min}/{weatherData.list[24].main.temp_max}</p>
                            </div>
                            <div className="forecast-info">
                                <p>{weatherData.list[32].dt_txt.slice(0, 10)}</p>
                                <img src={`https://openweathermap.org/img/wn/${weatherData.list[32].weather[0].icon}@4x.png`} width={"70px"} alt="Clouds" />
                                <p>{weatherData.list[32].main.temp_min}/{weatherData.list[32].main.temp_max}</p>
                            </div>
                            <div className="forecast-info">
                                <p>{weatherData.list[39].dt_txt.slice(0, 10)}</p>
                                <img src={`https://openweathermap.org/img/wn/${weatherData.list[39].weather[0].icon}@4x.png`} width={"70px"} alt="Clouds" />
                                <p>{weatherData.list[39].main.temp_min}/{weatherData.list[39].main.temp_max}</p>
                            </div>
                            
                        </div>
                    </div>
                )
            )}

        </div>
    );
}
