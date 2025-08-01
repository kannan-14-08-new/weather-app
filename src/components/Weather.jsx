import { IoSearch } from "react-icons/io5";
import humidity_icon from "../assets/humidity.png";
import wind_icon from "../assets/wind.png";
import { useEffect, useRef, useState } from "react";

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const search = async (city) => {
    if(city === ""){
      alert('Enter City Name')
      return
    }
    try {
      const URL = `https://api.weatherapi.com/v1/current.json?key=${
        import.meta.env.VITE_APP_ID
      }&q=${city}&units=metric`;
      const response = await fetch(URL);
      const data = await response.json();

      if(!response.ok){
         alert("Enter Vaild City Name")   
      }

      setWeatherData({
        humidity: data.current.humidity,
        windSpeed: data.current.wind_kph,
        temperature: Math.floor(data.current.temp_c),
        location: data.location.name,
        icon: data.current.condition.icon,
      });
      console.log(data);
    } catch (error) {
       console.log(error);  
    }
  };

  useEffect(() => {
    search("india");
  }, []);

  return (
    <>
      <div className="flex items-center gap-2.5 bg-[linear-gradient(45deg,_#2f4680,_#500ae4)] p-[40px] rounded-[10px] justify-center flex-col">
        <div className="flex gap-3">
          <input
          onKeyDown={(e) => {
            if(e.key === 'Enter'){
             search(inputRef.current.value)
            }
          }}
            ref={inputRef}
            type="text"
            placeholder="Search"
            className="bg-white p-3 rounded-full outline-none w-[300px]"
          />

          <button
            className="w-[50px] p-[15px] bg-[#ebfffc] cursor-pointer rounded-full text-center"
            onClick={() => search(inputRef.current.value)}
          >
            <IoSearch className="text-[20px]" />
          </button>
        </div>

        <img src={weatherData.icon} className="w-[150px] mb-[10px]" />
        <p className="text-white text-7xl">{weatherData.temperature}°C</p>
        <p className="text-white text-2xl">{weatherData.location}</p>

        <div className="w-full mt-[40px] text-white flex justify-between items-center gap-15">
          <div className="flex items-center gap-3 text-[22px]">
            <img src={humidity_icon} />
            <div>
              <p>{weatherData.humidity} %</p>
              <span className="font-bold">Humidity</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[22px]">
            <img src={wind_icon} />
            <div>
              <p>{weatherData.windSpeed} Km/h</p>
              <span className="font-bold">Wind Speed</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Weather;
