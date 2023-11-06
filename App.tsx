import React from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'
import { Navigation } from './app/Navigation'
import './translation/i18n.config'
import Toast from 'react-native-toast-message'
import { NativeBaseProvider } from 'native-base'

const App = () => {
    return (
        <Provider store={store}>
            <NativeBaseProvider>
                <Navigation />
                <Toast />
            </NativeBaseProvider>
        </Provider>
    )
}
export default App
