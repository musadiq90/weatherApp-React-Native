import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { Picker } from '@react-native-picker/picker'

export default function UnitsPicker({unitsSystem, setUnitsSystem}) {
    return (
        <View style = {styles.unitsSystem}>
            <Picker 
                selectedValue={unitsSystem} 
                onValueChange={(item)=> setUnitsSystem(item)} 
                mode="dropdown" 
                itemStyle={{fontSize: 12}}
            >
                <Picker.Item label="C°" value="metric" />
                <Picker.Item label="F°" value="imperial" />
            </Picker>
        </View>
    )
}

const styles = StyleSheet.create({
    unitsSystem: {
        position: "absolute",

        ... Platform.select({
            ios: {
                top: -30
            },
            android: {
                top: 70
            }


        }),
        left: 20,
        width: 100,
        height:50,
        
    }
})