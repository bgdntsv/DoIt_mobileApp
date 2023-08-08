import {UI_STATE_TYPE} from '../redux/slices/uiSlice'
import * as FileSystem from 'expo-file-system'
import {EXERCISE_STATE_TYPE} from '../redux/slices/exerciseSlice'
import * as MediaLibrary from 'expo-media-library';

const directoryPath = FileSystem.documentDirectory
const UI_PATH = directoryPath + 'ui.json'
const EXERCISES_PATH = directoryPath + 'exercises.json'

export const getFilesPermissions = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    return status === 'granted';
}
const checkAndCreateAppDirectory = async () => {
    try {
        if(directoryPath){
            const {exists} = await FileSystem.getInfoAsync(directoryPath)
            if (exists) {
                return true
            } else {
                await FileSystem.makeDirectoryAsync(directoryPath)
                return true
            }
        }else return false
    } catch (e) {
        console.error(e)
        return false
    }
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
            const uiFile = await FileSystem.readAsStringAsync(UI_PATH)
            return JSON.parse(uiFile) as UI_STATE_TYPE
        } catch (e) {
            console.error(e)
        }
}

export const writeExercisesFile = async (exercises: EXERCISE_STATE_TYPE) => {
    const data = JSON.stringify(exercises)
    try {
        await FileSystem.writeAsStringAsync(EXERCISES_PATH, data)
        return true
    } catch (e) {
        console.error(e)
        return false
    }
}

export const readExercisesFile = async (): Promise<EXERCISE_STATE_TYPE | undefined> => {
    const {exists} = await FileSystem.getInfoAsync(EXERCISES_PATH)
    if (exists) {
        try {
            const exercises = await FileSystem.readAsStringAsync(EXERCISES_PATH)
            if (exercises) {
                return JSON.parse(exercises)
            } else {
                return {
                    baseExercises: [],
                    ownExercises: [],
                    exercises: []
                }
            }
        } catch (e) {
            console.error(e)
        }
    }
}
