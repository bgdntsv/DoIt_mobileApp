import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ColorPalette } from '../../assets/colors'
import { useSelector } from 'react-redux'
import { STORE_TYPE, useAppDispatch } from '../../redux/store'
import Checkbox from 'expo-checkbox'
import { addExercise, EXERCISE, EXERCISE_TYPE, MEDIA_LINK_TYPE } from '../../redux/slices/exerciseSlice'
import { CustomButton } from '../../common/Button'
import { MuscleTypeModal } from './SelectTypeModal'
import { MaterialIcons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'
import { MUSCLE_AREA_TYPE } from '../../helpers/types'
import uuid from 'react-native-uuid'
import { showToast } from '../../helpers/toast'
import * as ImagePicker from 'expo-image-picker'
import { useIsFocused } from '@react-navigation/native'
import { BorderInputContainer } from '../../common/BorderInputContainer'
import { ShowMediaLink } from '../../common/media/ShowMediaLink'
import * as Clipboard from 'expo-clipboard'
import * as Linking from 'expo-linking'
import { CustomSelect } from '../../common/CustomSelect'
import { ItemValue } from '@react-native-picker/picker/typings/Picker'
import { useGlobalStyles } from '../../hooks/useUI'
import { exerciseTypes } from '../../helpers/constants'

const AddExercise = () => {
    const { t } = useTranslation()
    const { exercises } = useSelector(({ exercise }: STORE_TYPE) => exercise)
    const dispatch = useAppDispatch()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [isSelectedGym, setIsSelectedGym] = useState(false)
    const [isSelectedOutdoors, setIsSelectedOutdoors] = useState(false)
    const [isSelectedHome, setIsSelectedHome] = useState(false)
    const [weight, setWeight] = useState('')
    const [metric, setMetric] = useState<'kg' | 'lb'>('kg')
    const [muscleArea, setMuscleArea] = useState<Array<MUSCLE_AREA_TYPE>>([])
    const { theme } = useSelector(({ ui }: STORE_TYPE) => ui)
    const descriptionRef = useRef<TextInput>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [mediaURI, setMediaURI] = useState<MEDIA_LINK_TYPE>([])
    const { styles: globalStyles, inputProps } = useGlobalStyles()
    const [exerciseType, setExerciseType] = useState<EXERCISE_TYPE | null>(null)
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
        } else if (!exerciseType) {
            return false
        }
        return true
    }

    const handleGymClick = () => {
        setIsSelectedGym((prev) => !prev)
    }
    const handleHomeClick = () => {
        setIsSelectedHome((prev) => !prev)
    }
    const handleOutdoorsClick = () => {
        setIsSelectedOutdoors((prev) => !prev)
    }
    const handleChangeMetric = (metric: ItemValue) => {
        setMetric(metric as 'kg' | 'lb')
    }

    const handleChangeExerciseType = (type: ItemValue) => {
        if (type === '0') {
            return
        }
        setExerciseType(type as EXERCISE_TYPE)
    }

    const handleSubmit = () => {
        if (!exerciseType) {
            return
        }
        const id = uuid.v4().toString()
        for (const exercise1 of exercises) {
            // is already created exercise with the same name
            if (exercise1.name === name) {
                showToast({
                    type: 'error',
                    text1: 'Exercise with the same name is already created',
                })
                return
            }
        }
        if (muscleArea.length === 0 && exerciseType) {
            muscleArea.push((exerciseType + '_base') as MUSCLE_AREA_TYPE)
        }
        const exercise: EXERCISE = {
            name,
            description,
            gym: isSelectedGym,
            home: isSelectedHome,
            outdoors: isSelectedOutdoors,
            muscleArea,
            weight,
            metric,
            id,
            isOwn: true,
            type: exerciseType,
        }
        if (mediaURI.length > 0) {
            exercise.media = mediaURI
        }
        dispatch(addExercise(exercise))
        clearState()
    }
    const muscleAreaArrayShow = useMemo(() => {
        const toShow = muscleArea.map((e) => {
            return t(e)
        })
        return toShow.toLocaleString().split(',').join(', ')
    }, [muscleArea])

    const getMediaURI = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [5, 3],
            quality: 1,
        })

        if (result.assets) {
            setMediaURI([result.assets[0]])
        }
    }

    const changeMedia = () => {
        if (mediaURI[0] && typeof mediaURI[0] !== 'string') {
            Alert.alert(
                `Do you want to change selected ${mediaURI[0].type === 'image' ? 'image' : 'video'}?`,
                undefined,
                [
                    { text: 'Yes', onPress: getMediaURI },
                    { text: 'No' },
                    { text: 'Remove', onPress: () => setMediaURI([]) },
                ]
            )
        } else {
            Alert.alert('Do you want to change selected video?', undefined, [
                { text: 'Yes', onPress: () => setMediaURI([]) },
                { text: 'No' },
            ])
        }
    }

    const mediaUrlPastValue = async () => {
        if (await Clipboard.hasStringAsync()) {
            const url = await Clipboard.getStringAsync()
            if (await Linking.canOpenURL(url)) {
                setMediaURI([url])
            } else {
                showToast({
                    type: 'error',
                    text1: 'URL is not valid',
                })
            }
        } else {
            showToast({
                type: 'error',
                text1: 'URL is not valid',
            })
        }
    }
    const exerciseTypesItems = useMemo(() => {
        const types: Array<{ value: string; label: string }> = exerciseTypes.map((e) => {
            return { value: e, label: t(e) }
        })
        return exerciseType ? types : [{ value: '0', label: 'Select type' }, ...types]
    }, [exerciseTypes, exerciseType])
    const clearState = () => {
        setName('')
        setDescription('')
        setIsSelectedGym(false)
        setIsSelectedHome(false)
        setIsSelectedOutdoors(false)
        setMuscleArea([])
        setWeight('')
        setMediaURI([])
        setExerciseType(null)
    }
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: 10,
            paddingVertical: 10,
            backgroundColor: ColorPalette[theme].main,
            height: '100%',
            position: 'relative',
        },
        content: {},
        submit: {
            marginTop: 10,
            marginBottom: 20,
        },
        checkboxContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 7,
        },
        checkbox: {
            margin: 5,
            width: 25,
            height: 25,
            borderRadius: 5,
        },
        checkboxSpan: {
            color: ColorPalette[theme].second,
        },
        splitBlock: {
            flex: 1,
            flexDirection: 'row',
        },
        weight: {
            flexGrow: 10,
            marginRight: 8,
        },
        weightInput: {
            paddingVertical: 8,
        },
        metric: {
            flexGrow: 8,
        },
        pickerItem: {
            backgroundColor: ColorPalette[theme].main,
            width: '100%',
        },
        muscleAreaContainer: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
        },

        muscleAreaInput: {
            width: '80%',
        },
        plusIcon: {
            display: 'flex',
            alignItems: 'center',
            flexGrow: 1,
            paddingTop: 17,
        },
        mediaContainer: {
            display: 'flex',
            alignItems: 'flex-end',
        },
        mediaLink: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
    })

    return (
        <ScrollView style={styles.container}>
            {/*__________Show added media__________*/}
            {mediaURI[0] && (
                <BorderInputContainer title={t('media')}>
                    <View style={styles.mediaContainer}>
                        <ShowMediaLink link={mediaURI} />
                        <MaterialIcons
                            name="edit"
                            size={24}
                            color={ColorPalette[theme].mainFont}
                            onPress={changeMedia}
                        />
                    </View>
                </BorderInputContainer>
            )}
            <View style={styles.content}>
                {/*__________Name__________*/}
                <BorderInputContainer title={t('add_name')} isRequiredField>
                    <TextInput
                        {...inputProps}
                        enterKeyHint={'next'}
                        value={name}
                        onChangeText={setName}
                        id={'name'}
                        onSubmitEditing={() => {
                            console.log(descriptionRef.current)
                            if (descriptionRef.current) {
                                descriptionRef.current.focus()
                            }
                        }}
                        blurOnSubmit={false}
                        returnKeyType={'next'}
                    />
                </BorderInputContainer>
                {/*__________Description__________*/}
                <BorderInputContainer title={t('add_description')}>
                    <TextInput
                        {...inputProps}
                        multiline
                        numberOfLines={3}
                        ref={descriptionRef}
                        value={description}
                        onChangeText={setDescription}
                        blurOnSubmit={false}
                    />
                </BorderInputContainer>

                {/*__________Place__________*/}
                <BorderInputContainer title={t('select_place')} isRequiredField>
                    <Pressable onPress={handleGymClick} style={styles.checkboxContainer}>
                        <Checkbox
                            value={isSelectedGym}
                            color={ColorPalette[theme].second}
                            style={styles.checkbox}
                            onValueChange={setIsSelectedGym}
                        />
                        <Text style={styles.checkboxSpan}>{t('gym')}</Text>
                    </Pressable>
                    <Pressable onPress={handleHomeClick} style={styles.checkboxContainer}>
                        <Checkbox
                            value={isSelectedHome}
                            color={ColorPalette[theme].second}
                            style={styles.checkbox}
                            onValueChange={setIsSelectedHome}
                        />
                        <Text style={styles.checkboxSpan}>{t('home')}</Text>
                    </Pressable>
                    <Pressable onPress={handleOutdoorsClick} style={styles.checkboxContainer}>
                        <Checkbox
                            value={isSelectedOutdoors}
                            color={ColorPalette[theme].second}
                            style={styles.checkbox}
                            onValueChange={setIsSelectedOutdoors}
                        />
                        <Text style={styles.checkboxSpan}>{t('outdoors')}</Text>
                    </Pressable>
                </BorderInputContainer>

                {/*__________Select exercise type__________*/}
                <BorderInputContainer title={t('Select exercise type')} isRequiredField>
                    <CustomSelect
                        items={exerciseTypesItems}
                        selectedValue={exerciseType ? exerciseType.toString() : 0}
                        placeholder={t('exercise_type')}
                        onValueChange={handleChangeExerciseType}
                    />
                </BorderInputContainer>

                {/*__________Add muscle area__________*/}
                {exerciseType && (
                    <Pressable onPress={() => setIsModalOpen(true)} style={styles.muscleAreaContainer}>
                        <View style={styles.muscleAreaInput}>
                            <BorderInputContainer title={t('muscle_area')} onPress={() => setIsModalOpen(true)}>
                                <TextInput {...inputProps} value={muscleAreaArrayShow} editable={false} multiline />
                            </BorderInputContainer>
                        </View>
                        <View style={styles.plusIcon}>
                            <MaterialIcons name="add" size={38} color={ColorPalette[theme].mainFont} />
                        </View>
                    </Pressable>
                )}

                {/*__________Weight__________*/}
                <View style={styles.splitBlock}>
                    <View style={styles.weight}>
                        <BorderInputContainer title={t('weight')}>
                            <TextInput
                                {...inputProps}
                                value={weight}
                                inputMode={'numeric'}
                                placeholder={'0'}
                                onChangeText={setWeight}
                                style={styles.weightInput}
                                keyboardType={'numeric'}
                                maxLength={8}
                            />
                        </BorderInputContainer>
                    </View>

                    <View style={styles.metric}>
                        <BorderInputContainer title={t('metric')}>
                            <CustomSelect
                                items={[
                                    { label: t('kg'), value: 'kg' },
                                    { label: t('lb'), value: 'lb' },
                                ]}
                                placeholder={t('metric')}
                                onValueChange={handleChangeMetric}
                            />
                        </BorderInputContainer>
                    </View>
                </View>

                {/*__________Add media__________*/}
                {!mediaURI[0] && (
                    <BorderInputContainer title={t('add_media')}>
                        <CustomButton
                            title={'add media'}
                            onPress={getMediaURI}
                            icon={<MaterialIcons name="image" size={24} color={ColorPalette[theme].secondFont} />}
                        />
                        <BorderInputContainer title={'Add media link'}>
                            <View style={styles.mediaLink}>
                                <TextInput
                                    placeholder={'https://example.com/123'}
                                    editable={false}
                                    value={mediaURI[0] && typeof mediaURI[0] === 'string' ? mediaURI[0] : undefined}
                                />
                                <Pressable onPress={mediaUrlPastValue}>
                                    <Text style={globalStyles.span1}>Paste</Text>
                                </Pressable>
                            </View>
                        </BorderInputContainer>
                    </BorderInputContainer>
                )}
            </View>

            {/*__________Submit__________*/}
            <View style={styles.submit}>
                <CustomButton
                    title={t('add_exercise')}
                    disabled={!isValidForm()}
                    onPress={handleSubmit}
                    icon={<MaterialIcons name="save" size={24} color={ColorPalette[theme].secondFont} />}
                />
            </View>

            <MuscleTypeModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                muscleArea={muscleArea}
                setMuscleArea={setMuscleArea}
                styles={styles}
            />
        </ScrollView>
    )
}

export default AddExercise
