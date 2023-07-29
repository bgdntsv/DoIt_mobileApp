import {StyleSheet, Text, View, Image, TouchableHighlight, ScrollView} from 'react-native'
import chestImage from '../../assets/images/chest_muscles.png'
import absImage from '../../assets/images/abs.webp'
import {ColorPalette} from '../../assets/colors'
import {useSelector} from 'react-redux'
import {STORE_TYPE} from '../../redux/store'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import React from 'react'
import {useGlobalStyles} from '../../hooks/useUI'

type PropScreensList = {
    'Chest-exercises': undefined,
    'Abs-exercises': undefined
}
export const ExercisesList = ({navigation}: NativeStackScreenProps<PropScreensList>) => {
    const {theme} = useSelector(({ui}: STORE_TYPE) => ui)
    const globalStyles = useGlobalStyles()

    const goToExercises = (route: 'Chest-exercises' | 'Abs-exercises') => {
        navigation.navigate(route)
    }

    const styles = StyleSheet.create({
        containerBlock: {
            height: 200,
            borderRadius: 5,
            overflow: 'hidden',
            marginVertical: 8
        },
        containerContent: {
            flex: 1,
            justifyContent: 'space-between',
            backgroundColor: ColorPalette[theme].fourth
        },
        containerTitle: {
            paddingVertical: 8,
            paddingHorizontal: 12,
            color: ColorPalette[theme].secondFont
        },
        image: {
            height: '100%',
            width: '100%',
            flex: 4
        }
    })
    return <ScrollView style={globalStyles.container}>
        <Text style={globalStyles.h1}>Оберіть тренування на сьогодні</Text>
        <TouchableHighlight onPress={()=>goToExercises('Chest-exercises')} underlayColor={ColorPalette[theme].main}>
            <View style={styles.containerBlock}>
                <View style={styles.containerContent}>
                    <Image style={styles.image} source={chestImage}/>
                    <Text style={{...globalStyles.p, ...styles.containerTitle}}>Груди</Text>
                </View>
            </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={()=>goToExercises('Abs-exercises')} underlayColor={ColorPalette[theme].main}>
            <View style={styles.containerBlock}>
                <View style={styles.containerContent}>
                    <Image style={styles.image} source={absImage}/>
                    <Text style={{...globalStyles.p, ...styles.containerTitle}}>Прес</Text>
                </View>
            </View>
        </TouchableHighlight>
    </ScrollView>
}
