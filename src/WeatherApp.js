import {useState, useEffect} from 'react';
import WeatherBG from './weatherbg.jpg';
import Wind from './wind.png';
import Cloud from './cloud.png';
import Smoke from './smoke.png';
import Sun from './sun.png';
import Rain from './rain.png';
import Humidity from './humidity.png';
import Thermometer from './thermometer.png';
import Sunny from './sunny.png';

function WeatherApp () {

    const [WeatherInfo, setWeatherInfo] = useState(null);
    const [CityName, setCityName] = useState('Ahmedabad');
    const [weatherIcon, setweatherIcon] = useState(Cloud);
    const [error, seterror] = useState('none');
    const [showData, setshowData] = useState('block');

    useEffect(() => {
        getWeatherInfo();
    }, []);
    
    function getCityName(value){
        setCityName(value);
    }

    function getWeatherInfo() {
        
        let apiKey = '6cdc0c96ba5039cb7038c39f9130f6b5';
        let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${CityName}&appid=${apiKey}`;

        fetch( apiUrl )
        .then( ( response ) => response.json() )
        .then( ( weather ) => {
            if( ! ( weather.cod == 404 ) ) {
                console.log( weather );
                setWeatherInfo(weather);
                let weatIcon = WeatherInfo?.weather[0]['main'];
                console.log(WeatherInfo.weather[0].main);
                if( weatIcon === 'Clouds' ) {
                    setweatherIcon( Cloud );
                    console.log( 'cloud icon' );
                } else if( weatIcon === 'Smoke' ) {
                    setweatherIcon( Smoke );
                    console.log( 'smoke icon' );
                } else if( weatIcon === 'Clear' ) {
                    setweatherIcon( Sun );
                    console.log( 'sun icon' );
                } else if( weatIcon === 'Rain' ) {
                    setweatherIcon( Rain );
                    console.log( 'rain icon' );
                } else {
                    setweatherIcon( Cloud );
                }
                seterror( 'none' );
                setshowData( 'block' );
            } else {
                seterror( 'block' );
                setshowData( 'none' );
            }
        } )
        .catch( (err) => {
            console.log( err );
        } )
    }

    function formSubmit(e) {
        console.log( 'Form Submit' );
        e.preventDefault();
        getWeatherInfo();
    }

    return (
        <>
            <div className="weather-app">
                <div className="app-left">
                    <div className="weather-form">
                        <img src={Sunny} className="main-logo"/>
                        <img src="https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/rainy-1.svg" className="main-logo"/>
                        <h1>React Weather App</h1>
                        <div className="error-div" style={{ display: `${error}` }}>
                            <p>City Not Found!!</p>
                        </div>
                        <form className="w-form" onSubmit={formSubmit}>
                            <input type="text" className="city-name" value={CityName} placeholder="Add City Name" onChange={(event)=>getCityName(event.target.value)} required/>
                            <input type="submit" value="Search" className="search-btn" />
                        </form>
                    </div>
                </div>
                <div className="app-right">
                    <div className="weather-data">
                        <div className="weather-bg" style={{ backgroundImage: `url(${WeatherBG})` }}></div>
                        <div className="weather-info" style={{ display: `${showData}` }}>
                            <div className="city-text text-block">
                                <p>City: {WeatherInfo?.name}</p>
                            </div>
                            <div className="coord-info">
                                <div className="coord-left text-block img-block">
                                    <img src={weatherIcon} className="img-icon"/>
                                    <p>Weather: {WeatherInfo?.weather[0]['main']}</p>
                                </div>
                                <div className="coord-left text-block img-block">
                                    <img src={Thermometer} className="img-icon"/>
                                    <p>Temperature: {(WeatherInfo?.main.temp - 273.15).toFixed(2)} &deg;C</p>
                                </div>
                                <div className="text-block">
                                    <div className="img-block">
                                        <img src={Wind} className="img-icon"/>
                                        <p>Wind: {WeatherInfo?.wind.speed} km/h</p>
                                    </div>
                                </div>
                                <div className="text-block">
                                    <div className="img-block">
                                        <img src={Humidity} className="img-icon"/>
                                        <p>Humidity: {WeatherInfo?.main.humidity} %</p>
                                    </div>
                                </div>
                            </div>
                            <div className="coord-right text-block">
                                <p>Lattitude: {WeatherInfo?.coord.lat}</p>
                                <p>Longitude: {WeatherInfo?.coord.lon}</p>
                            </div>
                            <div className="coord-right text-block">
                                <p>Sunrise: {new Date(WeatherInfo?.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
                                <p>Sunset: {new Date(WeatherInfo?.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WeatherApp;