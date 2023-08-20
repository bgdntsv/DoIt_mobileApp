import {Text, View, StyleSheet, TextInput, Pressable, ScrollView, Image, Alert} from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import {ColorPalette} from '../../assets/colors'
import {useSelector} from 'react-redux'
import {STORE_TYPE, useAppDispatch} from '../../redux/store'
import Checkbox from 'expo-checkbox'
import {Picker} from '@react-native-picker/picker'
import {addExercise, EXERCISE_TYPE} from '../../redux/slices/exerciseSlice'
import {CustomButton} from '../../common/Button'
import {MuscleTypeModal} from './SelectTypeModal'
import {AntDesign} from '@expo/vector-icons'
import {useTranslation} from 'react-i18next'
import {MUSCLE_AREA_TYPE} from '../../helpers/constants'
import uuid from 'react-native-uuid'
import {showToast} from '../../helpers/toast'
import * as ImagePicker from 'expo-image-picker'
import {ImagePickerAsset} from 'expo-image-picker'
import {ResizeMode, Video} from 'expo-av'
import {useIsFocused} from '@react-navigation/native'

const AddExercise = () => {
    const {t} = useTranslation()
    const {exercises} = useSelector(({exercise}: STORE_TYPE) => exercise)
    const dispatch = useAppDispatch()
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
    const [mediaURI, setMediaURI] = useState<ImagePickerAsset | null>(null)

    const isFocused = useIsFocused()

    useEffect(() => {
        if (!isFocused) {
            clearState()
        }
    }, [isFocused])
    const isValidForm = (): boolean => {
        if (!name) {
            return false
        } else if (!isSelectedGym && !isSelectedOutdoors && !isSelectedHome) {
            return false
        } else if (muscleArea.length === 0) {
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
            if (exercise1.name === name) {
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
        if (mediaURI) {
            exercise.media = [mediaURI]
        }
        dispatch(addExercise(exercise))
        clearState()
    }
    const muscleAreaArrayShow = () => {
        const toShow = muscleArea.map(e => {
            return t(e)
        })
        return toShow.toLocaleString().split(',').join(', ')
    }

    const getMediaURI = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [5, 3],
            quality: 1
        })

        if (result.assets) {
            setMediaURI(result.assets[0])
        }
    }

    const changeMedia = () => {
        if (mediaURI) {
            Alert.alert(
                `Do you want to change selected ${mediaURI?.type === 'image' ? 'image' : 'video'}?`,
                undefined,
                [
                    {text: 'Yes', onPress: getMediaURI},
                    {text: 'No'}
                ]
            )
        }
    }
    const clearState = () => {
        setName('')
        setDescription('')
        setIsSelectedGym(false)
        setIsSelectedHome(false)
        setIsSelectedOutdoors(false)
        setMuscleArea([])
        setWeight('')
        setMediaURI(null)
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
            position: 'absolute'
        },
        checkboxes: {
            borderWidth: 1,
            borderColor: ColorPalette[theme].second,
            borderRadius: 5,
            paddingVertical: 5
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
        <Pressable onPress={changeMedia}>{mediaURI && (mediaURI.type === 'image'
            ? <Image height={150} source={{uri: mediaURI.uri}}/>
            : <Video
                style={{
                    height: 150
                }}
                source={{
                    uri: mediaURI?.uri
                }}
                useNativeControls={false}
                resizeMode={ResizeMode.COVER}
                isLooping
                isMuted
                shouldPlay
            />)}
        </Pressable>
        <Text style={styles.span}>{t('add_name')}*</Text>
        <TextInput value={name} onChangeText={setName} style={styles.input}
                   onSubmitEditing={() => {
                       if (descriptionRef.current) {
                           descriptionRef.current.focus()
                       }
                   }}
                   blurOnSubmit={false}
                   returnKeyType={'next'}/>

        <Text style={styles.span}>{t('add_description')}</Text>
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

        {!mediaURI && <CustomButton title={'add media'}
                                    onPress={getMediaURI}
                                    icon={<AntDesign name="videocamera" size={24} color={ColorPalette[theme].secondFont} />}/>}

        <View style={styles.submit}>
            <CustomButton title={t('add_exercise')}
                          disabled={!isValidForm()}
                          onPress={handleSubmit}
                          icon={<AntDesign name="save" size={24} color={ColorPalette[theme].secondFont} />}/>
        </View>

        <MuscleTypeModal isOpen={isModalOpen}
                         setIsOpen={setIsModalOpen}
                         muscleArea={muscleArea}
                         setMuscleArea={setMuscleArea}
                         styles={styles}/>
    </ScrollView>
}

export default AddExercise
