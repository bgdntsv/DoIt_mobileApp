import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import image from '../../assets/images/no_connection_min.jpg'

export const NoInternetMedia = () => {
    const styles = StyleSheet.create({
        container: {
            height: 200,
            width: '100%',
        },
        img: {
            width: '100%',
            height: '100%',
        },
    })
    return (
        <View style={styles.container}>
            <Image style={styles.img} source={image} />
        </View>
    )
}
