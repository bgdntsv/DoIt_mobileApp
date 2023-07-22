import {Text, View, StyleSheet, TextInput, Pressable} from 'react-native'
import React, {useRef, useState} from 'react'
import {ColorPalette} from '../../../assets/colors'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch, STORE_TYPE} from '../../../redux/store'
import Checkbox from 'expo-checkbox'
import {Picker} from '@react-native-picker/picker'
import {addExercise, EXERCISE_TYPE, MUSCLE_AREA_TYPE} from '../../../redux/slices/exerciseSlice'
import {CustomButton} from '../../../common/Button'
import {MuscleTypeModal} from './Modal'

const AddExercise = () => {
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
        }else if (!description) {
            return false
        }else if (!isSelectedGym && !isSelectedOutdoors && !isSelectedHome) {
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
    const handleChangeTheme = (metric: 'kg' | 'lb') => {
        setMetric(metric)
    }

    const handleSubmit = () => {
        const exercise: EXERCISE_TYPE = {
            name,
            description,
            gym: isSelectedGym,
            home: isSelectedHome,
            outdoors: isSelectedOutdoors,
            muscleArea,
            weight,
            metric
        }
        dispatch(addExercise(exercise))
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
            borderRadius: 5,
            marginTop: 15,
            overflow: 'hidden'
        },
        checkboxes: {
            borderWidth: 1,
            borderColor: ColorPalette[theme].second,
            borderRadius: 5,
            paddingVertical: 10
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
        weightBlock: {
            display: 'flex',
            flexDirection: 'row'
        },
        weight: {
            width: '70%',
            marginRight: 8
        },
        weightInput: {
            paddingVertical: 14
        },
        metric: {
            width: '30%'
        },
        metricDropdown: {
            borderWidth: 1,
            borderColor: ColorPalette[theme].second,
            borderRadius: 5,
            padding: 1
        }
    })

    return <View style={styles.container}>
        <Text style={styles.span}>Add name*</Text>
        <TextInput value={name} onChangeText={setName} style={styles.input}
                   onSubmitEditing={() => {
                       if (descriptionRef.current) {
                           descriptionRef.current.focus()
                       }
                   }}
                   blurOnSubmit={false}
                   returnKeyType={'next'}/>

        <Text style={styles.span}>Add description*</Text>
        <TextInput ref={descriptionRef} value={description} onChangeText={setDescription} style={styles.input}
                   onSubmitEditing={() => {
                       if (weightRef.current) {
                           weightRef.current.focus()
                       }
                   }}
                   blurOnSubmit={false}
                   returnKeyType={'next'}/>

        <Text style={styles.span}>Select place*</Text>
        <View style={styles.checkboxes}>
            <Pressable onPress={handleGymClick} style={styles.checkboxContainer}>
                <Checkbox
                    value={isSelectedGym}
                    color={ColorPalette[theme].second}
                    style={styles.checkbox} onValueChange={setIsSelectedGym}
                />
                <Text style={styles.checkboxSpan}>Gym</Text>
            </Pressable>
            <Pressable onPress={handleHomeClick} style={styles.checkboxContainer}>
                <Checkbox
                    value={isSelectedHome}
                    color={ColorPalette[theme].second}
                    style={styles.checkbox} onValueChange={setIsSelectedHome}
                />
                <Text style={styles.checkboxSpan}>Home</Text>
            </Pressable>
            <Pressable onPress={handleOutdoorsClick} style={styles.checkboxContainer}>
                <Checkbox
                    value={isSelectedOutdoors}
                    color={ColorPalette[theme].second}
                    style={styles.checkbox} onValueChange={setIsSelectedOutdoors}
                />
                <Text style={styles.checkboxSpan}>Outdoors</Text>
            </Pressable>
        </View>

        <View style={styles.weightBlock}>
            <View style={styles.weight}>
                <Text style={styles.span}>Weight</Text>
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
                <Text style={styles.span}>Metric</Text>
                <View style={styles.metricDropdown}>
                    <Picker
                        mode={'dialog'}
                        selectedValue={metric}
                        onValueChange={handleChangeTheme}
                        dropdownIconColor={ColorPalette[theme].second}>
                        <Picker.Item style={{backgroundColor: ColorPalette[theme].main}}
                                     color={ColorPalette[theme].mainFont}
                                     label="kg"
                                     value="kg"/>
                        <Picker.Item style={{backgroundColor: ColorPalette[theme].main}}
                                     color={ColorPalette[theme].mainFont}
                                     label="lb"
                                     value="lb"/>
                    </Picker>
                </View>
            </View>
        </View>

        <View style={styles.submit}>
            <CustomButton title={'Submit'}
                          disabled={!isValidForm()}
                          onPress={handleSubmit}/>
        </View>

        <View style={styles.submit}>
            <CustomButton title={'Show exercises'} onPress={() => setIsModalOpen(true)}/>
        </View>

        <MuscleTypeModal isOpen={isModalOpen}
                         setIsOpen={setIsModalOpen}
                         muscleArea={muscleArea}
                         setMuscleArea={setMuscleArea}
                         styles={styles}/>
    </View>
}

export default AddExercise
