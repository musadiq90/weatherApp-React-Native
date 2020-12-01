import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import * as Location from "expo-location";
import WeatherInfo from './Components/WeatherInfo'
import UnitsPicker from './Components/UnitsPicker'
import { colors } from './utils/index'
import ReloadIcon from './Components/ReloadIcon'
import WeatherDetails from './Components/WeatherDetails'

const WEATHER_API_KEY = "7137b4fed3014aef83622ced40260ca9 ";
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'

export default function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, set_current_weather] = useState(null);
  const [unitsSystem, setUnitsSystem] = useState('metric');

  useEffect(() => {
    load();
  }, [unitsSystem]); 
  async function load() {
    set_current_weather(null)
    setErrorMessage(null)

    try {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMessage("Access to location is needed to run this app");
        return;
      }
      const location = await Location.getCurrentPositionAsync();
      
      const { latitude, longitude } = location.coords;
      const weather_url = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`
      
      const response = await fetch(weather_url)

      const result = await response.json()

      if(response.ok){
        set_current_weather(result)
      } else {
        setErrorMessage(result.message)
      }


    } catch (error) {
      setErrorMessage(error.message)
    }
  }
  if(currentWeather) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main} >
          <UnitsPicker unitsSystem={unitsSystem} setUnitsSystem={setUnitsSystem} />  
          <ReloadIcon load={load} />      
          <WeatherInfo currentWeather={currentWeather} />
        </View>
        <WeatherDetails currentWeather={currentWeather} />
        
      </View>
    );
  }
  else if (errorMessage) {
    return (
      <View style={styles.container}>
        <Text>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    )
  }
  else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
        <StatusBar style="auto" />
      </View>
    )
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  main: {
    justifyContent: 'center',
    flex: 1
  }
});
