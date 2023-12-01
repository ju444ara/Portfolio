
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';

export default function WeatherScreen({ route }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const apiKey = '0874f7a6741c8bd9da5817e016c79a0c';
    const city = route.params.city;

    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [route.params.city]);

  const getBackgroundColor = () => {
    if (!weather) return '#3498db'; // Default background color

    const weatherCondition = weather.weather[0].main.toLowerCase();

    switch (weatherCondition) {
      case 'clear':
        return '#f39c12'; // Sunny
      case 'clouds':
        return '#bdc3c7'; // Cloudy
      case 'rain':
        return '#2980b9'; // Rainy
      case 'snow':
        return '#ecf0f1'; // Snowy
      case 'thunderstorm':
        return '#8e44ad'; // Thunderstorm
      default:
        return '#3498db'; // Default background color
    }
  };

  const renderWeatherIcon = () => {
    if (!weather) return null;

    const weatherCondition = weather.weather[0].main.toLowerCase();

    switch (weatherCondition) {
      case 'clear':
        return <Image source={require('./assets/sun.jpg')} style={styles.icon} />;
      case 'clouds':
        return <Image source={require('./assets/set-of-realistic-smoke-or-cloud-isolated-on-transparency-background-png.png')} style={styles.icon} />;
      case 'rain':
        return <Image source={require('./assets/rain-cloud-wet-season-storm-weather-drizzle-thunderstorm-drawing-turquoise-png-clipart.jpg')} style={styles.icon} />;
      case 'snow':
        return <Image source={require('./assets/set-of-realistic-smoke-or-cloud-isolated-on-transparency-background-png.png')} style={styles.icon} />;
      case 'thunderstorm':
        return <Image source={require('./assets/rain-cloud-wet-season-storm-weather-drizzle-thunderstorm-drawing-turquoise-png-clipart.jpg')} style={styles.icon} />;
      default:
        return null;
    }
  };

  return (
    <LinearGradient
      colors={[getBackgroundColor(), '#34495e']}
      style={styles.container}
    >
      {weather ? (
        <View style={styles.weatherInfo}>
          {renderWeatherIcon()}
          <Text style={styles.city}>{weather.name}</Text>
          <Text style={styles.temperature}>
            {Math.round(weather.main.temp - 273.15)}°C
          </Text>
          <Text style={styles.description}>{weather.weather[0].description}</Text>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherInfo: {
    alignItems: 'center',
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  temperature: {
    fontSize: 48,
    color: 'white',
  },
  description: {
    fontSize: 18,
    color: 'white',
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});
