import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { STORE_TYPE } from '../store'
import { writeExercisesFile } from '../../helpers/fileHelper'
import { INVENTORY, MUSCLE_AREA_TYPE } from '../../helpers/types'
import { showToast } from '../../helpers/toast'
import { ImagePickerAsset } from 'expo-image-picker'
import { baseExercises } from '../../helpers/baseExercises'

export type MEDIA_LINK_TYPE = Array<ImagePickerAsset | string>

export type EXERCISE = {
    name: string
    description: string
    muscleArea: Array<MUSCLE_AREA_TYPE>
    media?: MEDIA_LINK_TYPE
    weight?: string
    metric?: 'kg' | 'lb'
    count?: number
    gym: boolean
    outdoors: boolean
    home: boolean
    inventory?: Array<INVENTORY>
    id: string
    type: EXERCISE_TYPE
    isOwn?: boolean
}

export type EXERCISE_FILE = {
    ownExercises: Array<EXERCISE>
    exercises: Array<EXERCISE>
}

export type EXERCISE_STATE = {
    ownExercises: Array<EXERCISE>
    exercises: Array<EXERCISE>
    selectedExercisesByTypes: EXERCISES_BY_TYPES
    allSelectedExercises: Array<EXERCISE>
    blackListExerciseIds: Array<string>
    exercisesByType: {
        press: Array<EXERCISE>
        chest: Array<EXERCISE>
        legs: Array<EXERCISE>
        hands: Array<EXERCISE>
        shoulders: Array<EXERCISE>
        back: Array<EXERCISE>
    }
}

export type EXERCISES_BY_TYPES = {
    press: Array<EXERCISE>
    chest: Array<EXERCISE>
    legs: Array<EXERCISE>
    hands: Array<EXERCISE>
    shoulders: Array<EXERCISE>
    back: Array<EXERCISE>
}

export type EXERCISE_TYPE = 'press' | 'chest' | 'legs' | 'hands' | 'shoulders' | 'back'

export const addExercise = createAsyncThunk<
    EXERCISE_FILE | undefined,
    EXERCISE,
    {
        state: STORE_TYPE
    }
>('exercise/AddExercise', async (exercise, thunkAPI) => {
    try {
        const { exercise: exerciseState } = thunkAPI.getState()
        const newExerciseState = {
            ownExercises: [...exerciseState.ownExercises, exercise],
            exercises: [...exerciseState.exercises, exercise],
        }
        const isWrote = await writeExercisesFile(newExerciseState)
        if (isWrote) {
            showToast({
                type: 'success',
                text1: 'Exercise is added',
            })
            return newExerciseState
        }
    } catch (e) {
        showToast({
            type: 'error',
            text1: 'Cannot add exercise',
        })
        console.error("Can't add exercise", e)
    }
})

export const changeExercise = createAsyncThunk<
    EXERCISE_FILE | undefined,
    EXERCISE,
    {
        state: STORE_TYPE
    }
>('exercise/ChangeExercise', async (exercise, thunkAPI) => {
    try {
        const { exercise: exerciseState } = thunkAPI.getState()
        const newExerciseState = {
            ownExercises: [...exerciseState.ownExercises.filter((e) => e.id !== exercise.id), exercise],
            exercises: [...exerciseState.exercises.filter((e) => e.id !== exercise.id), exercise],
        }
        const isWrote = await writeExercisesFile(newExerciseState)
        if (isWrote) {
            showToast({
                type: 'success',
                text1: 'Exercise is changed',
            })
            return newExerciseState
        }
    } catch (e) {
        showToast({
            type: 'error',
            text1: 'Cannot change exercise',
        })
        console.error("Can't change exercise", e)
    }
})

export const deleteExercise = createAsyncThunk<
    EXERCISE_FILE | undefined,
    string,
    {
        state: STORE_TYPE
    }
>('exercise/DeleteExercise', async (exerciseId, thunkAPI) => {
    try {
        const { exercise: exerciseState } = thunkAPI.getState()
        const newExerciseState = {
            ownExercises: [...exerciseState.ownExercises.filter((e) => e.id !== exerciseId)],
            exercises: [...exerciseState.exercises.filter((e) => e.id !== exerciseId)],
        }
        const isWrote = await writeExercisesFile(newExerciseState)
        if (isWrote) {
            showToast({
                type: 'success',
                text1: 'Exercise was deleted',
            })
            return newExerciseState
        }
    } catch (e) {
        showToast({
            type: 'error',
            text1: 'Cannot delete exercise',
            text2: e instanceof Error ? 'Error: ' + e.message : '',
        })
        console.error("Can't delete exercise", e)
    }
})

