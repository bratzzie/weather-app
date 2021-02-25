import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location'
import WeatherInfo from './App/components/WeatherInfo';
import UnitsPicker from './App/components/UnitsPicker';
import { colors } from './App/styles';
import Reload from './App/components/Reload';
import WeatherDetails from './App/components/WeatherDetails';
import{WEATHER_API_KEY} from '@env'

const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'

export default function App() {
const [errorMessage, setErrorMessage] = useState(null);
const [currentWeather, setCurrentWeather] = useState(null);
const [unitsSystem, setUnitSystem] = useState('metric');

useEffect(() => {
  load()
}, [unitsSystem])

async function load() {
  setCurrentWeather(null);
  setErrorMessage(null); 
  try {
    let {status} = await Location.requestPermissionsAsync();

    if(status !== 'granted'){
      setErrorMessage('Access to the location is needed to run this app properly');
      return;
    }
    const location = await Location.getCurrentPositionAsync()

    const {latitude, longitude} = location.coords;

    const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`
    const response = await fetch(weatherUrl);
    const result = await response.json();

    if(response.ok){
      setCurrentWeather(result);
    }
    else{
      setErrorMessage(result.message)
    }
  
  } 
  catch (error) {
    setErrorMessage(error.message);
  }

 }

 if(currentWeather){
  
   return (
    <View style={styles.container}>
      <StatusBar style="auto" />
     <View style={styles.main}>
       <UnitsPicker unitsSystem = {unitsSystem} setUnitSystem = {setUnitSystem} />
       <Reload load={load} />
       <WeatherInfo currentWeather={currentWeather} />
     </View>
      <WeatherDetails currentWeather={currentWeather} unitsSystem={unitsSystem}/>
    </View>
  );
 }
 else if (errorMessage){
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Reload load={load} />
      <Text style={{textAlign: 'center'}}>{errorMessage}</Text>
    </View>
  );
 }
 else{
   return(
    <View style={styles.container}>
    <StatusBar style="auto" />
   <ActivityIndicator size="large" color={colors.primary_color}/>
  </View>
   );
 }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  main: {
    justifyContent: 'center',
    flex: 1
  }
});
