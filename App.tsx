import {Provider} from 'react-redux'
import store from './redux/store'
import {Navigation} from './app/Navigation'
import './translation/i18n.config'
import Toast from 'react-native-toast-message'

const App = () => {
    return <Provider store={store}>
        <Navigation/>
        <Toast/>
    </Provider>
}
export default App