const setExercisesByTypes = (exercises: Array<EXERCISE>): EXERCISES_BY_TYPES => {
    const exercisesByType: EXERCISES_BY_TYPES = {
        press: [],
        back: [],
        chest: [],
        hands: [],
        legs: [],
        shoulders: [],
    }
    exercises.forEach((e) => {
        exercisesByType[e.type].push(e)
    })
    return exercisesByType
}

const initialState: EXERCISE_STATE = {
    ownExercises: [],
    exercises: [],
    selectedExercisesByTypes: {
        press: [],
        back: [],
        chest: [],
        hands: [],
        legs: [],
        shoulders: [],
    },
    allSelectedExercises: [],
    blackListExerciseIds: [],
    exercisesByType: {
        press: [],
        back: [],
        chest: [],
        hands: [],
        legs: [],
        shoulders: [],
    },
}
const exerciseSlice = createSlice({
    name: 'exercise',
    initialState,
    reducers: {
        initExerciseState: (state, action: PayloadAction<EXERCISE_FILE | undefined>) => {
            if (action.payload) {
                state.exercises = [
                    ...action.payload.ownExercises.filter((e) => !state.blackListExerciseIds.includes(e.id)),
                    ...baseExercises.filter((e) => !state.blackListExerciseIds.includes(e.id)),
                ]
                state.ownExercises = action.payload.ownExercises
            } else {
                state.exercises = [...baseExercises.filter((e) => !state.blackListExerciseIds.includes(e.id))]
            }
            const exercisesByType = setExercisesByTypes(state.exercises)
            state.exercisesByType = { ...exercisesByType }
        },
        toggleSelectedExercise: (
            state,
            {
                payload: { exercise },
            }: PayloadAction<{
                exercise: EXERCISE
            }>
        ) => {
            // toggle exercise
            if (state.selectedExercisesByTypes[exercise.type] === undefined) {
                // add first exercise in current type
                state.selectedExercisesByTypes[exercise.type] = [exercise]
            } else {
                // toggle exercise in type
                if (!!state.selectedExercisesByTypes[exercise.type]?.find((e) => e.id === exercise.id)) {
                    // remove exercise from type
                    state.selectedExercisesByTypes = {
                        ...state.selectedExercisesByTypes,
                        [exercise.type]: state.selectedExercisesByTypes[exercise.type]?.filter(
                            (e) => e.id !== exercise.id
                        ),
                    }
                } else {
                    // add exercise to type
                    state.selectedExercisesByTypes = {
                        ...state.selectedExercisesByTypes,
                        [exercise.type]: [...(<[]>state.selectedExercisesByTypes[exercise.type]), exercise],
                    }
                }
            }
            if (state.allSelectedExercises.find((e) => e.id === exercise.id)) {
                // remove exercise
                state.allSelectedExercises = state.allSelectedExercises.filter((e) => e.id !== exercise.id)
            } else {
                // add exercise
                state.allSelectedExercises = [...state.allSelectedExercises, exercise]
            }
        },
        clearSelectedExercises: (state) => {
            state.selectedExercisesByTypes = {
                press: [],
                back: [],
                chest: [],
                hands: [],
                legs: [],
                shoulders: [],
            }
            state.allSelectedExercises = []
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addExercise.fulfilled, (state, action) => {
                if (action.payload) {
                    state.exercises = action.payload.exercises
                    state.ownExercises = action.payload.ownExercises
                    const exercisesByType = setExercisesByTypes(state.exercises)
                    state.exercisesByType = { ...exercisesByType }
                }
            })
            .addCase(changeExercise.fulfilled, (state, action) => {
                if (action.payload) {
                    state.exercises = action.payload.exercises
                    state.ownExercises = action.payload.ownExercises
                    const exercisesByType = setExercisesByTypes(state.exercises)
                    state.exercisesByType = { ...exercisesByType }
                }
            })
            .addCase(deleteExercise.fulfilled, (state, action) => {
                if (action.payload) {
                    showToast({
                        type: 'success',
                        text1: 'Exercise deleted',
                    })
                    state.exercises = action.payload.exercises
                    state.ownExercises = action.payload.ownExercises
                    const exercisesByType = setExercisesByTypes(state.exercises)
                    state.exercisesByType = { ...exercisesByType }
                }
            })
    },
})

export const { initExerciseState, toggleSelectedExercise, clearSelectedExercises } = exerciseSlice.actions
export default exerciseSlice.reducer
