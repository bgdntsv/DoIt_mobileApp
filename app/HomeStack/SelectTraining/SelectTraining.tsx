import React, {useEffect} from 'react'
import {ScrollView, StyleSheet, Text, View} from 'react-native'
import {STORE_TYPE} from '../../../redux/store'
import {useSelector} from 'react-redux'
import {TrainingCard} from '../../../common/training/TrainingCard'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {BackButtonNavigation} from '../../../common/BackButtonNavigation'
import {useGlobalStyles} from '../../../hooks/useUI'
import {CustomButton} from '../../../common/Button'
import {HOME_STACK_ROUTE_PROPS} from '../ExerciseNavigation'
import {useIsFocused, useNavigation} from '@react-navigation/native'
import {useTranslation} from 'react-i18next'

export const SelectTraining = () => {
    const trainings = useSelector((state: STORE_TYPE) => state.training.trainings)
    const globalStyles = useGlobalStyles()
    const navigation = useNavigation<NativeStackNavigationProp<HOME_STACK_ROUTE_PROPS>>()
    const {t} = useTranslation()
    const isFocused = useIsFocused();

    useEffect(()=>{
        if(isFocused){
            navigation.getParent()?.setOptions({headerTitle: t('select_training')})
        } else {
            navigation.getParent()?.setOptions({headerTitle: ''})
        }
    }, [isFocused])

    const goToAddTraining = () => {
        navigation.navigate('Create-training', {
            comesFromSelectTraining: true
        })
    }
    const styles = StyleSheet.create({
        container: {
            marginVertical: 0
        }
    })
    return <ScrollView style={{...globalStyles.container, ...styles.container}}>
        <BackButtonNavigation/>
        {trainings.length
            ? trainings.map(e => <TrainingCard training={e} key={e.id}/>)
            : <View>
                <Text style={globalStyles.p}>No trainings but you can create your own training</Text>
                <CustomButton title={'Create training'} onPress={goToAddTraining}/>
            </View>
        }
    </ScrollView>
}
