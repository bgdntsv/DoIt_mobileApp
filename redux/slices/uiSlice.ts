import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {writeUiFile} from '../../helpers/fileHelper'
import {STORE_TYPE} from '../store'

export type THEME_TYPE = 'white' | 'pink'
export type LANGUAGE_TYPE = 'ua' | 'en'

export type UI_STATE_TYPE = {
    theme: THEME_TYPE,
    language: LANGUAGE_TYPE
}

export const changeTheme = createAsyncThunk<THEME_TYPE | undefined, THEME_TYPE, {
    state: STORE_TYPE
}>('ui/changeTheme', async (theme, thunkAPI) => {
    try {
        const {ui} = thunkAPI.getState()
        const newUiFile: UI_STATE_TYPE = {...ui, theme}
        const isWrote = await writeUiFile(newUiFile)
        if (isWrote) {
            return theme
        } else {
            console.error('Can\'t change a theme: ' + theme)
        }
    } catch (e) {
        console.error(e)
    }
})

export const changeLanguage = createAsyncThunk<LANGUAGE_TYPE | undefined, LANGUAGE_TYPE, {
    state: STORE_TYPE
}>('ui/changeLanguage', async (language, thunkAPI) => {
    try {
        const {ui} = thunkAPI.getState()
        const newUiFile: UI_STATE_TYPE = {...ui, language}
        const isWrote = await writeUiFile(newUiFile)
        if (isWrote) {
            return language
        } else {
            console.error('Can\'t change language: ' + language)
        }
    } catch (e) {
        console.error(e)
    }
})

const initialState: UI_STATE_TYPE = {
    theme: 'white',
    language: 'ua'
}
export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(changeTheme.fulfilled, (state, action) => {
            if (action.payload !== undefined) {
                state.theme = action.payload
            }
        })
        builder.addCase(changeLanguage.fulfilled, (state, action) => {
            if(action.payload !== undefined){
                state.language = action.payload
            }
        })
    }
})


export default uiSlice.reducer
