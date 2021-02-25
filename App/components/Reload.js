import React from 'react'
import { StyleSheet, Platform, View } from 'react-native'
import {Ionicons} from '@expo/vector-icons'

import { colors } from '../styles';
export default function Reload({load}) {
    const reloadIconName = Platform.OS === 'ios' ? 'ios-refresh' : 'md-refresh';

    return (
        <View style={styles.reloadIcon}>
            <Ionicons onPress={load} name={reloadIconName} size={24} color={colors.primary_color} />
        </View>
    )
}

const styles = StyleSheet.create({
    reloadIcon: {
        position: 'absolute',
        top: 30,
        right: 20,
    }
})