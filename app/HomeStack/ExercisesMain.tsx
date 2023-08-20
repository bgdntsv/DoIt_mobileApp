import {StyleSheet, Text, View, Image, TouchableHighlight, ScrollView} from 'react-native'
import {ColorPalette} from '../../assets/colors'
import {useSelector} from 'react-redux'
import {STORE_TYPE} from '../../redux/store'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import React, {useEffect} from 'react'
import {useGlobalStyles} from '../../hooks/useUI'
import robotImage from '../../assets/images/robot_sportsman.png'
import sportsmanImage from '../../assets/images/sportsman_writing.png'
import selectTrainingImage from '../../assets/images/select_training.jpg'
import {useTranslation} from 'react-i18next'
import {HOME_STACK_ROUTE_PROPS} from './ExerciseNavigation'
import {useIsFocused, useNavigation} from '@react-navigation/native'

export const ExercisesMain = () => {
    const {theme} = useSelector(({ui}: STORE_TYPE) => ui)
    const globalStyles = useGlobalStyles()
    const {t} = useTranslation()

    const navigation = useNavigation<NativeStackNavigationProp<HOME_STACK_ROUTE_PROPS>>()
    const isFocused = useIsFocused();

    useEffect(()=>{
        if(isFocused){
            navigation.getParent()?.setOptions({headerTitle: ''})
        }
    }, [isFocused])

    const goToExercises = (route: any) => {
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
        <TouchableHighlight onPress={()=>goToExercises('Select-training')} underlayColor={ColorPalette[theme].main}>
            <View style={styles.containerBlock}>
                <View style={styles.containerContent}>
                    <Image source={selectTrainingImage} style={styles.image}/>
                    <Text style={{...globalStyles.p, ...styles.containerTitle}}>{t('training_select')}</Text>
                </View>
            </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={()=>goToExercises('Create-training')} underlayColor={ColorPalette[theme].main}>
            <View style={styles.containerBlock}>
                <View style={styles.containerContent}>
                    <Image source={sportsmanImage} style={styles.image}/>
                    <Text style={{...globalStyles.p, ...styles.containerTitle}}>{t('training_create')}</Text>
                </View>
            </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={()=>goToExercises('Generate-training')} underlayColor={ColorPalette[theme].main}>
            <View style={styles.containerBlock}>
                <View style={styles.containerContent}>
                    <Image source={robotImage} style={styles.image}/>
                    <Text style={{...globalStyles.p, ...styles.containerTitle}}>{t('generate_training')}</Text>
                </View>
            </View>
        </TouchableHighlight>
    </ScrollView>
}
