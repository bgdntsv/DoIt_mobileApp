import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {STORE_TYPE} from '../store'
import {writeExercisesFile} from '../../helpers/fileHelper'
import {MUSCLE_AREA_TYPE} from '../../helpers/constants'
import {showToast} from '../../helpers/toast'

export type EXERCISE_TYPE = {
    name: string,
    description: string,
    muscleArea: Array<MUSCLE_AREA_TYPE>,
    links?: Array<string>,
    weight?: string,
    metric?: 'kg' | 'lb',
    count?: number,
    gym: boolean,
    outdoors: boolean,
    home: boolean,
    inventory?: Array<string>,
    id: string
}

export type EXERCISE_STATE_TYPE = {
    baseExercises: Array<EXERCISE_TYPE>,
    ownExercises: Array<EXERCISE_TYPE>,
    exercises: Array<EXERCISE_TYPE>
}

export const addExercise = createAsyncThunk<EXERCISE_STATE_TYPE | undefined, EXERCISE_TYPE, {
    state: STORE_TYPE
}>('exercise/AddExercise', async (exercise, thunkAPI) => {
    try {
        const {exercise: exerciseState} = thunkAPI.getState()
        let newExerciseState = exerciseState
        newExerciseState.ownExercises = [...newExerciseState.ownExercises, exercise]
        newExerciseState.exercises = [...newExerciseState.exercises, exercise]
        const isWrote = await writeExercisesFile(newExerciseState)
        if (isWrote) {
            return newExerciseState
        }
    } catch (e) {
        console.error('Can\'t add exercise', e)
    }
})
export const deleteExercise = createAsyncThunk<EXERCISE_STATE_TYPE | undefined, string, {
    state: STORE_TYPE
}>('exercise/DeleteExercise', async (exerciseId, thunkAPI) => {
    try{
        const {exercise: exerciseState} = thunkAPI.getState()
        let newExerciseState = exerciseState
        newExerciseState.ownExercises = newExerciseState.ownExercises.filter(e=>e.id !== exerciseId)
        newExerciseState.exercises = newExerciseState.exercises.filter(e=>e.id !== exerciseId)
        const isWrote = await writeExercisesFile(newExerciseState)
        if (isWrote) {
            return newExerciseState
        }
    }catch (e) {
        console.error('Can\'t delete exercise', e)
    }
})

const initialState: EXERCISE_STATE_TYPE = {
    baseExercises: [],
    ownExercises: [],
    exercises: []
}
const exerciseSlice = createSlice({
    name: 'exercise',
    initialState,
    reducers: {
        initExerciseState: (state, action: PayloadAction<EXERCISE_STATE_TYPE>) => {
            state.exercises = action.payload.exercises
            state.baseExercises = action.payload.baseExercises
            state.ownExercises = action.payload.ownExercises
        }
    },
    extraReducers: builder => {
        builder
            .addCase(addExercise.fulfilled, (state, action) => {
                if (action.payload) {
                    showToast({
                        type: 'success',
                        text1: 'Exercise added'
                    })
                    state.exercises = action.payload.exercises
                    state.ownExercises = action.payload.ownExercises
                }
            })
            .addCase(deleteExercise.fulfilled, (state, action)=> {
                if(action.payload){
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

export const {initExerciseState} = exerciseSlice.actions
export default exerciseSlice.reducer
