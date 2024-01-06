import { useSelector } from 'react-redux'
import { Keyboard, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useTranslation } from 'react-i18next'
import { MaterialIcons } from '@expo/vector-icons'
import { RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import { STORE_TYPE, useAppDispatch } from '../../../../redux/store'
import { EXERCISE, toggleSelectedExercise } from '../../../../redux/slices/exerciseSlice'
import { useGlobalStyles } from '../../../../hooks/useUI'
import { HOME_STACK_ROUTE_PROPS } from '../../ExerciseNavigation'
import { CustomButton } from '../../../../common/Button'
import { ColorPalette } from '../../../../assets/colors'
import { BackButtonNavigation } from '../../../../common/BackButtonNavigation'
import { Tooltip } from '../../../../common/Tooltip'
import { ExerciseCard } from './ExerciseCard'
import { CustomModal } from '../../../../common/CustomModal'

export const ExerciseType = () => {
    const exercisesState = useSelector<STORE_TYPE, Array<EXERCISE>>(({ exercise }) => exercise.exercises)
    const { styles: globalStyles, inputProps } = useGlobalStyles()
    const { theme } = useSelector(({ ui }: STORE_TYPE) => ui)
    const exercises = useMemo(() => exercisesState, [exercisesState])
    const { t } = useTranslation()
    const navigation = useNavigation<NativeStackNavigationProp<HOME_STACK_ROUTE_PROPS>>()
    const route = useRoute<RouteProp<HOME_STACK_ROUTE_PROPS, 'Exercises-type'>>()
    const exerciseType = route.params.exerciseType
    const exercisesByType = useSelector<STORE_TYPE, Array<EXERCISE>>(
        ({ exercise }) => exercise.exercisesByType[exerciseType]
    )
    const isFocused = useIsFocused()
    const [searchString, setSearchString] = useState('')
    const [isSearchSelected, setIsSearchSelected] = useState(false)
    const { selectedExercisesByTypes } = useSelector(({ exercise }: STORE_TYPE) => exercise)
    const dispatch = useAppDispatch()
    const isExercisesAlreadySelected = useMemo(
        () => selectedExercisesByTypes[exerciseType].length > 0,
        [selectedExercisesByTypes]
    )
    const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false)
    const [generateExercisesCount, setGenerateExercisesCount] = useState('3')

    useEffect(() => {
        if (isFocused) {
            navigation.getParent()?.setOptions({ headerTitle: t('select_exercise') })
        }
    }, [isFocused])

    useEffect(() => {
        Keyboard.addListener('keyboardDidHide', () => {
            closeSearch()
        })
        return () => {
            Keyboard.removeAllListeners('keyboardDidHide')
        }
    }, [])

    const getContent = useCallback(() => {
        const exercisesToShow = exercises
            .filter((e) => e.muscleArea.find((m) => m.includes(exerciseType, 0)))
            .filter((e) => e.name.toLowerCase().includes(searchString.toLowerCase()))
            .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
            .map((e) => {
                return (
                    <View key={e.id}>
                        <ExerciseCard exercise={e} type={exerciseType} select={true} />
                    </View>
                )
            })
        return exercisesToShow.length ? (
            exercisesToShow
        ) : (
            <View style={styles.pdt20}>
                <Text style={globalStyles.p}>{t(searchString ? 'no_exercises_with_this_name' : 'no_exercises')}</Text>
                <CustomButton title={t('add_exercise')} onPress={goToAddExercise} />
            </View>
        )
    }, [exercises, searchString])

    const generateExercises = () => {
        if (!exercisesByType.length) {
            return
        }
        let exercisesIds = exercisesByType.map((e) => e.id)
        for (let i = 0; i < Number.parseInt(generateExercisesCount); i++) {
            const randomId = Math.round(Math.random() * exercisesIds.length - 1)
            const exercise = exercisesByType.find((e) => e.id === exercisesIds[randomId])
            if (exercise) {
                dispatch(toggleSelectedExercise({ exercise: exercise, type: exerciseType }))
            }
            exercisesIds = exercisesIds.filter((e) => e !== exercisesIds[randomId])
            if (!exercisesIds.length) {
                return
            }
        }
        closeGenerateModal()
        navigation.goBack()
    }

    const closeGenerateModal = () => {
        setIsGenerateModalOpen(false)
    }

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
        navigation.navigate('Confirm-training')
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            marginVertical: 0,
        },
        header: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 8,
        },
        inputBlock: {
            borderBottomColor: ColorPalette[theme].mainFont,
            borderBottomWidth: 1,
            width: '50%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        input: {
            ...globalStyles.span,
            marginLeft: 8,
            overflow: 'hidden',
            flex: 4,
        },
        inputCloseBtn: {
            marginLeft: 8,
            alignSelf: 'stretch',
            flex: 1,
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
            borderRadius: 28,
        },
        pdt20: {
            paddingTop: 20,
        },
        generateExerciseInput: {
            ...globalStyles.input,
            borderRadius: 5,
            borderColor: ColorPalette[theme].mainFont,
            borderWidth: 1,
        },
    })

    return (
        <>
            <ScrollView style={{ ...globalStyles.container, ...styles.container }}>
                <BackButtonNavigation />

                {/*Header*/}
                <View style={styles.header}>
                    <Text style={globalStyles.h1}>{t(exerciseType)}</Text>
                    {isSearchSelected || searchString ? (
                        <View style={styles.inputBlock}>
                            <TextInput
                                {...inputProps}
                                value={searchString}
                                autoFocus={true}
                                onBlur={closeSearch}
                                onChangeText={setSearchString}
                                style={styles.input}
                                autoCorrect={false}
                            />
                            <MaterialIcons
                                name="close"
                                size={24}
                                color={ColorPalette[theme].mainFont}
                                onPress={clearSearchString}
                                style={styles.inputCloseBtn}
                            />
                        </View>
                    ) : (
                        <MaterialIcons
                            name="search"
                            size={24}
                            color={ColorPalette[theme].mainFont}
                            onPress={openSearch}
                        />
                    )}
                </View>

                {/*Generate exercises*/}
                {!isExercisesAlreadySelected && (
                    <CustomButton
                        title={t('generate_exercises')}
                        onPress={() => setIsGenerateModalOpen(true)}
                        icon={
                            <Tooltip content={'We will generate exercises automatically'}>
                                <MaterialIcons size={26} name={'info'} color={ColorPalette[theme].secondFont} />
                            </Tooltip>
                        }
                    />
                )}

                {/*ExerciseComponents*/}
                {getContent()}
            </ScrollView>

            {/*Checkout training*/}
            {isExercisesAlreadySelected && (
                <View style={styles.fixedScreen}>
                    <MaterialIcons
                        name="play-arrow"
                        size={54}
                        color={ColorPalette[theme].secondFont}
                        onPress={confirmTraining}
                    />
                </View>
            )}
            {/*Generate training modal*/}
            <CustomModal visible={isGenerateModalOpen} onRequestClose={closeGenerateModal}>
                <Text style={globalStyles.p}>Enter count of exercises to generate for this muscle type</Text>
                <TextInput
                    {...inputProps}
                    keyboardType={'numeric'}
                    value={generateExercisesCount}
                    onChangeText={(t) => setGenerateExercisesCount(t)}
                    style={styles.generateExerciseInput}
                />
                <CustomButton title={'Generate'} onPress={generateExercises} />
            </CustomModal>
        </>
    )
}
