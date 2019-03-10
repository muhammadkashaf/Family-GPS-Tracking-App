import React, { Component } from "react";
import { View, Text, StyleSheet, AsyncStorage, ScrollView } from "react-native";
import * as firebase from 'firebase';
import 'firebase/firestore';
import { ListItem } from 'react-native-elements'


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

        db.collection("circle").where("uid", "==", id).get().then(res => {
            this.setState({ admin: [] })
            if (res.docs.length) {
                res.docs.forEach(d => {
                    var e = { name: d.data().circle }
                    this.setState({ admin: [...this.state.admin, e], adm: '', ad: true })
                })
            } else {

                this.setState({ adm: 'You are not a admin of any circle' })
            }
        })

        db.collection("circle").get().then(res => {
            res.docs.forEach(a => {

                this.setState({ user: [] })
                db.collection("circle").doc(a.id).collection("members").where("uid", "==", id).get().then(b => {

                    if (b.docs.length) {
                        b.docs.forEach(c => {
                            var b = { name: a.data().circle }
                            this.setState({ user: [...this.state.user, b], usr: '', us: true })
                        })
                    } else {

                        this.setState({ usr: 'You are not a member of any circle' })

                    }

                })
            })
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