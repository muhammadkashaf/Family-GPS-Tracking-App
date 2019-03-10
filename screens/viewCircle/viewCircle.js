import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, AsyncStorage } from "react-native";
import firebase from 'firebase/app';
import 'firebase/firestore';
import { MapView, Location } from 'expo';
import { Avatar } from 'react-native-elements';

const { width, height } = Dimensions.get("window");

class viewCircle extends Component {

    constructor(props) {
        super(props);

        this.state = ({
            condition: false,
            url: "",
            pic: false,
            id: null,
            users: []
        })
    }

    async componentWillMount() {
        const db = firebase.firestore();

        const user = await AsyncStorage.getItem('userToken')


            db.collection("users").where("uid", "==", user).get().then(res => {
                if (res.docs.length) {
                    debugger
                    res.docs.forEach(user => {
                        this.setState({ url: user.data().url, pic: true })
                    })
                    console.log("1235456******************************");

                }
            })
    }

    _getLocationAsync = async () => {

        let { status } = await Expo.Permissions.askAsync(Expo.Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Expo.Location.getCurrentPositionAsync({});
        this.setState({ location, condition: true });
        console.log('current location===', location)

        Location.watchPositionAsync({ distanceInterval: 1 }, (coords) => {
            console.log('current location===', coords)
            // this.setState({ location: coords })
            this.setState({ location: coords, latitude: location.coords.latitude, longitude: location.coords.longitude })
            this.ac()
        });


    };


    componentDidMount() {
        this._getLocationAsync()
    }

    ac = async() =>{

        const db = firebase.firestore();

        const user = await AsyncStorage.getItem("userToken");
        if (!user) {
            this.props.navigation.navigate('AuthLoading');
        }
        db.collection("users").where("uid", "==", user).get().then(res => {

            if (res.docs.length) {

                res.docs.forEach(data => {
                    this.setState({ name: data.data().name, img: data.data().url, usid: data.id })
                    db.collection("users").doc(data.id).update({ location: this.state.location, latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude }).then(() => {
                        debugger
                        db.collection("circle").where("uid", "==", user).onSnapshot(a => {
                            if (a.docs.length) {
                                a.docs.forEach(b => {
                                    db.collection("circle").doc(b.id).update({ location: this.state.location, latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude }).then(() => {

                                        db.collection("circle").onSnapshot(c => {
                                            if (c.docs.length) {
                                                c.docs.forEach(d => {
                                                    db.collection("circle").doc(d.id).collection("members").where("uid", "==", user).onSnapshot(e => {
                                                        if (e.docs.length) {
                                                            e.docs.forEach(f => {
                                                                db.collection("circle").doc(d.id).collection("members").doc(f.id).update({ location: this.state.location, latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude })
                                                            })
                                                        }
                                                    })
    
                                                })
                                            }
    
                                        })
    
                                    })
                                })
                                
                            } else {

                                db.collection("circle").onSnapshot(c => {
                                    if (c.docs.length) {
                                        c.docs.forEach(d => {
                                            db.collection("circle").doc(d.id).collection("members").where("uid", "==", user).onSnapshot(e => {
                                                if (e.docs.length) {
                                                    e.docs.forEach(f => {
                                                        db.collection("circle").doc(d.id).collection("members").doc(f.id).update({ location: this.state.location, latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude })
                                                    })
                                                }
                                            })

                                        })
                                    }

                                })
                            }
                        })
                    })

                })

            }

        })

    }

    s = ()=>{

        const db = firebase.firestore();
        var room = this.props.navigation.getParam('room');
        
        if (room != this.state.id) {
            debugger
            this.setState({users: [], id:room})
            db.collection("circle").doc(room).onSnapshot(ad =>{
                var b = { lat: ad.data().latitude, lon: ad.data().longitude, img: ad.data().img }
                this.setState({ users: [...this.state.users, b] })
            })
            db.collection("circle").doc(room).collection("members").onSnapshot(res =>{
                if (res.docs.length) {
                    res.docs.forEach(users =>{
                        var a = {lat: users.data().lat, lon: users.data().lon, img: users.data().img}
                        this.setState({users:[...this.state.users,a]})
                    })
                }
            })
        }

    }

    render() {
        const {condition,pic,url, users,id} = this.state;
        debugger
        var rid = this.props.navigation.getParam('room');

        // debugger
        // if (this.state.id != id) {
        //     console.log("////////////////////",id);
        // }
        if (id != rid) {
            this.s()
        }
            
        
        return (
            <View style={styles.container}>
                {condition && <MapView
                    style={{ flex: 2, height: height, width: width }}
                    initialRegion={{
                        latitude: this.state.location.coords.latitude,
                        longitude: this.state.location.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    {/* {pic &&
                        <MapView.Marker
                            coordinate={this.state.location.coords}
                        // title={'Your Location'}
                        // pinColor={'black'}
                        // image={{ uri: this.state.url }}
                        >

                            <Avatar rounded size="small" source={{ uri: url }} />
                        </MapView.Marker>} */}

                    {users.length > 0 &&
                        <View>
                            {users.map((item,index) =>

                                <MapView.Marker key={index} coordinate={{latitude: item.lat,longitude: item.lon}} title={'Member Location'}>
                                    <Avatar rounded size="small" source={{ uri: item.img }} />
                                </MapView.Marker>
                                
                                )}
                        </View>}    

                    
                </MapView>
                }
            </View>
        );
    }
}
export default viewCircle;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});