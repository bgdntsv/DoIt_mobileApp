import React, {ReactElement, useState} from 'react'
import {Modal, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native'
import {ExerciseCard} from '../Exercises/ExerciseCard'
import {CustomButton} from '../../../common/Button'
import {useGlobalStyles} from '../../../hooks/useUI'
import {useSelector} from 'react-redux'
import {STORE_TYPE, useAppDispatch} from '../../../redux/store'
import {useTranslation} from 'react-i18next'
import {ColorPalette} from '../../../assets/colors'
import {AntDesign} from '@expo/vector-icons'
import {
    clearSelectedExercises,
    EXERCISE_NAME_TYPES,
    toggleSelectedExercise
} from '../../../redux/slices/exerciseSlice'
import {addTraining} from '../../../redux/slices/trainingSlice'
import uuid from 'react-native-uuid'
import {useGetDateString} from '../../../helpers/dateHelper'
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native'
import {HOME_STACK_ROUTE_PROPS} from '../ExerciseNavigation'

type PROP_TYPES = {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export const ConfirmTrainingModal = ({isOpen, setIsOpen}: PROP_TYPES) => {
    const {selectedExercises} = useSelector(({exercise}: STORE_TYPE) => exercise)
    const {t} = useTranslation()
    const {theme} = useSelector(({ui}: STORE_TYPE) => ui)
    const dispatch = useAppDispatch()
    const [name, setName] = useState('')
    const date = useGetDateString()
    const navigation = useNavigation()
    const route = useRoute<RouteProp<HOME_STACK_ROUTE_PROPS, 'Create-training'>>()

    const globalStyles = useGlobalStyles()

    const toggleType = (type: EXERCISE_NAME_TYPES) => {
        dispatch(toggleSelectedExercise({type}))
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    const saveTraining = () => {
        const id = uuid.v4().toString()
        dispatch(addTraining({
            dateCreation: new Date().getTime(),
            id,
            name: name || date,
            ...selectedExercises
        }))
        dispatch(clearSelectedExercises())
        if(route.params?.comesFromSelectTraining){
            navigation.goBack()
        }
        closeModal()
    }

    const getContent = (): ReactElement => {
        const content = []
        if (Object.keys(selectedExercises).length > 0) {
            for (const exercisesKey in selectedExercises) {
                content.push(<>
                    <View style={styles.titleBlock}>
                        <Text style={{...globalStyles.h1, ...styles.title}}>{t(exercisesKey)}</Text>
                        <AntDesign style={styles.deleteTypeIcon}
                                   name="close" size={21}
                                   color={ColorPalette[theme].mainFont}
                                   onPress={() => toggleType(exercisesKey as EXERCISE_NAME_TYPES)}
                        />
                    </View>
                    {selectedExercises[exercisesKey as EXERCISE_NAME_TYPES]?.length
                        ? selectedExercises[exercisesKey as EXERCISE_NAME_TYPES]
                            ?.map(e => <ExerciseCard exercise={e}
                                                     key={e.id} type={exercisesKey as EXERCISE_NAME_TYPES}
                                                     select={true}/>)
                        : <Text style={globalStyles.span}>Ви не обрали вправи, ми їх згенеруємо</Text>
                    }
                </>)
            }
        }
        return <View>{content.map((e, i) => <View key={i}>{e}</View>)}</View>
    }

    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            justifyContent: 'space-between'
        },
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
        },
        span: {
            transform: [{translateY: 9}, {translateX: 10}],
            backgroundColor: ColorPalette[theme].main,
            zIndex: 1,
            alignSelf: 'flex-start',
            paddingHorizontal: 3,
            color: ColorPalette[theme].second
        },
        input: {
            borderWidth: 1,
            borderColor: ColorPalette[theme].second,
            fontSize: 16,
            borderRadius: 5,
            paddingVertical: 5,
            paddingHorizontal: 10,
            color: ColorPalette[theme].second
        },

        buttonsContainer: {

        }
    })

    return <Modal visible={isOpen}
                  animationType={'slide'} onRequestClose={closeModal}>
        <View style={{...globalStyles.container, ...styles.container}}>
            <ScrollView>
                <Text style={styles.span}>{t('name')}</Text>
                <TextInput style={styles.input} value={name} placeholder={date} onChangeText={t => setName(t)}/>
                {getContent()}
            </ScrollView>
            <View style={styles.buttonsContainer}>
                <CustomButton title={t('add_training')} onPress={saveTraining}/>
                <CustomButton title={t('close')} onPress={closeModal}/>
            </View>
        </View>
    </Modal>
}
