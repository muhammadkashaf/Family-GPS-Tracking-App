import React, { Component } from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";
// import CodeInput from 'react-native-confirmation-code-field';
import CodeInput from 'react-native-code-input';
import * as firebase from 'firebase';
import 'firebase/firestore';

class joinCircle extends Component {

    // handlerOnFulfill = code => console.log(code);

    constructor(props){
        super(props);

        this.state = {
            uid: null
        }
    }

    async componentWillMount(){

        const db = firebase.firestore();
        const user = await AsyncStorage.getItem("userToken");

        db.collection('users').where('uid','==',user).get().then(res =>{
            
            if (res.size) {
                
                res.docs.forEach(data =>{
                    
                    this.setState({uid: data.data().uid, name: data.data().name, img: data.data().url, lat: data.data().latitude, lon: data.data().longitude});

                })
            }

        })
    }

    _onFulfill(code){
        
        const {uid, name, img, lat, lon} = this.state;
        const db = firebase.firestore();

        // To check given key exists
        db.collection("circle").where("key","==",code).get().then(res =>{

            if(res.docs.length){

                res.docs.forEach(data =>{
                    
                    db.collection("circle").doc(data.id).get().then(a =>{
                    
                        // To check user admin or not
                        if (a.data().uid == uid) {
                            
                            alert("You can't join this circle you are the admin");

                        } else {
                            
                            db.collection("circle").doc(data.id).collection("members").where("uid","==",uid).get().then(b =>{
                                
                                // To check whether user is already a member or nit
                                if (b.docs.length) {
                                    alert("You are already a member of this circle");
                                }
                                else{

                                    db.collection("circle").doc(data.id).collection("members").add({
                                        uid,
                                        name,
                                        img,
                                        lat,
                                        lon
                                    }).then(() =>{
                                        this.props.navigation.navigate("Dashboard");
                                        alert("Joined Successfully");
                                    })

                                }
                                
                            })

                        }

                    })

                    // db.collection("users").doc(data.id).collection("")

                })
                
            }
            else{
                alert("No circle exists");
            }

        })

    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.txt}>Enter your circle code:</Text>
                </View>
                <View>
                    <CodeInput
                        ref="codeInputRef1"
                        secureTextEntry
                        borderType={'underline'}
                        secureTextEntry
                        activeColor='#2b9077'
                        inactiveColor='#2b9077'
                        space={5}
                        size={30}
                        inputPosition='center'
                        onFulfill={(code) => this._onFulfill(code)}
                    />
                </View>
            </View>
        );
    }
}
export default joinCircle;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txt: {
        fontSize: 22,
        fontWeight: '500',
        marginTop: 70
    },
});