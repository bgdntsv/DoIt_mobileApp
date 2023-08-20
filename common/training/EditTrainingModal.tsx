import React, {ReactElement} from 'react'
import {AntDesign} from '@expo/vector-icons'
import {ColorPalette} from '../../assets/colors'
import {Modal, ScrollView, StyleSheet, Text, View} from 'react-native'
import {useSelector} from 'react-redux'
import {STORE_TYPE, useAppDispatch} from '../../redux/store'
import {deleteTraining, TRAINING_TYPE} from '../../redux/slices/trainingSlice'
import {useGlobalStyles} from '../../hooks/useUI'
import {useTranslation} from 'react-i18next'
import {EXERCISE_NAME_TYPES, EXERCISES_BY_TYPES_TYPE} from '../../redux/slices/exerciseSlice'
import {CustomButton} from '../Button'

type PROPS_TYPE = {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    training: TRAINING_TYPE
}
export const EditTrainingModal = ({isOpen, setIsOpen, training}: PROPS_TYPE) => {
    const {theme} = useSelector(({ui}: STORE_TYPE) => ui)
    const dispatch = useAppDispatch()
    const {container, p} = useGlobalStyles()
    const {t} = useTranslation()

    const closeModal = () => {
        // Alert.alert(
        //     'Discard changes?',
        //     'You have unsaved changes. Are you sure to discard them and leave the screen?',
        //     [
        //         {text: 'Don\'t leave', style: 'cancel'},
        //         {text: 'Discard', style: 'destructive', onPress: () => setIsOpen(false)}
        //     ],
        //     {
        //         cancelable: true
        //     }
        // )
        setIsOpen(false)
    }

    const handleDeleteTraining = () => {
        closeModal()
        dispatch(deleteTraining(training.id))
    }

    const getContent = () => {
        const trainingsToShow: Array<ReactElement> = []
        const trainingExercises: EXERCISES_BY_TYPES_TYPE = {
            press: training.press ? [...training.press] : undefined,
            chest: training.chest ? [...training.chest] : undefined,
            back: training.back ? [...training.back] : undefined,
            hands: training.hands ? [...training.hands] : undefined,
            shoulders: training.shoulders ? [...training.shoulders] : undefined,
            legs: training.legs ? [...training.legs] : undefined
        }
        for (const exerciseType in trainingExercises) {
            if (trainingExercises[exerciseType as EXERCISE_NAME_TYPES]) {
                trainingsToShow.push(<View key={exerciseType}>
                    <Text style={styles.p}>{t(exerciseType)}</Text>
                </View>)
            }
        }
        return trainingsToShow.map(e => e)
    }

    const styles = StyleSheet.create({
        container: {
            ...container
        },
        p: {
            ...p
        },
        bold: {
            fontWeight: 'bold'
        },
        closeBtn: {
            position: 'absolute',
            right: 0,
            top: 0,
            zIndex: 1
        },
        content: {
            marginTop: 20
        }
    })

    return <Modal animationType="slide" onRequestClose={() => setIsOpen(false)} visible={isOpen}>
        <View style={styles.container}>
            <AntDesign style={styles.closeBtn} name="close" size={24} color={ColorPalette[theme].mainFont}
                       onPress={closeModal}/>
            <ScrollView style={styles.content}>
                <Text style={styles.p}><Text style={styles.bold}>{t('name')}:</Text> {training.name}</Text>
                {getContent()}
                <CustomButton title={t('delete')}
                              onPress={handleDeleteTraining}
                              icon={<AntDesign name="delete" size={24} color={ColorPalette[theme].mainFont}/>}
                              second={true}/>
            </ScrollView>

        </View>
    </Modal>
}
