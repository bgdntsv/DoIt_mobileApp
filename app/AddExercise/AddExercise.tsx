import {Text, View, StyleSheet, TextInput, Pressable, ScrollView} from 'react-native'
import React, {useRef, useState} from 'react'
import {ColorPalette} from '../../assets/colors'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch, STORE_TYPE} from '../../redux/store'
import Checkbox from 'expo-checkbox'
import {Picker} from '@react-native-picker/picker'
import {addExercise, EXERCISE_TYPE} from '../../redux/slices/exerciseSlice'
import {CustomButton} from '../../common/Button'
import {MuscleTypeModal} from './Modal'
import {AntDesign} from '@expo/vector-icons'
import {useTranslation} from 'react-i18next'
import {MUSCLE_AREA_TYPE} from '../../helpers/constants'
import uuid from 'react-native-uuid'
import {showToast} from '../../helpers/toast'

const AddExercise = () => {
    const {t} = useTranslation()
    const {exercises} = useSelector(({exercise}: STORE_TYPE) => exercise)
    const dispatch = useDispatch<AppDispatch>()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [isSelectedGym, setIsSelectedGym] = useState(false)
    const [isSelectedOutdoors, setIsSelectedOutdoors] = useState(false)
    const [isSelectedHome, setIsSelectedHome] = useState(false)
    const [weight, setWeight] = useState('0')
    const [metric, setMetric] = useState<'kg' | 'lb'>('kg')
    const [muscleArea, setMuscleArea] = useState<Array<MUSCLE_AREA_TYPE>>([])
    const {theme} = useSelector(({ui}: STORE_TYPE) => ui)
    const descriptionRef = useRef<TextInput>(null)
    const weightRef = useRef<TextInput>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const isValidForm = (): boolean => {
        if (!name) {
            return false
        } else if (!description) {
            return false
        } else if (!isSelectedGym && !isSelectedOutdoors && !isSelectedHome) {
            return false
        } else if(muscleArea.length === 0){
            return false
        }
        return true
    }

    const handleGymClick = () => {
        setIsSelectedGym(prev => !prev)
    }
    const handleHomeClick = () => {
        setIsSelectedHome(prev => !prev)
    }
    const handleOutdoorsClick = () => {
        setIsSelectedOutdoors(prev => !prev)
    }
    const handleChangeMetric = (metric: 'kg' | 'lb') => {
        setMetric(metric)
    }

    const handleSubmit = () => {
        const id = uuid.v4().toString()
        for (const exercise1 of exercises) { // is already created exercise with the same name
            if(exercise1.name === name){
                showToast({
                    type: 'error',
                    text1: 'Exercise with the same name is already created'
                })
                return
            }
        }
        const exercise: EXERCISE_TYPE = {
            name,
            description,
            gym: isSelectedGym,
            home: isSelectedHome,
            outdoors: isSelectedOutdoors,
            muscleArea,
            weight,
            metric,
            id
        }
        dispatch(addExercise(exercise))
        showToast({
            type: 'success',
            text1: 'Exercise added'
        })
        clearState()
    }
    const muscleAreaArrayShow = () => {
        const toShow = muscleArea.map(e => {
            return t(e)
        })
        return toShow.toLocaleString().split(',').join(', ')
    }
    const clearState = () => {
        setName('')
            setDescription('')
            setIsSelectedGym(false)
            setIsSelectedHome(false)
            setIsSelectedOutdoors(false)
            setMuscleArea([])
            setWeight('')
    }
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: 10,
            paddingVertical: 10,
            backgroundColor: ColorPalette[theme].main
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
        submit: {
            marginTop: 15
        },
        checkboxes: {
            borderWidth: 1,
            borderColor: ColorPalette[theme].second,
            borderRadius: 5,
            paddingVertical: 5,
        },
        checkboxContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 7
        },
        checkbox: {
            margin: 5,
            width: 25,
            height: 25,
            borderRadius: 5
        },
        checkboxSpan: {
            color: ColorPalette[theme].second
        },
        splitBlock: {
            flex: 1,
            flexDirection: 'row'
        },
        weight: {
            flexGrow: 3,
            marginRight: 8
        },
        weightInput: {
            paddingVertical: 14
        },
        metric: {
            flexGrow: 1
        },
        metricDropdown: {
            borderWidth: 1,
            borderColor: ColorPalette[theme].second,
            borderRadius: 5,
            padding: 1
        },
        muscleAreaContainer: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center'
        },
        muscleAreaInput: {
            width: '80%'
        },
        plusIcon: {
            display: 'flex',
            alignItems: 'center',
            width: '20%',
            paddingTop: 17
        }
    })

    return <ScrollView style={styles.container}>
        <Text style={styles.span}>{t('add_name')}*</Text>
        <TextInput value={name} onChangeText={setName} style={styles.input}
                   onSubmitEditing={() => {
                       if (descriptionRef.current) {
                           descriptionRef.current.focus()
                       }
                   }}
                   blurOnSubmit={false}
                   returnKeyType={'next'}/>

        <Text style={styles.span}>{t('add_description')}*</Text>
        <TextInput ref={descriptionRef} value={description} onChangeText={setDescription} style={styles.input}
                   onSubmitEditing={() => {
                       if (weightRef.current) {
                           weightRef.current.focus()
                       }
                   }}
                   blurOnSubmit={false}
                   returnKeyType={'next'}/>

        <Text style={styles.span}>{t('select_place')}*</Text>
        <View style={styles.checkboxes}>
            <Pressable onPress={handleGymClick} style={styles.checkboxContainer}>
                <Checkbox
                    value={isSelectedGym}
                    color={ColorPalette[theme].second}
                    style={styles.checkbox} onValueChange={setIsSelectedGym}
                />
                <Text style={styles.checkboxSpan}>{t('gym')}</Text>
            </Pressable>
            <Pressable onPress={handleHomeClick} style={styles.checkboxContainer}>
                <Checkbox
                    value={isSelectedHome}
                    color={ColorPalette[theme].second}
                    style={styles.checkbox} onValueChange={setIsSelectedHome}
                />
                <Text style={styles.checkboxSpan}>{t('home')}</Text>
            </Pressable>
            <Pressable onPress={handleOutdoorsClick} style={styles.checkboxContainer}>
                <Checkbox
                    value={isSelectedOutdoors}
                    color={ColorPalette[theme].second}
                    style={styles.checkbox} onValueChange={setIsSelectedOutdoors}
                />
                <Text style={styles.checkboxSpan}>{t('outdoors')}</Text>
            </Pressable>
        </View>

        <View style={styles.splitBlock}>
            <View style={styles.weight}>
                <Text style={styles.span}>{t('weight')}</Text>
                <TextInput
                    ref={weightRef}
                    value={weight}
                    onChangeText={setWeight}
                    style={{...styles.input, ...styles.weightInput}}
                    keyboardType={'numeric'}
                    maxLength={8}
                />
            </View>
            <View style={styles.metric}>
                <Text style={styles.span}>{t('metric')}</Text>
                <View style={styles.metricDropdown}>
                    <Picker
                        mode={'dialog'}
                        selectedValue={metric}
                        onValueChange={handleChangeMetric}
                        dropdownIconColor={ColorPalette[theme].mainFont}>
                        <Picker.Item style={{backgroundColor: ColorPalette[theme].main}}
                                     color={ColorPalette[theme].mainFont}
                                     label={t('kg')}
                                     value="kg"/>
                        <Picker.Item style={{backgroundColor: ColorPalette[theme].main}}
                                     color={ColorPalette[theme].mainFont}
                                     label={t('lb')}
                                     value="lb"/>
                    </Picker>
                </View>
            </View>
        </View>

        <Pressable onPress={() => setIsModalOpen(true)} style={styles.muscleAreaContainer}>
            <View style={styles.muscleAreaInput}>
                <Text style={styles.span}>{t('muscle_area')}*</Text>
                <TextInput
                    value={muscleAreaArrayShow()}
                    editable={false}
                    style={styles.input}
                    multiline={true}
                />
            </View>
            <View style={styles.plusIcon}>
                <AntDesign name="plus" size={38} color={ColorPalette[theme].mainFont}/>
            </View>
        </Pressable>

        <View style={styles.submit}>
            <CustomButton title={t('add_exercise')}
                          disabled={!isValidForm()}
                          onPress={handleSubmit}/>
        </View>

        <MuscleTypeModal isOpen={isModalOpen}
                         setIsOpen={setIsModalOpen}
                         muscleArea={muscleArea}
                         setMuscleArea={setMuscleArea}
                         styles={styles}/>
    </ScrollView>
}

export default AddExercise
