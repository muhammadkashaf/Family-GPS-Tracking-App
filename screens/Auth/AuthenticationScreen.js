import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class Authentication extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Welcome</Text>
            </View>
        );
    }
}
export default Authentication;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});