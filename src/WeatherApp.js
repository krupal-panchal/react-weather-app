import {useState, useEffect} from 'react';
import WeatherBG from './weatherbg.jpg';
import Wind from './wind.png';
import Cloud from './cloud.png';
import Smoke from './smoke.png';

function WeatherApp () {

    const [WeatherInfo, setWeatherInfo] = useState(null);
    const [CityName, setCityName] = useState('Ahmedabad');
    const [weatherIcon, setweatherIcon] = useState(Cloud);

    useEffect(() => {
        getWeatherInfo();
    }, []);
    
    function getCityName(event){
        let city = event.target.value;
        setCityName(city);
    }

    function formSubmit(e) {
        e.preventDefault();
        getWeatherInfo();
    }

    function getWeatherInfo() {
        
        let apiKey = '6cdc0c96ba5039cb7038c39f9130f6b5';
        let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${CityName}&appid=${apiKey}`;

        fetch( apiUrl )
        .then( ( response ) => response.json() )
        .then( ( weather ) => {
            if( ! weather.Error ) {
                console.log( weather );
                setWeatherInfo(weather);
                let weatIcon = WeatherInfo.weather[0]['main'];
                if( weatIcon == 'Clouds' ) {
                    setweatherIcon( Cloud );
                } else if( weatIcon == 'Smokes' ) {
                    setweatherIcon( Smoke );
                } else {
                    setweatherIcon( Cloud );
                }
            } else {
                console.log( 'Data Not Found!!' );

            }
        } )
        .catch( (err) => {
            console.log( 'Got Error' );
            console.log( err );
        } )

    }

    return (
        <>
            <div className="weather-app">
                <div className="app-left">
                    <div className="weather-form">
                        <form className="w-form" onSubmit={formSubmit}>
                            <input type="text" className="city-name" value={CityName} placeholder="Add City Name" onChange={getCityName}/>
                            <input type="submit" value="Search" className="search-btn" />
                        </form>
                    </div>
                </div>
                <div className="app-right">
                    <div className="weather-data">
                        <div className="weather-bg" style={{ backgroundImage: `url(${WeatherBG})` }}></div>
                        <div className="weather-info">
                            <div className="city-text text-block">
                                <p>City: {CityName}</p>
                            </div>
                            <div className="coord-info">
                                <div className="coord-left text-block img-block">
                                    <img src={weatherIcon} className="img-icon"/>
                                    <p>Weather: {WeatherInfo?.weather[0]['main']}</p>
                                </div>
                                <div className="coord-right text-block">
                                        <p>Lattitude: {WeatherInfo?.coord.lat}</p>
                                        <p>Longitude: {WeatherInfo?.coord.lon}</p>
                                </div>
                            </div>
                            <div className="text-block">
                                <div className="img-block">
                                    <img src={Wind} className="img-icon"/>
                                    <p>Wind: {WeatherInfo?.wind.speed} km/h</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WeatherApp;