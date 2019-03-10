import React, { Component } from "react";
import { View, Text, StyleSheet, AsyncStorage} from "react-native";


class signOut extends Component {

    constructor(props){
        super(props)
    }

    componentWillMount(){

        AsyncStorage.clear();
        this.props.navigation.navigate('AuthLoading');

    }

    render() {
        return true
            
    }
}
export default signOut;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});