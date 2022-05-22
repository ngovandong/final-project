import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { NavigationContainer } from '@react-navigation/native';

import MusicScreen from './screens/MusicScreen'
import PlayerScreen from './screens/PlayerScreen'
import ProfileScreen from './screens/ProfileScreen'
const Tab = createMaterialBottomTabNavigator();

export default function Navigation()
{
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Tap"
                activeColor="#ffffff"
                inactiveColor="#a8a5a5"
                barStyle={{ backgroundColor: '#6200ee' }}
            >
                <Tab.Screen
                    name="Music"
                    component={MusicScreen}
                    options={{
                        tabBarLabel: 'Music',
                        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="gesture-tap" color={color} size={26} />
                    }}
                />

                <Tab.Screen
                    name="Player"
                    component={PlayerScreen}
                    options={{
                        tabBarLabel: 'Player',
                        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="briefcase-account" color={color} size={26} />
                    }}
                />

                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        tabBarLabel: 'Profile',
                        tabBarIcon: ({ color }) => <FontAwesome5 name="file-invoice-dollar" color={color} size={26} />
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}