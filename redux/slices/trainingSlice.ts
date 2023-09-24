import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EXERCISE_TYPE } from './exerciseSlice'
import { STORE_TYPE } from '../store'
import { writeTrainingsFile } from '../../helpers/fileHelper'
import { showToast } from '../../helpers/toast'

export type TRAINING_TYPE = {
    name: string
    id: string
    dateCreation: number
    press?: Array<EXERCISE_TYPE>
    chest?: Array<EXERCISE_TYPE>
    legs?: Array<EXERCISE_TYPE>
    hands?: Array<EXERCISE_TYPE>
    shoulders?: Array<EXERCISE_TYPE>
    back?: Array<EXERCISE_TYPE>
    startTime?: Date
    finishTime?: Date
}

export type TRAININGS_STATE_TYPE = {
    trainings: Array<TRAINING_TYPE>
    trainingsHistory: Array<TRAINING_TYPE>
}

export const addTraining = createAsyncThunk<
    TRAININGS_STATE_TYPE | undefined,
    TRAINING_TYPE,
    {
        state: STORE_TYPE
    }
>('training/AddTraining', async (training, thunkAPI) => {
    try {
        const { training: trainingState } = thunkAPI.getState()
        const newTrainingState: TRAININGS_STATE_TYPE = {
            trainingsHistory: [...trainingState.trainingsHistory],
            trainings: [...trainingState.trainings, training],
        }
        const isWrote = await writeTrainingsFile(newTrainingState)
        if (isWrote) {
            showToast({
                type: 'success',
                text1: 'Training is added',
            })
            return newTrainingState
        }
    } catch (e) {
        showToast({
            type: 'error',
            text1: 'Cannot add training',
            text2: e instanceof Error ? 'Error: ' + e.message : '',
        })
        console.error("Can't add training", e)
    }
})

export const changeTraining = createAsyncThunk<
    TRAININGS_STATE_TYPE | undefined,
    TRAINING_TYPE,
    {
        state: STORE_TYPE
    }
>('training/ChangeTraining', async (training, thunkAPI) => {
    try {
        const { training: trainingState } = thunkAPI.getState()
        const newTrainingState: TRAININGS_STATE_TYPE = {
            trainingsHistory: [...trainingState.trainingsHistory],
            trainings: [
                ...trainingState.trainings.filter((t) => t.id !== training.id),
                training,
            ],
        }
        const isWrote = await writeTrainingsFile(newTrainingState)
        if (isWrote) {
            showToast({
                type: 'success',
                text1: 'Training is changed',
            })
            return newTrainingState
        }
    } catch (e) {
        showToast({
            type: 'error',
            text1: 'Cannot change training',
            text2: e instanceof Error ? 'Error: ' + e.message : '',
        })
        console.error("Can't change training", e)
    }
})

export const deleteTraining = createAsyncThunk<
    TRAININGS_STATE_TYPE | undefined,
    string,
    {
        state: STORE_TYPE
    }
>('training/DeleteTraining', async (trainingId, thunkAPI) => {
    try {
        const { training: trainingState } = thunkAPI.getState()
        const newTrainingState: TRAININGS_STATE_TYPE = {
            trainingsHistory: [...trainingState.trainingsHistory],
            trainings: [
                ...trainingState.trainings.filter(
                    (training) => training.id !== trainingId
                ),
            ],
        }
        const isWrote = await writeTrainingsFile(newTrainingState)
        if (isWrote) {
            showToast({
                type: 'success',
                text1: 'Training was deleted',
            })
            return newTrainingState
        }
    } catch (e) {
        showToast({
            type: 'error',
            text1: 'Cannot delete training',
            text2: e instanceof Error ? 'Error: ' + e.message : '',
        })
        console.error("Can't delete training", e)
    }
})

const initialState: TRAININGS_STATE_TYPE = {
    trainings: [],
    trainingsHistory: [],
}
const trainingSlice = createSlice({
    name: 'training',
    initialState,
    reducers: {
        initTrainingsState: (
            state,
            action: PayloadAction<TRAININGS_STATE_TYPE>
        ) => {
            state.trainings = action.payload.trainings
            state.trainingsHistory = action.payload.trainingsHistory
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addTraining.fulfilled, (state, action) => {
                if (action.payload) {
                    state.trainings = action.payload.trainings
                }
            })
            .addCase(changeTraining.fulfilled, (state, action) => {
                if (action.payload) {
                    state.trainings = action.payload.trainings
                }
            })
            .addCase(deleteTraining.fulfilled, (state, action) => {
                if (action.payload) {
                    state.trainings = action.payload.trainings
                }
            })
    },
})
export default trainingSlice.reducer
export const { initTrainingsState } = trainingSlice.actions
