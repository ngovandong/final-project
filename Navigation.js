import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationContainer } from "@react-navigation/native";

import ProfileScreen from "./screens/Profile/ProfileScreen";
import PlayerScreen from "./screens/Player/PlayerScreen";
import MusicScreen from "./screens/Music/MusicScreen";

const Tab = createMaterialBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Player"
        activeColor="#2ea9ed"
        inactiveColor="#a8a5a5"
        barStyle={{ backgroundColor: "white" }}
      >
        <Tab.Screen
          name="Music"
          component={MusicScreen}
          options={{
            tabBarLabel: "Music",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="music" color={color} size={26} />
            ),
          }}
        />

        <Tab.Screen
          name="Player"
          component={PlayerScreen}
          options={{
            tabBarLabel: "Player",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="motion-play"
                color={color}
                size={26}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: "You",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
