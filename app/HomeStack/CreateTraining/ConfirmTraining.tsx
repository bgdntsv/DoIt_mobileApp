import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { CustomButton } from '../../../common/Button'
import { useGlobalStyles } from '../../../hooks/useUI'
import { useSelector } from 'react-redux'
import { STORE_TYPE, useAppDispatch } from '../../../redux/store'
import { useTranslation } from 'react-i18next'
import { ColorPalette } from '../../../assets/colors'
import { MaterialIcons } from '@expo/vector-icons'
import { clearSelectedExercises, EXERCISE, toggleSelectedExercise } from '../../../redux/slices/exerciseSlice'
import { addTraining, TRAINING } from '../../../redux/slices/trainingSlice'
import uuid from 'react-native-uuid'
import { useGetDateString } from '../../../helpers/dateHelper'
import { RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import { HOME_STACK_ROUTE_PROPS } from '../ExerciseNavigation'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist'
import { BackButtonNavigation } from '../../../common/BackButtonNavigation'
import { ExerciseDetailsModal } from '../../../common/ExerciseDetailsModal'
import { INVENTORY, MUSCLE_AREA_TYPE } from '../../../helpers/types'
import { BorderInputContainer } from '../../../common/BorderInputContainer'

export const ConfirmTraining = () => {
    const { selectedExercisesByTypes, allSelectedExercises } = useSelector(({ exercise }: STORE_TYPE) => exercise)
    const { t } = useTranslation()
    const { theme } = useSelector(({ ui }: STORE_TYPE) => ui)
    const dispatch = useAppDispatch()
    const [name, setName] = useState('')
    const date = useGetDateString()
    const navigation = useNavigation<NativeStackNavigationProp<HOME_STACK_ROUTE_PROPS>>()
    const route = useRoute<RouteProp<HOME_STACK_ROUTE_PROPS, 'Exercises-type'>>()
    const [allExercises, setAllExercises] = useState(allSelectedExercises)
    const { styles: globalStyles, inputProps } = useGlobalStyles()
    const [selectedExercise, setSelectedExercise] = useState<EXERCISE | null>(null)
    const isFocused = useIsFocused()
    const [defaultRepeatsCount, setDefaultRepeatsCount] = useState('4')

    useEffect(() => {
        if (isFocused) {
            navigation.getParent()?.setOptions({ headerTitle: t('confirm_training') })
        }
    }, [isFocused])

    const saveTraining = () => {
        const id = uuid.v4().toString()
        let inventory: Array<INVENTORY> = []
        let muscleAreas: Array<MUSCLE_AREA_TYPE> = []
        allExercises.forEach((e) => {
            if (e.inventory?.length) {
                inventory.push(...e.inventory)
            }
            if (e.muscleArea?.length) {
                muscleAreas.push(...e.muscleArea)
            }
        })
        inventory = inventory.filter((value, index, array) => array.indexOf(value) === index)
        muscleAreas = muscleAreas.filter((value, index, array) => array.indexOf(value) === index)
        const training: TRAINING = {
            dateCreation: new Date().getTime(),
            id,
            name: name || date,
            exercisesCount: allExercises.length,
            allExercises,
            inventory,
            defaultRepeatsCount: defaultRepeatsCount || '4',
            muscleAreas,
            ...selectedExercisesByTypes,
        }
        dispatch(addTraining(training))
        dispatch(clearSelectedExercises())
        if (route.params?.comesFromSelectTraining) {
            navigation.setParams({ comesFromSelectTraining: false })
            navigation.navigate('Select-training')
        } else {
            navigation.navigate('Start')
        }
    }

    const closeModal = () => {
        setSelectedExercise(null)
    }

    const onInfoIconPress = (exercise: EXERCISE) => {
        setSelectedExercise(exercise)
    }

    const handleCountRepeats = (count: string) => {
        if (count) setDefaultRepeatsCount(Number.parseInt(count).toString())
        else setDefaultRepeatsCount(count)
    }

    const renderItem = ({ item, drag, isActive }: RenderItemParams<EXERCISE>) => {
        const removeExercise = () => {
            dispatch(toggleSelectedExercise({ exercise: item }))
        }
        return (
            <TouchableOpacity onPressIn={drag} disabled={isActive} style={styles.item}>
                <View style={styles.itemTitle}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <MaterialIcons name="info" style={styles.itemInfoIcon} onPress={() => onInfoIconPress(item)} />
                </View>
                <MaterialIcons name="close" style={styles.itemCloseIcon} onPress={removeExercise} />
            </TouchableOpacity>
        )
    }

    const styles = StyleSheet.create({
        container: {
            ...globalStyles.container,
            marginTop: 0,
            display: 'flex',
            justifyContent: 'space-between',
        },
        itemName: {
            ...globalStyles.span,
            color: ColorPalette[theme].secondFont,
        },
        itemTitle: {
            display: 'flex',
            flexDirection: 'row',
            maxWidth: '80%',
            alignItems: 'center',
        },
        item: {
            marginVertical: 5,
            paddingVertical: 5,
            paddingHorizontal: 8,
            height: 50,
            borderRadius: 5,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: ColorPalette[theme].fourth,
        },
        itemInfoIcon: {
            color: ColorPalette[theme].secondFont,
            marginLeft: 8,
            fontSize: 24,
        },
        itemCloseIcon: {
            color: ColorPalette[theme].secondFont,
            maxWidth: '20%',
            fontSize: 26,
        },
    })
    return (
        <View style={styles.container}>
            <View>
                <BackButtonNavigation />
                {/*Name*/}
                <BorderInputContainer title={t('name')}>
                    <TextInput {...inputProps} value={name} placeholder={date} onChangeText={(t) => setName(t)} />
                </BorderInputContainer>

                {/*Count of exercises repeats*/}
                <BorderInputContainer title={t('count_of_repeats')}>
                    <TextInput
                        {...inputProps}
                        keyboardType={'numeric'}
                        value={defaultRepeatsCount}
                        placeholder={'4'}
                        onChangeText={handleCountRepeats}
                        maxLength={2}
                    />
                </BorderInputContainer>

                {/*Exercises list*/}
                {allExercises?.length ? (
                    <BorderInputContainer title={t('drag_to_set_order')}>
                        <DraggableFlatList
                            data={allExercises}
                            onDragEnd={({ data }) => setAllExercises(data)}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                        />
                    </BorderInputContainer>
                ) : (
                    <Text style={globalStyles.span}>Ви не обрали вправи, ми їх згенеруємо</Text>
                )}
            </View>
            <View>
                <CustomButton title={t('add_training')} onPress={saveTraining} />
            </View>
            {selectedExercise !== null && (
                <ExerciseDetailsModal isOpen={true} setIsOpen={closeModal} exercise={selectedExercise} />
            )}
        </View>
    )
}
