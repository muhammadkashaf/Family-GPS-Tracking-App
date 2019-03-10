import React, { Component } from "react";
import { View, Text, StyleSheet, AsyncStorage, ScrollView } from "react-native";
import * as firebase from 'firebase';
import 'firebase/firestore';
import { ListItem } from 'react-native-elements'
import {MaterialCommunityIcons} from '@expo/vector-icons'

class myCircle extends Component {

    constructor(props) {
        super(props)

        this.state = {
            adm: '',
            admin: [],
            ad: false,
            usr: '',
            user: [],
            us: false
        }

    }

    async componentWillMount() {

        const db = firebase.firestore();
        const id = await AsyncStorage.getItem("userToken");

        db.collection("circle").where("uid", "==", id).onSnapshot(res => {
            this.setState({ admin: [] })
            
            if (res.docs.length) {
                res.docs.forEach(d => {
                    var e = { id: d.id, name: d.data().circle }
                    this.setState({ admin: [...this.state.admin, e], adm: '', ad: true })
                })
            } else {

                this.setState({ adm: 'You are not a admin of any circle' })
            }
        })

        db.collection("circle").onSnapshot(res => {
            res.docs.forEach(a => {

                db.collection("circle").doc(a.id).collection("members").where("uid", "==", id).onSnapshot(b => {
                    this.setState({ user: [] })
                    if (b.docs.length) {
                        b.docs.forEach(c => {
                            var b = { id: a.id, name: a.data().circle }
                            this.setState({ user: [...this.state.user, b], usr: '', us: true })
                        })
                    } else {

                        this.setState({ usr: 'You are not a member of any circle' })

                    }

                })
            })
        })



    }


    async a(id){


        await AsyncStorage.setItem("roomid",id).then(() =>{
            this.props.navigation.navigate("Map",{room:id})
        })

    }

    render() {
        const { adm, admin, ad, usr, user, us } = this.state;
        return (
            <ScrollView scrollEventThrottle={16}>
                <View>
                    <View>
                        {ad ?

                            admin.map((l, i) => (
                                <ListItem
                                    key={i}
                                    leftAvatar={{ source: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzNYd1Tiv0zjbY9Ggn8Mz_wruAjyoueuvX257D_NE4LXnG9SqY' } }}
                                    title={l.name}
                                    subtitle="Admin"
                                    rightTitle={
                                        <View>
                                            <MaterialCommunityIcons name="chevron-right" size={32} color="#2b9077" />
                                        </View>
                                    }
                                    onPress={() => this.a(l.id)}
                                />
                            ))
                            :
                            <View style={styles.container}>
                                <Text>{adm}</Text>
                            </View>
                        }
                    </View>

                    <View>
                        {us ?

                            user.map((l, i) => (
                                <ListItem
                                    
                                    key={i}
                                    leftAvatar={{ source: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzNYd1Tiv0zjbY9Ggn8Mz_wruAjyoueuvX257D_NE4LXnG9SqY' } }}
                                    title={l.name}
                                    subtitle="Member"
                                    rightTitle={
                                        <View>
                                            <MaterialCommunityIcons name="chevron-right" size={32} color="#2b9077" />
                                        </View>
                                    }
                                    onPress={() => this.a(l.id)}
                                    // badge={{ value: '>', textStyle: { color: 'orange' }, containerStyle: { marginTop: 0,backgroundColor: "#fff" } }}
                                />
                            ))
                            :
                            <View style={styles.container}>
                                <Text>{usr}</Text>
                            </View>
                        }
                    </View>

                </View>
            </ScrollView >
        );
    }
}
export default myCircle;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});