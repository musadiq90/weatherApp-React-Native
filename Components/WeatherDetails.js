import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import {colors} from '../utils/index'
import {FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons'

const {PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR} = colors

export default function WeatherDetails({currentWeather}) {
    const {
        main: { feels_like, humidity},
  } = currentWeather
    return (
        <View style={styles.WeatherDetails}>
            <View style={styles.WeatherDetailsRow}>
                <View style={{...styles.WeatherDetailsBox, borderRightWidth:1, borderRightColor: BORDER_COLOR}}>
                    <Text> {feels_like}</Text>
                </View>
                <View style={styles.WeatherDetailsBox}>
                    <Text> {humidity}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create ({
    WeatherDetails : {
        marginTop : "auto",
        borderColor: BORDER_COLOR,
        margin: 15,
        borderWidth: 1,
        borderRadius: 10
    },
    WeatherDetailsRow : {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between"
    },
    WeatherDetailsBox : {
        flex: 1,
        padding: 20,

    }
})