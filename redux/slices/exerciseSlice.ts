import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {STORE_TYPE} from '../store'
import {writeExercisesFile} from '../../helpers/fileHelper'
import {INVENTORY_TYPE, MUSCLE_AREA_TYPE} from '../../helpers/constants'
import {showToast} from '../../helpers/toast'
import {ImagePickerAsset} from 'expo-image-picker'
import {baseExercises} from '../../helpers/baseExercises'

export type EXERCISE_TYPE = {
    name: string,
    description: string,
    muscleArea: Array<MUSCLE_AREA_TYPE>,
    media?: Array<ImagePickerAsset>,
    weight?: string,
    metric?: 'kg' | 'lb',
    count?: number,
    gym: boolean,
    outdoors: boolean,
    home: boolean,
    inventory?: Array<INVENTORY_TYPE>,
    id: string
}

export type EXERCISE_FILE_TYPE = {
    ownExercises: Array<EXERCISE_TYPE>,
    exercises: Array<EXERCISE_TYPE>,
}


export type EXERCISE_STATE_TYPE = {
    ownExercises: Array<EXERCISE_TYPE>,
    exercises: Array<EXERCISE_TYPE>,
    selectedExercises: EXERCISES_BY_TYPES_TYPE,
    blackListExerciseIds: Array<string>
}

export type EXERCISES_BY_TYPES_TYPE = {
    press?: Array<EXERCISE_TYPE>,
    chest?: Array<EXERCISE_TYPE>,
    legs?: Array<EXERCISE_TYPE>,
    hands?: Array<EXERCISE_TYPE>,
    shoulders?: Array<EXERCISE_TYPE>,
    back?: Array<EXERCISE_TYPE>,
}

export type EXERCISE_NAME_TYPES = 'press' | 'chest' | 'legs' | 'hands' | 'shoulders' | 'back'

export const addExercise = createAsyncThunk<EXERCISE_FILE_TYPE | undefined, EXERCISE_TYPE, {
    state: STORE_TYPE
}>('exercise/AddExercise', async (exercise, thunkAPI) => {
    try {
        const {exercise: exerciseState} = thunkAPI.getState()
        const newExerciseState = {
            ownExercises: [...exerciseState.ownExercises, exercise],
            exercises: [...exerciseState.exercises, exercise]
        }
        const isWrote = await writeExercisesFile(newExerciseState)
        if (isWrote) {
            showToast({
                type: 'success',
                text1: 'Exercise is added'
            })
            return newExerciseState
        }
    } catch (e) {
        showToast({
            type: 'error',
            text1: 'Cannot add exercise'
        })
        console.error('Can\'t add exercise', e)
    }
})

export const changeExercise = createAsyncThunk<EXERCISE_FILE_TYPE | undefined, EXERCISE_TYPE, {
    state: STORE_TYPE
}>('exercise/ChangeExercise', async (exercise, thunkAPI) => {
    try {
        const {exercise: exerciseState} = thunkAPI.getState()
        const newExerciseState = {
            ownExercises: [...exerciseState.ownExercises.filter(e => e.id !== exercise.id), exercise],
            exercises: [...exerciseState.exercises.filter(e => e.id !== exercise.id), exercise]
        }
        const isWrote = await writeExercisesFile(newExerciseState)
        if (isWrote) {
            showToast({
                type: 'success',
                text1: 'Exercise is changed'
            })
            return newExerciseState
        }
    } catch (e) {
        showToast({
            type: 'error',
            text1: 'Cannot change exercise'
        })
        console.error('Can\'t change exercise', e)
    }
})


export const deleteExercise = createAsyncThunk<EXERCISE_FILE_TYPE | undefined, string, {
    state: STORE_TYPE
}>('exercise/DeleteExercise', async (exerciseId, thunkAPI) => {
    try {
        const {exercise: exerciseState} = thunkAPI.getState()
        const newExerciseState = {
            ownExercises: [...exerciseState.ownExercises.filter(e => e.id !== exerciseId)],
            exercises: [...exerciseState.exercises.filter(e => e.id !== exerciseId)]
        }
        const isWrote = await writeExercisesFile(newExerciseState)
        if (isWrote) {
            showToast({
                type: 'success',
                text1: 'Exercise was deleted'
            })
            return newExerciseState
        }
    } catch (e) {
        showToast({
            type: 'error',
            text1: 'Cannot delete exercise',
            text2: e instanceof Error ? 'Error: ' + e.message : ''
        })
        console.error('Can\'t delete exercise', e)
    }
})

const initialState: EXERCISE_STATE_TYPE = {
    ownExercises: [],
    exercises: [],
    selectedExercises: {},
    blackListExerciseIds: []
}
const exerciseSlice = createSlice({
    name: 'exercise',
    initialState,
    reducers: {
        initExerciseState: (state, action: PayloadAction<EXERCISE_FILE_TYPE>) => {
            state.exercises = [
                ...action.payload.ownExercises.filter(e => !state.blackListExerciseIds.includes(e.id)),
                ...baseExercises.filter(e => !state.blackListExerciseIds.includes(e.id))
            ]
            state.ownExercises = action.payload.ownExercises
        },
        toggleSelectedExercise: (state, {payload: {type, exercise}}: PayloadAction<{
            type: EXERCISE_NAME_TYPES,
            exercise?: EXERCISE_TYPE
        }>) => {
            if (!exercise) {
                if (!!state.selectedExercises[type]) {
                    delete state.selectedExercises[type]
                    state.selectedExercises = {...state.selectedExercises}
                } else {
                    state.selectedExercises = {...state.selectedExercises, [type]: []}
                }
            } else {
                if (state.selectedExercises[type] === undefined) {
                    state.selectedExercises[type] = [exercise]
                } else {
                    // @ts-ignore
                    if (!!state.selectedExercises[type].find(e => e.id === exercise.id)) {
                        state.selectedExercises = {
                            ...state.selectedExercises,
                            // @ts-ignore
                            [type]: state.selectedExercises[type].filter(e => e.id !== exercise.id)
                        }
                    } else {
                        state.selectedExercises = {
                            ...state.selectedExercises,
                            // @ts-ignore
                            [type]: [...state.selectedExercises[type], exercise]
                        }
                    }
                }
            }
        },
        clearSelectedExercises: (state) => {
            state.selectedExercises = {}
        }
    },
    extraReducers: builder => {
        builder
            .addCase(addExercise.fulfilled, (state, action) => {
                if (action.payload) {
                    state.exercises = action.payload.exercises
                    state.ownExercises = action.payload.ownExercises
                }
            })
            .addCase(changeExercise.fulfilled, (state, action) => {
                if (action.payload) {
                    state.exercises = action.payload.exercises
                    state.ownExercises = action.payload.ownExercises
                }
            })
            .addCase(deleteExercise.fulfilled, (state, action) => {
                if (action.payload) {
                    showToast({
                        type: 'success',
                        text1: 'Exercise deleted'
                    })
                    state.exercises = action.payload.exercises
                    state.ownExercises = action.payload.ownExercises
                }
            })
    }
})

export const {initExerciseState, toggleSelectedExercise, clearSelectedExercises} = exerciseSlice.actions
export default exerciseSlice.reducer
