import React, { Component } from "react";
import { ActivityIndicator, AsyncStorage } from "react-native";

class AuthLoadingScreen extends Component {

    constructor(){
        super()

        this.load();
    }

    load = async() =>{
        const user = await AsyncStorage.getItem('userToken');
        // alert(user);
        this.props.navigation.navigate(user ? 'App':'Authentication');
    }

    render() {
        return (
            <ActivityIndicator />
        );
    }
}
export default AuthLoadingScreen;
