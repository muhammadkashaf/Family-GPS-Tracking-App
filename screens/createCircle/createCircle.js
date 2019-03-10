import React, { Component } from "react";
import { View,Text,StyleSheet, TextInput, TouchableOpacity, AsyncStorage} from "react-native";
import * as firebase from 'firebase';
import 'firebase/firestore';

class createCircle extends Component {

    constructor(props){
        super(props);

        this.state = {
            name: "",
            circle: null,
            id: null
        }

        this.submit = this.submit.bind(this)
    }

    async componentWillMount(){

        const user = await AsyncStorage.getItem("userToken");
        const db = firebase.firestore();

        db.collection('users').where('uid','==',user).get().then(res =>{
            
            if (res.size) {
                
                res.docs.forEach(data =>{
                    
                    this.setState({uid: data.data().uid, name: data.data().name,img: data.data().url, latitude: data.data().latitude, longitude: data.data().longitude})

                })
            }

        })

    }

    submit(){
        const {name, uid, circle, latitude, longitude, img} = this.state;
        const db = firebase.firestore();
        let key = Math.random().toString().substring(2,7);
        
        if (circle) {
            
            db.collection("circle").add({
                
                uid,
                name,
                key,
                circle,
                latitude,
                longitude,
                img

            }).then(() =>{
                this.setState({circle: ''})
                alert("Circle created successfully")
                this.props.navigation.navigate("Dashboard");
            })

        }
        else{
            alert("Enter a name");
        }
    }

    render() {
        const {circle} = this.state;
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.txt}>Enter your circle name:</Text>
                </View>
                <TextInput style={styles.input} value={circle} onChangeText={(val) => this.setState({circle:val})} />
                <View style={styles.container}>
                    <TouchableOpacity style={styles.btn} onPress={this.submit}>
                        <Text style={styles.btn_text}>Create Circle</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
export default createCircle;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    txt: {
        fontSize: 22,
        fontWeight: '500',
        marginTop: 50
    },
    input:{
        width: 200,
        borderBottomWidth: 1,
        borderBottomColor: "grey",
        marginTop: 30,
    },
    btn: {
        justifyContent: 'center',
        alignSelf: 'center',
        height: 60,
        width: 200,
        color: '#fff',
        fontSize: 24,
        borderRadius: 20,
        fontWeight: '600',
        backgroundColor: '#fff',
        borderColor: '#2b9077',
        borderWidth: 1,
        marginTop: 50,
    },
    btn_text: {
        color: '#2b9077',
        fontSize: 30,
        fontWeight: '500',
        alignSelf: 'center'
    },
});