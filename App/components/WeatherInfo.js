import React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native';

const WeatherInfo = ({currenWeather}) => {

const {main: {temp},
       weather: [details],
       name} = currenWeather;
const {icon, main, description } = details;
const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`

    return (
        <View style={styles.weatherInfo}>
            <Text>{name}</Text>
            <Image style={styles.weatherIcon} source={{uri: iconUrl}}/>
            <Text>{temp}</Text>
            <Text style={styles.weatherDesc}>{description}</Text>
            <Text>{main}</Text>
        </View>
    )
}

export default WeatherInfo

const styles = StyleSheet.create({
    weatherInfo: {
        alignItems: 'center'
    },
    weatherIcon: {
        width: 100,
        height: 100
    },
    weatherDesc:{
        textTransform: 'capitalize'
    }
})