import React, {useState} from 'react'
import {Modal, StyleSheet, Text, TextInput, View} from 'react-native'
import {ExerciseCard} from '../../../common/ExerciseCard'
import {CustomButton} from '../../../common/Button'
import {useGlobalStyles} from '../../../hooks/useUI'
import {useSelector} from 'react-redux'
import {STORE_TYPE, useAppDispatch} from '../../../redux/store'
import {useTranslation} from 'react-i18next'
import {ColorPalette} from '../../../assets/colors'
import {AntDesign} from '@expo/vector-icons'
import {clearSelectedExercises, EXERCISE_NAME_TYPES, toggleSelectedExercise} from '../../../redux/slices/exerciseSlice'
import {addTraining} from '../../../redux/slices/trainingSlice'
import uuid from 'react-native-uuid'
import {useGetDateString} from '../../../helpers/dateHelper'

type PROP_TYPES = {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export const CheckTrainingModal = ({isOpen, setIsOpen}: PROP_TYPES) => {
    const {selectedExercises} = useSelector(({exercise}: STORE_TYPE) => exercise)
    const {t} = useTranslation()
    const {theme} = useSelector(({ui}: STORE_TYPE) => ui)
    const dispatch = useAppDispatch()
    const [name, setName] = useState('')
    const date = useGetDateString()

    const globalStyles = useGlobalStyles()

    const toggleType = (type: EXERCISE_NAME_TYPES) => {
        dispatch(toggleSelectedExercise({type}))
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    const saveTraining = () => {
        const id = uuid.v4().toString()
        console.log(id)
        dispatch(addTraining({
            id,
            name: name || date,
            ...selectedExercises
        }))
        dispatch(clearSelectedExercises())
        closeModal()
    }

    const styles = StyleSheet.create({
        titleBlock: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 25,
            marginBottom: 10,
            borderTopColor: ColorPalette[theme].mainFont,
            borderTopWidth: 1,
            position: 'relative',
            height: 10
        },
        title: {
            backgroundColor: ColorPalette[theme].main,
            position: 'absolute',
            top: '-260%',
            padding: 5,
            paddingLeft: 0,
            left: 0
        },
        deleteTypeIcon: {
            position: 'absolute',
            padding: 5,
            right: 0,
            backgroundColor: ColorPalette[theme].main,
            top: '-170%'
        }
    })

    return <Modal visible={isOpen}
                  animationType={'slide'}>
        <View style={globalStyles.container}>
            <TextInput value={name} defaultValue={date} onChangeText={t => setName(t)}/>
            {selectedExercises.chest
                && <>
                    <View style={styles.titleBlock}>
                        <Text style={{...globalStyles.h1, ...styles.title}}>{t('chest')}</Text>
                        <AntDesign style={styles.deleteTypeIcon}
                                   name="close" size={21}
                                   color={ColorPalette[theme].mainFont}
                                   onPress={() => toggleType('chest')}
                        />
                    </View>
                    {selectedExercises.chest.map(e => <ExerciseCard exercise={e} key={e.id}/>)}
                </>}

            {selectedExercises.press
                && <>
                    <View style={styles.titleBlock}>
                        <Text style={{...globalStyles.h1, ...styles.title}}>{t('press')}</Text>
                        <AntDesign style={styles.deleteTypeIcon}
                                   name="close" size={21}
                                   color={ColorPalette[theme].mainFont}
                                   onPress={() => toggleType('press')}
                        />
                    </View>
                    {selectedExercises.press.length > 0
                        ? selectedExercises.press.map(e => <ExerciseCard exercise={e} key={e.id}/>)
                        : <Text style={globalStyles.span}>Ви не обрали вправи, ми їх згенеруємо</Text>}
                </>}
            <CustomButton title={'Add training'} onPress={saveTraining}/>
            <CustomButton title={'close'} onPress={closeModal}/>
        </View>
    </Modal>
}
