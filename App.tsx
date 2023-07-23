import {Provider} from 'react-redux'
import store from './redux/store'
import {Navigation} from './app/Navigation'
import './translation/i18n.config'
import {StatusBar} from 'react-native'

const App = () => {
    return <Provider store={store}>
        <StatusBar barStyle={'light-content'}/>
        <Navigation/>
    </Provider>
}
export default App
