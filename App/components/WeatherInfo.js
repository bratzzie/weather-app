import React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native';

import {colors} from '../styles'

const {primary_color, secondary_color, border_color} = colors;

const WeatherInfo = ({currentWeather}) => {

const {main: {temp},
       weather: [details],
       name,} = currentWeather;
const {icon, main, description } = details;
const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`

    return (
        <View style={styles.weatherInfo}>
            <Text>{name}</Text>
            <Image style={styles.weatherIcon} source={{uri: iconUrl}}/>
            <Text style={styles.textPrimary}>{temp}</Text>
            <Text style={styles.weatherDesc}>{description}</Text>
            <Text style={styles.textSecondary}>{main}</Text>
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
    },
    textPrimary : {
        fontSize: 40,
        color: primary_color
    },
    textSecondary: {
        fontSize: 20,
        color: secondary_color,
        fontWeight: '500',
        marginTop: 10
    }
})