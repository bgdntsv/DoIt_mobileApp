import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {STORE_TYPE} from '../store'
import {writeExercisesFile} from '../../helpers/fileHelper'

export type MUSCLE_AREA_TYPE = 'chest_base' | 'chest_up' | 'chest_down' |
    'press_base' | 'press_down' | 'press_up' | 'press_side' |
    'biceps' | 'triceps' | 'forearm' | 'shoulders_base' | 'shoulders_front' | 'shoulders_back' |
    'back_base' | 'back_up' | 'back_down' | 'leg_base'

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
    inventory?: Array<string>
}

export type EXERCISE_STATE_TYPE = {
    baseExercises: Array<EXERCISE_TYPE>,
    ownExercises: Array<EXERCISE_TYPE>,
    exercises: Array<EXERCISE_TYPE>
}

export const addExercise = createAsyncThunk<EXERCISE_STATE_TYPE | undefined, EXERCISE_TYPE, {
    state: STORE_TYPE
}>('exercise/addExercise', async (exercise, thunkAPI) => {
    const {exercise: exerciseState} = thunkAPI.getState()
    let newExerciseState = exerciseState
    newExerciseState.ownExercises.push(exercise)
    newExerciseState.exercises.push(exercise)
    try {
        const isWrote = await writeExercisesFile(newExerciseState)
        if (isWrote) {
            return newExerciseState
        }
    } catch (e) {
        console.error('Can\'t add exercise')
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
                    return action.payload
                }
            })
    }
})

export const {initExerciseState} = exerciseSlice.actions
export default exerciseSlice.reducer
