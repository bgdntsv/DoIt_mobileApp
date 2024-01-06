import { BackHandler, ImageSourcePropType, ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { useGlobalStyles } from '../../../hooks/useUI'
import { useTranslation } from 'react-i18next'
import pressImg from '../../../assets/images/abs.webp'
import chestImg from '../../../assets/images/chest_muscles.png'
import { BackButtonNavigation } from '../../../common/BackButtonNavigation'
import { useSelector } from 'react-redux'
import { STORE_TYPE, useAppDispatch } from '../../../redux/store'
import { clearSelectedExercises, EXERCISE_TYPE } from '../../../redux/slices/exerciseSlice'
import { AntDesign } from '@expo/vector-icons'
import { ColorPalette } from '../../../assets/colors'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { HOME_STACK_ROUTE_PROPS } from '../ExerciseNavigation'
import { ExerciseTypeCard } from './components/ExerciseTypeCard'

export const CreateTraining = () => {
    const { theme } = useSelector(({ ui }: STORE_TYPE) => ui)
    const { selectedExercisesByTypes, allSelectedExercises } = useSelector(({ exercise }: STORE_TYPE) => exercise)
    const { t } = useTranslation()
    const { styles: globalStyles } = useGlobalStyles()
    const navigation = useNavigation<NativeStackNavigationProp<HOME_STACK_ROUTE_PROPS>>()
    const isFocused = useIsFocused()
    const dispatch = useAppDispatch()

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', onBackButtonPress)

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', onBackButtonPress)
        }
    }, [])

    useEffect(() => {
        if (isFocused) {
            navigation.getParent()?.setOptions({ headerTitle: t('select_trainings_zone') })
        }
    }, [isFocused])

    const exercises: Array<{
        name: EXERCISE_TYPE
        img: ImageSourcePropType | string
    }> = [
        {
            name: 'press',
            img: pressImg,
        },
        {
            name: 'chest',
            img: chestImg,
        },
        {
            name: 'legs',
            img: '',
        },
        {
            name: 'hands',
            img: '',
        },
        {
            name: 'shoulders',
            img: '',
        },
        {
            name: 'back',
            img: '',
        },
    ]
    const confirmTraining = () => {
        navigation.navigate('Confirm-training')
    }
    const clearSelected = () => {
        dispatch(clearSelectedExercises())
    }
    const onBackButtonPress = () => {
        clearSelected()
        navigation.goBack()
        return true
    }
    const styles = StyleSheet.create({
        container: {
            ...globalStyles.container,
            marginVertical: 0,
        },
        startButton: {
            position: 'absolute',
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
        },
        headerButton: {
            paddingHorizontal: 16,
            paddingVertical: 5,
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
    })
    return (
        <>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <BackButtonNavigation onPress={clearSelected} />
                </View>
                {exercises.map((e) => (
                    <ExerciseTypeCard
                        key={e.name}
                        title={e.name}
                        isSelected={!!selectedExercisesByTypes[e.name].length}
                        img={e.img}
                    />
                ))}
            </ScrollView>

            {allSelectedExercises.length > 0 && (
                <View style={styles.fixedScreen}>
                    <AntDesign name="play" size={54} color={ColorPalette[theme].secondFont} onPress={confirmTraining} />
                </View>
            )}
        </>
    )
}
