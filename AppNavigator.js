import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './screens/HomeScreen';
import SomeScreen from './screens/SomeScreen';
import RegScreen from './screens/RegScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/Entypo';
import React from 'react';
import i18n from './i18n';

const StackNavigator = createStackNavigator({
  Home: {
        screen: HomeScreen, 
        navigationOptions: {header: null},
    },
  Reg: {
      screen: RegScreen,
      navigationOptions:{title: i18n.t('reg'),
                        headerStyle: {
                            backgroundColor: '#rgb(66, 65, 96)',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {fontWeight: 'bold',},
        },
    }
  },
  
);

const TabNavigator = createBottomTabNavigator({
  Some: {
    screen: SomeScreen, 
    navigationOptions:{
      tabBarLabel:i18n.t('menu'),
      tabBarIcon: ({tintColor}) => (<Icon name={'menu'} color={tintColor} size={24}/>)
    }
    },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      tabBarLabel: i18n.t('settin'),
      tabBarIcon: ({tintColor}) => (<Icon name={'cog'} color={tintColor} size={24}/>)
    },
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarLabel: i18n.t('prof'),
      tabBarIcon: ({tintColor}) => (<Icon name={'user'} color={tintColor} size={24}/>)
    },
  }
},
{
  initialRouteName: 'Some',
  order: ['Some', 'Settings', 'Profile',],
  tabBarOptions:{
    activeTintColor: 'rgb(250, 194, 197)',
    inactiveTintColor: 'rgb(179, 179, 179)',
    showIcon: true,
    style: {
      backgroundColor: '#rgb(52, 52, 76)',
    }
  }
}
);

const AppNavigator = createSwitchNavigator({
  Stack: StackNavigator,
  Tab: TabNavigator,
}, {
  initialRouteName: 'Stack',
})

export default createAppContainer(AppNavigator);




