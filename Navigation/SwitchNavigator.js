import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import AuthLoadingScreen from "../screens/Auth/AuthLoadingScreen";
import AppDrawerNavigator from './AppDrawerNavigator';
import SignInScreen from '../screens/SignIn/SignIn';


const SwitchNavigator = createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    Authentication: SignInScreen,
    App: AppDrawerNavigator
})

const appContainer = createAppContainer(SwitchNavigator);

export default appContainer;