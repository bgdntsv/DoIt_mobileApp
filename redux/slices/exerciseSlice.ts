import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {STORE_TYPE} from '../store'
import {writeExercisesFile} from '../../helpers/fileHelper'
import {MUSCLE_AREA_TYPE} from '../../helpers/constants'

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
            state = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(addExercise.fulfilled, (state, action) => {
                if (action.payload) {
                    state.exercises = action.payload.exercises
                    state.ownExercises = action.payload.ownExercises
                    state.baseExercises = action.payload.baseExercises
                }
            })
    }
})

export const {initExerciseState} = exerciseSlice.actions
export default exerciseSlice.reducer
