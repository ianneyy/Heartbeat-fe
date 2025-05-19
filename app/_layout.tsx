import React, { useEffect, useState } from "react";
import { View } from "react-native";
import BPMCircle from "../components/BPMCircle";


import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../src/screens/LoginScreen";
import RegisterScreen from "../src/screens/RegisterScreen";
import DashboardScreen from "../src/screens/DashboardScreen";
import ProfileScreen from "../src/screens/PorfileScreen";
import { UserProvider } from "../src/context/UserContext";


const Stack = createStackNavigator();


export default function RootLayout() {
  // const [pulse, setPulse] = useState(0);
  // const [loading, setLoading] = useState(true);

  // const fetchBPM = async () => {
  //   try {
  //     const response = await fetch("http://192.168.186.193:3000/bpm"); // replace with your real API URL
  //     const json = await response.json();
  //      if (response.ok) {
  //        setPulse(json.bpm); // Update the state with the 'bpm' value from the response
  //      } else {
  //        console.error("Failed to fetch BPM:", json);
  //      }
  //   } catch (error) {
  //     console.error("Error fetching BPM:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchBPM(); // fetch once on mount
  //   const interval = setInterval(fetchBPM, 500); // fetch every 5 seconds
  //   return () => clearInterval(interval);
  // }, []);

  return (
    // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //   <BPMCircle bpm={pulse} />
    // </View>

    <UserProvider>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: "My Profile" }}
        />
      </Stack.Navigator>
    </UserProvider>
  );
}
