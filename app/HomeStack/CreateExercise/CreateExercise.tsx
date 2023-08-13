import {
    StyleSheet,
    ScrollView,
    ImageSourcePropType,
    View,
} from 'react-native'
import React, {useState} from 'react'
import {useGlobalStyles} from '../../../hooks/useUI'
import {ExerciseTypeBlock} from '../../../common/ExerciseTypeBlock'
import {useTranslation} from 'react-i18next'
import pressImg from '../../../assets/images/abs.webp'
import chestImg from '../../../assets/images/chest_muscles.png'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {BackButtonNavigation} from '../../../common/BackButtonNavigation'
import {useSelector} from 'react-redux'
import {STORE_TYPE} from '../../../redux/store'
import {EXERCISE_NAME_TYPES} from '../../../redux/slices/exerciseSlice'
import {AntDesign} from '@expo/vector-icons'
import {ColorPalette} from '../../../assets/colors'
import {CheckTrainingModal} from './CheckTrainingModal'

export type EXERCISES_NAVIGATION_TYPES = {
    'Chest-exercises': undefined,
    'Abs-exercises': undefined,
    'Legs-exercises': undefined,
    'Hands-exercises': undefined,
    'Shoulders-exercises': undefined,
    'Back-exercises': undefined
}
export type EXERCISES_ROUTES_TYPES =
    'Chest-exercises'
    | 'Legs-exercises'
    | 'Abs-exercises'
    | 'Hands-exercises'
    | 'Shoulders-exercises'
    | 'Back-exercises'



export const CreateExercise = (navigation: NativeStackScreenProps<EXERCISES_NAVIGATION_TYPES>) => {
    const {theme} = useSelector(({ui}: STORE_TYPE) => ui)
    const {selectedExercises} = useSelector(({exercise}: STORE_TYPE)=>exercise)
    const {t} = useTranslation()
    const globalStyles = useGlobalStyles()
    const [isOpenModal, setIsOpenModal] = useState(false)

    const exercises: Array<{ name: EXERCISE_NAME_TYPES, img: ImageSourcePropType | string, route: EXERCISES_ROUTES_TYPES }> = [
        {
            name: 'press',
            img: pressImg,
            route: 'Abs-exercises'
        },
        {
            name: 'chest',
            img: chestImg,
            route: 'Chest-exercises'
        },
        {
            name: 'legs',
            img: '',
            route: 'Legs-exercises'
        },
        {
            name: 'hands',
            img: '',
            route: 'Hands-exercises'
        },
        {
            name: 'shoulders',
            img: '',
            route: 'Shoulders-exercises'
        },
        {
            name: 'back',
            img: '',
            route: 'Back-exercises'
        }
    ]
    const startTraining = () => {
        setIsOpenModal(true)
    }
    const styles = StyleSheet.create({
        container: {
            paddingVertical: 0
        },
        startButton: {
            position: 'absolute'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center'
        },
        headerButton: {
            paddingHorizontal: 16,
            paddingVertical: 5
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
            <View style={styles.header}>
                <BackButtonNavigation navigation={navigation}/>
            </View>
            {exercises
                .map(e =>
                    <ExerciseTypeBlock key={e.name}
                                       title={e.name}
                                       isSelected={!!selectedExercises[e.name]}
                                       select={true}
                                       img={e.img}
                                       route={e.route}
                                       navigation={navigation}
                                         />
                )}
        </ScrollView>

        {Object.keys(selectedExercises).length > 0
            && <View style={styles.fixedScreen}>
                <AntDesign name="play"
                           size={54}
                           color={ColorPalette[theme].secondFont}
                           onPress={startTraining}/>
            </View>}

        <CheckTrainingModal isOpen={isOpenModal} setIsOpen={setIsOpenModal}/>
    </>
}
