import {StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native'
import {globalStyles} from '../../assets/globalStyles'
import {useFonts} from 'expo-font'
import chestImage from '../../assets/images/chest_muscles.png'
import absImage from '../../assets/images/abs.webp'
import {ColorPalette} from '../../assets/colors'
import {useSelector} from 'react-redux'
import {STORE_TYPE} from '../../redux/store'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import React from 'react'

type PropScreensList = {
    'Chest-exercises': undefined,
    'Abs-exercises': undefined
}
export const ExercisesList = ({navigation}: NativeStackScreenProps<PropScreensList>) => {
    const [fontsLoaded] = useFonts({
        'Inter-Bold': require('../../assets/fonts/inter/Inter-Bold.ttf'),
        'Inter-Regular': require('../../assets/fonts/inter/Inter-Regular.ttf'),
        'Inter-Light': require('../../assets/fonts/inter/Inter-Light.ttf')
    })
    const {theme} = useSelector(({ui}: STORE_TYPE) => ui)
    if (!fontsLoaded) {
        return <Text>Loading</Text>
    }
    const goToChestExercises = () => {
        navigation.navigate('Chest-exercises')
    }
    const goToAbdExercises = () => {
        navigation.navigate('Abs-exercises')
    }

    const styles = StyleSheet.create({
        mainContainer: {
            flex: 1,
            backgroundColor: ColorPalette[theme].main
        },
        containerContent: {
            flex: 1,
            justifyContent: 'space-between',
            backgroundColor: ColorPalette[theme].fourth,
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
        },
        title: {
            color: ColorPalette[theme].mainFont
        }
    })
    return <View style={{...globalStyles.mainContainer, ...styles.mainContainer}}>
        <Text style={{...globalStyles.title, ...styles.title}}>Оберіть тренування на сьогодні</Text>
        <TouchableHighlight onPress={goToChestExercises} underlayColor={ColorPalette[theme].main}>
            <View style={globalStyles.container}>
                <View style={styles.containerContent}>
                    <Image style={styles.image} source={chestImage}/>
                    <Text style={{...globalStyles.p, ...styles.containerTitle}}>Груди</Text>
                </View>
            </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={goToAbdExercises} underlayColor={ColorPalette[theme].main}>
            <View style={globalStyles.container}>
                <View style={styles.containerContent}>
                    <Image style={styles.image} source={absImage}/>
                    <Text style={{...globalStyles.p, ...styles.containerTitle}}>Прес</Text>
                </View>
            </View>
        </TouchableHighlight>
    </View>
}
