import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EXERCISE, EXERCISE_TYPE } from './exerciseSlice'
import { STORE_TYPE } from '../store'
import { writeTrainingsFile } from '../../helpers/fileHelper'
import { showToast } from '../../helpers/toast'

export type TRAINING = {
    name: string
    id: string
    dateCreation: number
    press?: Array<EXERCISE>
    chest?: Array<EXERCISE>
    legs?: Array<EXERCISE>
    hands?: Array<EXERCISE>
    shoulders?: Array<EXERCISE>
    back?: Array<EXERCISE>
    startTime?: Date
    finishTime?: Date
}

export type TRAININGS_STATE = {
    trainings: Array<TRAINING>
    trainingsHistory: Array<TRAINING>
}

export const addTraining = createAsyncThunk<
    TRAININGS_STATE | undefined,
    TRAINING,
    {
        state: STORE_TYPE
    }
>('training/AddTraining', async (training, thunkAPI) => {
    try {
        const { training: trainingState } = thunkAPI.getState()
        const newTrainingState: TRAININGS_STATE = {
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
    TRAININGS_STATE | undefined,
    TRAINING,
    {
        state: STORE_TYPE
    }
>('training/ChangeTraining', async (training, thunkAPI) => {
    try {
        const { training: trainingState } = thunkAPI.getState()
        const newTrainingState: TRAININGS_STATE = {
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
            text1: 'Training cannot be changed',
            text2: e instanceof Error ? 'Error: ' + e.message : '',
        })
        console.error("Can't change training", e)
    }
})
export const removeExerciseFromTraining = createAsyncThunk<
    TRAININGS_STATE | undefined,
    { trainingId: string; exerciseId: string; exerciseType: EXERCISE_TYPE },
    {
        state: STORE_TYPE
    }
>(
    'training/RemoveExerciseFromTraining',
    async ({ trainingId, exerciseId, exerciseType }, thunkAPI) => {
        try {
            const { training: trainingState } = thunkAPI.getState()
            let updatedTraining
            const trainingToUpdate = JSON.parse(
                JSON.stringify(
                    trainingState.trainings.find((t) => t.id === trainingId)
                )
            ) as TRAINING
            const indexOfExercise = trainingToUpdate?.[exerciseType]?.findIndex(
                (e) => e.id === exerciseId
            )

            if (
                trainingToUpdate &&
                typeof indexOfExercise === 'number' &&
                indexOfExercise >= 0
            ) {
                trainingToUpdate?.[exerciseType]?.splice(indexOfExercise, 1)
                updatedTraining = trainingToUpdate
            }

            const newTrainingState: TRAININGS_STATE = {
                trainingsHistory: [...trainingState.trainingsHistory],
                trainings: updatedTraining
                    ? [
                          ...trainingState.trainings.filter(
                              (t) => t.id !== trainingId
                          ),
                          updatedTraining,
                      ]
                    : trainingState.trainings,
            }
            const isWrote = await writeTrainingsFile(newTrainingState)
            if (isWrote) {
                return newTrainingState
            }
        } catch (e) {
            showToast({
                type: 'error',
                text1: 'Exercise cannot be removed from your treating',
                text2: e instanceof Error ? 'Error: ' + e.message : '',
            })
            console.error("Can't change training", e)
        }
    }
)

export const deleteTraining = createAsyncThunk<
    TRAININGS_STATE | undefined,
    string,
    {
        state: STORE_TYPE
    }
>('training/DeleteTraining', async (trainingId, thunkAPI) => {
    try {
        const { training: trainingState } = thunkAPI.getState()
        const newTrainingState: TRAININGS_STATE = {
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

const initialState: TRAININGS_STATE = {
    trainings: [],
    trainingsHistory: [],
}
const trainingSlice = createSlice({
    name: 'training',
    initialState,
    reducers: {
        initTrainingsState: (state, action: PayloadAction<TRAININGS_STATE>) => {
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
            .addCase(removeExerciseFromTraining.fulfilled, (state, action) => {
                if (action.payload) {
                    state.trainings = action.payload.trainings
                }
            })
    },
})
export default trainingSlice.reducer
export const { initTrainingsState } = trainingSlice.actions
