import {useSelector} from 'react-redux'
import {ScrollView, StyleSheet, Text, TextInput, View, Keyboard} from 'react-native'
import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {STORE_TYPE} from '../../../redux/store'
import {useGlobalStyles} from '../../../hooks/useUI'
import {ExerciseCard} from './ExerciseCard'
import {EXERCISE_TYPE} from '../../../redux/slices/exerciseSlice'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {BackButtonNavigation} from '../../../common/BackButtonNavigation'
import {useTranslation} from 'react-i18next'
import {CustomButton} from '../../../common/Button'
import {HOME_STACK_ROUTE_PROPS} from '../ExerciseNavigation'
import {RouteProp, useIsFocused, useNavigation, useRoute} from '@react-navigation/native'
import {AntDesign} from '@expo/vector-icons'
import {ColorPalette} from '../../../assets/colors'
import {ConfirmTrainingModal} from '../CreateExercise/ConfirmTrainingModal'

export const ExerciseType = () => {
    const exercisesState = useSelector<STORE_TYPE, Array<EXERCISE_TYPE>>(({exercise}) => exercise.exercises)
    const globalStyles = useGlobalStyles()
    const {theme} = useSelector(({ui}: STORE_TYPE) => ui)
    const exercises = useMemo(() => exercisesState, [exercisesState])
    const {t} = useTranslation()
    const navigation = useNavigation<NativeStackNavigationProp<HOME_STACK_ROUTE_PROPS>>()
    const route = useRoute<RouteProp<HOME_STACK_ROUTE_PROPS, 'Exercises-type'>>()
    const exercisesType = route.params.exerciseType
    const isFocused = useIsFocused()
    const [searchString, setSearchString] = useState('')
    const [isSearchSelected, setIsSearchSelected] = useState(false)
    const {selectedExercises} = useSelector(({exercise}: STORE_TYPE) => exercise)
    const [isOpenModal, setIsOpenModal] = useState(false)

    useEffect(() => {
        if (isFocused) {
            navigation.getParent()?.setOptions({headerTitle: t('select_exercise')})
        }
    }, [isFocused])

    useEffect(() => {
        Keyboard.addListener('keyboardDidHide', ()=> {
            closeSearch()
        })
        return () => {
            Keyboard.removeAllListeners('keyboardDidHide')
        }
    }, [])

    const getContent = useCallback(
        () => {
            const exercisesToShow = exercises
                .filter(e => e.muscleArea.find(m => m.includes(exercisesType, 0)))
                .filter(e => e.name.toLowerCase().includes(searchString.toLowerCase()))
                .sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
                .map((e) => {
                    return <View key={e.id}>
                        <ExerciseCard exercise={e} type={exercisesType} select={true}/>
                    </View>
                })
            return exercisesToShow.length
                ? exercisesToShow
                : <>
                    <Text style={globalStyles.p}>{t(searchString
                        ? 'no_exercises_with_this_name' : 'no_exercises')}</Text>
                    <CustomButton title={t('add_exercise')} onPress={goToAddExercise}/>
                </>
        },
        [exercises, searchString]
    )

    const goToAddExercise = () => {
        navigation.getParent()?.navigate('AddExercise')
    }

    const openSearch = () => {
        setIsSearchSelected(true)
    }

    const closeSearch = () => {
        setIsSearchSelected(false)
    }

    const clearSearchString = () => {
        setSearchString('')
        closeSearch()
    }

    const confirmTraining = () => {
        setIsOpenModal(true)
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            marginVertical: 0
        },
        header: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 8
        },
        inputBlock: {
            borderBottomColor: ColorPalette[theme].mainFont,
            borderBottomWidth: 1,
            width: '50%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        input: {
            ...globalStyles.span,
            marginLeft: 8,
            overflow: 'hidden',
            flex: 4
        },
        inputCloseBtn: {
            marginLeft: 8,
            alignSelf: 'stretch',
            flex: 1
        },
        fixedScreen: {
            position: 'absolute',
            bottom: 12,
            right: 12,
            backgroundColor: ColorPalette[theme].second,
            height: 60,
            width: 60,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 28
        }
    })

    return <>
        <ScrollView style={{...globalStyles.container, ...styles.container}}>
            <BackButtonNavigation/>
            <View style={styles.header}>
                <Text style={globalStyles.h1}>{t(exercisesType)}</Text>
                {
                    (isSearchSelected || searchString)
                        ? <View style={styles.inputBlock}>
                            <TextInput value={searchString}
                                       autoFocus={true}
                                       onBlur={closeSearch}
                                       onChangeText={setSearchString}
                                       style={styles.input} autoCorrect={false}/>
                            <AntDesign name="close"
                                       size={24}
                                       color={ColorPalette[theme].mainFont}
                                       onPress={clearSearchString}
                                       style={styles.inputCloseBtn}/>
                        </View>
                        :
                        <AntDesign name="search1" size={24} color={ColorPalette[theme].mainFont} onPress={openSearch}/>
                }
            </View>
            {getContent()}

        </ScrollView>
        {Object.keys(selectedExercises).length > 0
            && <View style={styles.fixedScreen}>
                <AntDesign name="play"
                           size={54}
                           color={ColorPalette[theme].secondFont}
                           onPress={confirmTraining}/>
            </View>}
        <ConfirmTrainingModal isOpen={isOpenModal} setIsOpen={setIsOpenModal}/>
    </>
}
