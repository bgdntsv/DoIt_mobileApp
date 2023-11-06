import { UI_STATE_TYPE } from '../redux/slices/uiSlice'
import * as FileSystem from 'expo-file-system'
import { EXERCISE_FILE } from '../redux/slices/exerciseSlice'
import * as MediaLibrary from 'expo-media-library'
import { TRAININGS_STATE } from '../redux/slices/trainingSlice'

const directoryPath = FileSystem.documentDirectory
const UI_PATH = directoryPath + 'ui.json'
const EXERCISES_PATH = directoryPath + 'exercises.json'
const TRAININGS_PATH = directoryPath + 'trainings.json'

export const getFilesPermissions = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync()
    return status === 'granted'
}

export const writeUiFile = async (uiFile: UI_STATE_TYPE) => {
    const dataJson = JSON.stringify(uiFile)
    try {
        await FileSystem.writeAsStringAsync(UI_PATH, dataJson)
        return true
    } catch (e) {
        console.error(e)
    }
}
export const readUiFile = async (): Promise<UI_STATE_TYPE | undefined> => {
    try {
        const { exists } = await FileSystem.getInfoAsync(UI_PATH)
        if (exists) {
            const uiFile = await FileSystem.readAsStringAsync(UI_PATH)
            return JSON.parse(uiFile) as UI_STATE_TYPE
        }
    } catch (e) {
        console.error(e)
    }
}

export const writeExercisesFile = async (exercises: EXERCISE_FILE) => {
    const data = JSON.stringify(exercises)
    try {
        await FileSystem.writeAsStringAsync(EXERCISES_PATH, data)
        return true
    } catch (e) {
        console.error(e)
        return false
    }
}

export const readExercisesFile = async (): Promise<
    EXERCISE_FILE | undefined
> => {
    try {
        const { exists } = await FileSystem.getInfoAsync(EXERCISES_PATH)
        if (exists) {
            const exercises = await FileSystem.readAsStringAsync(EXERCISES_PATH)
            if (exercises) {
                return JSON.parse(exercises)
            }
        }
    } catch (e) {
        console.error(e)
    }
}

export const writeTrainingsFile = async (trainings: TRAININGS_STATE) => {
    const data = JSON.stringify(trainings)
    try {
        await FileSystem.writeAsStringAsync(TRAININGS_PATH, data)
        return true
    } catch (e) {
        console.error(e)
        return false
    }
}

export const readTrainingsFile = async (): Promise<
    TRAININGS_STATE | undefined
> => {
    try {
        const { exists } = await FileSystem.getInfoAsync(TRAININGS_PATH)
        if (exists) {
            const trainings = await FileSystem.readAsStringAsync(TRAININGS_PATH)
            if (trainings) {
                return JSON.parse(trainings)
            }
        }
    } catch (e) {
        console.error(e)
    }
}
