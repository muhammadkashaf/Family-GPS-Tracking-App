import React, { Component }  from 'react';
import {TouchableOpacity, View} from 'react-native';
import {createDrawerNavigator, createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import DashboardScreen from '../screens/Dashboard/Dashboard';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import createCircle from '../screens/createCircle/createCircle';
import joinCircle from '../screens/joinCircle/joinCircle';
import signOut from '../screens/signOut/signOut';
import myCircle from '../screens/myCircle/myCircle';
import viewCircle from '../screens/viewCircle/viewCircle';

const AppTabNavigator = createBottomTabNavigator({
    My_Circles: {
    screen:myCircle,
    navigationOptions: {
        tabBarLabel:"My Circles",
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons name="account-group" size={30} color="#2b9077" />
          ),
        tabBarOptions: { activeTintColor:'#2b9077', },
      },
    },
    // Offer: Offers,
    Map: {
    screen:viewCircle,
    navigationOptions: {
        tabBarLabel:"Map",
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons name="map-marker" size={30} color="#2b9077" />
        ),
        tabBarOptions: { activeTintColor:'#2b9077', },
      },
    },
    // Map: Map,
    // Category: Category,
    // Chat: Chat,
    // UserProfile: UserProfile,
    // Offer:Offers
})

const AppStackNavigator = createStackNavigator({
    circle: {
        screen: AppTabNavigator,
        navigationOptions: ({navigation}) => ({
            headerLeft:(
                <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                    <View style={{paddingHorizontal: 10}}> 
                        <Icon name="md-menu" size={24} />
                    </View>
                </TouchableOpacity>
            )
        })
    }

})

const AppDrawerNavigator = createDrawerNavigator({
    

    My_circle: AppStackNavigator,

    Map: createStackNavigator({
        circle: {
            screen: viewCircle,
            navigationOptions: ({navigation}) => ({
                headerLeft:(
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                        <View style={{paddingHorizontal: 10}}> 
                            <Icon name="md-menu" size={24} />
                        </View>
                    </TouchableOpacity>
                )
            })
        }
    }),

    Dashboard: createStackNavigator({
        Dashboard: {
            screen: DashboardScreen,
            navigationOptions: ({navigation}) => ({
                headerLeft:(
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                        <View style={{paddingHorizontal: 10}}> 
                            <Icon name="md-menu" size={24} />
                        </View>
                    </TouchableOpacity>
                )
            })
        }
    }),

    circle: createStackNavigator({
        circle: {
            screen: createCircle,
            navigationOptions: ({navigation}) => ({
                title: 'Create a Circle',
                headerTitleStyle: {
                    marginLeft: 85,
                    color: "#fff"
                },
                headerStyle: {
                    backgroundColor: '#2b9077'
                  },
                headerLeft:(
                    <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
                        <View style={{paddingHorizontal: 10}}> 
                            <Icon name="md-arrow-round-back"  color="#fff" size={24} />
                        </View>
                    </TouchableOpacity>
                )
            })
        },
    }),

    
    

    joinCircle: createStackNavigator({
        circle: {
            screen: joinCircle,
            navigationOptions: ({navigation}) => ({
                title: 'Join a Circle',
                headerTitleStyle: {
                    marginLeft: 95,
                    color: "#fff"
                },
                headerStyle: {
                    backgroundColor: '#2b9077'
                  },
                headerLeft:(
                    <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
                        <View style={{paddingHorizontal: 10}}> 
                            <Icon name="md-arrow-round-back"  color="#fff" size={24} />
                        </View>
                    </TouchableOpacity>
                )
            })
        }
    }),

    SignOut: signOut,

    

});

// const AppTabNavigator = createBottomTabNavigator({
//     Dashboard: DashboardScreen,
//     HomeScreen: HomeScreen,
// })

// const AppStackNavigator = createStackNavigator(
//     {
//     Dashboard: {screen: DashboardScreen,
//         navigationOptions: ({ navigation }) => ({
//             title: 'App',
//             headerTitleStyle: {
//                 marginLeft: 100,
//             },
//             headerLeft: (
//                 <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
//                     <View style={{ paddingHorizontal: 10 }}>
//                         <Icon name="md-menu" size={24} />
//                     </View>
//                 </TouchableOpacity>
//             )
//         })
//     },
//     HomeScreen: HomeScreen,
//     },
//     {
//         DefaultNavigationOptions: ({ navigation }) => ({
//             title: 'App',
//             headerTitleStyle: {
//                 marginLeft: 100,
//             },
//             headerLeft: (
//                 <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
//                     <View style={{ paddingHorizontal: 10 }}>
//                         <Icon name="md-menu" size={24} />
//                     </View>
//                 </TouchableOpacity>
//             )
//         })
//     }

// )



export default AppDrawerNavigator;