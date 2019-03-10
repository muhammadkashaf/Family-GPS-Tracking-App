import React, { Component } from "react";
import { View, StyleSheet, AsyncStorage, TouchableOpacity } from "react-native";
import * as firebase from 'firebase';
import 'firebase/firestore';
import { Location } from 'expo';
import { Avatar, Text } from 'react-native-elements';
import { Button, } from 'native-base';
import UUIDGenerator from 'react-native-uuid-generator';

class DashboardScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            img: null
        }
    }

    // ac = async() =>{

    //     const db = firebase.firestore();

    //     const user = await AsyncStorage.getItem("userToken");
    //     if (!user) {
    //         this.props.navigation.navigate('AuthLoading');
    //     }
    //     db.collection("users").where("uid", "==", user).get().then(res => {

    //         if (res.docs.length) {

    //             res.docs.forEach(data => {
    //                 this.setState({ name: data.data().name, img: data.data().url, usid: data.id })
    //                 db.collection("users").doc(data.id).update({ location: this.state.location, latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude }).then(() => {
    //                     debugger
    //                     db.collection("circle").where("uid", "==", user).onSnapshot(a => {
    //                         if (a.docs.length) {
    //                             a.docs.forEach(b => {
    //                                 db.collection("circle").doc(b.id).update({ location: this.state.location, latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude }).then(() => {

    //                                     db.collection("circle").onSnapshot(c => {
    //                                         if (c.docs.length) {
    //                                             c.docs.forEach(d => {
    //                                                 db.collection("circle").doc(d.id).collection("members").where("uid", "==", user).onSnapshot(e => {
    //                                                     if (e.docs.length) {
    //                                                         e.docs.forEach(f => {
    //                                                             db.collection("circle").doc(d.id).collection("members").doc(f.id).update({ location: this.state.location, latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude })
    //                                                         })
    //                                                     }
    //                                                 })
    
    //                                             })
    //                                         }
    
    //                                     })
    
    //                                 })
    //                             })
                                
    //                         } else {

    //                             db.collection("circle").onSnapshot(c => {
    //                                 if (c.docs.length) {
    //                                     c.docs.forEach(d => {
    //                                         db.collection("circle").doc(d.id).collection("members").where("uid", "==", user).onSnapshot(e => {
    //                                             if (e.docs.length) {
    //                                                 e.docs.forEach(f => {
    //                                                     db.collection("circle").doc(d.id).collection("members").doc(f.id).update({ location: this.state.location, latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude })
    //                                                 })
    //                                             }
    //                                         })

    //                                     })
    //                                 }

    //                             })
    //                         }
    //                     })
    //                 })

    //             })

    //         }

    //     })

    // }

    // _getLocationAsync = async () => {

    //     const { usid } = this.state;
    //     const db = firebase.firestore();

    //     let { status } = await Expo.Permissions.askAsync(Expo.Permissions.LOCATION);
    //     if (status !== 'granted') {
    //         this.setState({
    //             errorMessage: 'Permission to access location was denied',
    //         });
    //     }

    //     let location = await Expo.Location.getCurrentPositionAsync({});
    //     this.setState({ location, condition: true });
    //     console.log('current location===', location)

    //     Location.watchPositionAsync({ distanceInterval: 1 }, (coords) => {
    //         console.log('current location===', coords)
    //         // db.collection("users").doc(usid).update({location, latitude: location.coords.latitude, longitude: location.coords.longitude})
    //         this.setState({ location: coords, latitude: location.coords.latitude, longitude: location.coords.longitude })
    //         this.ac()
    //         // this.componentDidMount()
    //         // this.componentWillMount()
    //     });


    // };


    // componentWillMount() {
    //     this._getLocationAsync()
    // }

    signOut = async () => {
        AsyncStorage.clear();
        this.props.navigation.navigate('AuthLoading');
    }

    create() {
        this.props.navigation.navigate("circle")
    }

    join() {
        this.props.navigation.navigate("joinCircle")
    }

    render() {
        const { name, img } = this.state;
        return (
            <View style={styles.container}>
                {/* <Text h4>{name}</Text>
                <Avatar rounded size="xlarge" source={{ uri: img }} /> */}
                <View style={styles.container}>
                    <TouchableOpacity style={styles.btn} onPress={this.create.bind(this)}>
                        <Text style={styles.btn_text}>Create Circle</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn1} onPress={this.join.bind(this)}>
                        <Text style={styles.btn_text}>Join Circle</Text>
                    </TouchableOpacity>
                </View>
                {/* <Button title='Sign Out' onPress={this.signOut}/> */}
            </View>
        );
    }
}
export default DashboardScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    btn_text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: '500',
        alignSelf: 'center'
    },
    btn: {
        justifyContent: 'center',
        alignSelf: 'center',
        height: 60,
        width: 320,
        color: '#fff',
        fontSize: 24,
        borderRadius: 50,
        fontWeight: '600',
        backgroundColor: '#2b9077',
    },
    btn1: {
        marginTop: 20,
        justifyContent: 'center',
        alignSelf: 'center',
        height: 60,
        width: 320,
        color: '#fff',
        fontSize: 24,
        borderRadius: 50,
        fontWeight: '600',
        backgroundColor: '#2b9077',
    }
});