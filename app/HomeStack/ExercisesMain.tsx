import {StyleSheet, Text, View, Image, TouchableHighlight, ScrollView} from 'react-native'
import {ColorPalette} from '../../assets/colors'
import {useSelector} from 'react-redux'
import {STORE_TYPE} from '../../redux/store'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import React from 'react'
import {useGlobalStyles} from '../../hooks/useUI'
import robotImage from '../../assets/images/robot_sportsman.png'
import sportsmanImage from '../../assets/images/sportsman_writing.png'

type PropScreensList = {
    'Chest-exercises': undefined,
    'Abs-exercises': undefined,
    'Generate-exercise': undefined,
    'Create-exercise': undefined
}
export const ExercisesMain = ({navigation}: NativeStackScreenProps<PropScreensList>) => {
    const {theme} = useSelector(({ui}: STORE_TYPE) => ui)
    const globalStyles = useGlobalStyles()

    const goToExercises = (route: 'Chest-exercises' | 'Abs-exercises' | 'Generate-exercise' | 'Create-exercise') => {
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
        <TouchableHighlight onPress={()=>goToExercises('Generate-exercise')} underlayColor={ColorPalette[theme].main}>
            <View style={styles.containerBlock}>
                <View style={styles.containerContent}>
                    <Image source={robotImage} style={styles.image}/>
                    <Text style={{...globalStyles.p, ...styles.containerTitle}}>Генерувати тренування</Text>
                </View>
            </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={()=>goToExercises('Create-exercise')} underlayColor={ColorPalette[theme].main}>
            <View style={styles.containerBlock}>
                <View style={styles.containerContent}>
                    <Image source={sportsmanImage} style={styles.image}/>
                    <Text style={{...globalStyles.p, ...styles.containerTitle}}>Створити тренування</Text>
                </View>
            </View>
        </TouchableHighlight>
    </ScrollView>
}
