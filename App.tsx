import {Provider} from 'react-redux'
import store from './redux/store'
import {Navigation} from './app/Navigation'
import './translation/i18n.config'

const App = () => {
    return <Provider store={store}>
        <Navigation/>
    </Provider>
}
export default App
